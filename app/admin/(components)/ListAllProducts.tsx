"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase/db";
import {
  deleteDocumentFromFirestore,
  deleteFileFromStorage,
  getFirebaseStorageUrl,
} from "@/lib/firebaseUtils";
import { collection, getDocs } from "firebase/firestore";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}
export default function ListAllProducts() {
  const [active, setActive] = useState(false);
  const [images, setImages] = useState<CardProps[]>([]);

  const fetchImagesData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const imagesData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        image: getFirebaseStorageUrl(data.image),
        price: data.price,
        description: data.description,
      };
    });
    return imagesData;
  };

  const deleteImageAndDocument = async (
    url: string,
    collection: string,
    documentId: string
  ): Promise<void> => {
    await deleteFileFromStorage(url);
    await deleteDocumentFromFirestore(collection, documentId);
    location.reload();
  };

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchImagesData();
      setImages(data);
    };

    getImages();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div
        className="w-full trans h-20 flex items-center justify-between p-5 cursor-pointer"
        onClick={() => setActive(!active)}
      >
        <h1>List of All products</h1>
        <ChevronDown
          className={` transition-all ${active ? " rotate-180" : ""}`}
        />
      </div>
      <div
        className={`${
          active ? "" : "hidden"
        } w-full h-auto p-10 flex items-center justify-center gap-10 flex-wrap`}
      >
        {images.map((item) => (
          <div
            className="flex flex-col gap-2 w-[300px] h-auto items-center justify-center trans p-5"
            key={item.id}
          >
            <Image src={item.image} alt="#" width={200} height={200} />
            <h1 className="uppercase">{item.title}</h1>
            <h3 className="text-sm text-gray-500">{item.description}</h3>
            <h3 className="text-red-500">{item.price} zł.</h3>
            <div className="flex gap-5 items-center justify-center">
              <Button
                variant="destructive"
                onClick={() =>
                  deleteImageAndDocument(item.image, "products", item.id)
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
