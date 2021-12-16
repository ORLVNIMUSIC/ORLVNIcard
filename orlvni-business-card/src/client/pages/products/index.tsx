import Link from 'next/dist/client/link';
import { useEffect, useRef, useState } from 'react';
import MainLayout from '../../layouts/main.layout';

export default function Products({ dataProducts, dataUsers, cookies, host }) {
  return (
    <MainLayout
      title={'Products'}
      name={cookies.user_name.split(' ')[0]}
      host={host}
    >
      <div className="container header">
        <h1>Список всех доступных услуг</h1>
        <Link href={'/'}>
          <a>Перейти к домашней странице</a>
        </Link>
        <br />
        <Link href={'/products/create'}>
          <a>Создать свою услугу</a>
        </Link>
        <br />
      </div>
      {dataProducts.map((item) => (
        <div className="container" key={item.product_id}>
          <h3>{item.product_name}</h3>
          <h4>
            Предоставляет услугу:{' '}
            <strong>
              {dataUsers.find((el) => el.user_id === item.user_id).user_name}
            </strong>
          </h4>
          <Link href={`/products/${item.product_id}`}>
            <a>Перейти на страницу услуги</a>
          </Link>
          <p>{item.product_desc}</p>
          <p>{item.product_cost} р.</p>
          <p>{item.product_availability ? 'Доступна' : 'Недоступна'}</p>
        </div>
      ))}
    </MainLayout>
  );
}
export async function getServerSideProps(ctx) {
  const { req } = ctx;
  const { cookies } = req;
  const host = `${process.env.PROTOCOL}://${req.rawHeaders[1]}`;
  const resProducts = await fetch(`${host}/server/products/available`);
  const dataProducts = await resProducts.json();
  if (!dataProducts) {
    return {
      notFound: true,
    };
  }

  const dataUsers = await Promise.all(
    dataProducts.map(async (el) => {
      const responseProducts = await fetch(
        `${host}/server/users/${el.user_id}`,
      );

      const oneProduct = await responseProducts.json();
      if (!oneProduct) {
        return {
          notFound: true,
        };
      }
      return oneProduct;
    }),
  );

  return {
    props: { dataProducts, dataUsers, cookies, host },
  };
}
