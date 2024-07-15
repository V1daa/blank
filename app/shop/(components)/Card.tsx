"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function Card({
  id,
  title,
  description,
  price,
  image,
}: CardProps) {
  return (
    <div className="w-[300px] h-auto flex flex-col gap-2 p-5 items-center justify-center trans max-h-[500px]">
      <Image src={image} alt="#" width={200} height={200} />
      <h1 className="text-2xl uppercase line-clamp-1">{title}</h1>
      <h3 className=" line-clamp-2 text-sm text-gray-500">{description}</h3>
      <h3 className="text-red-500 ">{price} zł.</h3>
      <Button onClick={() => console.log(id)}>Buy</Button>
    </div>
  );
}
