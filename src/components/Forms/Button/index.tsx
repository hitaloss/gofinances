import React from "react";
import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";

// interface Props extends TouchableOpacityProps {
//   text: string;
// }

interface Props extends RectButtonProps {
  text: string;
  onPress: () => void;
}

function Button({ text, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{text}</Title>
    </Container>
  );
}
export default Button;
