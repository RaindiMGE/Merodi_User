'use client'

import { useEffect, useState } from 'react';
import SearchCategory from './SearchCategory/SearchCategory';
import styles from './SearchDropdown.module.scss';
import axios from 'axios';
import { getCookie } from '@/helpers/cookies';
import { SearchAlbums, SearchArtists, SearchDataType, SearchMusics } from '@/app/interfaces';

interface Props {
    searchQuery: string | undefined;
}


const SearchDropdown = ({ searchQuery }: Props) => {
    const [searchData, setSearchData] = useState<SearchDataType>();
    const [songs, setSongs] = useState<SearchMusics[]>()
    const [artists, setArtists] = useState<SearchArtists[]>()
    const [albums, setAlbums] = useState<SearchAlbums[]>();
    const token = getCookie('token')

    useEffect(() => {
        axios.get(`https://merodibackend-2.onrender.com/search?query=${searchQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setSearchData(res.data)
        })
        .catch((err) => {
            
        })

    }, [searchQuery, token])

    useEffect(() => {
        if(!searchData) return;
        if(searchData.musics) {
            setSongs(searchData.musics.map((item) => (
                {
                    id: item.id,
                    name: item.name,
                }
            )))
        }
        if(searchData.authors) {
            setArtists(searchData.authors.map((item) => (
            {
                id: item.id,
                name: `${item.firstName} ${item.lastName}`
            }
        )))
        }
        if(searchData.albums) {
            setAlbums(searchData.albums.map((item) => (
                {
                    id: item.id,
                    name: item.title,
                }
            )))
        }
    }, [searchData])

    return <div className={styles.container}>
        <div className={styles.songsContainer}>
            <SearchCategory title='Songs' searchResults={songs || []} link='/' isMusicCategory />
        </div>
        <div className={styles.albumsContainer}>
            <SearchCategory title='Albums' searchResults={albums || []} link='/album' isMusicCategory={false} />
        </div>
        <div className={styles.artistsContainer}>
            <SearchCategory title='Artists' searchResults={artists || []} link='/artist' isMusicCategory={false} />
        </div>
    </div>
}

export default SearchDropdown;