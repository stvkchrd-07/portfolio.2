// Component: /components/Layout.js
import React from "react";
import Head from "next/head";
import ThreeCanvas from "./ThreeCanvas";
const Layout = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
  <link rel="icon" type="image/png" href="/logo2.png.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap" rel="stylesheet" />
    </Head>
    <ThreeCanvas />
    <div className="p-4 md:p-8 font-inter">
      <div className="content-wrapper max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </div>
  </>
);

