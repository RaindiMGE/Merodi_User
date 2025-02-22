'use client'

import { useEffect, useState } from 'react';
import styles from './OneSearchResult.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { musics } from '@/app/states';

interface Props {
    searchName: string;
    searchType: 'artist' | 'music' | 'album';
    link?: string;
    id: number;
    key: number;
    onClick?: (id: number) => void;
    isMusicCategory: boolean;
}

const OneSearchResult = (props: Props) => {

    const [searchLoop, setSearchLoop] = useState('defaultSearchLoop.svg');
    const [link, setLink] = useState('/')

    const [musicid, setMusicIds] = useRecoilState(musics)

    const onClick = () => {
        if(props.isMusicCategory) {
            setMusicIds([props.id])
        }
        if(props.onClick) {
            props.onClick(props.id)
        }
    }

    useEffect(() => {
        if(!props.isMusicCategory) {
            setLink(`${props.link}?id=${props.id}`)
        }
    }, [props.link, props.id])

    return <Link onClick={onClick} href={link}>
        <div className={styles.oneSearch} onMouseOver={() => { setSearchLoop('hoverSearchLoop.svg') }} onMouseOut={() => { setSearchLoop('defaultSearchLoop.svg') }}>
            <Image src={`./icons/${searchLoop}`} alt="search loop" width={24} height={24} />
            <span >{props.searchName}</span>
        </div>
    </Link>
}

export default OneSearchResult;