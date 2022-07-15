import Head from 'next/head';
import React from 'react';
import '../styles/main.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Avito</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
