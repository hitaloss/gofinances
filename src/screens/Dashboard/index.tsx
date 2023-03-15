import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useCallback, useState } from "react";
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

import { useFocusEffect } from "@react-navigation/native";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

export interface TransactionCardListProps extends TransactionCardProps {
  id: string;
}

interface highlightProps {
  amount: string;
}

interface HighLightValue {
  entries: highlightProps;
  expenses: highlightProps;
  total: highlightProps;
}

function Dashboard() {
  const [transactionsData, setTransactionsData] = useState<
    TransactionCardListProps[]
  >([]);

  const [highlightValue, setHighlightValue] = useState<HighLightValue>(
    {} as HighLightValue
  );

  const dataKey = "@blufinances:transactions";

  const loadTransactions = async () => {
    const localStorage = await AsyncStorage.getItem(dataKey);
    const transactions = localStorage ? JSON.parse(localStorage) : [];

    let positiveTotal = 0;
    let negativeTotal = 0;

    const transactionsFormatted: TransactionCardListProps[] = transactions.map(
      (item: TransactionCardListProps) => {
        if (item.type === "positive") {
          positiveTotal += Number(item.amount);
        } else {
          negativeTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    setTransactionsData(transactionsFormatted);

    const total = positiveTotal - negativeTotal;

    setHighlightValue({
      entries: {
        amount: positiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expenses: {
        amount: negativeTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

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
          amount={highlightValue.entries.amount}
          lastTransaction={"Última entrada dia 13 de abril"}
        />
        <HighlightCard
          type="down"
          title={"Saídas"}
          amount={highlightValue.expenses.amount}
          lastTransaction={"Última entrada dia 03 de abril"}
        />
        <HighlightCard
          type="total"
          title={"Total"}
          amount={highlightValue.total.amount}
          lastTransaction={"1 à 16 de abril"}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactionsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}

export default Dashboard;
