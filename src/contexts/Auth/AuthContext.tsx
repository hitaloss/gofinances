import React from "react";
import { createContext, useState } from "react";
import * as AuthSession from "expo-auth-session";

interface Props {
  children: React.ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  googleRegister(): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: Props) {
  const user: User = {
    id: "123",
    name: "Teste Júnior",
    email: "teste@email.com",
    photo: "https://random.dog/woof",
  };

  const googleRegister = async () => {
    try {
      const CLIENT_ID =
        "11326204084-d3mduas8oalhr8grrrs9n1erkbkvfmmc.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@hitaloss/bluefinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const response = await AuthSession.startAsync({ authUrl });
      console.log(response);
    } catch (error) {
      if (error) {
        throw new Error(error as string);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, googleRegister }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
