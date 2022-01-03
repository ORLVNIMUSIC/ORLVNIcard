import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
import MainLayout from '../../layouts/main.layout';

export default function Products({ cookies, host }) {
  const [data, setData] = useState(null);

  async function fetchData() {
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

    setData({
      products: fetchedProducts,
      users: fetchedUsers,
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function checkboxHandler(event) {
    event.target.disabled = true;
    setData(null);

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
      {data ? (
        data.products.map((item) => (
          <div className="container" key={item.product_id}>
            <h3>{item.product_name}</h3>
            <h4>
              Предоставляет услугу:{' '}
              {data.users.find((el) => el.user_id === item.user_id).user_name}
            </h4>
            <Link href={`/products/${item.product_id}`}>
              <a>Перейти на страницу услуги</a>
            </Link>
            <p>{item.product_desc}</p>
            <p>{item.product_cost} р.</p>
            <p>{item.product_availability ? 'Доступна' : 'Недоступна'}</p>
          </div>
        ))
      ) : (
        <div className="container">
          <div className="donut" />
        </div>
      )}
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
