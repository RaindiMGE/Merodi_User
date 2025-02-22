'use client'

import React from "react";
import Styles from "./AudioMiddle.module.scss";
import Image from "next/image";
import Icon from "../../IconComponent/IconComponent";

interface Props {
  togglePlayPause: () => void;
  isPlaying: boolean;
  playNext: () => void;
  playPrev: () => void;
  onRepeatClick: () => void;
  isRepeatClick: boolean;
  isUndefinedMusic: boolean;
}

const AudioMiddle = ({ togglePlayPause, isPlaying, playNext, playPrev, onRepeatClick, isRepeatClick, isUndefinedMusic }: Props) => {
  return (
    <div style={{
    }} className={Styles.content_middle}>
      <Image
        className={Styles.Shuffle}
        src={"/images/music/Shuffle.svg"}
        alt="Shuffle"
        width={24}
        height={24}
      />
      <Image
        src={"/images/music/PlayNext.svg"}
        alt="PlayNext"
        width={32}
        height={32}
        onClick={playPrev}
        className={Styles.playPrewIcon}
      />
      <div className={Styles.pause_button_container} onClick={isUndefinedMusic ? () => {} :togglePlayPause}>
          {!isPlaying ? (
        <Image
          src={"/images/music/Resume.svg"}
          alt={"PlayReverse"}
          width={48}
          height={48}
          className={Styles.resumeIcon}
        />
        ) : (
        <div className={Styles.resume}>
          <Image
            src={"/images/music/Pause.svg"}
            alt={"Pause"}
            width={48}
            height={48}
            className={Styles.pauseIcon}
          />
        </div>
        )}
      </div>
      <Image
        src={"/images/music/PlayRev.svg"}
        alt={"PlayReverse"}
        width={32}
        height={32}
        onClick={playNext}
        className={Styles.playNextIcon}
      />
      <div onClick={onRepeatClick}>
        {isRepeatClick ? 
          <Image src={"/icons/clickedRepeatIcon.svg"} alt={"Repeat"} width={24} height={24} /> :
          <Image src={"/icons/defaultRepeatIcon.svg"} alt={"repeat"} width={24} height={24} />
        }
      </div>
    </div>
  );
};

export default AudioMiddle;
