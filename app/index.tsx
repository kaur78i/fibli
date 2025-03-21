import { Redirect } from 'expo-router';
import SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function Index() {
  useEffect(() => {
    console.log('uuidv4()', uuidv4());
    const getUserId = async () => {
      try {
        if (Platform.OS === 'web') {
          const user_id = localStorage.getItem('user_id');
          if (!user_id || user_id === 'undefined' || user_id === 'null' || user_id === '') {
            const newUserId = uuidv4();
            console.log('Setting new user_id in localStorage:', newUserId);
            localStorage.setItem('user_id', newUserId);
          } else {
            console.log('Existing user_id in localStorage:', user_id);
          }
        } else {
          const user_id = await SecureStore.getItemAsync('user_id');
          if (!user_id || user_id === 'undefined' || user_id === 'null' || user_id === '') {
            const newUserId = uuidv4();
            console.log('Setting new user_id in SecureStore:', newUserId);
            await SecureStore.setItemAsync('user_id', newUserId);
          } else {
            console.log('Existing user_id in SecureStore:', user_id);
          }
        }
      } catch (error) {
        console.error('Error getting/setting user ID:', error);
      }
    };

    getUserId();
  }, []);
  return <Redirect href="/(tabs)" />;
}