'use client'

import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { useRecoilState } from "recoil";
import { burgerMenu } from "@/app/states";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import Image from "next/image";

interface Props {
  placeholder: string;
  onChange?: () => void;
}

const Search = (props: Props) => {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [searchQuery, setSearchQuery] = useState<string>()
  const [showNavBar, setShowNavBar] = useRecoilState(burgerMenu)
  const [isMobile, setIsMobile] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false) 

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    if(typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if(typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  
  const onClick = () => {
    if (width < 768) {
      setShowNavBar(false)
      setIsMobile(true)
    }
  };

  if (width > 767 && isMobile) setIsMobile(false);

  const onCloseClick = () => {
    setIsMobile(false);
    setShowNavBar(true);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setShowSearchDropdown(false)
    }
  };

  const handleClickInside = () => {
    setShowSearchDropdown(true)
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}
      ref={wrapperRef}
      onClick={handleClickInside} >
      {isMobile && <Image
        src="./icons/Close.svg"
        alt="close icon"
        onClick={onCloseClick}
        width={12}
        height={12}
      />}
      <div className={styles.inputWrapper} onFocus={() => setShowSearchDropdown(true)} style={{
        backgroundColor: `${isMobile ? '#191d29' : ''}`
      }}>
        <Image src="/icons/search-icon.svg" alt="searchbox" onClick={onClick} width={24} height={24} />
        <input
          type="search"
          placeholder={props.placeholder}
          className={styles.input}
          onChange={onSearchChange}
          style={{
            display: `${isMobile ? "block" : ""}`,
          }}
          
        />
      </div>
      {showSearchDropdown && <div className={styles.searchDropdown}>
        <SearchDropdown searchQuery={searchQuery} />
      </div>}
    </div>
  );
};

export default Search;