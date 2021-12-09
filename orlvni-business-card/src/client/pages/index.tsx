import Link from 'next/link';

export default function Index() {
  return (
    <>
      <h1>Hello my little boi!</h1>
      <Link href={'/products'}>
        <a>Перейти к услугам</a>
      </Link>
      <br />
      <Link href={'/users'}>
        <a>Перейти к пользователям</a>
      </Link>
    </>
  );
}
