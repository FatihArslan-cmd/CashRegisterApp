import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const DiscountUtils = {
    canApplyDiscount: (allTotal, t) => {
        if (allTotal === 0) {
            Alert.alert(
                t('No Items'),
                t('There are no items in the list. Cannot apply discount.'),
                [{ text: "OK" }]
            );
            return false;
        }
        return true;
    },

    saveDiscountAmount: async (amount) => {
        try {
            let discountAmounts = await AsyncStorage.getItem('discountAmounts');
            discountAmounts = discountAmounts ? JSON.parse(discountAmounts) : [];
            discountAmounts.push(amount);
            await AsyncStorage.setItem('discountAmounts', JSON.stringify(discountAmounts));
        } catch (error) {
            console.error('Error saving discount amount: ', error);
        }
    },

    updateCampaignCounter: async (setDiscountApplied) => {
        try {
            let campaignCounterdb = await AsyncStorage.getItem('campaignCounterdb');
            campaignCounterdb = parseInt(campaignCounterdb || 0) + 1;
            await AsyncStorage.setItem('campaignCounterdb', JSON.stringify(campaignCounterdb));
            setDiscountApplied(true);
        } catch (error) {
            console.error('Error updating campaign counter: ', error);
        }
    },

    showSuccessAlert: (t) => {
        Alert.alert(
            t('Success'),
            t('Discount applied successfully'),
            [{ text: "OK" }]
        );
    },

    showAlreadyAppliedAlert: (t) => {
        Alert.alert(
            t('Discount Already Applied'),
            t('The discount has already been applied to the order.'),
            [{ text: "OK" }]
        );
    },

    showPaymentDoneAlert: (t) => {
        Alert.alert(
            t('Payment Done'),
            t('Discounts cannot be applied after payment has been made.'),
            [{ text: "OK" }]
        );
    },

    getDayOfWeek: () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date().getDay();
        return days[today];
    },

    blackFridayDiscount: (allTotal, discountApplied, t) => {
        if (DiscountUtils.canApplyDiscount(allTotal, t)) {
            const dayOfWeek = DiscountUtils.getDayOfWeek();
            if (dayOfWeek === 'Friday') {
                if (!discountApplied) {
                    const discountedTotal = (allTotal * 0.3).toFixed(2);
                    Alert.alert(
                        t('Success'),
                        t('Discount applied successfully'),
                        [{ text: "OK" }]
                    );
                    return discountedTotal;
                } else {
                    DiscountUtils.showAlreadyAppliedAlert(t);
                }
            } else {
                Alert.alert(
                    t('No Discount Today'),
                    t('Today is not Black Friday. The discount is only available on Fridays'),
                    [{ text: "OK" }]
                );
            }
        }
        return allTotal;
    },
};

export default DiscountUtils;
