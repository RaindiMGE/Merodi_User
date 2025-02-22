'use client'

import Image from 'next/image';
import styles from './OneItem.module.scss';

interface Props {
    id: number;
    icon: string;
    title: string;
    musicIds: number[];
    onClick: (playlistId: number, musicIds: number[]) => void;
}

const OneItem = (props: Props) => {
    const onClick = () => {
        props.onClick(props.id, props.musicIds);
    }
    return <div className={styles.itemWrapper} onClick={onClick} key={props.id}>
        <Image src={`/icons/${props.icon}`} alt='trash' width={24} height={24} />
        <span className={styles.span}>{props.title}</span>
    </div>
}

export default OneItem;