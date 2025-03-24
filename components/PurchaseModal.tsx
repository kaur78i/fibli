import React, { useState } from 'react';
import {
	Modal,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { purchaseOneTimeProduct, purchaseSubscription, SUBSCRIPTION_SKUS, ONE_TIME_PURCHASES } from '@/services/purchase';
interface PurchaseOption {
	id: string;
	title: string;
	price: string;
	description: string;
	type: 'oneTime' | 'subscription';
	period?: string; // for subscriptions only
	onPurchase: () => void;
}

interface PurchaseModalProps {
	visible: boolean;
	onClose: () => void;
}

const purchaseOptions: PurchaseOption[] = [
	{
		id: 'premium',
		title: 'Premium Access',
		price: '$6.99',
		description: 'One-time purchase for 20 uses',
		type: 'oneTime',
		onPurchase: () => {
			purchaseOneTimeProduct(ONE_TIME_PURCHASES.TWENTY_USES);
		},
	},
	{
		id: 'monthly',
		title: 'Monthly Plan',
		price: '$14.99/month',
		description: 'Full access with monthly billing',
		type: 'subscription',
		period: 'monthly',
		onPurchase: () => {
			purchaseSubscription(SUBSCRIPTION_SKUS.MONTHLY);
		},
	},
];

const PurchaseModal: React.FC<PurchaseModalProps> = ({
	visible,
	onClose,
}) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Choose Your Plan</Text>

					<ScrollView style={styles.optionsContainer}>
						{purchaseOptions.map((option) => (
							<TouchableOpacity
								key={option.id}
								style={[
									styles.optionCard,
									selectedOption === option.id && styles.selectedCard,
								]}
								onPress={() => setSelectedOption(option.id)}
							>
								<Text style={styles.optionTitle}>{option.title}</Text>
								<Text style={styles.optionPrice}>{option.price}</Text>
								<Text style={styles.optionDescription}>
									{option.description}
								</Text>
								{option.type === 'subscription' && (
									<Text style={styles.periodLabel}>
										{option.period === 'monthly' ? 'Monthly billing' : 'Annual billing'}
									</Text>
								)}
							</TouchableOpacity>
						))}
					</ScrollView>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.cancelButton}
							onPress={onClose}
						>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.purchaseButton,
								!selectedOption && styles.disabledButton,
							]}
							disabled={!selectedOption}
							onPress={() => {
								const selected = purchaseOptions.find(
									(option) => option.id === selectedOption
								);
								if (selected) {
									selected.onPurchase();
								}
							}}
						>
							<Text style={styles.buttonText}>Purchase</Text>
						</TouchableOpacity>
					</View>
				</View>
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
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		width: '90%',
		maxHeight: '80%',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	optionsContainer: {
		maxHeight: 400,
	},
	optionCard: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 10,
		padding: 15,
		marginBottom: 10,
	},
	selectedCard: {
		borderColor: '#007AFF',
		backgroundColor: '#F0F8FF',
	},
	optionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	optionPrice: {
		fontSize: 24,
		color: '#007AFF',
		marginBottom: 5,
	},
	optionDescription: {
		color: '#666',
		marginBottom: 5,
	},
	periodLabel: {
		color: '#888',
		fontSize: 12,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	cancelButton: {
		backgroundColor: '#FF3B30',
		padding: 15,
		borderRadius: 10,
		flex: 1,
		marginRight: 10,
	},
	purchaseButton: {
		backgroundColor: '#007AFF',
		padding: 15,
		borderRadius: 10,
		flex: 1,
		marginLeft: 10,
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default PurchaseModal;
