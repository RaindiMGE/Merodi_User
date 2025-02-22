'use client'

import Link from 'next/link';
import styles from './AlbumCard.module.scss';
import AlbumCover from './AlbumCover/AlbumCover';


interface Props {
    albumCover: string;
    albumName: string;
    artistName: string[];
    id: number;
}

const AlbumCard = (props: Props) => {
    return <Link href={`/album?id=${props.id}`}>
        <div className={styles.container}>
            <AlbumCover albumCover={props.albumCover} />
            <div className={styles.description}>
                <h3 className={styles.albumName}>{props.albumName}</h3>
                <p className={styles.artistName}>{props.artistName.join(',')}</p>
            </div>
        </div>
    </Link>
}

export default AlbumCard;