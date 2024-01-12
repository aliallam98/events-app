"use client";

import { useState, useEffect } from "react";


const NavbarScroll = (startPoint = 10) => {
    const [isScroll,setIsScroll] = useState<boolean>(false)
    useEffect(()=>{
      const onScrollHandler = ()=>{
        if(window.scrollY > startPoint){
          setIsScroll(true)
        }else{
          setIsScroll(false)
        }

      }
      window.addEventListener("scroll",onScrollHandler)
      return ()=> window.removeEventListener("scroll",onScrollHandler)
    },[startPoint])
    return isScroll
  
}


export default NavbarScroll;


