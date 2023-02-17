import React from "react";
import { Container, Icon, Title } from "./style";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  text: string;
  type: "up" | "down";
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

function TransactionTypeBtn({ text, type, isActive, ...rest }: Props) {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type} />
      <Title>{text}</Title>
    </Container>
  );
}
export default TransactionTypeBtn;
