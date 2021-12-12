import Link from 'next/dist/client/link';
import MainLayout from '../../layouts/main.layout';

export default function Orders({ dataUsers, dataProducts }) {
  return (
    <MainLayout title={'My orders'}>
      <h1>Заказы, которые вы сделали</h1>
      <Link href={'/'}>
        <a>Перейти к домашней странице</a>
      </Link>
      <br />
      <ul>
        {dataProducts.map((item) => (
          <li key={item.product_id}>
            <h3>{item.product_name}</h3>
            <h4>
              Владелец услуги:{' '}
              <strong>
                {dataUsers.find((el) => el.user_id === item.user_id).user_name}
              </strong>
            </h4>
            <Link href={`/products/${item.product_id}`}>
              <a>Перейти на страницу продукта</a>
            </Link>
            <p>{item.product_desc}</p>
            <p>{item.product_cost} р.</p>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
}
export async function getServerSideProps(ctx) {
  const { req } = ctx;

  const { cookies } = req;
  const responseOrders = await fetch(
    `http://localhost:3000/server/orders/${cookies.user_id}`,
  );
  const dataOrders = await responseOrders.json();
  if (!dataOrders) {
    return {
      notFound: true,
    };
  }

  const resUsers = await fetch(`http://localhost:3000/server/users`);
  const dataUsers = await resUsers.json();

  if (!dataUsers) {
    return {
      notFound: true,
    };
  }

  const dataProducts = await Promise.all(
    dataOrders.map(async (el) => {
      const responseProducts = await fetch(
        `http://localhost:3000/server/products/${el.product_id}`,
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
    props: { dataOrders, dataUsers, dataProducts },
  };
}
