'use client'

import AlbumInfoCard from '../../Components/AlbumInfoCard/AlbumInfoCard';
import PlaylistTable, { Playlist } from '../../Components/PlaylistTable/PlaylistTable';
import styles from './page.module.scss';
import AuthorizeLayout from '../layout';
import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { getCookie } from '@/helpers/cookies';
import { duration } from '@/helpers/timeCalc';
import { ArtistInfo } from '../artist/page';
import { MusicInfo } from '@/app/Components/AudioPlayer/AudioMain/AudioPlayer';
import { isHomePage } from '@/app/states';
import { useRecoilState } from 'recoil';

export interface AlbumInfo {
    id: number;
    title: string;
    releaseDate: string;
    description: string;
    imageUrl: string;
    musics: MusicInfo[];
    authors: ArtistInfo[];
}

const AlbumPage = () => {

    return <Suspense>
        <AlbumPageContent />
    </Suspense>
}

function AlbumPageContent () {
    const [album, setAlbum] = useState<AlbumInfo>()
    const [isMounted, setIsMounted] = useState(false);
    const searchParams = useSearchParams();
    const [id, setId] = useState<null | string>(null);
    const [token, setToken] = useState<string>()
    const [playlist, setPlaylist] = useState<any>()
    const [homePage, setHomePage] = useRecoilState(isHomePage);

    useEffect(() => {
        setHomePage(false);
    }, [])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        setToken(getCookie('token'))
    }, [])

    useEffect(() => {
        if (isMounted && searchParams) {
            setId(searchParams.get('id'))
        }
    }, [searchParams, isMounted])

    const getData = async () => {
        try {
            const response = await axios.get(`https://merodibackend-2.onrender.com/album/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAlbum(response.data)
        } catch (error: any) {
        }
    }

    useEffect(() => {
        getData()
    }, [id])

    useEffect(() => {
        if(album?.musics) {
            setPlaylist(album.musics.map((item, index) => ({
                sequence: index + 1,
                albumInfo: {
                    title: item.name
                },
                listensNubmer: item.playCount,
                duration: duration(item.duration),
                artistName: album.authors.map((item, _index) => `${item.firstName} ${item.lastName}`),
                id: item.id
            })))
        }
    }, [album])

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                {album && <AlbumInfoCard albumName={`${album.title}`} albumCover={album ? album.imageUrl : '/'} albumArtist={album.authors.map((item) => `${item.firstName} ${item.lastName}`).join(', ')} description={`${album?.description}`} releaseDate={`${album?.releaseDate}`} musicsIds={album.musics.map((item) => item.id)} />}
                <div className={styles.playlistTableWrapper}>
                    {album?.musics && <PlaylistTable playlist={playlist} />}
                </div>
            </div>
        </div>

    )
}

export default AlbumPage;