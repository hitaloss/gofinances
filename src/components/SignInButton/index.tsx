import React from "react";
import { Button, ImgContainer, Title } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

function SignInButton({ title, svg: Svg, ...rest }: Props) {
  return (
    <Button>
      <ImgContainer>
        <Svg />
      </ImgContainer>
      <Title>{title}</Title>
    </Button>
  );
}

export default SignInButton;
