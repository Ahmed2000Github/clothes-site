import AnimatedClothes from "@/components/AnimatedClothes";
import ClothesCategory from "@/components/ClothesCategory";
import PremiumFleeceHoodie from "@/components/PremiumFleeceHoodie";
import Image from "next/image";

export default function Home() {

  const imagesToAnimate = [
    "/images/hoodie_1.png",
    "/images/hoodie_2.png",
    "/images/hoodie_3.png",
    "/images/hoodie_4.png",
  ];
  return (
    <div className="font-sans">
      <header className="fixed top-0 left-0 w-full p-4  flex justify-center z-10 px-20">
        <nav className="flex items-center justify-between gap-6  w-full">
          <div className="flex-2">
            <Image src="/Apex.svg" alt="Logo" width={40} height={40} className="h-10 w-10" />
          </div>
          <div className="flex items-center justify-between gap-6 ">
            <a href="#" className="text-gray-800 hover:text-blue-600 font-medium transition">Home</a>
            <a href="#" className="text-gray-800 hover:text-blue-600 font-medium transition">About</a>
            <a href="#" className="text-gray-800 hover:text-blue-600 font-medium transition">Product</a>
            <a href="#" className="text-gray-800 hover:text-blue-600 font-medium transition">Contact</a>
          </div>
          <div className="flex-1">

          </div>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition"
            aria-label="Chat on WhatsApp"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"></svg>
            WhatsApp
          </a>
        </nav>
      </header>
      <main className=" h-[100vh] w-[100vw] ">
        <AnimatedClothes images={imagesToAnimate}/>
        <ClothesCategory  />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
