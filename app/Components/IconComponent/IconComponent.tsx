'use client'

import { useEffect, useState } from 'react';
import styles from './icon.module.scss';
import Image from 'next/image';

interface Props {
    icon: string;
    clickIcon: string;
    disable?: boolean;
    disableIcon?: string;
    hoverIcon: string;
    onClick?: () => void;
    iconSize: number;
}

const Icon = ({ icon, clickIcon, disable = false, disableIcon, hoverIcon, onClick, iconSize }: Props) => {
    const [currentIcon, setCurrentIcon] = useState(icon);

    useEffect(() => {
        setCurrentIcon(disable && disableIcon ? disableIcon : icon);
    }, [disable, icon, disableIcon]);

    const handleMouseOver = () => {
        if(currentIcon == clickIcon) ''
        else if(!disable) {
            setCurrentIcon(hoverIcon);
        }
    };

    const handleMouseOut = () => {
        if(currentIcon == clickIcon) ''
        else if(!disable) {
            setCurrentIcon(icon);
        }
    };

    const handleClick = () => {
        if (onClick) onClick();
        if(currentIcon == clickIcon) setCurrentIcon(icon)
        else if(!disable) {
            setCurrentIcon(clickIcon);
        }
    };

    return (
        <button
            type="button"
            disabled={disable}
            className={styles.container}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <Image src={`/icons/${currentIcon}`} width={iconSize} height={iconSize} alt="icon" />
        </button>
    );
};


export default Icon;
