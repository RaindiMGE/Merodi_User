'use client'

import { useEffect, useState } from 'react';
import styles from './SearchCategory.module.scss';
import OneSearchResult from './OneSearchResult/OneSearchResult';
import { SearchAlbums, SearchArtists, SearchMusics } from '@/app/interfaces';
import { useRecoilState } from 'recoil';
import { musics } from '@/app/states';

interface Props {
    title: string;
    searchResults: SearchMusics[] | SearchAlbums[] | SearchArtists[];
    link?: string;
    isMusicCategory: boolean;
}

const SearchCategory = (props: Props) => {

    const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [musicsIds, setMusicsIds] =  useRecoilState(musics);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const searchResult = [];

    for(let i = 0; i < props.searchResults.length; i++) {
        if(width < 768) {
            if(searchResult.length < 3) searchResult[searchResult.length] = props.searchResults[i];
        } else {
            if(searchResult.length < 4) searchResult[searchResult.length] = props.searchResults[i];
        }
    }

    const onClick = (id: number) => {
        if(props.isMusicCategory) {
            setMusicsIds([id])
        }
    }

    const searchResults = props.searchResults;

    return <div className={styles.container}>
        <h3>{props.title}</h3>
        <div>
            {searchResult.map((result, index) => <OneSearchResult isMusicCategory={props.isMusicCategory} onClick={onClick} searchType='album' key={index} searchName={result.name} id={result.id} link={props.link} /> )}
        </div>
    </div>
}

export default SearchCategory;