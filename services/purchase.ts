import {
  initConnection,
  endConnection,
  finishTransaction,
  purchaseUpdatedListener,
  purchaseErrorListener,
  getSubscriptions,
  requestSubscription,
  getPurchaseHistory,
  PurchaseError,
  Subscription
} from 'react-native-iap';

import SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Subscription IDs should match those in App Store Connect
export const SUBSCRIPTION_SKUS = {
  MONTHLY: 'com.coookyapp.subscription.monthly',
  ANNUAL: 'com.coookyapp.subscription.annual'
} as const;

interface SubscriptionStatus {
  isSubscribed: boolean;
  expiryDate?: number;
  latestReceipt?: string;
}

const FREE_GENERATIONS_KEY = 'free_recipe_generations';
const MAX_FREE_GENERATIONS = 3;

let purchaseUpdateSubscription: any;
let purchaseErrorSubscription: any;

export async function initializePurchases() {
  if (Platform.OS === 'web') return;

  try {
    await initConnection();

    // Set up listeners
    purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          await finishTransaction({ purchase });
          await SecureStore.setItemAsync('hasActiveSubscription', 'true');
        } catch (error) {
          console.error('Error finishing transaction:', error);
        }
      }
    });

    purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
      console.error('Purchase error:', error);
    });

  } catch (error) {
    console.error('Error initializing purchases:', error);
  }
}

export async function endPurchaseConnection() {
  if (purchaseUpdateSubscription) {
    purchaseUpdateSubscription.remove();
  }
  if (purchaseErrorSubscription) {
    purchaseErrorSubscription.remove();
  }
  await endConnection();
}

export async function getSubscriptionProducts(): Promise<Subscription[]> {
  if (Platform.OS === 'web') return [];

  try {
    const subscriptions = await getSubscriptions({
      skus: [SUBSCRIPTION_SKUS.MONTHLY, SUBSCRIPTION_SKUS.ANNUAL]
    });

    return subscriptions;
  } catch (error) {
    console.error('Error getting subscriptions:', error);
    return [];
  }
}

export async function purchaseSubscription(sku: string): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  try {
    await requestSubscription({
      sku: sku
    });
    await SecureStore.setItemAsync('hasActiveSubscription', 'true');
    return true;
  } catch (error) {
    console.error('Error purchasing subscription:', error);
    return false;
  }
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  try {
    const purchaseHistory = await getPurchaseHistory();

    let expiryDate: number | undefined;
    const subscriptionPurchases = purchaseHistory.filter(
      (purchase) => purchase?.productId === SUBSCRIPTION_SKUS.MONTHLY || purchase?.productId === SUBSCRIPTION_SKUS.ANNUAL
    );

    const latestSubscription = subscriptionPurchases.sort((a, b) => b?.transactionDate - a?.transactionDate)[0];
    if (latestSubscription?.productId === SUBSCRIPTION_SKUS.MONTHLY) {
      expiryDate = latestSubscription?.transactionDate + 30 * 24 * 60 * 60 * 1000;
    } else if (latestSubscription?.productId === SUBSCRIPTION_SKUS.ANNUAL) {
      expiryDate = latestSubscription?.transactionDate + 365 * 24 * 60 * 60 * 1000;
    }
    await SecureStore.setItemAsync('hasActiveSubscription', (expiryDate ? expiryDate > Date.now() : false).toString());
    return {
      isSubscribed: expiryDate ? expiryDate > Date.now() : false,
      expiryDate: expiryDate ? expiryDate : undefined,
      latestReceipt: latestSubscription?.transactionReceipt || undefined
    };
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return { isSubscribed: false };
  }
}

export async function getFreeGenerationsRemaining() {
  try {
    const used = await SecureStore.getItemAsync(FREE_GENERATIONS_KEY);
    const usedCount = used ? parseInt(used) : 0;
    await SecureStore.setItemAsync(FREE_GENERATIONS_KEY, (usedCount).toString());
    return Math.max(0, MAX_FREE_GENERATIONS - usedCount);
  } catch (error) {
    console.error('Error getting free generations:', error);
    return 0;
  }
}

export async function incrementGenerationCount() {
  try {
    const used = await SecureStore.getItemAsync(FREE_GENERATIONS_KEY);
    const usedCount = used ? parseInt(used) : 0;
    await SecureStore.setItemAsync(FREE_GENERATIONS_KEY, (usedCount + 1).toString());
  } catch (error) {
    console.error('Error incrementing generation count:', error);
  }
}