"use client";

import { createContext, useContext } from "react";

const ShopNameContext = createContext<string | null>(null);

export function ShopNameProvider({ shopName, children }: { shopName: string | null; children: React.ReactNode }) {
  return <ShopNameContext.Provider value={shopName}>{children}</ShopNameContext.Provider>;
}

export function useShopName(): string | null {
  return useContext(ShopNameContext);
}
