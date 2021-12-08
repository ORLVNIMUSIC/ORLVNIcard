import Link from 'next/dist/client/link';

export default function Products({ dataProducts, dataUsers }) {
  return (
    <>
      <h1>Посмотри какие продукты я зафетчил из своей бд</h1>
      <Link href={'/'}>
        <a>Перейти к домашней странице</a>
      </Link>
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
            <Link href={`http://localhost:3000/products/${item.product_id}`}>
              <a>Перейти на страницу продукта</a>
            </Link>
            <p>{item.product_desc}</p>
            <p>{item.product_cost} р.</p>
            <p>{item.product_availability ? 'Доступен' : 'Недоступен'}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
export async function getServerSideProps() {
  const resProducts = await fetch(`http://localhost:3000/products_db`);
  const dataProducts = await resProducts.json();
  if (!dataProducts) {
    return {
      notFound: true,
    };
  }

  const resUsers = await fetch(`http://localhost:3000/users_db`);
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
