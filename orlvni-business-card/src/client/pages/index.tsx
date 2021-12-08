import Link from 'next/link';

export default function Index() {
  return (
    <>
      <h1>Hello my little boi!</h1>
      <Link href={'/products'}>
        <a>Перейти к продуктам</a>
      </Link>
    </>
  );
}
