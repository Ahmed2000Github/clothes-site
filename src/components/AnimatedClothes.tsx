'use client'

import { useColorExtractor } from '@/utils/colorExtractor';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

interface AnimatedClothesProps {
    images?: string[];
}

const AnimatedClothes: React.FC<AnimatedClothesProps> = ({ images = [] }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const [dominantColors, setDominantColors] = useState<Record<number, string>>({});
    const { extractDominantColor } = useColorExtractor();

    useEffect(() => {
        console.log("Images updated:");
        
        const extractColorForCurrentImage = async () => {
            console.log('Extracting color for image index:', currentImageIndex);
            
            if (images.length === 0 || dominantColors[currentImageIndex]) return;

            try {
                const color = await extractDominantColor(images[currentImageIndex]);
                console.log('Extracted color:', color);
                
                setDominantColors(prev => ({
                    ...prev,
                    [currentImageIndex]: color
                }));
            } catch (error) {
                console.error('Failed to extract color:', error);
            }
        };

        extractColorForCurrentImage();
    }, [currentImageIndex, images, extractDominantColor, dominantColors]);
    useEffect(() => {
       setDominantColors({});
    }, [images]);

    const handleAnimationIteration = useCallback(() => {
        if (images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            )
        }
    }, [images.length])

    const currentColor = dominantColors[currentImageIndex] || '#DD0000088';


    if (images.length === 0) return null
    return (
        <div className="fixed w-[65vw] h-[65vw]  top-0 left-0 rounded-full translate-x-[-50%] translate-y-[-50%] duration-3000 animate-slow-spin "
            style={{ backgroundColor: currentColor }}
            onAnimationIteration={handleAnimationIteration}>
            <div className="fixed bottom-0 right-0 translate-x-[25%] translate-y-[25%] w-[55%] h-[30%]">
                <Image src={images[currentImageIndex]}
                    alt={`Clothes ${currentImageIndex + 1}`} width={700} height={400} className="" />
            </div>
        </div>
    );
};

export default AnimatedClothes;