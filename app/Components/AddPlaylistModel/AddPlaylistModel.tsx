'use client'

import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import AddImage from './AddImageModel/AddImage';
import styles from './AddPlaylistModel.module.scss'
import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../Buttons/PrimaryButton/PrimaryButton';
import { useRecoilState } from 'recoil';
import { resetImage } from '@/app/states';
import axios from 'axios';
import { getCookie } from '@/helpers/cookies';

export interface Input {
    title: string;
    description: string;
    image: FileList;
}

interface Playlist {
    image: string;
    title: string;
    description?: string;
}

interface Props {
    title: string;
    onCancelClick: () => void;
    playlistId?: number;
    onSubmitClick?: (data: Input) => void;
    playlist?: Playlist;
    mustReset: boolean;
    buttonTitle: string;
}


const AddPlaylistModel = (props: Props) => {

    const [mustReset, setMustReset] = useRecoilState(resetImage);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Input>();
    const token = getCookie('token')
    const isPlaylistInfo = !!props.playlist;

    const onSubmit = (data: Input) => {
        if (props.onSubmitClick) {
            props.onSubmitClick(data);
        }
    }

    const onCancel = () => {
        props.onCancelClick()
    }

    return <form className={(errors.image || errors.description || errors.title) ? styles.errorContainer : styles.container} onSubmit={handleSubmit(onSubmit)} >
        <div className={styles.inputsContainer}>
            <h3>{props.title}</h3>
            <div className={styles.aboutPlaylistContainer}>
                <div className={styles.addImgBox}>
                    <AddImage image={props.playlist?.image} isPlaylistInfo={isPlaylistInfo} mustReset={props.mustReset} 
                        register={
                            !isPlaylistInfo ? {
                                ...register('image', {
                                    required: {
                                        value: true,
                                        message: 'Image is required'
                                    },
                                    validate: {
                                        isSize: (files: any) => {
                                            const file = files[0];
                                            const maxSizeInMB = 2;
                                            const isValidSize = file && file.size / 1024 / 1024 <= maxSizeInMB;
                                            return isValidSize ? true : `Image must be smaller than ${maxSizeInMB}MB`;
                                        }
                                    },
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                        const files = e.target.files;
                                        if (files && files[0]) {
                                            setSelectedImage(files[0]);
                                        } else {
                                            setSelectedImage(null);
                                        }
                                    }
                                })
                        } : {
                            ...register('image', {
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const files = e.target.files;
                                    if (files && files[0]) {
                                        setSelectedImage(files[0]);
                                    } else {
                                        setSelectedImage(null);
                                    }
                                }
                            })
                        }}
                     error={errors.image} file={selectedImage}  />
                    <p>Cover Image</p>
                </div>
                <div className={styles.inputsBox}>
                    <Input mustReset={props.mustReset} title={'Title'} value={props.playlist?.title} titleColor='#0E1220' register={{
                        ...register('title', {
                            required: {
                                value: true,
                                message: 'Title is required'
                            },
                            minLength: {
                                value: 3,
                                message: 'Title must be at least 3 characters long'
                            },
                            maxLength: {
                                value: 25,
                                message: 'Title cannot be longer than 25 characters'
                            }
                        })
                    }} error={errors.title} />
                    <Input mustReset={props.mustReset} title={"Description"} value={props.playlist?.description} titleColor='#0E1220' register={{
                        ...register('description', {
                            maxLength: {
                                value: 100,
                                message: 'Description cannot be longer than 100 characters'
                            }
                        })
                    }} error={errors.description} />
                </div>
            </div>
        </div>
        <div className={styles.completeBox}>
            <div className={styles.buttons}>
                <PrimaryButton onClick={onCancel} type='button' styles={{
                    backgroundColor: '#0E1220',
                    borderRadius: '8px',
                    border: '1px solid #67727E',
                    color: '#67727E'
                }} >{'Cancel'}</PrimaryButton>
                <PrimaryButton type='submit' onClick={() => { }}>{props.buttonTitle}</PrimaryButton>
            </div>
        </div>
    </form>
}


export default AddPlaylistModel;