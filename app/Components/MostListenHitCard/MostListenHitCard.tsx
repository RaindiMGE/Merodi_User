'use client'

import styles from './MostListenHitCard.module.scss';

interface Props {
    artist: string;
    background: string;
    titleStyles?: {};
    artistStyles?: {};
}

const MostListenHitCard = (props: Props) => {

    return (<div className={styles.container} style={{
        backgroundImage: `url('${props.background}')`,
    }}>
        <div className={styles.description}>
            <h2 style={props.titleStyles}>The Most Listened Hit Of The Week</h2>
            <p style={props.artistStyles}>By <span>{props.artist}</span></p>
        </div>
    </div>)
}

export default MostListenHitCard;