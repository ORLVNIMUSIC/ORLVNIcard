import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  async function createUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/server/users', {
      method: 'post',
      body: JSON.stringify({
        user_id: 'default',
        user_password: event.target.user_password.value,
        user_email: event.target.user_email.value,
        user_name: event.target.user_name.value,
        user_bio: event.target.user_bio.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    switch (data.message) {
      case 'success':
        console.log('Удачный SIGNUP');
        router.push('/login');
        break;
      case 'denied':
        console.log('Неудачный SIGNUP');
        break;
    }
  }
  return (
    <>
      <h1>Укажите данные для регистрации</h1>
      <form onSubmit={createUser}>
        <label htmlFor="user_email">Электронная почта</label>
        <input name="user_email" type="text" required />
        <label htmlFor="user_password">Пароль</label>
        <input name="user_password" type="text" required />
        <label htmlFor="user_name">Имя</label>
        <input name="user_name" type="text" autoComplete="name" required />
        <label htmlFor="user_bio">Биография</label>
        <input name="user_bio" type="text" />
        <button type="submit">Регистрация</button>
      </form>
      <h2>Уже зарегистрированны?</h2>
      <Link href={'/login'}>Войти</Link>
    </>
  );
}
