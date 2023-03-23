import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";

import { TransactionCardListProps } from ".";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
    `

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({theme}) => theme.colors.primary};

    justify-content: flex-start;
    align-items: flex-start;
`

export const UserWraper = styled.View`
    width: 100%;
    padding: 0 24px;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const GreetingsCard = styled.View`
    flex-direction: row;
    align-items: center;
`

export const ProfilePhoto = styled.Image`
    width: ${RFValue(55)}px;
    height: ${RFValue(55)}px;
    border-radius: 10px;
`

export const GreetingsText = styled.View`
    margin-left: 17px;
`

export const Hello = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`

export const UserName = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`

export const PowerBtn = styled(BorderlessButton)``;

export const PowerBtnIcon = styled(Feather)`
    color: ${({theme}) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
`

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingLeft: 24, paddingRight: 9 },
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`

export const Transactions = styled.View`
    flex: 1;
    padding: 0 24px;
    margin-top: ${RFPercentage(12)}px;
`
export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    margin-bottom: 16px;
`

export const TransactionList = styled(FlatList<TransactionCardListProps>).attrs({
    contentContainerStyle: {
        paddingBottom: getBottomSpace(),
      },
      showsVerticalScrollIndicator: false
})``

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
