import { GetServerSideProps } from 'next';
import Link from 'next/dist/client/link';

export default function CreateProduct({ cookies }) {
  async function createProduct(event) {
    event.preventDefault();

    const userResponse = await fetch(
      `http://localhost:3000/server/users/${cookies.user_id}`,
    );
    const userData = await userResponse.json();

    const response = await fetch('http://localhost:3000/server/products', {
      method: 'post',
      body: JSON.stringify({
        product_id: 'default',
        product_name: event.target.product_name.value,
        product_desc: event.target.product_desc.value,
        product_cost: event.target.product_cost.value,
        user_id: userData.user_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response) {
      console.log('Удачный INSERT');
    }
  }
  return (
    <>
      <h1>Страница создания услуги</h1>
      <Link href={'/'}>
        <a>Перейти к домашней странице</a>
      </Link>

      <form onSubmit={createProduct}>
        <label htmlFor="product_name">Краткое наименование услуги</label>
        <input
          name="product_name"
          type="text"
          autoComplete="product"
          required
        />
        <label htmlFor="product_desc">Описание</label>
        <input name="product_desc" type="text" />
        <label htmlFor="product_cost">Цена услуги</label>
        <input name="product_cost" type="text" required />
        <button type="submit">Создать</button>
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;

  const { cookies } = req;

  return { props: { cookies } };
};
