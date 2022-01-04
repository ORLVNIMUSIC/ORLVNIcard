import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
import MainLayout from '../../layouts/main.layout';
import ProductItems from './product.item';

export default function Products({ cookies, host }) {
  const [checkbox, setCheckbox] = useState(true);

  async function checkboxHandler(event) {
    event.target.disabled = true;
    setCheckbox(checkbox ? false : true);
    event.target.disabled = false;
  }

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
        <input
          type="checkbox"
          onChange={checkboxHandler}
          name="AvailableOnly"
          checked={checkbox}
          style={{ margin: 0 }}
        />
        <label htmlFor="AvailableOnly" id="AvailableLabel">
          Посмотреть только доступные
        </label>
      </div>
      <ProductItems host={host} checked={checkbox} />
    </MainLayout>
  );
}
export async function getServerSideProps(ctx) {
  const { req } = ctx;
  const { cookies } = req;
  const host = `${process.env.PROTOCOL}://${req.rawHeaders[1]}`;

  return {
    props: { cookies, host },
  };
}
