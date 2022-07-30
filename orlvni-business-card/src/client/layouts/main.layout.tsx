import { Router, useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';

export default function MainLayout({ children, title, name, host }) {
  const router = useRouter();
  const [layoutTitle, setTitle] = useState();
  useEffect(() => setTitle(title));
  async function LogOut(event) {
    event.target.disabled = true;
    await fetch(`${host}/server/logout`, {
      method: 'post',
    });
    router.reload();
    event.target.disabled = false;
  }

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
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
        <title>{layoutTitle} | Avito на минималках</title>
      </Head>
      <nav>
        <div
          style={{
            borderBottom: 'solid black 1px',
            padding: '3px',
            borderRadius: '10px',
          }}
          title="О, смотрите, тут высвечивается имя, которое вы указали!"
        >
          {name}
        </div>
        <Link href={'/'}>
          <a>Домашняя страница</a>
        </Link>
        <Link href={'/products'}>
          <a>Услуги</a>
        </Link>
        <Link href={'/users'}>
          <a>Пользователи</a>
        </Link>
        <Link href={'/orders'}>
          <a>Мои заказы</a>
        </Link>

        <button onClick={LogOut}>Выйти из аккаунта</button>
      </nav>
      <main>{loading ? <div className="donut" /> : children}</main>
    </>
  );
}
