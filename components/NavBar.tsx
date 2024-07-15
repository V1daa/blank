import Link from "next/link";

export default function NavBar() {
  return (
    <nav className={`w-full h-auto flex justify-between items-center p-8`}>
      <Link href="/">Home</Link>
      <div className="flex gap-5">
        <Link href="/shop">Shop</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/card">Card</Link>
      </div>
    </nav>
  );
}
