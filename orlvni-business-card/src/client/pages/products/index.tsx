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
    // helpText={`Это страница опубликованных услуг. В этом разделе можно просмотреть все услуги, опубликованные в этом приложении другими пользователями. Изначально показываются только услуги, которые доступны для приобретения. Чтобы просмотреть все поменяйте значение чекбокса ниже.

    // Также у вас есть возможность создать свою собственную услугу. Для этого кликните на соответствующую ссылку.`}
    >
      <div className="container header">
        <h1>Список всех доступных услуг</h1>
        <Link href={'/products/create'}>
          <a>Создать свою услугу</a>
        </Link>
        <hr />
        <label>
          <input
            type="checkbox"
            onChange={checkboxHandler}
            checked={checkbox}
            style={{ margin: 0 }}
          />
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
