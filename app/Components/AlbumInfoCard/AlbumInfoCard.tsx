'use client'

import Image from "next/image"
import AlbumCover from "../AlbumCard/AlbumCover/AlbumCover";
import styles from './AlbumInfoCard.module.scss';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { musics, mustPlay } from "@/app/states";

interface Props {
    albumName: string;
    albumCover: string;
    albumArtist: string;
    description: string;
    releaseDate: string;
    musicsIds: number[]
}

const AlbumInfoCard = (props: Props) => {

    const [isMusicPlaying, setIsMusicPlaying] = useState(false)
    const [isReadMoreClick, setIsReadMoreClick] = useState(false);
    const [musicIds, setMusicIds] = useRecoilState(musics);
    const [musttPlay, setMustPlay] = useRecoilState(mustPlay);

    useEffect(() => {
        for (let i = 0; i < props.musicsIds.length; i++) {
            if (!musicIds.includes(props.musicsIds[i])) {
                const newArray = props.musicsIds.map((item) => item)
                setMusicIds(newArray)
                return;
            }
        }
    })

    useEffect(() => {
        if (isMusicPlaying) {
            setMustPlay(true)
        } else {
            setMustPlay(false)
        }
    }, [isMusicPlaying])

    const readMoreClick = () => {
        setIsReadMoreClick(!isReadMoreClick);
    }

    return <div className={styles.conteiner}>
        <div className={styles.albumCoverWrapper}>
            <AlbumCover
                className={styles.newStyles}
                albumCover={props.albumCover}
                imageClassName={styles.imageClasName}
                discBoxClassName={styles.discBoxClassName}
                discImageClassName={styles.discImageClassName}
                secondaryCoverClassName={styles.secondaryCoverClassName}
            />
        </div>
        <div className={styles.descriptionWrapper}>
            <div className={styles.descriptionBox}>
                <div className={styles.description}>
                    <div className={styles.heading}>
                        <h2>{props.albumName}</h2>
                        <div className={styles.imgWrapper}>
                            <Image className={styles.image} src={`${!isMusicPlaying ? '/images/music/Resume.svg' : '/images/music/Pause.svg'}`} alt={'play icon'} width={48} height={48} onClick={() => setIsMusicPlaying(!isMusicPlaying)} />
                        </div>
                    </div>
                    <p>{props.albumArtist}</p>
                    <span>{props.releaseDate}</span>
                </div>
                <div className={styles.mainDescriptionWrapper}>
                    <span className={isReadMoreClick ? styles.afterShow : styles.mainDescription}>
                        {props.description}
                    </span>
                    <span onClick={readMoreClick} className={styles.readMore} >{isReadMoreClick ? 'Show Less' : 'Read More'}</span>
                </div>
            </div>
        </div>
    </div>
}

export default AlbumInfoCard;