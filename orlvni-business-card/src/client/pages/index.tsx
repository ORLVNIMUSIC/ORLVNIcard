import Link from 'next/link';
import MainLayout from '../layouts/main.layout';

export default function Index() {
  return (
    <MainLayout title={'Home'}>
      <h1>Добро пожаловать на Avito на минималках</h1>
      <Link href={'/products'}>
        <a>Перейти к услугам</a>
      </Link>
      <br />
      <Link href={'/orders'}>
        <a>Перейти к моим заказам</a>
      </Link>
      <br />
      <Link href={'/users'}>
        <a>Перейти к пользователям</a>
      </Link>
    </MainLayout>
  );
}
