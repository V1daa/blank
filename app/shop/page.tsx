"use client";
import { collection, getDocs } from "firebase/firestore";
import Card from "./(components)/Card";
import { db } from "@/firebase/db";
import { useEffect, useState } from "react";
import { getFirebaseStorageUrl } from "@/lib/firebaseUtils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoaderCircle } from "lucide-react";
import { CardProps } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function Shop() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<CardProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999);

  const fetchImagesData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const imagesData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
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
    if (!localStorage.getItem("cardItems")) {
      localStorage.setItem("cardItems", JSON.stringify([]));
    }

    getImages();
    setLoading(false);
  }, []);

  let filteredImages = selectedCategory
    ? images.filter((item) => item.category === selectedCategory)
    : images;

  if (minPrice || maxPrice !== 99999) {
    filteredImages = filteredImages.filter(
      (item) => item.price <= maxPrice && item.price >= minPrice
    );
  }
  return (
    <div className="w-screen h-auto flex justify-center gap-20 p-20 overflow-scroll">
      <div className="trans w-[300px] h-auto sticky top-10 p-5 flex flex-col gap-4">
        <h1>Select a category</h1>
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
        <h1>Set minimal price</h1>
        <input
          type="number"
          min={0}
          name="minValue"
          id="minValue"
          max={maxPrice - 1}
          onChange={(e) => setMinPrice(+e.target.value)}
          value={minPrice}
          className="p-2 border-2 border-black border-dotted rounded-xl"
        />
        <h1>Set maximal price</h1>
        <input
          type="number"
          name="maxValue"
          id="maxValue"
          min={minPrice + 1}
          onChange={(e) => setMaxPrice(+e.target.value)}
          value={maxPrice}
          className="p-2 border-2 border-black border-dotted rounded-xl"

        />
        <Button
          onClick={() => {
            setSelectedCategory("");
            setMinPrice(0);
            setMaxPrice(99999);
          }}
        >
          Clear Filters
        </Button>
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
              category={item.category}
            />
          ))
        )}
      </div>
    </div>
  );
}
