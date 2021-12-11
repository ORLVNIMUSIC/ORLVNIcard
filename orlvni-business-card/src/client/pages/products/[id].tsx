import Link from 'next/dist/client/link';

export default function Product({ dataProducts, dataUsers }) {
  async function UseProduct() {
    const response = await fetch(
      `http://localhost:3000/server/products/${dataProducts.product_id}`,
      {
        method: 'put',
      },
    );
    if (response) {
      console.log('Удачный UPDATE');
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
    props: { dataProducts, dataUsers },
  };
}
