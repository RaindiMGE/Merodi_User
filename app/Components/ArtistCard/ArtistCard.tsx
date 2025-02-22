'use client'

import Image from 'next/image';
import styles from './ArtistCard.module.scss';
import Link from 'next/link';

interface Props {
    image: string;
    artistName: string;
    id: number;
}

const ArtistCard = (props: Props) => {
    return <Link href={`/artist?id=${props.id}`}>
        <div className={styles.container}>
            <img src={props.image} alt="Artist Image" width={200} height={200} className={styles.artistImage} />
            <h3>{props.artistName}</h3>
        </div></Link>
}
export default ArtistCard;