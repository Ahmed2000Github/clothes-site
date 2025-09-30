"use client"


import AnimatedClothes from "@/components/AnimatedClothes";
import ClothesCategory from "@/components/ClothesCategory";
import Image from "next/image";
import React from "react";

export default function Home() {
  const initialImages = [
    "/images/hoodie_1.png",
    "/images/hoodie_2.png",
    "/images/hoodie_3.png",
    "/images/hoodie_4.png",
  ];
  const [currentImages, setCurrentImages] = React.useState<string[]>(initialImages);


  return (
    <div className="font-sans">
      <head>
        <title>Apex</title>
      </head>
      <header className="fixed top-0 left-0 w-full p-4  flex justify-center z-10 px-5 sm:px-20">
        <nav className="flex items-center justify-between gap-6  w-full">
          <div className="flex-2">
            <Image src="/Apex.svg" alt="Logo" width={100} height={100} className="h-25 w-25" />
          </div>
          <div className="flex items-center justify-between gap-6 ">
            <a href="#" className="text-gray-800 hover:bg-[#004D3B]  hidden sm:block font-medium transition">Home</a>
            <a href="#" className="text-gray-800 hover:bg-[#004D3B] hidden sm:block font-medium transition">About</a>
            <a href="#" className="text-gray-800 hover:bg-[#004D3B] hidden sm:block font-medium transition">Product</a>
          </div>
          <div className="flex-1">

          </div>
          <button className=" hidden sm:block px-6 py-2 bg-[#004D3B] cursor-pointer text-sm text-white rounded-xl font-semibold  transition">
            CONTACT US
          </button>
          <button className="sm:hidden flex items-center px-3 py-2 border rounded text-white bg-[#004D3B] hover:bg-[#004D3B] cursor-pointer" aria-label="Open menu">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>
      <main className=" h-[100vh] w-[100vw] ">
        <AnimatedClothes images={currentImages}/>
        <ClothesCategory onChange={setCurrentImages}  />
      </main>
    </div>
  );
}
