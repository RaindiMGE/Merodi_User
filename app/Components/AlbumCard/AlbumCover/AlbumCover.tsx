'use client'

import React from 'react'
import styles from './AlbumCover.module.scss'
import Image from 'next/image';

interface Props {
    className?: string;
    imageClassName?: string;
    discBoxClassName?: string;
    discImageClassName?: string;
    secondaryCoverClassName?: string;
    albumCover: string;
}

const AlbumCover = (props: Props) => {
    return <div className={styles.container}>
        <div className={`${props.className ? props.className : styles.albumCover}`}>
            <img className={`${props.imageClassName ? props.imageClassName : styles.mainAlbumCover}`} style={{
                borderRadius: '12px'
            }} src={props.albumCover} width={props.imageClassName ? 308 : 164} height={props.imageClassName ? 308 : 164} alt="Album Cover" />
            <div className={`${props.discBoxClassName ? props.discBoxClassName : styles.discBox}`}>
                <img src={props.albumCover} alt="Album Cover" width={props.secondaryCoverClassName ? 108 : 58} height={props.secondaryCoverClassName ? 108 : 58} className={props.secondaryCoverClassName ? props.secondaryCoverClassName : styles.secondaryAlbumCover} />
                <Image src="/discImg.svg" alt="disc img" width={props.discImageClassName ? 280 : 150} height={props.discImageClassName ? 280 : 150} className={props.discImageClassName ? props.discImageClassName : styles.discImg} />
            </div>
        </div>
    </div>
}

export default AlbumCover;