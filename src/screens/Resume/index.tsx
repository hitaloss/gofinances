import React, { useEffect, useState } from "react";
import HistoryCard from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { Container, Header, Title, Content } from "./styles";
import { TransactionCardListProps } from "../Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CategoryProps {
  key: string;
  name: string;
  total: string;
  color: string;
}

function Resume() {
  const [categoriesTotal, setCategoriesTotal] = useState<CategoryProps[]>([]);

  const loadData = async () => {
    const dataKey = "@blufinances:transactions";
    const storage = await AsyncStorage.getItem(dataKey);
    const storageFormatted = storage ? JSON.parse(storage) : [];

    const expenses = storageFormatted.filter(
      (item: TransactionCardListProps) => item.type === "negative"
    );

    const categoryTotal: CategoryProps[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expenses.forEach((item: TransactionCardListProps) => {
        if (String(item.category) === category.key) {
          categorySum += Number(item.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        categoryTotal.push({
          key: category.key,
          name: category.name,
          total: total,
          color: category.color,
        });
      }
    });
    setCategoriesTotal(categoryTotal);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {categoriesTotal.map((item) => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.total}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}

export default Resume;
