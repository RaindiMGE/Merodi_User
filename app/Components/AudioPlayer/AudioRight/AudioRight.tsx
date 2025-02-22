"use client"

import React, { useEffect, useState } from 'react';
import Styles from './AudioRight.module.scss';
import Image from 'next/image';
import Icon from '../../IconComponent/IconComponent';

interface Props {
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volume: number;
  duration: string | null;
  currentTime: string | undefined;
  handleMuteClick: () => void;
  isMuted: boolean;
}

const AudioRight = ({ handleVolumeChange, volume, duration, currentTime, handleMuteClick, isMuted }: Props) => {
  const volumePercentage = volume * 100;
  const [isVolumeHover, setIsVolumeHover] = useState(false)
  const [isNaN, setIsNaN] = useState(false)

  useEffect(() => {
    if (duration == 'NaN : NaN') setIsNaN(true);
    else setIsNaN(false)
  }, [duration])

  const volumeStyle = `linear-gradient(to right, ${isVolumeHover ? '#F48C06' : '#E4E4E4'} ${volumePercentage}%, #6E6E6E  ${volumePercentage}%)`

  return (
    <div className={Styles.content_right}>
      <p className={Styles.time}><span>{currentTime}</span> / <span>{!isNaN ? duration : '00:00'}</span></p>
      <div className={Styles.volumeWrapper}>
        <Image src={`/icons/${isMuted ? 'muteIcon.svg' : 'volumIcon.svg'}`} alt='mute icon' width={24} height={24} onClick={handleMuteClick} />
        <input
          type="range"
          min="0"
          max="100"
          value={volumePercentage}
          onChange={handleVolumeChange}
          style={{
            background: volumeStyle
          }}
          className={Styles.volumeInput}
          onMouseOver={() => setIsVolumeHover(true)}
          onMouseOut={() => setIsVolumeHover(false)}
        />
      </div>
    </div>
  );
};

export default AudioRight;