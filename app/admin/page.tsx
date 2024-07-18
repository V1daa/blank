"use client";
import { useEffect } from "react";
import AddProduct from "./(components)/AddProduct";
import ListAllProducts from "./(components)/ListAllProducts";

export default function Admin() {
  useEffect(() => {
    if (!localStorage.getItem("adminAuth")) {
      localStorage.setItem("adminAuth", "false");
    }

    if (localStorage.getItem("adminAuth") !== "true") {
      location.replace("/adminAuth");
    }
  }, []);

  return (
    <div className="w-screen h-full flex items-center justify-center p-20">
      <div className="w-full h-full trans overflow-scroll rounded-md p-10 flex flex-col gap-10">
        <AddProduct />
        <ListAllProducts />
      </div>
    </div>
  );
}
