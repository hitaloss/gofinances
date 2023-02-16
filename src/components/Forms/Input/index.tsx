import { TextInputProps } from "react-native";
import React from "react";
import { Container } from "./styles";

type Props = TextInputProps;

function Input({ ...rest }: Props) {
  return <Container {...rest} />;
}

export default Input;
