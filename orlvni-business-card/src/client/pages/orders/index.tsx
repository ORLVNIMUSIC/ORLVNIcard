import Link from 'next/dist/client/link';
import MainLayout from '../../layouts/main.layout';

export default function Orders({ dataUsers, dataProducts, cookies, host }) {
  return (
    <MainLayout
      title={'My orders'}
      name={cookies.user_name.split(' ')[0]}
      host={host}
    >
      <div className="container header">
        <h1>Заказы, которые вы сделали</h1>
        <hr />
        <button
          onClick={() => {
            alert(`Это страница приобретенных вами услуг, чтобы не забыть.`);
          }}
        >
          Помощь
        </button>
        <hr />
      </div>
      {dataProducts.map((item) => (
        <div className="container" key={item.product_id}>
          <h3>{item.product_name}</h3>
          <p>
            Предоставляет услугу:{' '}
            {dataUsers.find((el) => el.user_id === item.user_id).user_name}
          </p>

          <Link href={`/products/${item.product_id}`}>
            <a>Перейти на страницу продукта</a>
          </Link>
          <p>Описание услуги: {item.product_desc}</p>
          <p>Стоимость услуги: {item.product_cost} р.</p>
        </div>
      ))}
    </MainLayout>
  );
}
export async function getServerSideProps(ctx) {
  const { req } = ctx;
  const { cookies } = req;
  const host = `${process.env.PROTOCOL}://${req.rawHeaders[1]}`;

  const responseOrders = await fetch(
    `${host}/server/orders/${cookies.user_id}`,
  );
  const dataOrders = await responseOrders.json();
  if (!dataOrders) {
    return {
      notFound: true,
    };
  }

  const resUsers = await fetch(`${host}/server/users`);
  const dataUsers = await resUsers.json();

  if (!dataUsers) {
    return {
      notFound: true,
    };
  }

  const dataProducts = await Promise.all(
    dataOrders.map(async (el) => {
      const responseProducts = await fetch(
        `${host}/server/products/${el.product_id}`,
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
    props: { dataOrders, dataUsers, dataProducts, cookies, host },
  };
}
