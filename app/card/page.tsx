"use client";
import { Button } from "@/components/ui/button";
import Item from "./(components)/Item";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/db";
import { getFirebaseStorageUrl } from "@/lib/firebaseUtils";
import { useEffect, useState } from "react";
import { CardProps } from "@/types/types";

export default function Card() {
  const [images, setImages] = useState<CardProps[]>([]);

  const fetchImagesData = async () => {
    const itemsArray = JSON.parse(localStorage.getItem("cardItems") as string);
    const querySnapshot = await getDocs(
      query(
        collection(db, "products"),
        where("id", "in", Array.from(new Set(itemsArray)))
      )
    );
    const imagesDataMap = querySnapshot.docs.reduce((acc: any, doc) => {
      const data = doc.data();
      acc[data.id] = {
        id: data.id,
        title: data.title,
        image: getFirebaseStorageUrl(data.image),
        price: data.price,
        description: data.description,
        category: data.category,
      };
      return acc;
    }, {});

    const imagesData = itemsArray.map((id: string) => imagesDataMap[id]);
    return imagesData;
  };

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchImagesData();
      setImages(data);
    };

    getImages();
  }, []);

  return (
    <div className="w-full h-[87vh] flex items-center justify-center">
      <div className="w-[80%] h-[90%] trans overflow-scroll p-10 flex flex-col items-center justify-end">
        <div className="w-full h-5/6 overflow-scroll p-10 flex gap-10 flex-wrap">
          {images.map((image, index) => (
            <Item
              key={index}
              id={index.toString()}
              title={image.title}
              description={image.description}
              price={image.price}
              image={image.image}
              category={image.category}
            />
          ))}
        </div>
        <div className="w-full h-[1px] bg-black opacity-50"></div>
        <div className="w-full h-1/6 flex items-center justify-between">
          <h1>
            <strong>Total:</strong>{" "}
            {images.reduce((total, item) => total + +item.price, 0)} zł.
          </h1>
          <Button
            onClick={() => {
              console.log(images);
            }}
          >
            Purchase
          </Button>
        </div>
      </div>
    </div>
  );
}
