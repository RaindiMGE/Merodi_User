import { PlaylistInfo } from "@/app/(authorized)/playlist/page";

export const duration = (duration: number) => {
    const time = `${Math.floor(duration / 60)}: ${Math.floor(duration % 60) < 10 ? `0${Math.floor(duration % 60)}` : Math.floor(duration % 60)}`
    return time;
}

export const getMusicsIds = (playlistId: number, playlists: PlaylistInfo[]) => {
    const playlist = playlists.find((playlist) => playlist.id === playlistId);
    let musicsIds: number[] = []
    if(playlist) {
        musicsIds = playlist.musics.map((music) => music.id );  
    }
    return musicsIds;
}

export const getNewArray = (musicsIds: number[], musicId: number) => {
    const newArray: number[] = []
    for(let i = 0; i < musicsIds.length; i++) {
        if(musicsIds[i] !== musicId) {
            newArray.push(musicsIds[i])
        }
    }
    const updatedData = {
        musicIds: newArray
    };
    return updatedData
}