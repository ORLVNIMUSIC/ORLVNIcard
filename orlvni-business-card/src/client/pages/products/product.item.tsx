import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';

export default function ProductItems({ host, checked }) {
  const [data, setData] = useState(null);

  async function fetchData() {
    const resProducts = checked
      ? await fetch(`${host}/server/products/available`)
      : await fetch(`${host}/server/products/`);
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
    setData(null);
    fetchData();
  }, [checked]);
  return data ? (
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
  );
}
