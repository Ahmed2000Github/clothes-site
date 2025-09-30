"use client";

import Image from "next/image";
import React from "react";
import PremiumFleeceHoodie from "./PremiumFleeceHoodie";

type ClothesCategoryProps = {
  onChange?: (images: string[]) => void;
};
type Category = "MEN" | "WOMEN" | "BOTH";
interface SubCategory {
  name: string;
  image: string;
  variantImages: string[];
}

const ClothesCategory: React.FC<ClothesCategoryProps> = ({ onChange }) => {
    const [activeSubCategory, setActiveSubCategory] = React.useState<string | null>("Jacket");
  const catalog: SubCategory[] = [
    {
      name: "T-Shirt",
      image: "/images/t-shirt.png",
      variantImages: [
        "/images/t-shirt_1.png",
        "/images/t-shirt_2.png",
        "/images/t-shirt_3.png",
        "/images/t-shirt_4.png",
      ],
    },
    {
      name: "Jacket",
      image: "/images/jacket.png",
      variantImages: [
        "/images/hoodie_1.png",
        "/images/hoodie_2.png",
        "/images/hoodie_3.png",
        "/images/hoodie_4.png",
      ],
    },
    {
      name: "Crewneck",
      image: "/images/crewneck.png",
      variantImages: [
        "/images/t-shirt_1.png",
        "/images/t-shirt_2.png",
        "/images/t-shirt_3.png",
        "/images/t-shirt_4.png",
      ],
    },
    {
      name: "Sweatshirt",
      image: "/images/hoodie.png",
      variantImages: [
        "/images/hoodie_1.png",
        "/images/hoodie_2.png",
        "/images/hoodie_3.png",
        "/images/hoodie_4.png",
      ],
    },
    {
      name: "Long Sleeve Tee",
      image: "/images/sleeve.png",
      variantImages: [
        "/images/t-shirt_1.png",
        "/images/t-shirt_2.png",
        "/images/t-shirt_3.png",
        "/images/t-shirt_4.png",
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] =
    React.useState<Category>("MEN");

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const activeClass = (category: Category) =>
    category == selectedCategory ? " bg-white" : "";
  const catecoryClass = "cursor-pointer px-3 py-1 rounded-full ";
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center h-[100vh] w-[100vw] gap-10">
      <div className="flex order-2 sm:order-1 flex-1 h-full items-end">
        <PremiumFleeceHoodie />
      </div>
      <div className="flex-1 order-1 sm:order-2 mt-70 sm:mt-0">
        <div className="w-[85vw] sm:w-120 ml-0 sm:ml-30">
          <div className="flex justify-between items-center rounded-full bg-[#F6F6F6] h-14 p-2 px-10 ">
            <h1
              onClick={() => {
                handleCategoryChange("MEN");
              }}
              className={` ${catecoryClass} ${activeClass("MEN")}`}
            >
              MEN
            </h1>
            <h1
              onClick={() => {
                handleCategoryChange("WOMEN");
              }}
              className={` ${catecoryClass} ${activeClass("WOMEN")}`}
            >
              WOMEN
            </h1>
            <h1
              onClick={() => {
                handleCategoryChange("BOTH");
              }}
              className={` ${catecoryClass} ${activeClass("BOTH")}`}
            >
              BOTH
            </h1>
          </div>
          <br />
          <div className="flex flex-col gap-5 ">
            {catalog.map((subCategory, idx) => (
              <ClothesCategoryItem
                key={subCategory.name + idx}
                subCategory={subCategory}
                    activeClassName={`${subCategory.name === activeSubCategory ? 'from-[#004D3B]' : 'from-[#C9C9C9]'}`}
                onClick={(images) => {
                  onChange && onChange(images);
                  setActiveSubCategory(subCategory.name);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

type ClothesCategoryItemProps = {
  subCategory: SubCategory;
  activeClassName?: string;
  onClick?: (images: string[]) => void;
};

const ClothesCategoryItem: React.FC<ClothesCategoryItemProps> = ({
  subCategory,
    activeClassName = "",
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick && onClick(subCategory.variantImages)}
    >
      <div className={`flex h-14 rounded-full p-[2px] pl-[2px] bg-gradient-to-r ${activeClassName}  via-[#8F8F8F12] to-transparent hover-scale cursor-pointer `}>
        <div className="flex rounded-full bg-white w-full h-full">
          <div className="flex justify-center items-center cursor-pointer  rounded-full">
            <Image
              src={subCategory.image}
              alt={subCategory.name}
              width={100}
              height={100}
              className="h-12 w-25"
            />
            <h2 className="text-lg font-semibold">{subCategory.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothesCategory;
