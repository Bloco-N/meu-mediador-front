import { useState, useEffect } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      setIsMobile(window.innerWidth < 768);
  }, []);

  return isMobile;
}