import Link from 'next/dist/client/link';
import MainLayout from '../../layouts/main.layout';

export default function Products({ dataProducts, dataUsers }) {
  return (
    <MainLayout title={'Products'}>
      <div className="container">
        <h1>Посмотри какие услуги я зафетчил из своей бд</h1>
        <Link href={'/'}>
          <a>Перейти к домашней странице</a>
        </Link>
        <br />
        <Link href={'/products/create'}>
          <a>Создать свою услугу</a>
        </Link>
      </div>
      {dataProducts.map((item) => (
        <div className="container">
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
          <p>{item.product_availability ? 'Доступен' : 'Недоступен'}</p>
        </div>
      ))}
    </MainLayout>
  );
}
export async function getServerSideProps() {
  const resProducts = await fetch(`http://localhost:3000/server/products`);
  const dataProducts = await resProducts.json();
  if (!dataProducts) {
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

  return {
    props: { dataProducts, dataUsers },
  };
}
