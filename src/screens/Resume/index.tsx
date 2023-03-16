import React from "react";
import HistoryCard from "../../components/HistoryCard";
import { Container, Header, Title } from "./styles";

function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard title="Compas" amount="R$ 150,80" color="red" />
    </Container>
  );
}

export default Resume;
