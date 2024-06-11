import React, { useState, useEffect,useContext } from 'react';
import { NativeBaseProvider, Center } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import CampaignModal from './CampaignModal';
import DiscountUtils from './DiscountUtils';
import { ProductContext } from '../../../context/ProductContext';
const CampaignScreen = ({  }) => {
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();
    const { paymentSuccess,allTotal,setAllTotal,discountApplied,setDiscountApplied,setDisableActions } = useContext(ProductContext);

    useEffect(() => {
        if (discountApplied) {
          setDisableActions(true);
        } 
      }, [discountApplied]);
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
            setAllTotal(updatedTotal)
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
