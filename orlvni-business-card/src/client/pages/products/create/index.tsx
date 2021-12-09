import Link from 'next/dist/client/link';

export default function CreateProduct() {
  return (
    <>
      <h1>Страница создания услуги</h1>
      <Link href={'/'}>
        <a>Перейти к домашней странице</a>
      </Link>

      <form>
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
