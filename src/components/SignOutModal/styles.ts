import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native"

export const Modal = styled.Modal.attrs({
    statusBarTranslucent: true,
    transparent: true,
    animationType: "fade",
})``;

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.5);
`;

export const Background = styled.View`
    padding: 30px;
    background-color: ${({theme}) => theme.colors.background};
    border-radius: 12px;
`;

export const ModalTitle = styled.View`
    width: 100%;
    text-align: start;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(18)}px;
`;

export const ModalContent = styled.View`
    margin: 30px 0;
`;

export const TextContent = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;
`;

export const ModalActions = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const Confirm = styled(RectButton)`
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: 7px;
    padding: 7px;
`;

export const Cancel = styled(RectButton)`
    background-color: ${({theme}) => theme.colors.warning};
    border-radius: 7px;
    padding: 7px;
`;

export const ActionButtonTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.shape};
`;
