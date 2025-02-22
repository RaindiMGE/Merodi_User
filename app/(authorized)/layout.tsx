import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/colors/colors.css";
import "@/app/(authorized)/globals.css";

import RecoilWrapper from "../Components/RecoilWrapper/RecoilWrapper";
import Navbar from "../Components/Header/AsideMenu/NavBar/Navbar";
import AudioPlayer from "../Components/AudioPlayer/AudioMain/AudioPlayer";

const inter = Inter({ subsets: ["latin"] });


export default function AuthorizeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Merodi</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'use-credentials'} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>
        <main className="main">
          <RecoilWrapper>
            <div>
              <div className="header">
                <Navbar />
              </div>
              <div className="contentWrappeer">
                {children}
              </div>
              <div className="footer">
                <AudioPlayer />
              </div>
            </div>
          </RecoilWrapper>
        </main>
      </body>
    </html>
  );
}
