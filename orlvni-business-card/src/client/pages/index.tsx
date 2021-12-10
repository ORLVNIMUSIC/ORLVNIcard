import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

export default function Index() {
  const router = useRouter();
  async function LogOut() {
    await fetch('http://localhost:3000/server/logout', {
      method: 'post',
    });
    router.reload();
  }
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
      <button onClick={LogOut}>Выйти из аккаунта</button>
    </>
  );
}
