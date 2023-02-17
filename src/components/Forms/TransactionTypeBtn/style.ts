import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
    type: "up" | "down";
}

interface ContainerProps {
    isActive: boolean
    type: "up" | "down";
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    width: 48%;
    flex-direction: row;
    padding: 16px;

    align-items: center;
    justify-content: center;

    border: 1.5px solid ${({theme}) => theme.colors.captions_light};
    border-radius: 5px;

    ${({isActive, type}) => (
        isActive && type === "up" &&
        css`
          background-color: ${({theme}) => theme.colors.success_light};
          border: 0;
        `
    )}
    ${({isActive, type}) => (
        isActive && type === "down" &&
        css`
          background-color: ${({theme}) => theme.colors.warning_light};
          border: 0;
        `
    )}
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${({theme, type}) => (
        type === "up" ?
        theme.colors.success :
        theme.colors.warning
    )};
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;
