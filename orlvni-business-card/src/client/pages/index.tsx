import Link from 'next/link';
import { useEffect, useState } from 'react';
import MainLayout from '../layouts/main.layout';

export default function Index({ cookies, host }) {
  return (
    <MainLayout
      title={'Home'}
      name={cookies.user_name.split(' ')[0]}
      host={host}
    >
      <div className="container header">
        <h1>Добро пожаловать на Avito на минималках</h1>
        <hr />
        <button
          onClick={() => {
            alert(
              `Это домашняя страница приложения. Тут представлен интерфейс для перехода к разным разделам и модуль обратной связи с разработчиками.`,
            );
          }}
        >
          Помощь
        </button>
        <hr />
        <Link href={'/products'}>
          <a>Перейти к услугам</a>
        </Link>
        <br />
        <Link href={'/orders'}>
          <a>Перейти к моим заказам</a>
        </Link>
        <br />
        <Link href={'/users'}>
          <a>Перейти к пользователям</a>
        </Link>
      </div>
    </MainLayout>
  );
}
export async function getServerSideProps(ctx) {
  const { req } = ctx;

  const { cookies } = req;
  const host: string = `${process.env.PROTOCOL}://${req.rawHeaders[1]}`;

  return {
    props: { cookies, host },
  };
}
