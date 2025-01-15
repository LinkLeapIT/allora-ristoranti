"use client";

import { ReactNode } from "react";
import { Provider } from 'react-redux';
import AuthProvider from "./contexts/AuthContext";
import { persistor, store } from "@/redux/store";
import { PersistGate } from 'redux-persist/integration/react'

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <AuthProvider>
          {children}
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
