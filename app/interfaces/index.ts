import { AlbumInfo } from "../(authorized)/album/page";
import { ArtistInfo } from "../(authorized)/artist/page";
import { MusicInfo } from "../Components/AudioPlayer/AudioMain/AudioPlayer";

export interface PrimaryButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    styles?: {};
    type?: 'submit' | 'button'
}

export interface SecondaryButtonProps {
    title: string;
    icon?: string;
    disabled?: boolean;
    onClick?: () => void;
}


export interface SearchDataType {
    musics: MusicInfo[];
    authors: ArtistInfo[];
    albums: AlbumInfo[];
}

export interface SearchArtists {
    id: number;
    name: string;
}

export interface SearchAlbums {
    id: number;
    name: string;
}

export interface SearchMusics {
    id: number;
    name: string;
}
