import Link from 'next/dist/client/link';

export default function Products({ dataProducts, dataUsers }) {
  return (
    <>
      <h1>Страница услуги {dataProducts.product_name}</h1>
      <Link href={'/'}>
        <a>Перейти к домашней странице</a>
      </Link>
      <p>Владелец услуги: {dataUsers.user_name}</p>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const resProducts = await fetch(`http://localhost:3000/products_db/${id}`);
  console.log(resProducts);

  const dataProducts = await resProducts.json();

  if (!dataProducts) {
    return {
      notFound: true,
    };
  }

  const resUsers = await fetch(`http://localhost:3000/users_db/${id}`);
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
