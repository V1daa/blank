import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-[87vh] flex items-center justify-center">
      <div className="mb-20 flex items-center gap-10">
        <div className="max-[990px]:hidden">

        <Image src='/p.jpg' alt="#" width={300} height={300} className="rounded-full"  />
        </div>
        <h1 className="text-5xl text-center">Krutyje parni Entertaiment</h1>
      </div>
    </div>
  );
}
