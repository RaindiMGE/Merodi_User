"use client";

import React, { useState, useRef, useEffect } from "react";
import Styles from "./AudioPlayer.module.scss";
import Image from "next/image";
import AudioLeft from "../AudioLeft/AudioLeft";
import AudioMiddle from "../AudioMiddle/AudioMiddle";
import AudioRight from "../AudioRight/AudioRight";
import { ArtistInfo } from "@/app/(authorized)/artist/page";
import { useRecoilState } from "recoil";
import axios from "axios";
import { getCookie } from "@/helpers/cookies";
import { musics, mustPlay } from "@/app/states";

export interface MusicInfo {
  id: number;
  name: string;
  duration: number;
  fileUrl: string;
  music: string;
  playCount: number;
  authors: ArtistInfo[];
  file: File;
  imageUrl: string;
  albumId: number;
}

interface File {
  id: number;
  url: string;
}

export const AudioPlayer = () => {
  const [isRangeHover, setIsRangeHover] = useState(false);
  const [duration, setDuration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('0:00');
  const [playedPercentage, setPlayedPercentage] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeatClick, setIsRepeatClick] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isUndefinedMusic, setIsUndefined] = useState(false);
  const [isNewMusic, setIsNewMusic] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const [music, setMusic] = useState<MusicInfo | undefined>();
  const [file, setFile] = useState<File | null>();
  const [musicsIds, setMusicsIds] = useRecoilState(musics);
  const [musttPlay, setMustPlay] = useRecoilState(mustPlay);
  const [forRefresh, setForRefresh] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null);
  const token = getCookie('token');

  const getMusic = async (id: number) => {
    setIsUndefined(true);
    try {
      const response = await axios.get(`https://merodibackend-2.onrender.com/music/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMusic(response.data);
      const file = response.data;
      getMusicFile(file.file.id);
    } catch (err) {

    }
  };

  const getMusicFile = async (id: number) => {
    try {
      const response = await axios.get(`https://merodibackend-2.onrender.com/files/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFile(response.data);
      setIsUndefined(false)
      setForRefresh(!forRefresh)
      setMustPlay(true)
    } catch (err) {

    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (musttPlay) audio.pause();
      else audio.play();
      setMustPlay(!musttPlay)
    }
  };

  const playNextTrack = () => {
    const audio = audioRef.current;
    const nextIndex = currentTrackIndex === musicsIds.length - 1 ? 0 : currentTrackIndex + 1;
    setCurrentTrackIndex(nextIndex);
    setIsNewMusic(false);
    getMusic(musicsIds[nextIndex]);
    setMustPlay(!true)
    if (isRepeatClick) setIsRepeatClick(false)
    if (audio) audio.pause()
  };

  useEffect(() => {
    setFile(null)
  }, [musicsIds])

  const playPrevTrack = () => {
    const audio = audioRef.current;
    const prevIndex = currentTrackIndex === 0 ? musicsIds.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setIsNewMusic(false);
    getMusic(musicsIds[prevIndex]);
    setMustPlay(!true)
    if (isRepeatClick) setIsRepeatClick(false)
    if (audio) audio.pause()
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value) / 100;
    setVolume(newVolume);
    const audio = audioRef.current;
    if (audio) audio.volume = newVolume;
  };

  const audio = audioRef.current;

  const handleMuteClick = () => {
    setIsMuted(!isMuted);
    setVolume(!isMuted ? 0 : 0.5)
    const volume = !isMuted ? 0 : 0.5;
    if (audio) {
      audio.volume = volume;
    }
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPercentage = Number(event.target.value);
    const audio = audioRef.current;
    if (audio) {
      const newTime = (newPercentage / 100) * audio.duration;
      audio.currentTime = newTime;
      setPlayedPercentage(newPercentage);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updatePlayedPercentage = () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setPlayedPercentage(percentage);
    };

    audio.addEventListener("timeupdate", updatePlayedPercentage);
    return () => {
      audio.removeEventListener("timeupdate", updatePlayedPercentage);
    };
  }, [currentTrackIndex, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(
        `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60).toString().padStart(2, "0")}`
      );
      setCurrentTime(
        `${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60).toString().padStart(2, "0")}`
      );
    }
  }, [audioRef?.current?.currentTime, audioRef?.current?.duration]);

  useEffect(() => {
    if (musicsIds.length > 0 && musttPlay) {
      if (!file) {
        setMustPlay(false)
        getMusic(musicsIds[currentTrackIndex]);
      }
    }
  }, [musicsIds, currentTrackIndex, musttPlay, file]);

  useEffect(() => {
    if (musttPlay) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [musttPlay])

  useEffect(() => {
    if (playedPercentage == 100 && !isRepeatClick && musicsIds.length == 1) {
      setMustPlay(false)
    } if (playedPercentage === 100 && !isRepeatClick && musicsIds.length > 1) {
      playNextTrack();
    } else if (playedPercentage === 100 && isRepeatClick) {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
      }
    }
  }, [playedPercentage, isRepeatClick, musttPlay]);

  useEffect(() => {
    if (!audio) return
    if (audio.src) {
      if (musttPlay) {
        audio.play()
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
    }
  })

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = `${file?.url}`;
    }
  }, [audio, currentTrackIndex, file])

  const RangeBackground = `linear-gradient(to right, ${isRangeHover ? "#F48C06" : "#E4E4E4"
    } ${playedPercentage}%, #6E6E6E ${playedPercentage}%)`;

  return (
    <section className={Styles.AudioPlayer}>
      <div className={Styles.AlbumLogo}>
        <Image src={"/discImg.svg"} alt="AlbumLogo" width={112} height={112} className={Styles.discImage} />
        <img src={music?.imageUrl ? music?.imageUrl : '/discImg.svg'} alt="Album Cover" width={42} height={42} className={Styles.albumCover} />
      </div>
      <div className={Styles.mainrange}>
        <input
          type="range"
          min="0"
          max="100"
          value={playedPercentage}
          onChange={handleRangeChange}
          className={Styles.rangeInput}
          onMouseOver={() => setIsRangeHover(true)}
          onMouseOut={() => setIsRangeHover(false)}
          style={{ background: RangeBackground }}
        />
      </div>
      <div className={Styles.content}>
        <AudioLeft
          title={music?.name}
          artist={music ? `${music?.authors.map((artist) => `${artist.firstName} ${artist.lastName}`).join(", ")}` : ''}
        />
        <AudioMiddle
          isUndefinedMusic={isUndefinedMusic}
          togglePlayPause={togglePlayPause}
          isPlaying={isPlaying}
          playNext={playNextTrack}
          playPrev={playPrevTrack}
          onRepeatClick={() => setIsRepeatClick((prev) => !prev)}
          isRepeatClick={isRepeatClick}
        />
        <div className={Styles.volumeWrapper}>
          <AudioRight
            handleVolumeChange={handleVolumeChange}
            volume={volume}
            duration={duration == 'NaN:NaN' ? '0:00' : duration}
            currentTime={currentTime}
            isMuted={isMuted}
            handleMuteClick={handleMuteClick}
          />
        </div>
      </div>
      <audio ref={audioRef} />
    </section>
  );
};

export default AudioPlayer;
