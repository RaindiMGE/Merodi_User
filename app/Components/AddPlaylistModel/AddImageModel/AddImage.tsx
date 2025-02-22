'use client'

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './AddImage.module.scss';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { resetImage } from '@/app/states';

interface Props {
    register: UseFormRegisterReturn;
    error: FieldError | undefined;
    mustReset: boolean;
    file: File | null;
    isPlaylistInfo?: boolean;
    image?: string;
}

const AddImage = (props: Props) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [mustReset, setMustReset] = useRecoilState(resetImage);

    useEffect(() => {
        if (props.mustReset) {
            setMustReset(false)
            setSelectedImage(null)
        };
    }, [props.mustReset])

    useEffect(() => {
        if (props.file) {
            setSelectedImage(props.file)
        } else {
            setSelectedImage(null)
        }
    }, [props.file])

    return (
        <>
            <div className={selectedImage ? styles.containerAfterChoose : styles.container}>
                <Image src="/icons/plusIcon.svg" alt="plus icon" className={selectedImage ? styles.afterChoose : styles.backImg} width={40} height={40} />
                <input
                    type="file"
                    className={styles.chooseImgInput}
                    {...props.register}
                    accept='image/*'
                />
                {(props.image && !selectedImage) ? <Image src={props.image} alt='plailist image' layout='fill' objectFit='cover' /> : (selectedImage && <Image src={URL.createObjectURL(selectedImage)} alt="not found" className={styles.choosenImg} layout='fill' objectFit='cover' />)}
            </div>
            {props.error && <span className={styles.error}>{props.error.message}</span>}
        </>
    );
}

export default AddImage;
