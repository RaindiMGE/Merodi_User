'use client'

import { ReactNode, useEffect, useState } from 'react';
import styles from './Input.module.scss';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import Icon from '../IconComponent/IconComponent';


interface Props {
    title: string;
    icon?: boolean;
    titleColor: string;
    error: FieldError | undefined;
    register?: UseFormRegisterReturn;
    value?: string;
    mustReset?: boolean;
}

const Input = (props: Props) => {
    const [inputType, setInputType] = useState(`${props.icon ? 'password' : 'text'}`)
    const [value, setValue] = useState(props.value);

    const onClick = () => {
        if(inputType == 'password') setInputType('text');
        else setInputType('password');
    }

    useEffect(() => {
        if(props.mustReset) {
            setValue('');
        }
    }, [props.mustReset])

    const errorColor = '#E63838';
    const defaultColor = '#505862';

    return (
    <div className={styles.container} >
        <label className={styles.title} htmlFor="input" style={{backgroundColor: `${props.titleColor}`, color: `${props.error ? '#E63838' : '#505862'}`}} >{props.title}</label>
        <div className={styles.inputBox} style={{
            border: `1px solid ${props.error ? errorColor : defaultColor}`,
        }}>
            <input type={inputType} id='input' className={styles.input} {...props.register} value={value} onChange={(e) => setValue(e.target.value)}/>
            {props.icon && <Icon icon={'viewPasswordIcon.svg'} clickIcon={'hidePasswordIcon.svg'} hoverIcon={'viewPasswordIcon.svg'} onClick={onClick} iconSize={24} />}
        </div>
        {props.error && <span className={styles.error}>{props.error.message}</span>}
    </div>
    )
}

export default Input;