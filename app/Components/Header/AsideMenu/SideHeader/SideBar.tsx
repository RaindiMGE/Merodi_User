"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Styles from "./Sidebar.module.scss";
import Image from "next/image";
import PlayList from "./PlayList/PlayList";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { asideMenu, isHomePage, mustRefreshPlaylists, showAddPlaylist } from "@/app/states";
import AddPlaylistModel, { Input } from "@/app/Components/AddPlaylistModel/AddPlaylistModel";
import { headers } from "next/headers";
import axios from "axios";
import { getCookie, setCookies } from "@/helpers/cookies";
import { jwtDecode } from "jwt-decode";
import { PlaylistInfo } from "@/app/(authorized)/playlist/page";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";
import { JwtPayload } from "jwt-decode";

interface UploadedFile {
  id: number;
}

const SideBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  return <Suspense>
    <SideBarContent isOpen={isOpen} setIsOpen={setIsOpen} />
  </Suspense>
};

export interface UserInfo {
  id: string;
  email: string;
  playlist: PlaylistInfo[];
}

const SideBarContent = ({
  isOpen,
  setIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const [selectedPage, setSelectedPage] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const handlePageClick = (page: React.SetStateAction<string>) => {
    if (selectedPage === page) {
      setSelectedPage("");
    } else {
      setSelectedPage(page);
    }
  };

  const [userInfo, setUserInfo] = useState<UserInfo>()
  const token = getCookie('token');
  const [homePage] = useRecoilState(isHomePage);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  const [showAddPlaylistModel, setShowAddPlaylist] = useRecoilState(showAddPlaylist);

  const [decodedToken, setDecodedToken] = useState<JwtPayload>();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      setDecodedToken(decoded);
      
    }
  }, [token])

  const getPlaylists = async () => {
    if (decodedToken) {
      try {
        const response = await axios.get(`https://merodibackend-2.onrender.com/user/${decodedToken.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUserInfo(response.data)
      }
      catch (err: any) {
      }
    }
  }

  const [mustRefresh, setMustRefresh] = useRecoilState(mustRefreshPlaylists)

  useEffect(() => {
    if (mustRefresh) {
      getPlaylists()
    }
  }, [mustRefresh])

  useEffect(() => {
    getPlaylists()
  }, [decodedToken])

  const addInfo = async (data: Input, id: number) => {
    const newData = {
      title: data.title,
      userId: [decodedToken?.userId],
      description: data.description,
      imageId: id,
      musicIds: []
    }
    try {
      const response = axios.post('https://merodibackend-2.onrender.com/playlist', newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      getPlaylists()
      alert('Playlist Added')
      setShowAddPlaylist(false)
      setMustReset(true);
      getPlaylists()
    }
    catch {
      alert('Failed')
    }
  }

  const onSubmitClick = (data: Input) => {
    if (!decodedToken) return;
    const formData = new FormData();
    formData.append('file', data.image[0])

    axios.post('https://merodibackend-2.onrender.com/files/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((res) => {
        const file: UploadedFile = res.data;
        addInfo(data, file.id)
      })
      .catch((err) => {
        alert('Error')
      })
  }

  const [mustReset, setMustReset] = useState(false);

  return (
    <>
      <div className={showAddPlaylistModel ? Styles.addPlaylistBox : Styles.hiddenAddPlaylist}>
        <div className={showAddPlaylistModel ? Styles.addPlaylistModelWrapper : Styles.addPlaylist}>
          <AddPlaylistModel buttonTitle="Create" mustReset={mustReset} title={"New Playlist"} onCancelClick={() => {
            setShowAddPlaylist(false)
            setMustReset(true)
          }} onSubmitClick={onSubmitClick} />
        </div>
      </div>
      <aside
        className={`${Styles.Aside} ${isOpen ? Styles.active : ""}`}
        ref={ref}
      >
        <div className={showAddPlaylistModel ? Styles.addPlaylistBox : Styles.hiddenAddPlaylist}></div>
        <div>
          <div className={Styles.SidebarHead}>
            <div className={Styles.LogoBackground}>
              <div className={Styles.LogoContainer}>
                <div className={Styles.LogoContainer_Letter}>
                  <Image src={"/images/BurgerMenu/Logo.svg"} alt={"Logo"} fill />
                </div>

                <div className={Styles.LogoContainer_Full}>
                  <Image src={"/images/BurgerMenu/merodi.svg"} alt={"Logo"} fill />
                </div>
              </div>
            </div>
            <div className={Styles.chosenPages}>
              <Link href={'/'} style={{
                width: '100%'
              }}><div
                className={`${homePage ? Styles.selected : Styles.homePageWrapper}`}
              >
                <Image
                  src={"/images/BurgerMenu/Home.svg"}
                  alt={"Home"}
                  width={24}
                  height={24}
                />
                <p>Home</p>
              </div>
              </Link>
            </div>
            <div className={Styles.CreatePlaylist} onClick={() => setShowAddPlaylist(true)}>
              <div className={Styles.AddButton}>
                <Image
                  src={"/images/BurgerMenu/AddButton.svg"}
                  alt={"Add Button"}
                  width={24}
                  height={24}
                />
              </div>
              <p>Create New Playlist</p>
            </div>
          </div>
          <div className={Styles.playlistsWrapper}>
            {(userInfo && userInfo?.playlist.length !== 0) && userInfo.playlist.map((item, index) => <PlayList key={index} Image={item.imageUrl} Title={item.title} songsNumber={item.musics.length} id={item.id} />)}
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
