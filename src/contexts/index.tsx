import React from "react";
import AuthProvider from "./Auth/AuthContext";

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;
