import React from "react";
import { Container, Icon, Title } from "./style";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  text: string;
  type: "up" | "down";
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

function TransactionTypeBtn({ text, type, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon name={icons[type]} />
      <Title>{text}</Title>
    </Container>
  );
}
export default TransactionTypeBtn;
