//@ts-nocheck
'use client'
import { createContext, useEffect, useState } from "react";

export const CardContext = createContext(null);

interface ShopInterface {
    addToCard: () => void;
    num: number;
}

const ShopContextProvider = (props: React.ReactNode) => {
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    let arr = JSON.parse(localStorage.getItem("cardItems") as string);
    setNum(arr.length)

  },[])

  const addToCard = () => {
    let arr = JSON.parse(localStorage.getItem("cardItems") as string);
    setNum(arr.length);
  };

  const contextValue: ShopInterface = {
    addToCard,
    num,
  };

  return (
    <CardContext.Provider value={contextValue}>
      {props.children}
    </CardContext.Provider>
  );
};

export default ShopContextProvider;
