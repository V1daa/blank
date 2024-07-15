"use client";
import { collection, getDocs } from "firebase/firestore";
import Card from "./(components)/Card";
import { db } from "@/firebase/db";
import { useEffect, useState } from "react";
import { getFirebaseStorageUrl } from "@/lib/firebaseUtils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoaderCircle } from "lucide-react";

interface CardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function Shop() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<CardProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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
        category: data.category,
      };
    });
    return imagesData;
  };

  useEffect(() => {
    setLoading(true);
    const getImages = async () => {
      const data = await fetchImagesData();
      setImages(data);
    };

    getImages();
    setLoading(false);
  }, []);

  const filteredImages = selectedCategory
    ? images.filter((item) => item.category === selectedCategory)
    : images;

  return (
    <div className="w-screen h-auto flex justify-center gap-20 p-20 overflow-scroll">
      <div className="trans w-[300px] h-[400px] sticky top-10 p-5 flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <RadioGroup
            onValueChange={(value) => {
              setSelectedCategory(value);
              console.log(value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mans" id="mans" />
              <label htmlFor="mans">Mans</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="womans" id="womans" />
              <label htmlFor="womans">Womans</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kids" id="kids" />
              <label htmlFor="kids">Kids</label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="w-full h-full flex flex-wrap gap-10">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoaderCircle className="animate-spin" width={100} height={100} />
          </div>
        ) : (
          filteredImages.map((item, i) => (
            <Card
              key={i}
              id={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        )}
      </div>
    </div>
  );
}
