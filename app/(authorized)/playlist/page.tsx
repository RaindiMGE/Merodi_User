'use client'

import Favsongcard from '@/app/Components/FavSongsCard/Favsongcard';
import styles from './page.module.scss';
import ArtistPlayerCard from '@/app/Components/ArtistPlayerCard/ArtistPlayerCard';
import AuthorizeLayout from '../layout';
import { Suspense, useEffect, useState } from 'react';
import { getCookie } from '@/helpers/cookies';
import { MusicInfo } from '@/app/Components/AudioPlayer/AudioMain/AudioPlayer';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { duration } from '@/helpers/timeCalc';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UserInfo } from '@/app/Components/Header/AsideMenu/SideHeader/SideBar';
import { useRecoilState } from 'recoil';
import { isHomePage, isPlaylistPage, mustRefreshPlaylists } from '@/app/states';

export interface PlaylistInfo {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    musics: MusicInfo[];
}

const Playlist = () => {
    return <Suspense>
        <PlaylistContent />
    </Suspense>
}

const PlaylistContent = () => {
    const [isMounted, setIsMounted] = useState(false);
    const searchParams = useSearchParams();
    const [id, setId] = useState<null | string>(null);
    const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo>()
    const token = getCookie('token')
    const [userInfo, setUserInfo] = useState<UserInfo>()
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

    const [decodedToken, setDecodedToken] = useState<JwtPayload>()

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setDecodedToken(decoded)
        }
    }, [token])

    const [mustRefresh, setMustRefresh] = useRecoilState(mustRefreshPlaylists)


    const getPlaylistInfo = async (id: number) => {
        try {
            const response = await axios.get(`https://merodibackend-2.onrender.com/playlist/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPlaylistInfo(response.data)
            
        }
        catch (err) {

        }
    }

    useEffect(() => {
        if (mustRefresh) {
            getPlaylistInfo(Number(id))
        }
    }, [mustRefresh, id])

    useEffect(() => {
        getPlaylistInfo(Number(id))
    }, [id])

    return <div className={styles.container}>
        {playlistInfo && <Favsongcard musicIds={playlistInfo.musics.map((item) => item.id)} playlistId={playlistInfo.id} title={playlistInfo.title} imageUrl={playlistInfo.imageUrl} description={playlistInfo.description} songsNumber={playlistInfo.musics.length} />}
        <div className={styles.contentWrapper}>
            {playlistInfo && playlistInfo.musics.map((item, index) => <ArtistPlayerCard playlistId={Number(id)} playlist={true} key={index} sequence={(index + 1).toString()} albumInfo={{
                cover: item.imageUrl,
                title: item.name
            }} artistName={item.authors.map((newItem) => `${newItem.firstName} ${newItem.lastName}`)} listensNubmer={`${item.playCount}`} duration={duration(item.duration)} id={item.id} />)}
        </div>
    </div>
}

export default Playlist;