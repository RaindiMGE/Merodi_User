'use client'

import { Col, Row } from 'antd';
import styles from './ArtistPlayerCard.module.scss';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { musics, mustPlay } from '@/app/states';
import AddToPlaylist from '../AddToPlaylistModel/AddToPlaylist';

interface AlbumInfo {
    cover?: string;
    title: string;
}

export interface Props {
    sequence: string;
    albumInfo: AlbumInfo;
    artistName: string[];
    listensNubmer: string;
    duration: string;
    key?: number;
    id: number;
    playlist: boolean;
    playlistId: number;
}

const ArtistPlayerCard = (props: Props) => {
    const [isHover, setIsHover] = useState(false);
    const [musicsIds, setMusicIds] = useRecoilState(musics);
    const [musttPlay, setMustPlay] = useRecoilState(mustPlay)
    const [isPlaying, setIsPlaying] = useState(false);

    function onPlayClick() {
        setMustPlay(false)
        const musicId = props.id
        setIsPlaying(!isPlaying)

        setMustPlay(true);

        if (!musicsIds.includes(musicId)) {
            setMusicIds([musicId, ...musicsIds]);
        } else {
            let index: number = 0;
            const newArray: number[] = [];
            for (let i = 0; i < musicsIds.length; i++) {
                if (musicsIds[i] == musicId) {
                    index = i;
                    for (let i = index; i < 20; i++) {
                        if (!newArray.includes(musicsIds[i])) newArray.push(musicsIds[i]);
                        if (i == musicsIds.length - 1 && !newArray.includes(musicsIds[0])) {
                            newArray.push(musicsIds[0]);
                            setMusicIds(newArray);
                            return;
                        };
                    }
                }
            }
        }
    }

    return <Row className={styles.container} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
        <div className={styles.albumInfo}>
            <Col className={styles.imgWrapper}>{isHover ? <Image src={`/images/music/Resume.svg`} alt="play music icon" onClick={onPlayClick} className={styles.playButton} width={24} height={24} /> : <span>{props.sequence}</span>}</Col>
            <div>
                {props.albumInfo?.cover && <Col><img src={`${props.albumInfo?.cover}`} alt="album cover" width={40} height={40} /></Col>}
                <Col>{props.albumInfo?.title}</Col>
            </div>
        </div>
        <Col className={styles.artistName}>{props.artistName.join(', ')}</Col>
        <Col className={styles.listensNumber} style={{
            maxWidth: isHover ? '256px' : '280px'
        }}>{props.listensNubmer}</Col>
        <Col className={styles.addToPlaylist}><AddToPlaylist playlistId={props.playlistId} playlist={props.playlist} id={props.id} /></Col>
        <Col className={styles.duration}>{props.duration}</Col>
    </Row>
}


export default ArtistPlayerCard;