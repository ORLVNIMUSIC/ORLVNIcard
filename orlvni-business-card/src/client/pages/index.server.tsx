import Link from 'next/link';
import MainLayout from '../layouts/main.layout';
import HelpButtom from '../components/helpButton.client';

export default function Index() {
  return (
    <MainLayout title={'Home'}>
      <HelpButtom
        helpText={
          'Это домашняя страница приложения. Тут представлен интерфейс для перехода к разным разделам и модуль обратной связи с разработчиками.'
        }
      />
      <div className="container header">
        <h1>Добро пожаловать на Avito на минималках</h1>
        <hr />

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
      </div>
    </MainLayout>
  );
}
