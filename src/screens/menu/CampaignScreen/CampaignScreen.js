import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Center } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import CampaignModal from './CampaignModal';
import DiscountUtils from './DiscountUtils';

const CampaignScreen = ({ allTotal, onDataReceived, ondiscountApplied, paymentSuccess, campaignCounter }) => {
    const [showModal, setShowModal] = useState(false);
    const [discountApplied, setDiscountApplied] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (campaignCounter > 0) {
            setDiscountApplied(false);
        }
    }, [campaignCounter]);

    const applyDiscount = async () => {
        if (DiscountUtils.canApplyDiscount(allTotal, t)) {
            if (!discountApplied) {
                const discountedTotal = (allTotal * 0.8).toFixed(2);
                await DiscountUtils.saveDiscountAmount(allTotal - discountedTotal);
                DiscountUtils.showSuccessAlert(t);
                await DiscountUtils.updateCampaignCounter(setDiscountApplied);
                return discountedTotal;
            } else {
                DiscountUtils.showAlreadyAppliedAlert(t);
            }
        }
        return allTotal;
    };

    const blackFridayDiscount = () => {
        return DiscountUtils.blackFridayDiscount(allTotal, discountApplied, t);
    };

    const sendDataToParent = async () => {
        if (paymentSuccess) {
            DiscountUtils.showPaymentDoneAlert(t);
            return;
        }
        if (DiscountUtils.canApplyDiscount(allTotal, t)) {
            const updatedTotal = await applyDiscount();
            onDataReceived(updatedTotal);
            ondiscountApplied(false);
        }
    };

    return (
        <NativeBaseProvider>
            <Center>
                <TouchableOpacity style={styles.CampaignsButton} onPress={() => setShowModal(true)}>
                    <MaterialIcons style={{ padding: 8 }} name={"campaign"} size={32} color={"white"} />
                </TouchableOpacity>
                <CampaignModal 
                    isOpen={showModal} 
                    onClose={() => setShowModal(false)} 
                    sendDataToParent={sendDataToParent} 
                    blackFridayDiscount={blackFridayDiscount} 
                />
            </Center>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    CampaignsButton: {
        backgroundColor: '#3e66ae',
        borderRadius: 10,
        justifyContent: 'center',
    },
});

export default CampaignScreen;
