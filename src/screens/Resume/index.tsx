import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import HistoryCard from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelector,
  MonthAction,
  Month,
  Icon,
  LoadContainer,
} from "./styles";
import { TransactionCardListProps } from "../Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";

interface CategoryProps {
  key: string;
  name: string;
  total: number;
  totalCurrency: string;
  color: string;
  percent: string;
}

function Resume() {
  const [categoriesTotal, setCategoriesTotal] = useState<CategoryProps[]>([]);
  const [dateFocus, setDateFocus] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const handleChangeDate = (action: "next" | "previous") => {
    if (action === "next") {
      setDateFocus(addMonths(dateFocus, 1));
    } else {
      setDateFocus(subMonths(dateFocus, 1));
    }
  };

  const loadData = async () => {
    setLoading(true);
    const dataKey = "@blufinances:transactions";
    const storage = await AsyncStorage.getItem(dataKey);
    const storageFormatted = storage ? JSON.parse(storage) : [];

    const expenses = storageFormatted.filter(
      (item: TransactionCardListProps) =>
        item.type === "negative" &&
        new Date(item.date).getMonth() === dateFocus.getMonth() &&
        new Date(item.date).getFullYear() === dateFocus.getFullYear()
    );

    const expensesTotal = expenses.reduce(
      (acc: number, elem: TransactionCardListProps) => {
        return acc + Number(elem.amount);
      },
      0
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

        const percent = `${((categorySum / expensesTotal) * 100).toFixed(0)}%`;

        categoryTotal.push({
          key: category.key,
          name: category.name,
          color: category.color,
          totalCurrency: total,
          total: categorySum,
          percent: percent,
        });
      }
    });
    setCategoriesTotal(categoryTotal);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [dateFocus])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {loading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelector>
            <MonthAction onPress={() => handleChangeDate("previous")}>
              <Icon name="chevron-left" />
            </MonthAction>

            <Month>{format(dateFocus, "MMMM, yyyy", { locale: ptBR })}</Month>

            <MonthAction onPress={() => handleChangeDate("next")}>
              <Icon name="chevron-right" />
            </MonthAction>
          </MonthSelector>

          <ChartContainer>
            <VictoryPie
              data={categoriesTotal}
              x="percent"
              y="total"
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              colorScale={categoriesTotal.map((item) => item.color)}
            />
          </ChartContainer>
          {categoriesTotal.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalCurrency}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}

export default Resume;
