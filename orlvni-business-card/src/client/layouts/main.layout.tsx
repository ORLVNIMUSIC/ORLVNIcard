import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

export default function MainLayout({ children, title }) {
  const router = useRouter();
  async function LogOut() {
    await fetch('http://localhost:3000/server/logout', {
      method: 'post',
    });
    router.reload();
  }
  return (
    <>
      <head>
        <title>{title} | Avito на минималках</title>
        <meta charSet="utf-8" />
      </head>
      <nav>
        <Link href={'/'}>
          <a>Домашняя страница</a>
        </Link>
        <Link href={'/products'}>
          <a>Услуги</a>
        </Link>
        <Link href={'/users'}>
          <a>Пользователи</a>
        </Link>
        <Link href={'/orders'}>
          <a>Мои заказы</a>
        </Link>

        <button onClick={LogOut}>Выйти из аккаунта</button>
      </nav>
      <main>{children}</main>
    </>
  );
}
