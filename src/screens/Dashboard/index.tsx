import React from "react";
import HighlightCard from "../../components/HighlightCard";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";
import {
  Container,
  GreetingsCard,
  Header,
  ProfilePhoto,
  GreetingsText,
  Hello,
  UserName,
  UserWraper,
  PowerBtn,
  HighlightCards,
  Title,
  Transactions,
  TransactionList,
} from "./styles";

export interface TransactionCardListProps extends TransactionCardProps {
  id: string;
}

function Dashboard() {
  const data: TransactionCardListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "10/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "home",
      },
      date: "27/03/2020",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWraper>
          <GreetingsCard>
            <ProfilePhoto
              source={{
                uri: "https://random.dog/b3b24c5f-2c21-4b94-a68f-3b06d4432a04.JPG",
              }}
            />
            <GreetingsText>
              <Hello>Olá,</Hello>
              <UserName>Hítalo</UserName>
            </GreetingsText>
          </GreetingsCard>

          <PowerBtn name="power" />
        </UserWraper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title={"Entradas"}
          amount={"R$ 17.400,00"}
          lastTransaction={"Última entrada dia 13 de abril"}
        />
        <HighlightCard
          type="down"
          title={"Saídas"}
          amount={"R$ 1.259,00"}
          lastTransaction={"Última entrada dia 03 de abril"}
        />
        <HighlightCard
          type="total"
          title={"Total"}
          amount={"R$ 16.141,00"}
          lastTransaction={"1 à 16 de abril"}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}

export default Dashboard;
