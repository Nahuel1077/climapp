import React from 'react';
import Image from "next/image"; 
import Home from './page';
import "./globals.css";
import useClient from "next";

export const metadata = {
  title: 'Climapp',
  description: 'Weather app in real time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div><Image src="/climapp.svg" id="logo" width="110" height="110" alt="logo" object-position= "0px 10px"/></div>
          <ul>
            <li>Home</li>
            <li>About</li>
          </ul>
        </nav>
        {children}
        <footer>
          <h1>Climapp fue desarrollado con Meteosource</h1>
          <a href="https://www.meteosource.com">www.meteosource.com</a>     
        </footer>
      </body>
    </html>
  )
}
