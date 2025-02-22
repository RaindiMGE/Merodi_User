'use client'

import React, { useState } from 'react'
import Styles from './Navbar.module.scss'
import SideBar from '../SideHeader/SideBar'
import Image from 'next/image'
import Search from '@/app/Components/searchbutton/Search'
import SearchDropdown from '@/app/Components/SearchDropdown/SearchDropdown'
import { burgerMenu } from '@/app/states'
import { useRecoilState } from 'recoil'
import Link from 'next/link'
import Icon from '@/app/Components/IconComponent/IconComponent'
import { deleteCookie } from '@/helpers/cookies'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [navBar] = useRecoilState(burgerMenu)

    const onLogoutClick = () => {
        deleteCookie('token')
    }

    return <nav className={Styles.Navbar}>
        <div className={Styles.Navdisplay}>
            <SideBar isOpen={isOpen} setIsOpen={(val) => setIsOpen(val)} />
            {navBar && <div className={Styles.burger_svg} onClick={() => setIsOpen(prev => !prev)}>
                <Image
                    src={'/images/BurgerMenu/BurgerMenu.svg'}
                    alt={'Burger Menu'}
                    width={32}
                    height={32}
                />
            </div>}
            <div className={Styles.SearchWrapper}>
                <Search placeholder={'What can I play for you?'} />
                <Link href={'/login'} className={Styles.link} onClick={onLogoutClick}>
                    <Icon icon='logOutIcon.svg' hoverIcon='logOutHoverIcon.svg' clickIcon='logOutIcon.svg' iconSize={24} />
                </Link>
            </div>
        </div>

    </nav>
}



export default Navbar
