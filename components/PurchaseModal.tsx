import React, { useState, useEffect } from 'react';
import {
	Modal,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Platform,
	Alert,
	ActivityIndicator,
} from 'react-native';
import { purchaseOneTimeProduct, purchaseSubscription, SUBSCRIPTION_SKUS, ONE_TIME_PURCHASES, getPurchaseState, restorePurchases } from '@/services/purchase';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import { Star } from 'lucide-react-native';
import { useLanguage } from '@/context/LanguageContext';

interface PurchaseOption {
	id: string;
	title: string;
	price: string;
	description: string;
	type: 'oneTime' | 'subscription';
	period?: string; // for subscriptions only
	onPurchase: () => Promise<boolean>;
}

interface PurchaseModalProps {
	visible: boolean;
	onClose: () => void;
}

const purchaseOptions: PurchaseOption[] = [
	{
		id: 'monthly',
		title: 'Monthly Plan',
		price: '$14.99/month',
		description: 'Full access with monthly billing',
		type: 'subscription',
		period: 'monthly',
		onPurchase: async () => {
			return await purchaseSubscription(SUBSCRIPTION_SKUS.MONTHLY);
		},
	},
	{
		id: 'premium',
		title: 'Premium Access',
		price: '$6.99',
		description: 'One-time purchase for 20 uses',
		type: 'oneTime',
		onPurchase: async () => {
			return await purchaseOneTimeProduct(ONE_TIME_PURCHASES.TWENTY_USES);
		},
	},
];

