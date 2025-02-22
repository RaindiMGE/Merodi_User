'use client'

import styles from './page.module.scss';
import Input from "../../Components/Input/Input";
import { PrimaryButton } from '../../Components/Buttons/PrimaryButton/PrimaryButton';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import Image from 'next/image';
import axios from 'axios';
import { setCookies } from '@/helpers/cookies';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';

interface Login {
    email: string;
    password: string;
    checked?: boolean;
}

const Login = () => {

    const [isChecked, setIsChecked] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Login>()
    const router = useRouter();

    const onClick = () => {
        setIsChecked(!isChecked)
    }

    const getUserInfo = (token: string) => {
        return jwtDecode(token);
    }

    const onSubmit: SubmitHandler<Login> = data => {
        axios.post('https://merodibackend-2.onrender.com/auth/login', data)
            .then((res) => {
                setCookies('token', res.data, 60)
                router.push('/')
            })
            .catch((err) => {
                alert('Email Or Passoword Is Incorrect');
            })
    }

    return <div className={styles.container}>
        <div className={styles.imageWrapper}>
            <Image src="/loginPageImg.png" alt="login page image" layout='fill' objectFit='cover' />
        </div>
        <div className={styles.loginWraper}>
            <div className={styles.loginBox} >
                <h1>Login</h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className={styles.inputs}>
                            <Input title="Email" titleColor="#00101A" register={{
                                ...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Email is invalid'
                                    }
                                })
                            }} error={errors.email} />
                            <Input title="Password" titleColor="#00101A" icon={true}
                                register={{
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
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                            message: 'Password must contain at least one lowercase letter, one uppercase letter, one number and one character',
                                        }
                                    })
                                }}
                                error={errors.password} />
                        </div>
                        <div className={styles.checkbox}>
                            <input type="checkbox" id='checkbox' onClick={onClick} />
                            <label htmlFor="chackbox">Remember me</label>
                        </div>
                    </div>
                    <PrimaryButton onClick={() => { handleSubmit(onSubmit) }} styles={{
                        width: '100%'
                    }} >{'Login'}</PrimaryButton>
                </form>
                <p>Don&apos;t have an account?<Link href={'./createAcount'} className={styles.link}> Create one for free</Link></p>
            </div>
        </div>
    </div>
    
}

export default Login;