import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "styled-components";

function Routes() {
  const { user, loading } = useContext(AuthContext);

  const theme = useTheme();

  return (
    <NavigationContainer>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </View>
      ) : user.id ? (
        <AppRoutes />
      ) : (
        <AuthRoutes />
      )}
    </NavigationContainer>
  );
}

export default Routes;
