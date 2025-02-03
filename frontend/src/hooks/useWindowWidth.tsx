import { useState, useEffect } from 'react';

function useWindowWidth(): boolean {
  const [width, setWidth] = useState(window.innerWidth);

  const isMobile = width < 1025; // iPad width

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

export { useWindowWidth };