'use client'

import ArtistTopCard from '@/app/Components/ArtistCards/ArtistTopCard';
import styles from './page.module.scss';
import ArtistPlayerCard from '@/app/Components/ArtistPlayerCard/ArtistPlayerCard';
import TopHitsCard from '@/app/Components/TopHitsCard/TopHitsCard';
import { SwiperSlide } from 'swiper/react';
import SwiperComponent from '@/app/Components/Swiper/Swiper';
import AlbumCard from '@/app/Components/AlbumCard/AlbumCard';
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { getCookie } from '@/helpers/cookies';
import { duration } from '@/helpers/timeCalc';
import { AlbumInfo } from '../album/page';
import { MusicInfo } from '@/app/Components/AudioPlayer/AudioMain/AudioPlayer';
import { useRecoilState } from 'recoil';
import { isHomePage } from '@/app/states';

export interface ArtistInfo {
    id: number;
    firstName: string;
    lastName: string;
    biography: string;
    musics: MusicInfo[];
    albums: AlbumInfo[];
    imageUrl: string;
}

const ArtistPage = () => {

    return <Suspense>
        <ArtistPageContent />
    </Suspense>
}

function ArtistPageContent() {
    const [isMounted, setIsMounted] = useState(false);
    const searchParams = useSearchParams();
    const [id, setId] = useState<null | string>(null);
    const [artistInfo, setArtistInfo] = useState<ArtistInfo>()
    const token = getCookie('token')
    const [musics, setMusics] = useState<number[]>([])
    const [homePage, setHomePage] = useRecoilState(isHomePage);

    useEffect(() => {
        setHomePage(false);
    }, [])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted && searchParams) {
            setId(searchParams.get('id'))
        }
    }, [searchParams, isMounted])

    const TopHitsBody = (
        <React.Fragment>
            {artistInfo && artistInfo.musics.map((item, index) => <SwiperSlide key={index} style={{ width: "fit-content" }}>
                <TopHitsCard
                    id={item.id}
                    image={item.imageUrl}
                    songTitle={item.name}
                    artistName={[`${artistInfo.firstName} ${artistInfo.lastName}`]}
                />
            </SwiperSlide>)}
        </React.Fragment>
    )

    const TopAlbumsBody = (
        <React.Fragment>
            {artistInfo && artistInfo.albums.map((item, index) => <SwiperSlide key={index}>
                <AlbumCard key={index} albumCover={item.imageUrl} id={item.id} albumName={item.title} artistName={[`${artistInfo.firstName} ${artistInfo.lastName}`]} />
            </SwiperSlide>)}
        </React.Fragment>
    )


    const getData = async () => {
        try {
            const response = await axios.get(`https://merodibackend-2.onrender.com/author/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setArtistInfo(response.data)
        } catch (error: any) {
        }
    }

    useEffect(() => {
        getData()
    }, [id])

    useEffect(() => {
        if(artistInfo) {
            setMusics(artistInfo.musics.map((item) => {
                return Number(item.id)
            }))
        }
    }, [artistInfo])

    return <div className={styles.container}>
        {artistInfo && <ArtistTopCard musicsIds={musics} image={`${artistInfo ? artistInfo.imageUrl : '/'}`} artist_name={artistInfo ? `${artistInfo?.firstName} ${artistInfo?.lastName}` : ''} follow_count={'3.3B'} description={artistInfo ? `${artistInfo?.biography}` : ''} />}
        <div className={styles.contentWrapper}>
            <div className={styles.popularMusicsWrapper}>
                <h3>Most Popular</h3>
                <div>
                    {artistInfo && artistInfo.musics.map((item, index) => index < 3 ? <ArtistPlayerCard id={item.id} key={index} sequence={`${index + 1}`} albumInfo={{
                        cover: item.imageUrl,
                        title: item.name
                    }} artistName={artistInfo && [`${artistInfo.firstName} ${artistInfo.lastName}`]} listensNubmer={`${item.playCount}`} duration={duration(item.duration)} playlist={false} playlistId={0} /> : null)}
                </div>
            </div>
            <SwiperComponent label={'Singles'} body={TopHitsBody} />
            <SwiperComponent label={'Top Albums'} body={TopAlbumsBody} />
        </div>
    </div>
}

export default ArtistPage;