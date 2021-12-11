import Link from 'next/dist/client/link';
import { useRouter } from 'next/dist/client/router';

export default function Product({ dataProducts, dataUsers, cookies }) {
  const router = useRouter();
  async function UseProduct() {
    const responseCreateOrder = await fetch(
      `http://localhost:3000/server/orders/`,
      {
        method: 'post',
        body: JSON.stringify({
          oder_id: 'default',
          product_id: dataProducts.product_id,
          user_id: cookies.user_id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(responseCreateOrder);

    const createOrderData = await responseCreateOrder.json();

    if (createOrderData.message == 'Good') {
      const responseUpdateProduct = await fetch(
        `http://localhost:3000/server/products/${dataProducts.product_id}`,
        {
          method: 'put',
        },
      );
      if (responseUpdateProduct) {
        console.log('Удачный UPDATE');
        router.push('/');
      }
    }
  }
  return (
    <>
      <h1>{dataProducts.product_name}</h1>
      <Link href={'/'}>
        <a>Перейти к домашней странице</a>
      </Link>
      <p>Владелец услуги: {dataUsers.user_name}</p>
      <button
        disabled={!dataProducts.product_availability}
        onClick={UseProduct}
      >
        Воспользоваться услугой
      </button>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const { req } = ctx;

  const { cookies } = req;
  const resProducts = await fetch(
    `http://localhost:3000/server/products/${id}`,
  );

  const dataProducts = await resProducts.json();

  if (!dataProducts) {
    return {
      notFound: true,
    };
  }

  const resUsers = await fetch(
    `http://localhost:3000/server/users/${dataProducts.user_id}`,
  );
  const dataUsers = await resUsers.json();

  if (!dataUsers) {
    return {
      notFound: true,
    };
  }

  return {
    props: { dataProducts, dataUsers, cookies },
  };
}
