import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import SigninLayout from '../layouts/signin.layout';

export default function Login() {
  const router = useRouter();
  async function doLogIn(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/server/login', {
      method: 'post',
      body: JSON.stringify({
        user_password: event.target.user_password.value,
        user_email: event.target.user_email.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    switch (data.message) {
      case 'success':
        console.log('Удачный LogIn');
        router.push('/');
        break;
      case 'denied':
        console.log('Неудачный LogIn');
        break;
    }
  }
  return (
    <SigninLayout title={'Login'}>
      <div className="container">
        <h1>Войдите в систему</h1>
        <form onSubmit={doLogIn}>
          <label htmlFor="user_email">Электронная почта</label>
          <input
            name="user_email"
            type="text"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <label htmlFor="user_password">Пароль</label>
          <input
            name="user_password"
            type="text"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <button type="submit">Войти</button>
        </form>
        <h2>Не зарегистрированны в системе?</h2>
        <Link href={'/signup'}>Регистрация</Link>
      </div>
    </SigninLayout>
  );
}
