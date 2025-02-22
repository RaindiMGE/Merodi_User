'use client'

import Image from 'next/image';
import styles from './SecondaryButton.module.scss';
import { SecondaryButtonProps } from '@/app/interfaces';

const SecondaryButton = (prop: SecondaryButtonProps) => {
    return <div>
        <button disabled={prop.disabled} className={`${styles.button} ${prop.icon ? styles.buttonWithIcon : styles.buttonWithoutIcon}`} onClick={prop.onClick} >
            {prop.icon && <Image src={`/icons/${prop.icon}`}  alt="icon" width={24} height={24} />}
            {prop.title}
        </button>
    </div>
}

export default SecondaryButton;