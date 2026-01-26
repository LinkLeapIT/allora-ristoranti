"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./context/auth";
import { Provider } from "react-redux";
import { store } from "./store/store";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
