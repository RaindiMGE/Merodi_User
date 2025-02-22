'use client'

import styles from './AddToPlaylist.module.scss';
import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Image from 'next/image';
import './AntStyles.css'
import OneItem from './OneItem/OneItme';
import { getCookie } from '@/helpers/cookies';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import axios from 'axios';
import { PlaylistInfo } from '@/app/(authorized)/playlist/page';
import { useLocation } from 'react-router-dom';
import { UserInfo } from '../Header/AsideMenu/SideHeader/SideBar';
import { useRouter } from 'next/router';
import { getMusicsIds, getNewArray } from '@/helpers/timeCalc';
import { mustRefreshPlaylists } from '@/app/states';
import { useRecoilState } from 'recoil';

interface Props {
    id: number;
    playlist: boolean;
    playlistId: number;
}

const AddToPlaylist = (props: Props) => {
    const [playlists, setPlaylists] = useState<PlaylistInfo[]>([])
    const token = getCookie('token')

    const [decodedToken, setDecodedToken] = useState<JwtPayload>();
    const [userInfo, setUserInfo] = useState<UserInfo>()
    const [mustRefresh, setMustRefresh] = useRecoilState(mustRefreshPlaylists)

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token)
            setDecodedToken(decoded);
        }
    }, [])

    const getPlaylists = async () => {
        if (decodedToken) {
            try {
                const response = await axios.get(`https://merodibackend-2.onrender.com/user/${decodedToken.userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserInfo(response.data)
            }
            catch (err: any) { }
        }
    }

    useEffect(() => {
        getPlaylists()
    }, [decodedToken])

    useEffect(() => {
        if(mustRefresh) getPlaylists()
    })

    const onAddToPlaylistClick = async (playlistId: number, musicIds: number[]) => {
        setMustRefresh(false)
        try {
            const response = await axios.get(`https://merodibackend-2.onrender.com/playlist/${playlistId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const playlist: PlaylistInfo = response.data
            let existingMusics = playlist.musics.map((item) => item.id);

            if (!existingMusics.includes(props.id)) {
                existingMusics.push(props.id);
            }

            const updatedData = {
                musicIds: existingMusics,
            };

            await axios.patch(`https://merodibackend-2.onrender.com/playlist/${playlistId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMustRefresh(true)
            alert('Added');
        }
        catch (err) {
            setMustRefresh(true)
            alert('Added')
        }
    }

    const onDeleteFromPLaylist = (playlistId: number, musicIds: number[]) => {
        setMustRefresh(false)
        axios.patch(`https://merodibackend-2.onrender.com/playlist/${playlistId}`, getNewArray(musicIds, props.id), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setMustRefresh(true)
                alert('Deleted')
            })
            .catch((err) => {
                setMustRefresh(true)
                alert('Deleted')
            })
    }

    const [musicsIds, setMusicsIds] = useState<number[]>([])
    useEffect(() => {
        if (userInfo) {
            setMusicsIds(getMusicsIds(props.playlistId, userInfo.playlist))
        }
    }, [userInfo])

    const items: MenuProps['items'] = userInfo?.playlist.map((item, index) => {
        return {
            key: item.id,
            label: <OneItem musicIds={item.musics.map((item) => item.id)} id={item.id} icon={'saveToPlaylistIcon.svg'} title={`Add To ${item.title}`} onClick={onAddToPlaylistClick} />
        }
    })

    useEffect(() => {
        if (props.playlist) {
            items?.unshift({
                key: 0,
                label: <OneItem id={props.playlistId} icon={'trash.svg'} title={'Remove From Playlist'} musicIds={musicsIds} onClick={onDeleteFromPLaylist} />
            })
        }
    })

    return (
        <Dropdown menu={{ items }} trigger={['hover']} placement='bottomRight'>
            <div onClick={(e) => e.preventDefault()} className={styles.contentWrapper}>
                <Space>
                    <Image src={'/icons/dots.svg'} alt='dots' width={32} height={32} className={styles.dotsImage} />
                </Space>
            </div>
        </Dropdown>
    );
};

export default AddToPlaylist;