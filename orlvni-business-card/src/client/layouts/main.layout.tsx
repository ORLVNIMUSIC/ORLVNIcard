import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MainLayout({ children, title, name }) {
  const router = useRouter();
  const [layoutTitle, setTitle] = useState();
  useEffect(() => setTitle(title));
  async function LogOut() {
    await fetch('http://localhost:3000/server/logout', {
      method: 'post',
    });
    router.reload();
  }
  return (
    <>
      <head>
        <title>{layoutTitle} | Avito на минималках</title>
      </head>
      <nav>
        <div
          style={{
            border: 'solid white 1px',
            padding: '3px',
            borderRadius: '10px',
          }}
        >
          {name}
        </div>
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
