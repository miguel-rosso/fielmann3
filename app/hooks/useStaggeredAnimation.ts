'use client';

import { useEffect, useState } from 'react';

export const useStaggeredAnimation = (itemCount: number, delayBetweenItems: number = 150) => {
  const [animatedItems, setAnimatedItems] = useState(new Set<number>());

  useEffect(() => {
    // Reset animation state
    setAnimatedItems(new Set());
    
    if (itemCount === 0) return;

    const timeouts: NodeJS.Timeout[] = [];

    // Animate items in groups of 3 to reduce visual chaos
    const groupSize = 3;
    const groupCount = Math.ceil(itemCount / groupSize);

    for (let group = 0; group < groupCount; group++) {
      const timeout = setTimeout(() => {
        setAnimatedItems(prev => {
          const newSet = new Set(prev);
          for (let i = 0; i < groupSize; i++) {
            const itemIndex = group * groupSize + i;
            if (itemIndex < itemCount) {
              newSet.add(itemIndex);
            }
          }
          return newSet;
        });
      }, group * delayBetweenItems);
      
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [itemCount, delayBetweenItems]);

  const getItemClass = (index: number): string => {
    return animatedItems.has(index) 
      ? 'opacity-100 transform transition-all duration-600 ease-out' 
      : 'opacity-0 transform translate-y-4 transition-all duration-600 ease-out';
  };

  return { getItemClass };
};