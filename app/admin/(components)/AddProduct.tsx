"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { db, storage } from "@/firebase/db";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { ArrowUpFromLine, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialValues = {
  title: "",
  description: "",
  image: "",
  price: 0,
  category: "mans",
};

export default function AddProduct() {
  const [activeAddProduct, setActiveAddProduct] = useState(false);
  const [icon, setIcon] = useState<string | null>();
  const [formValues, setFormValues] = useState(initialValues);
  const [image, setImage] = useState<File | undefined>(undefined);
  const { toast } = useToast();

  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleClick = async (e: any) => {
    let uniqueId = uuidv4();
    let imageUrl = `images/${uniqueId}/${image?.name}`;

    try {
      const docRef = await addDoc(collection(db, "products"), {
        id: uuidv4(),
        title: formValues.title,
        description: formValues.description,
        price: formValues.price,
        image: imageUrl,
        category: formValues.category,
      });

      let storageRef = ref(storage, imageUrl);
      //@ts-ignore
      uploadBytes(storageRef, image);
      toast({
        title: "Item added",
        description: `Good work`,
      });
      setFormValues(initialValues);
      setIcon(undefined);
    } catch (error) {
      toast({
        title: "Error while adding an item",
        variant: "destructive",
        description: "Summon Dimasik the programmer",
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className="w-full trans h-20 flex items-center justify-between p-5 cursor-pointer"
        onClick={() => setActiveAddProduct(!activeAddProduct)}
      >
        <h1>Add Product</h1>
        <ChevronDown
          className={` transition-all ${activeAddProduct ? " rotate-180" : ""}`}
        />
      </div>
      <div
        className={`${
          activeAddProduct ? "" : "hidden"
        } w-full h-auto trans p-10 flex flex-wrap items-center justify-center gap-10`}
      >
        <label htmlFor="add-image">
          {icon ? (
            <Image src={`${icon}`} alt="" width={150} height={150} />
          ) : (
            <ArrowUpFromLine
              className="rounded-xl border-dotted border-2 border-black cursor-pointer"
              height={150}
              width={150}
            />
          )}
          <input
            id="add-image"
            type="file"
            className=" opacity-0 h-0 absolute"
            onChange={(e) => {
              if (e.target.files) {
                setIcon(URL.createObjectURL(e.target.files[0]));
                setImage(e.target.files[0]);
              }
            }}
          />
        </label>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Add Title..."
            className="border-dotted border-2 border-black p-2 rounded-xl"
            name="title"
            onChange={(e) => handleChange(e)}
            value={formValues.title}
          />
          <select
            name="category"
            id="category"
            value={formValues.category}
            onChange={(e) => handleChange(e)}
            className="bg-white border-dotted border-2 border-black p-2 rounded-xl"
          >
            <option value="mans">Man</option>
            <option value="kids">Kid</option>
            <option value="womans">Woman</option>
          </select>
        </div>
        <input
          type="number"
          placeholder="Add Price..."
          className="border-dotted border-2 border-black p-2 rounded-xl"
          min={0}
          name="price"
          value={formValues.price}
          onChange={(e) => handleChange(e)}
        />
        <textarea
          placeholder="Add Description..."
          className="border-dotted border-2 border-black p-2 rounded-xl"
          name="description"
          value={formValues.description}
          onChange={(e) => handleChange(e)}
        />
        <Button variant="default" onClick={handleClick}>
          Add product
        </Button>
      </div>
    </div>
  );
}
