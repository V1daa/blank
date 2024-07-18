"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CardContext } from "@/context/cardContext";
import { CardProps } from "@/types/types";
import Image from "next/image";
import { useContext } from "react";

export default function Card({
  id,
  title,
  description,
  price,
  image,
}: CardProps) {
  //@ts-ignore
  const { addToCard } = useContext(CardContext);
  const { toast } = useToast();

  const handleBuy = () => {
    let cardItems = JSON.parse(localStorage.getItem("cardItems") as string);
    cardItems.push(id);
    localStorage.setItem("cardItems", JSON.stringify(cardItems));
    addToCard();
  };
  return (
    <div className="w-[300px] h-auto flex flex-col gap-2 p-5 items-center justify-center trans max-h-[500px]">
      <Image src={image} alt="#" width={200} height={200} />
      <h1 className="text-2xl uppercase line-clamp-1">{title}</h1>
      <h3 className=" line-clamp-2 text-sm text-gray-500">{description}</h3>
      <h3 className="text-red-500 ">{price} zł.</h3>
      <Button
        onClick={() => {
          toast({
            variant: "default",
            title: "Item added to card",
            description: `To procide to payment go to card component`,
          });
          handleBuy();
        }}
      >
        Buy
      </Button>
    </div>
  );
}
