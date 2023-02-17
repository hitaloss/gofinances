import React, { useState } from "react";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";
import Input from "../../components/Forms/Input";
import Button from "../../components/Forms/Button";
import TransactionTypeBtn from "../../components/Forms/TransactionTypeBtn";

function Register() {
  const [typeSelected, setTypeSelected] = useState<string>("");

  const handleTypeSelected = (type: "up" | "down") => {
    setTypeSelected(type);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionsTypes>
            <TransactionTypeBtn
              onPress={() => handleTypeSelected("up")}
              isActive={typeSelected === "up"}
              type="up"
              text="Income"
            />
            <TransactionTypeBtn
              onPress={() => handleTypeSelected("down")}
              isActive={typeSelected === "down"}
              type="down"
              text="Outcome"
            />
          </TransactionsTypes>
        </Fields>

        <Button text="Enviar" />
      </Form>
    </Container>
  );
}

export default Register;
