import { atom } from "recoil";


export const burgerMenu = atom({
    key: 'burgerMenu',
    default: true,
})

export const asideMenu = atom({
    key: 'asideMenu',
    default: true,
})

export const showAddPlaylist = atom({
    key: 'showAddPlaylist',
    default: false
})

export const resetImage = atom({
    key: 'resetImage',
    default: false
})

export const musics = atom<number[]>({
    key: 'musics',
    default: [],
})

export const isPlaylistPage = atom({
    key: 'isPlaylistPage',
    default: false
})

export const mustRefreshPlaylists = atom({
    key: 'mustResetPlaylists',
    default: false
})

export const isHomePage = atom({
    key: 'isHomePage',
    default: false,
})

export const mustPlay = atom({
    key: 'mustPlay',
    default: false
})