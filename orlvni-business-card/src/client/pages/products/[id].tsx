import Link from 'next/dist/client/link';
import { useRouter } from 'next/dist/client/router';
import MainLayout from '../../layouts/main.layout';

export default function Product({ dataProducts, dataUsers, cookies }) {
  const router = useRouter();
  async function UseProduct() {
    const responseCreateOrder = await fetch(
      `http://localhost:3000/server/orders/`,
      {
        method: 'post',
        body: JSON.stringify({
          order_id: 'default',
          product_id: dataProducts.product_id,
          user_id: cookies.user_id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const createOrderData = await responseCreateOrder.json();

    switch (createOrderData.message) {
      case 'success':
        const responseUpdateProduct = await fetch(
          `http://localhost:3000/server/products/${dataProducts.product_id}`,
          {
            method: 'put',
          },
        );
        const dataUpdateProduct = await responseUpdateProduct.json();
        switch (dataUpdateProduct.message) {
          case 'success':
            router.push('/orders');
            break;
          case 'denied':
            alert('Что-то пошло не так, попробуйте еще раз');
            break;
        }
        break;
      case 'denied':
        alert('Услугу уже использовали');
        router.reload();
        break;
    }
  }
  return (
    <MainLayout title={'Product'} name={cookies.user_name.split(' ')[0]}>
      <div className="container">
        <h1>{dataProducts.product_name}</h1>
        <Link href={'/'}>
          <a>Перейти к домашней странице</a>
        </Link>
        <p>Предоставляет услугу: {dataUsers.user_name}</p>
        <button
          disabled={!dataProducts.product_availability}
          onClick={UseProduct}
        >
          Воспользоваться услугой
        </button>
      </div>
    </MainLayout>
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
