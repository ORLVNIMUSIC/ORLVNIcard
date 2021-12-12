import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import MainLayout from '../layouts/main.layout';

export default function Index() {
  return (
    <MainLayout>
      <h1>Hello my little boi!</h1>
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
