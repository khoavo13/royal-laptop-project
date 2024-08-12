import { Fab } from '@mui/material';
import React, { useEffect, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Hàm để cuộn lên đầu trang
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    // Theo dõi vị trí cuộn trang
    useEffect(() => {
      const toggleVisibility = () => {
        console.log(window.scrollY)
        if (window.scrollY >= 400) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener('scroll', toggleVisibility);
  
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    return (
      <>
        {isVisible && (
          <Fab
            color="primary"
            size="medium"
            onClick={scrollToTop}
            style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        )}
      </>
    );
}
