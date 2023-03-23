import React, { useContext, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Alert } from "react-native";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import SignInButton from "../../components/SignInButton";
import { AuthContext } from "../../contexts/Auth/AuthContext";

function SignIn() {
  const [loading, setLoading] = useState(false);

  const { googleRegister, appleRegister } = useContext(AuthContext);

  const theme = useTheme();

  const handleSignInGoogle = async () => {
    try {
      setLoading(true);
      return await googleRegister();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
      setLoading(false);
    }
  };

  const handleSignInApple = async () => {
    try {
      setLoading(true);
      return await appleRegister();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça o seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={handleSignInGoogle}
          />
          <SignInButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={handleSignInApple}
          />
        </FooterWrapper>

        {loading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}

export default SignIn;
