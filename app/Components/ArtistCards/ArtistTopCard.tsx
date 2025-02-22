'use client'

import React, { useEffect, useState } from 'react';
import Styles from './ArtistTopCard.module.scss';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { musics, mustPlay } from '@/app/states';

interface Props {
  image: string;
  artist_name: string,
  follow_count: string,
  description: string;
  musicsIds: number[];
}

const ArtistTopCard = ({ image, artist_name, description, musicsIds }: Props) => {
  const [readMore, setReadMore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicIds, setMusicsIds] = useRecoilState(musics);


  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleReadMoreClick = () => {
    setReadMore(!readMore);
  }

  const [musttPlay, setMustPlay] = useRecoilState(mustPlay);

  useEffect(() => {
    for (let i = 0; i < musicIds.length; i++) {
      if (!musicsIds.includes(musicIds[i])) {
        const newArray = musicIds.map((item) => item)
        setMusicsIds(newArray)
        return;
      }
    }
  })

  useEffect(() => {
    if (isPlaying) {
      setMustPlay(true)
    } else {
      setMustPlay(false)
    }
  }, [isPlaying])

  return (
    <div className={Styles.mainContent}>
      <div className={Styles.artistImage}>
        <img
          className={Styles.image}
          src={image}
          alt='ArtistImage'
          width={288}
          height={288}
        />
      </div>
      <div className={Styles.mainArtistInfo}>
        <div className={Styles.mainContentWrapper}>
          <div className={Styles.artistName}>
            <h1>{artist_name}</h1>

            <div className={Styles.iconWrapper}>
              <Image className={Styles.image} src={`${!isPlaying ? '/images/music/Resume.svg' : '/images/music/Pause.svg'}`} alt={'play icon'} width={48} height={48} onClick={togglePlayPause} />
            </div>
          </div>
          <div className={Styles.mainDescriptionWrapper}>
            <p className={readMore ? Styles.afterShow : Styles.mainDescription}>{description}</p>
            <span onClick={handleReadMoreClick} className={Styles.readMore}>{readMore ? 'Show Less' : 'Read More'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistTopCard;