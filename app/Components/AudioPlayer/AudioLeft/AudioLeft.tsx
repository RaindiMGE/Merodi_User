'use client'

import React from 'react'
import Styles from './AudioLeft.module.scss'
import Image from "next/image";
import Icon from '../../IconComponent/IconComponent';

interface Props {
  title: string | undefined;
  artist: string | undefined;
}

const AudioLeft = ({ title, artist }: Props) => {
  return (
    <div className={Styles.content_left}>
      <div className={Styles.top}>
        <h4>{title ? title : ""}</h4>
      </div>
      <p>{artist ? artist : ''}</p>
    </div>
  )
}

export default AudioLeft