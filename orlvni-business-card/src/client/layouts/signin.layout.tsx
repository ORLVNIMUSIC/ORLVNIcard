import styles from '../styles/signin.module.scss';
import Head from 'next/head';
import React from 'react';
import { Router } from 'next/dist/client/router';

export default function SigninLayout({ children, title }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('findished');
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <>
      <Head>
        <title>{title} | Avito на минималках</title>
        <meta charSet="utf-8" />
      </Head>
      <nav></nav>
      <main>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {loading ? <div className="donut"></div> : children}
          </div>
        </div>
      </main>
    </>
  );
}
