import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useCallback, useState, useContext } from "react";
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
  LoadContainer,
  PowerBtnIcon,
} from "./styles";

import { useFocusEffect } from "@react-navigation/native";

import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export interface TransactionCardListProps extends TransactionCardProps {
  id: string;
}

interface highlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightValue {
  entries: highlightProps;
  expenses: highlightProps;
  total: highlightProps;
}

function getLastTransactionDate(
  transactions: TransactionCardListProps[],
  type: "positive" | "negative"
) {
  const collectionFilter = transactions.filter((item) => item.type === type);

  if (collectionFilter.length < 1) {
    return 0;
  }

  const lastTransaction = new Date(
    Math.max.apply(
      Math,
      collectionFilter.map((item) => new Date(item.date).getTime())
    )
  );

  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
    "pt-BR",
    {
      month: "long",
    }
  )}`;
}

function Dashboard() {
  const [transactionsData, setTransactionsData] = useState<
    TransactionCardListProps[]
  >([]);
  const [highlightValue, setHighlightValue] = useState<HighLightValue>(
    {} as HighLightValue
  );
  const [loading, setLoading] = useState(true);

  const { user, signOut } = useContext(AuthContext);

  const theme = useTheme();

  const dataKey = `@blufinances:transactions_user${user.id}`;

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

    const lastEntriesDate = getLastTransactionDate(transactions, "positive");
    const lastExpensesDate = getLastTransactionDate(transactions, "negative");
    const totalTimeStamp = `01 a ${lastExpensesDate}`;

    const total = positiveTotal - negativeTotal;

    setHighlightValue({
      entries: {
        amount: positiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastEntriesDate === 0
            ? "Não há transações até o momento"
            : `Última entrada dia ${lastEntriesDate}`,
      },
      expenses: {
        amount: negativeTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastExpensesDate === 0
            ? "Não há transações até o momento"
            : `Última saída dia ${lastExpensesDate}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalTimeStamp,
      },
    });
    setLoading(false);
    // console.log(await AsyncStorage.getItem("@gofinances:user"));
    // console.log(user);
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
      {loading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWraper>
              <GreetingsCard>
                <ProfilePhoto
                  source={{
                    uri: user.photo,
                  }}
                />
                <GreetingsText>
                  <Hello>Olá,</Hello>
                  <UserName>{user.name}</UserName>
                </GreetingsText>
              </GreetingsCard>

              <PowerBtn onPress={signOut}>
                <PowerBtnIcon name="power" />
              </PowerBtn>
            </UserWraper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title={"Entradas"}
              amount={highlightValue.entries.amount}
              lastTransaction={highlightValue.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title={"Saídas"}
              amount={highlightValue.expenses.amount}
              lastTransaction={highlightValue.expenses.lastTransaction}
            />
            <HighlightCard
              type="total"
              title={"Total"}
              amount={highlightValue.total.amount}
              lastTransaction={highlightValue.total.lastTransaction}
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
        </>
      )}
    </Container>
  );
}

export default Dashboard;
