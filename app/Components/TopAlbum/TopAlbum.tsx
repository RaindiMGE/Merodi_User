"use client";

import React from 'react';
import Styles from './Topalbum.module.scss';

interface Album {
  coverImage: string;
  title: string;
  artist: string;
}

interface AlbumListProps {
  title: string;
  albums: Album[];
}

const TopAlbum: React.FC<AlbumListProps> = ({ title, albums }) => {
  return (
    <section className={Styles.Topalbum}>
      <div className={Styles.Albumtoptext}>
        <p>TopAlbums</p>
      </div>
      <div className={Styles.Albums}>
       
      </div>
    </section>
  );
};

export default TopAlbum;