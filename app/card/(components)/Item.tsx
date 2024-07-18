'use client'
import { Button } from "@/components/ui/button";
import { CardProps } from "@/types/types";
import Image from "next/image";

export default function Item({
  id,
  title,
  description,
  price,
  image,
}: CardProps) {

  const handleClick = () => {
    let value = JSON.parse(localStorage.getItem('cardItems') as string);
    value.splice(id, 1)
    localStorage.setItem('cardItems', JSON.stringify(value))
    location.reload()
  }
    
  return (
    <div>
      <div className="w-[300px] h-auto flex flex-col gap-2 p-5 items-center justify-center trans max-h-[500px]">
        <Image src={image} alt="#" width={200} height={200} />
        <h1 className="text-2xl uppercase line-clamp-1">{title}</h1>
        <h3 className=" line-clamp-2 text-sm text-gray-500">{description}</h3>
        <h3 className="text-red-500 ">{price} zł.</h3>
        <Button variant='destructive'onClick={handleClick}>Delete</Button>
      </div>
    </div>
  );
}
