import { GetServerSideProps } from 'next';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/dist/client/router';
import MainLayout from '../../../layouts/main.layout';

export default function CreateProduct({ cookies }) {
  const router = useRouter();
  async function createProduct(event) {
    event.preventDefault();

    const userResponse = await fetch(
      `/server/users/${cookies.user_id}`,
    );
    const userData = await userResponse.json();

    const response = await fetch(`/server/products`, {
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
    const dataUpdateProduct = await response.json();
    switch (dataUpdateProduct.message) {
      case 'success':
        router.push('/products');
        break;
      case 'denied':
        alert('Что-то пошло не так, попробуйте еще раз');
        break;
    }
  }
  return (
    <MainLayout title={'Create product'} name={cookies.user_name.split(' ')[0]}>
      <div className="container">
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
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <label htmlFor="product_desc">Описание</label>
          <input
            name="product_desc"
            type="text"
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <label htmlFor="product_cost">Цена услуги</label>
          <input
            name="product_cost"
            type="text"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <button type="submit">Создать</button>
        </form>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;

  const { cookies } = req;

  return { props: { cookies } };
};
