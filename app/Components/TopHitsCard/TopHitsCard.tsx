'use client'

import Image from "next/image";
import styles from "./TopHitsCard.module.scss";
import { useRecoilState } from "recoil";
import { musics, mustPlay } from "@/app/states";

export interface Props {
  image: string;
  songTitle: string;
  artistName: string[];
  id: number;
}

const TopHitsCard = (props: Props) => {
  const [musicsIds, setMusicsIds] = useRecoilState(musics);
  const [musttPlay, setMustPlay] = useRecoilState(mustPlay)

  const onPlayClick = () => {
    setMustPlay(false)
    setMusicsIds([props.id])
    setMustPlay(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.artistImg}>
        <img src={props.image} alt="Song Cover" className={styles.artist} width={200} height={200} />
        <Image
          src="./icons/PlayButtonIcon.svg"
          alt="icon"
          className={styles.playButton}
          width={64}
          height={64}
          onClick={onPlayClick}
        />
      </div>
      <div className={styles.twoDiv}>
        <h3>{props.songTitle}</h3>
        <p>{props.artistName}</p>
      </div>
    </div>
  );
};

export default TopHitsCard;
