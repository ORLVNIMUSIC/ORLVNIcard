import Link from 'next/dist/client/link';
import { useState } from 'react';
import MainLayout from '../../layouts/main.layout';

export default function Products({
  fetchedProducts,
  fetchedUsers,
  cookies,
  host,
}) {
  const [data, setData] = useState({
    products: fetchedProducts,
    users: fetchedUsers,
  });

  async function checkboxHandler(event) {
    event.target.disabled = true;
    document.getElementById('AvailableLabel').innerHTML =
      'Посмотреть только доступные (данные загружаются)';

    const resProducts = event.target.checked
      ? await fetch(`${host}/server/products/available`)
      : await fetch(`${host}/server/products/`);
    const dataProducts = await resProducts.json();

    const dataUsers = await Promise.all(
      dataProducts.map(async (el) => {
        const resUsers = await fetch(`${host}/server/users/${el.user_id}`);

        const oneUser = await resUsers.json();
        if (!oneUser) {
          return {
            notFound: true,
          };
        }
        return oneUser;
      }),
    );

    setData({
      products: dataProducts,
      users: dataUsers,
    });

    document.getElementById('AvailableLabel').innerHTML =
      'Посмотреть только доступные';
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
          defaultChecked={true}
          style={{ margin: 0 }}
        />
        <label htmlFor="AvailableOnly" id="AvailableLabel">
          Посмотреть только доступные
        </label>
      </div>
      {data.products.map((item) => (
        <div className="container" key={item.product_id}>
          <h3>{item.product_name}</h3>
          <h4>
            Предоставляет услугу:{' '}
            <strong>
              {data.users.find((el) => el.user_id === item.user_id).user_name}
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
  const fetchedProducts = await resProducts.json();
  if (!fetchedProducts) {
    return {
      notFound: true,
    };
  }

  const fetchedUsers = await Promise.all(
    fetchedProducts.map(async (el) => {
      const responseProducts = await fetch(
        `${host}/server/users/${el.user_id}`,
      );

      const oneUser = await responseProducts.json();
      if (!oneUser) {
        return {
          notFound: true,
        };
      }
      return oneUser;
    }),
  );

  return {
    props: { fetchedProducts, fetchedUsers, cookies, host },
  };
}
