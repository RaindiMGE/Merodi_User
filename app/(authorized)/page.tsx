'use client'

import React, { useEffect, useState } from 'react';
import MostListenHitCard from '../Components/MostListenHitCard/MostListenHitCard';
import Tabs from '../Components/Tabs/Tabs';
import styles from './page.module.scss';
import SwiperComponent from '../Components/Swiper/Swiper';
import TopHitsCard from '../Components/TopHitsCard/TopHitsCard';
import { SwiperSlide } from 'swiper/react';
import ArtistCard from '../Components/ArtistCard/ArtistCard';
import AlbumCard from '../Components/AlbumCard/AlbumCard';
import Card from '../Components/TopChartCard/Card';
import { useRecoilState } from 'recoil';
import { getCookie } from '@/helpers/cookies';
import axios from 'axios';
import { AlbumInfo } from './album/page';
import { ArtistInfo } from './artist/page';
import { MusicInfo } from '../Components/AudioPlayer/AudioMain/AudioPlayer';
import { duration } from '@/helpers/timeCalc';
import { isHomePage, musics } from '../states';

interface Listen {
  musicId: number;
}

const Homepage = () => {

  const token = getCookie('token');
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo[]>();
  const [artistInfo, setArtistInfo] = useState<ArtistInfo[]>()
  const [musicInfo, setMusicInfo] = useState<MusicInfo[]>()
  const [homePage, setHomePage] = useRecoilState(isHomePage);

  useEffect(() => {
    setHomePage(true);
  })

  const getAlbumData = async () => {
    try {
      const response = await axios.get(`https://merodibackend-2.onrender.com/album`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAlbumInfo(response.data)
    } catch (error: any) {
    }
  }

  const getArtistData = async () => {
    try {
      const response = await axios.get(`https://merodibackend-2.onrender.com/author`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setArtistInfo(response.data)
    } catch (error: any) {

    }
  }

  const getMusicData = async () => {
    try {
      const response = await axios.get(`https://merodibackend-2.onrender.com/music`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMusicInfo(response.data)
    } catch (error: any) {

    }
  }

  const chartsSetter = (data: MusicInfo[]) => {
    let TopChartsBody;
    let currentSlide: any[] = [];

    for (let i = 0; (i <= data.length) && (i < 21); i = i + 3) {
      const roundedIndex = Math.floor(i);
      if (data[i] && data[i].albumId !== null) {
        currentSlide[roundedIndex] = <SwiperSlide className={styles.swiperSlide}>
          <Card id={data[i].id} title={data[i].name} author={data[i].authors.map((item) => `${item.firstName} ${item.lastName}`)} imageUrl={data[i].imageUrl} sequence={(i + 1).toString()} duration={duration(data[i].duration)} />
        </SwiperSlide>
      }
      if (data[i + 1] && data[i + 1].albumId !== null) {
        currentSlide[roundedIndex] = <SwiperSlide className={styles.swiperSlide}>
          <Card id={data[i].id} title={data[i].name} author={data[i].authors.map((item) => `${item.firstName} ${item.lastName}`)} imageUrl={data[i].imageUrl} sequence={(i + 1).toString()} duration={duration(data[i].duration)} />
          <Card id={data[i + 1].id} title={data[i + 1].name} author={data[i + 1].authors.map((item) => `${item.firstName} ${item.lastName}`)} imageUrl={data[i + 1].imageUrl} sequence={(i + 2).toString()} duration={duration(data[i + 1].duration)} />
        </SwiperSlide>
      }
      if (data[i + 2] && data[i + 2].albumId !== null) {
        currentSlide[roundedIndex] = <SwiperSlide className={styles.swiperSlide}>
          <Card id={data[i].id} title={data[i].name} author={data[i].authors.map((item) => `${item.firstName} ${item.lastName}`)} imageUrl={data[i].imageUrl} sequence={(i + 1).toString()} duration={duration(data[i].duration)} />
          <Card id={data[i + 1].id} title={data[i + 1].name} author={data[i + 1].authors.map((item) => `${item.firstName} ${item.lastName}`)} imageUrl={data[i + 1].imageUrl} sequence={(i + 2).toString()} duration={duration(data[i + 1].duration)} />
          <Card id={data[i + 2].id} title={data[i + 2].name} author={data[i + 2].authors.map((item) => `${item.firstName} ${item.lastName}`)} imageUrl={data[i + 2].imageUrl} sequence={(i + 3).toString()} duration={duration(data[i + 2].duration)} />
        </SwiperSlide>
      }
      TopChartsBody = <React.Fragment>
        {currentSlide}
      </React.Fragment>
    }
    return TopChartsBody;
  }

  const PopularArtistsBody = (
    <React.Fragment>
      {artistInfo && artistInfo.map((item, index) => index < 20 ? <SwiperSlide key={index}>
        <ArtistCard id={item.id} image={item.imageUrl} artistName={`${item.firstName} ${item.lastName}`} />
      </SwiperSlide> : null)}
    </React.Fragment>
  )

  const TopAlbumsBody = (
    <React.Fragment>
      {albumInfo && albumInfo.map((item, index) => index < 20 && item.authors !== null ? <SwiperSlide key={index}>
        <AlbumCard id={item.id} albumCover={item.imageUrl} albumName={item.title} artistName={item.authors.map((item) => `${item.firstName} ${item.lastName}`)} />
      </SwiperSlide> : null)}
    </React.Fragment>
  )

  const TopHitsBody = (
    <React.Fragment>
      {musicInfo && musicInfo.map((item, index) => index < 20 && item.albumId !== null ? <SwiperSlide key={index} style={{ width: "fit-content" }}>
        <TopHitsCard
          id={item.id}
          image={item.imageUrl}
          songTitle={item.name}
          artistName={item.authors.map((item, index) => `${item.firstName} ${item.lastName}`)}
        />
      </SwiperSlide> : null)}
    </React.Fragment>
  )

  const [TopChartsBody, setTopChartsBody] = useState<React.ReactNode>();

  useEffect(() => {
    if (musicInfo) {
      setTopChartsBody(chartsSetter(musicInfo))
    }
  }, [musicInfo])

  const [listeners, setListeners] = useState<MusicInfo>()

  const getMusicById = async (id: number) => {
    try {
      const response = axios.get(`https://merodibackend-2.onrender.com/music/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setListeners((await response).data)
    }
    catch (err) {

    }
  }

  const getMusiclistener = async () => {
    try {
      const response = await axios.get('https://merodibackend-2.onrender.com/stats/topofweek/1', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const listen: Listen[] = response.data
      getMusicById(listen[0].musicId)

    }
    catch (err) {

    }
  }

  useEffect(() => {
    getMusiclistener()
    getAlbumData()
    getArtistData()
    getMusicData()
  }, [])

  const [activeId, setActiveId] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Tabs tabs={[
          {
            id: 1,
            label: 'All',
            href: '/',
            activeId: activeId,
            onClick: () => setActiveId(1),
          },
          {
            id: 2,
            label: 'Artists',
            activeId: activeId,
            href: '#artists',
            onClick: () => setActiveId(2),
          },
          {
            id: 3,
            label: 'Charts',
            activeId: activeId,
            href: '#charts',
            onClick: () => setActiveId(3),
          },
          {
            id: 4,
            label: 'Hits',
            href: '#hits',
            activeId: activeId,
            onClick: () => setActiveId(4),
          },
          {
            id: 5,
            label: 'Albums',
            href: '#albums',
            activeId: activeId,
            onClick: () => setActiveId(5),
          }
        ]} />
        <div className={styles.contentWraper}>
          < MostListenHitCard artist={listeners ? listeners?.authors.map((item) => `${item.firstName} ${item.lastName}`).join(', ') : ''} background={listeners ? listeners?.imageUrl : '/'} />
          <SwiperComponent label={'Popular Artists'} body={PopularArtistsBody} id='artists' />
          <SwiperComponent label={'Top Hits'} body={TopHitsBody} id='hits' />
          <SwiperComponent label={'Top Albums'} body={TopAlbumsBody} id='albums' />
          <SwiperComponent label={'Top Carts'} body={TopChartsBody} id='charts' />
        </div>
      </div>
    </div>
  )
}

export default Homepage;
