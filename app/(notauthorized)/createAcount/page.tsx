'use client'

import styles from './page.module.scss';
import Input from "../../Components/Input/Input";
import { PrimaryButton } from '../../Components/Buttons/PrimaryButton/PrimaryButton';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface CreateAcount {
    email: string;
    password: string;
    passwordConfirm: string;
}

const CreateAcount = () => {

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<CreateAcount>()
    const router = useRouter();

    const onSubmit: SubmitHandler<CreateAcount> = data => {
        axios.post('https://merodibackend-2.onrender.com/user', {
            email: data.email,
            password: data.password,
        })
            .then((res) => {
                alert('You Are Registered')
                router.push('/login')
            })
            .catch((err) => {
                alert('Error')
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image src="/loginPageImg.png" alt="login page image" fill objectFit='cover' />
            </div>
            <div className={styles.createAcountWraper}>
                <div className={styles.createAcountBox} >
                    <h1>Create Account</h1>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.inputs}>
                            <Input title="Email" titleColor="#00101A" register={{
                                ...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Email is invalid'
                                    }
                                })
                            }} error={errors.email} />
                            <Input title="Password" titleColor="#00101A" icon={true} register={{
                                ...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters long'
                                    },
                                    maxLength: {
                                        value: 255,
                                        message: 'Password must be less than 255 characters long'
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number and one character',
                                    }
                                })
                            }} error={errors.password} />
                            <Input title="Confirm Password" titleColor="#00101A" icon={true} register={{
                                ...register('passwordConfirm', {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    validate: (value: any) => value === getValues('password') || 'The passwords do not match',
                                })
                            }} error={errors.passwordConfirm} />
                        </div>
                        <div className={styles.submitBox}>
                            <PrimaryButton onClick={() => { handleSubmit(onSubmit) }} styles={{
                                width: '100%',
                            }} >{'Create Account'}</PrimaryButton>
                            <p>Already have an account? <Link href={'./login'} className={styles.link}>Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAcount;