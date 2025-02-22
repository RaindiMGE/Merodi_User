'use client'

import Image from "next/image";
import styles from "./Card.module.scss";
import { useState } from "react";
import AddToPlaylist from "../AddToPlaylistModel/AddToPlaylist";
import { useRecoilState } from "recoil";
import { musics, mustPlay } from "@/app/states";

interface CardProps {
  title: string;
  author: string[];
  imageUrl: string;
  sequence: string;
  duration: string;
  id: number;
}

export default function Card({
  title,
  author,
  imageUrl,
  sequence,
  duration,
  id,
}: CardProps) {

  const [isHover, setIsHover] = useState(false);
  const [musicIds, setMusicIds] = useRecoilState(musics);
  const [musttPlay, setMustPlay] = useRecoilState(mustPlay)
  
  const onPlayClick = () => {
    setMustPlay(false)
    setMusicIds([id]);
    setMustPlay(true)
  }
  
  return (
    <div className={styles.card} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
      <div className={styles.description}>
        <div className={styles.sequenceWrapper}>
          {isHover ? < Image src={'/images/music/Resume.svg'} onClick={onPlayClick} alt="play icon" width={24} height={24} />: 
          <span className={styles.sequence}>{sequence}</span>}
        </div>
        <div className={styles.pictureXtext}>
          <img src={imageUrl} alt={title} className={styles.image} width={48} height={48} />
          <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{author.join()}</p>
          </div>
        </div>
      </div>
      <div className={styles.addToPlaylistWrapper}><AddToPlaylist id={id} playlist={false} playlistId={0} /></div>
      <span className={styles.spanDuration}>{duration}</span>
    </div>
  );
}
