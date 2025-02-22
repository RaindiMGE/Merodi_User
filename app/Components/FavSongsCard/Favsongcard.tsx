'use client'

import React, { useEffect, useState } from "react";
import styles from "./Favsongcard.module.scss";
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";
import Image from "next/image";
import AddPlaylistModel, { Input } from "../AddPlaylistModel/AddPlaylistModel";
import axios from "axios";
import { getCookie } from "@/helpers/cookies";
import { useRecoilState } from "recoil";
import { musics, mustPlay, mustRefreshPlaylists } from "@/app/states";
import { UploadFile } from "antd";

interface Props {
  title: string;
  imageUrl: string;
  description: string;
  songsNumber: number;
  playlistId: number;
  musicIds: number[]
}

interface UploadedFile {
  id: number;
}

export default function Favsongcard(props: Props) {
  const [showEditPlaylistModel, setShowEditPlaylistModel] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const token = getCookie('token')
  const [musicsIds, setMusicsIds] = useRecoilState(musics);
  const [mustRefresh, setMustRefresh] = useRecoilState(mustRefreshPlaylists)

  const addEditinfo = async (data: Input, id: number) => {
    const newData = {
      title: data.title,
      description: data.description,
      imageId: id ? id : null,
    }
    try {
      const response = await axios.patch(`https://merodibackend-2.onrender.com/playlist/${props.playlistId}`, newData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      alert('Pleylist Updated')
      setShowEditPlaylistModel(false)
    }
    catch (err) {
      setMustRefresh(true)
      setShowEditPlaylistModel(false)
      alert('Updated')
    }
  }

  const onEditClick = (data: Input) => {
    const formData = new FormData()
    formData.append('file', data.image[0])
    if (data.image.length !== 0) {
      axios.post(`https://merodibackend-2.onrender.com/files/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })
        .then((res) => {
          const file: UploadedFile = res.data
          addEditinfo(data, file.id)
        })
        .catch((err) => {

        })
    }
    else {
      addEditinfo(data, 0)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const [musttPlay, setMustPlay] = useRecoilState(mustPlay);

  useEffect(() => {
    for(let i = 0; i < props.musicIds.length; i++) {
      if(!musicsIds.includes(props.musicIds[i])) {
        const newArray = props.musicIds.map((item) => item)
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

  const [mustReset, setMustReset] = useState(false)

  return (
    <div className={styles.container}>
      <img src={props.imageUrl} alt="bigicon" width={288} height={288} className={styles.favsongImage} />
      <div className={styles.maindiv}>
        <div className={styles.description}>
          <div className={styles.heading}>
            <h1 className={styles.favsongs}>{props.title}</h1>
            <div>
              <Image className={styles.image} src={`${!isPlaying ? '/images/music/Resume.svg' : '/images/music/Pause.svg'}`} alt={'play icon'} width={48} height={48} onClick={togglePlayPause} />
            </div>
          </div>

          <div className={styles.paragraphdiv}>
            <p className={styles.paragraph}>
              Ann_Lyan <span>◦ {props.songsNumber} Songs</span>
            </p>
          </div>

          <p className={styles.mainDescription}>{props.description}</p>
        </div>
        <div className={styles.playlistModel}>
          <div className={showEditPlaylistModel ? styles.showPlaylistModel : styles.hidePlaylistModel}>
            <AddPlaylistModel buttonTitle="Edit" title={"Edit Playlist"} playlist={{
              title: props.title,
              image: props.imageUrl,
              description: props.description
            }} onCancelClick={() => {
              setShowEditPlaylistModel(false)
            }} onSubmitClick={onEditClick} mustReset={mustReset} />
          </div>
          <SecondaryButton title={"Edit playlist"} icon="editPenIcon.svg" onClick={() => { setShowEditPlaylistModel(true) }} />
        </div>
      </div>
    </div>
  );
}
