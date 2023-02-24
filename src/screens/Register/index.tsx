import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";
import Button from "../../components/Forms/Button";
import TransactionTypeBtn from "../../components/Forms/TransactionTypeBtn";
import SelectCategory from "../../components/Forms/SelectCategory";
import CategoryModal, { Category } from "../CategoryModal";

import InputForms from "../../components/Forms/InputForms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../schemas/schema";

function Register() {
  const [typeSelected, setTypeSelected] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [category, setCategory] = useState<Category>({
    key: "category",
    name: "Categoria",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const handleRegisterForm = (form: Record<string, string>) => {
    if (!typeSelected) return Alert.alert("Selecione o tipo de transação");
    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      typeSelected,
      category: category.key,
    };
    console.log(data);
  };

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForms
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name?.message?.toString()}
            />
            <InputForms
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              autoComplete={"off"}
              error={errors.amount?.message?.toString()}
            />
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
            <SelectCategory
              title={category.name}
              onPress={handleOpenCategory}
            />
          </Fields>
          <Button onPress={handleSubmit(handleRegisterForm)} text="Enviar" />
        </Form>

        <Modal visible={isOpen}>
          <CategoryModal
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default Register;
