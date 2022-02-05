import { GetServerSideProps } from 'next';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/dist/client/router';
import MainLayout from '../../../layouts/main.layout';

export default function CreateProduct({ cookies, host }) {
  const router = useRouter();
  async function createProduct(event) {
    event.preventDefault();
    event.target.submit.disabled = true;
    const regex = new RegExp('[\'"]');
    if (!regex.exec(event.target.product_desc.value)) {
      const userResponse = await fetch(
        `${host}/server/users/${cookies.user_id}`,
      );
      const userData = await userResponse.json();

      const response = await fetch(`${host}/server/products`, {
        method: 'post',
        body: JSON.stringify({
          product_name: event.target.product_name.value,
          product_desc: event.target.product_desc.value,
          product_cost: event.target.product_cost.value,
          product_availability: true,
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
      event.target.submit.disabled = false;
    } else {
      event.target.submit.disabled = false;
      alert('Кавычки вида \' и " нельзя вводить');
    }
  }
  return (
    <MainLayout
      title={'Create product'}
      name={cookies.user_name.split(' ')[0]}
      host={host}
    >
      <div className="container header">
        <h1>Страница создания услуги</h1>
        <Link href={'/products'}>
          <a>Перейти к услугам</a>
        </Link>
        <hr />
        <button
          onClick={() => {
            alert(
              `Это страница создания своей услуги. Для создания необходимо указать соответствующие поля. Учитывайте, что услуги одноразовые.`,
            );
          }}
        >
          Помощь
        </button>
        <hr />
        <form onSubmit={createProduct}>
          <label htmlFor="product_name">Краткое наименование услуги</label>
          <br />
          <input
            name="product_name"
            type="text"
            autoComplete="product"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <label htmlFor="product_desc">Описание</label>
          <br />
          <textarea
            name="product_desc"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <label htmlFor="product_cost">Цена услуги (в рублях)</label>
          <br />
          <input
            name="product_cost"
            type="number"
            step="0.01"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <button type="submit" name="submit">
            Создать
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async (ctx) => {
  const { req } = ctx;

  const { cookies } = req;
  const host = `${process.env.PROTOCOL}://${req.rawHeaders[1]}`;

  return {
    props: {
      cookies,
      host,
    },
  };
};
