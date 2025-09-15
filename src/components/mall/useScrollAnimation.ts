/* eslint-disable prettier/prettier */
import { useState, useEffect, useRef, RefObject } from 'react';

export const useScrollAnimation = (cardsRef: RefObject<HTMLDivElement[]>) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !sectionRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, -containerRect.top);
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate if section should be sticky
      const shouldBeSticky = containerRect.top <= 0 && containerRect.bottom > windowHeight;
      setIsSticky(shouldBeSticky);

      // Calculate current card based on scroll progress
      if (cardsRef.current && cardsRef.current.length > 0) {
        const totalCards = cardsRef.current.length;
        const cardProgress = scrollProgress / (containerHeight - windowHeight);
        const normalizedProgress = Math.min(Math.max(cardProgress, 0), 1);
        const newCurrentCard = Math.floor(normalizedProgress * totalCards);
        
        setCurrentCard(Math.min(newCurrentCard, totalCards - 1));
        setScrollProgress(normalizedProgress);

        // Update card visibility and transforms
        cardsRef.current.forEach((card, index) => {
          if (card) {
            const cardProgress = (normalizedProgress * totalCards) - index;
            const opacity = Math.max(0, Math.min(1, 1 - Math.abs(cardProgress - 0.5)));
            const scale = 0.8 + (0.2 * opacity);
            const translateY = cardProgress * 50;
            
            card.style.opacity = opacity.toString();
            card.style.transform = `translateY(${translateY}px) scale(${scale})`;
            card.style.zIndex = index === Math.floor(normalizedProgress * totalCards) ? '10' : '1';
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cardsRef]);

  return { currentCard, isSticky, containerRef, sectionRef, scrollProgress };
};
