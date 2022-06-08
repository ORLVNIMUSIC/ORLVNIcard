import Link from 'next/link';

export default function HomePageLinks() {
  return (
    <>
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
    </>
  );
}
