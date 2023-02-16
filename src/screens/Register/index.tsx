import React from "react";
import { Container, Header, Title, Form, Fields } from "./styles";
import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import TransactionTypeBtn from "../../components/Forms/TransactionTypeBtn";

function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionTypeBtn type="up" text="Income" />
          <TransactionTypeBtn type="down" text="Outcome" />
        </Fields>

        <Button text="Enviar" />
      </Form>
    </Container>
  );
}

export default Register;
