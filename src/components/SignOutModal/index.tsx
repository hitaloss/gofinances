import React from "react";
import {
  gestureHandlerRootHOC,
  RectButtonProps,
} from "react-native-gesture-handler";
import {
  Modal,
  Container,
  ModalTitle,
  Title,
  ModalContent,
  TextContent,
  ModalActions,
  Background,
  Confirm,
  Cancel,
  ActionButtonTitle,
} from "./styles";

interface Props {
  handleCloseModal: () => void;
  signOut: () => void;
  open: boolean;
}

interface ContentProps extends RectButtonProps {
  handleCloseModal: () => void;
  signOut: () => void;
}

const SignOutModalContent = gestureHandlerRootHOC(
  ({ handleCloseModal, signOut, ...rest }: ContentProps) => (
    <Container>
      <Background>
        <ModalTitle>
          <Title>Sair da conta</Title>
        </ModalTitle>
        <ModalContent>
          <TextContent>Deseja realmente sair da conta?</TextContent>
        </ModalContent>
        <ModalActions>
          <Cancel {...rest} onPress={handleCloseModal}>
            <ActionButtonTitle>Cancelar</ActionButtonTitle>
          </Cancel>
          <Confirm {...rest} onPress={signOut}>
            <ActionButtonTitle>Confirmar</ActionButtonTitle>
          </Confirm>
        </ModalActions>
      </Background>
    </Container>
  )
);

function SignOutModal({ handleCloseModal, signOut, open }: Props) {
  return (
    <Modal visible={open} onRequestClose={handleCloseModal}>
      <SignOutModalContent
        handleCloseModal={handleCloseModal}
        signOut={signOut}
      />
    </Modal>
  );
}

export default SignOutModal;
