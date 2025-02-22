'use client'

import React from 'react'
import Styles from './PlayList.module.scss'
import Image from 'next/image'
import Link from 'next/link';

interface Props {
    Image: string;
    Title: string;
    songsNumber: number;
    id: number;
}

const PlayList = (props: Props) => {
  return (
    <Link href={`/playlist?id=${props.id}`}>
          <div className={Styles.PlayListContent}>
              <div className={Styles.YourFavorites}>
                  <img
                      src={props.Image}
                      alt={'Favorite Frame'}
                      width={48}
                      height={48} />

                  <div className={Styles.YourFavoritesContent}>
                      <div className={Styles.YourFavoritesText}>
                          <p>{props.Title}</p>
                      </div>
                      <div className={Styles.YourFavoritesCounter}>
                          <Image
                              src={'/images/BurgerMenu/Music.svg'}
                              alt={'Favorite Frame'}
                              width={20}
                              height={20} />

                          <p>Playlist ◦ {`${props.songsNumber}`} Songs</p>
                      </div>
                  </div>
              </div>
          </div>
    </Link>
  )
}

export default PlayList