const PurchaseModal: React.FC<PurchaseModalProps> = ({
	visible,
	onClose,
}) => {
	const { colors } = useTheme();
	const { t } = useLanguage();
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isPurchasesLoading, setIsPurchasesLoading] = useState(false);
	const [isPurchasing, setIsPurchasing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [purchases, setPurchases] = useState({
		oneTime: false,
		subscription: false,
	});

	useEffect(() => {
		const fetchPurchases = async () => {
			setIsPurchasesLoading(true);
			const purchases = await getPurchaseState();
			setPurchases({
				oneTime: purchases.purchasedUses >= 20,
				subscription: purchases.isSubscribed,
			});
			setIsPurchasesLoading(false);
		};
		fetchPurchases();
	}, []);

	const handlePurchase = async () => {
		let success = false;
		const selected = purchaseOptions.find(
			(option) => option.id === selectedOption
		);
		if (selected) {
			setError(null);
			setIsPurchasing(true);
			try {
				success = await selected.onPurchase();
				if (success) {
					setPurchases(prev => ({
						...prev,
						[selected.type]: true
					}));
					if (Platform.OS === 'web') {
						alert(t.purchaseSuccess);
					} else {
						Alert.alert(t.success, t.purchaseSuccess);
					}
					onClose();
				} else {
					throw new Error(t.purchaseFailed);
				}
			} catch (err: any) {
				if (Platform.OS === 'web') {
					alert(t.purchaseFailed + ': ' + err.message);
				} else {
					Alert.alert(t.error, t.purchaseFailed + ': ' + err.message);
				}
			} finally {
				setIsPurchasing(false);
			}
		}
	};

	const handleRestore = async () => {
		setIsPurchasing(true);
		setError(null);
		
		try {
			const success = await restorePurchases();
			if (success) {
				// Refresh purchase state
				const newState = await getPurchaseState();
				setPurchases({
					oneTime: newState.purchasedUses >= 20,
					subscription: newState.isSubscribed,
				});
				Alert.alert(t.success, t.purchasesRestored);
			} else {
				setError(t.restoreFailed);
			}
		} catch (error) {
			setError(t.restoreFailed);
		} finally {
			setIsPurchasing(false);
		}
	};

	return (
		<Modal
			visible={visible}
			animationType="fade"
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<Animatable.View
					animation="fadeInUp"
					duration={300}
					style={[styles.modalContent, { backgroundColor: colors.card }]}
				>
					<LinearGradient
						colors={[colors.gradientStart, colors.gradientEnd]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.headerGradient}
					>
						<Animatable.Text animation="bounceIn" duration={1200} style={styles.title}>
							{t.chooseYourPlan}
						</Animatable.Text>
						<Animatable.View animation="fadeIn" delay={400}>
							<Text style={styles.subtitle}>{t.selectThePerfectPlanForYou}</Text>
						</Animatable.View>
					</LinearGradient>

					<TouchableOpacity
						style={[styles.restoreButton, { borderColor: colors.primary }]}
						onPress={handleRestore}
						disabled={isPurchasing}
					>
						<Text style={[styles.restoreButtonText, { color: colors.primary }]}>
							{isPurchasing ? t.restoring : t.restorePurchases}
						</Text>
					</TouchableOpacity>

					<ScrollView style={styles.optionsContainer}>
						{purchaseOptions.map((option, index) => (
							<Animatable.View
								key={option.id}
								animation="fadeInRight"
								duration={500}
								delay={index * 100}
							>
								<TouchableOpacity
									style={[
										styles.optionCard,
										{ backgroundColor: colors.background },
										selectedOption === option.id && {
											borderColor: colors.primary,
											borderWidth: 2,
											backgroundColor: colors.card
										}
									]}
									onPress={() => setSelectedOption(option.id)}
									disabled={isPurchasesLoading || purchases[option.type]}
								>
									{option.type === 'subscription' && (
										<View style={[styles.bestValueBadge, { backgroundColor: colors.primary }]}>
											<Text style={styles.bestValueText}>{t.bestValue}</Text>
										</View>
									)}
									<Text style={[styles.optionTitle, { color: colors.text }]}>{option.title}</Text>
									<Text style={[styles.optionPrice, { color: colors.primary }]}>{option.price}</Text>
									<Text style={[styles.optionDescription, { color: colors.secondaryText }]}>
										{option.description}
									</Text>
									{option.type === 'subscription' && (
										<Text style={[styles.periodLabel, { color: colors.secondaryText }]}>
											{option.period === 'monthly' ? t.monthlyBilling : t.annualBilling}
										</Text>
									)}
									{selectedOption === option.id && (
										<Animatable.View animation="bounceIn" style={styles.checkmark}>
											<Star size={20} color={colors.primary} fill={colors.primary} />
										</Animatable.View>
									)}
								</TouchableOpacity>
							</Animatable.View>
						))}
					</ScrollView>

					{error && (
						<Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
					)}

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.cancelButton, { borderColor: colors.cardBorder }]}
							onPress={onClose}
							disabled={isPurchasing}
						>
							<Text style={[styles.buttonText, { color: colors.text }]}>{t.cancel}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.purchaseButton,
								{ backgroundColor: colors.primary },
								(!selectedOption || isPurchasing) && styles.disabledButton
							]}
							disabled={!selectedOption || isPurchasing}
							onPress={handlePurchase}
						>
							<Text style={[styles.buttonText, { color: '#fff' }]}>
								{isPurchasing ? (
									<>
										{t.processing}
										<ActivityIndicator size="small" color="#fff" />
									</>
								) : (
									t.purchase
								)}
							</Text>
						</TouchableOpacity>
					</View>
				</Animatable.View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: '90%',
		maxHeight: '80%',
		borderRadius: 20,
		overflow: 'hidden',
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},
	headerGradient: {
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	title: {
		fontSize: 24,
		fontFamily: 'LuckiestGuy-Regular',
		color: '#fff',
		textAlign: 'center',
		marginBottom: 8,
		textShadowColor: 'rgba(0, 0, 0, 0.2)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
	subtitle: {
		fontSize: 16,
		fontFamily: 'Inter-Regular',
		color: 'rgba(255, 255, 255, 0.9)',
		textAlign: 'center',
	},
	optionsContainer: {
		padding: 16,
		maxHeight: 400,
	},
	optionCard: {
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: 'transparent',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		position: 'relative',
	},
	bestValueBadge: {
		position: 'absolute',
		top: -12,
		right: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
	},
	bestValueText: {
		color: '#fff',
		fontSize: 12,
		fontFamily: 'Inter-Bold',
	},
	optionTitle: {
		fontSize: 18,
		fontFamily: 'Inter-SemiBold',
		marginBottom: 8,
	},
	optionPrice: {
		fontSize: 24,
		fontFamily: 'Inter-Bold',
		marginBottom: 8,
	},
	optionDescription: {
		fontSize: 14,
		fontFamily: 'Inter-Regular',
		lineHeight: 20,
		marginBottom: 8,
	},
	periodLabel: {
		fontSize: 12,
		fontFamily: 'Inter-Regular',
	},
	checkmark: {
		position: 'absolute',
		top: 16,
		right: 16,
	},
	buttonContainer: {
		flexDirection: 'row',
		padding: 16,
		gap: 12,
	},
	cancelButton: {
		flex: 1,
		padding: 16,
		borderRadius: 16,
		borderWidth: 1,
		alignItems: 'center',
	},
	purchaseButton: {
		flex: 1,
		padding: 16,
		borderRadius: 16,
		alignItems: 'center',
		elevation: 4,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	disabledButton: {
		opacity: 0.5,
	},
	buttonText: {
		fontSize: 16,
		fontFamily: 'Inter-Bold',
	},
	errorText: {
		textAlign: 'center',
		marginHorizontal: 16,
		marginBottom: 8,
		fontSize: 14,
		fontFamily: 'Inter-Regular',
	},
	restoreButton: {
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 16,
		alignItems: 'center',
	},
	restoreButtonText: {
		fontSize: 16,
		fontWeight: '600',
	},
});

export default PurchaseModal;
