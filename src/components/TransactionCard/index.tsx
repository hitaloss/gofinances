import React from "react";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";
import { categories } from "../../utils/categories";

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: Category;
  date: string;
}

interface Data {
  data: TransactionCardProps;
}

function TransactionCard({ data }: Data) {
  const category = categories.filter(
    (item) => item.key === String(data["category"])
  )[0];

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
export default TransactionCard;
