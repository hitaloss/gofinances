import React, { useState } from "react";
import { Modal } from "react-native";
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
import SelectCategory from "../../components/Forms/SelectCategory";
import CategoryModal, { Category } from "../CategoryModal";

function Register() {
  const [typeSelected, setTypeSelected] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Category>({
    key: "category",
    name: "Categoria",
  });

  const handleTypeSelected = (type: "up" | "down") => {
    setTypeSelected(type);
  };

  const handleCloseCategory = () => {
    setIsOpen(false);
  };
  const handleOpenCategory = () => {
    setIsOpen(true);
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
          <SelectCategory title={category.name} onPress={handleOpenCategory} />
        </Fields>

        <Button text="Enviar" />
      </Form>

      <Modal visible={isOpen}>
        <CategoryModal
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseCategory}
        />
      </Modal>
    </Container>
  );
}

export default Register;
