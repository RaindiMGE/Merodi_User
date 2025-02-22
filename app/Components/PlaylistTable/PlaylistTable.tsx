'use client'

import ArtistPlayerCard from '../ArtistPlayerCard/ArtistPlayerCard';

interface AlbumInfo {
    cover?: string;
    title: string;
}

export interface Playlist {
    sequence: string;
    albumInfo: AlbumInfo;
    artistName: string[];
    listensNubmer: string;
    duration: string;
    id: number
}

interface Props {
    playlist: Playlist[] | undefined;
}

const PlaylistTable = (props: Props) => {

    const playlist = props.playlist;

    return <div>
        {playlist && playlist.map((item, index) => <ArtistPlayerCard key={index} id={item.id} sequence={item.sequence} albumInfo={{
            cover: `${item.albumInfo.cover ? item.albumInfo.cover : ''}`,
            title: item.albumInfo.title
        }} artistName={item.artistName} listensNubmer={item.listensNubmer} duration={item.duration} playlist={false} playlistId={0} />)}
    </div>
}

export default PlaylistTable;

