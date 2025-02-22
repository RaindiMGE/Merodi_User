"use client"

import React from "react";
import Styles from "./Primarybutton.module.scss"
import {  PrimaryButtonProps } from "@/app/interfaces";

export const PrimaryButton = ({ children, onClick, disabled, styles, type }: PrimaryButtonProps) => {

  return (
    <button 
      className={Styles["primaryButton"] + ' ' + Styles}
      style={styles}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
      disabled={false}
      type={type}
    >
      {children}
    </button>
  );
};