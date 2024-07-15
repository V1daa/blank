import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-[87vh] flex items-center justify-center">
      <div className="mb-20 flex items-center gap-10">
        <Image src='/p.jpg' alt="#" width={300} height={300} className="rounded-full" />
        <h1 className="text-5xl">Krutyje parni Entertaiment</h1>
      </div>
    </div>
  );
}
