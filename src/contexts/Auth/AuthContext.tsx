import React from "react";
import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext([]);

function AuthProvider({ children }: Props) {
  return <AuthContext.Provider value={[]}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
