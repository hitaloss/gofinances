import React, { useState } from "react";
import uuid from "react-native-uuid";

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

import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import AsyncStorage from "@react-native-async-storage/async-storage";

function Register() {
  const [typeSelected, setTypeSelected] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [category, setCategory] = useState<Category>({
    key: "category",
    name: "Categoria",
  });

  const dataKey = "@blufinances:transactions";

  type RootTabParamList = {
    Listagem: undefined;
    Cadastrar: undefined;
    Resumo: undefined;
  };
  type HomeScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    "Listagem"
  >;
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const handleRegisterForm = async (form: Record<string, string>) => {
    if (!typeSelected) return Alert.alert("Selecione o tipo de transação");
    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      typeSelected,
      category: category.key,
      date: new Date(),
    };

    try {
      const transactionStorage = await AsyncStorage.getItem(dataKey);

      const transactionHistory = transactionStorage
        ? JSON.parse(transactionStorage)
        : [];

      const currentStorage = [...transactionHistory, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(currentStorage));

      reset();
      setTypeSelected("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
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
