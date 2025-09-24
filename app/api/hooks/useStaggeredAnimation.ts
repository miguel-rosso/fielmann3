'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export const useStaggeredAnimation = (itemCount: number, itemsPerGroup: number = 3, delayBetweenGroups: number = 200) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const resetAnimation = useCallback(() => {
    // Clear existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
    
    // Reset visible items
    setVisibleItems(new Set());
  }, []);

  useEffect(() => {
    // Clear any existing timeouts first
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
    
    // Reset visible items
    setVisibleItems(new Set());
    
    if (itemCount === 0) return;

    const groupCount = Math.ceil(itemCount / itemsPerGroup);

    for (let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
      const timeout = setTimeout(() => {
        setVisibleItems(prev => {
          const newSet = new Set(prev);
          const startIndex = groupIndex * itemsPerGroup;
          const endIndex = Math.min(startIndex + itemsPerGroup, itemCount);
          
          for (let i = startIndex; i < endIndex; i++) {
            newSet.add(i);
          }
          
          return newSet;
        });
      }, groupIndex * delayBetweenGroups + 100); // Small initial delay
      
      timeoutsRef.current.push(timeout);
    }

    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [itemCount, itemsPerGroup, delayBetweenGroups]);

  const getItemClass = useCallback((index: number) => {
    return visibleItems.has(index) ? 'reveal-animation animate-in' : 'opacity-0 translate-y-4';
  }, [visibleItems]);

  return { getItemClass, resetAnimation };
};