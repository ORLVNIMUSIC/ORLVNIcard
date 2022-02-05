import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import SigninLayout from '../layouts/signin.layout';

export default function Login({ host }) {
  const router = useRouter();
  async function doLogIn(event) {
    event.preventDefault();
    event.target.submit.disabled = true;

    const response = await fetch(`${host}/server/login`, {
      method: 'post',
      body: JSON.stringify({
        user_password: event.target.user_password.value,
        user_nickname: event.target.user_nickname.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    switch (data.message) {
      case 'success':
        router.push('/');
        break;
      case 'denied':
        alert('Ввели неверные данные');
        break;
    }
    event.target.submit.disabled = false;
  }
  return (
    <SigninLayout title={'Login'}>
      <div className="container">
        <h1>Войдите в систему</h1>
        <form onSubmit={doLogIn}>
          <label htmlFor="user_nickname">Имя пользователя (псевдоним)</label>
          <br />
          <input
            name="user_nickname"
            type="text"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <label htmlFor="user_password">Пароль</label>
          <br />
          <input
            name="user_password"
            type="password"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <button type="submit" name="submit">
            Войти
          </button>
        </form>
        <hr />
        <button
          onClick={() => {
            alert(
              `Вы можете войти в систему используя уникальное имя пользователя и пароль.`,
            );
          }}
        >
          Помощь
        </button>
        <h2>Не зарегистрированны в системе?</h2>
        <Link href={'/signup'}>Регистрация</Link>
      </div>
    </SigninLayout>
  );
}

export async function getServerSideProps(ctx) {
  const { req } = ctx;

  const host = `${process.env.PROTOCOL}://${req.rawHeaders[1]}`;

  return {
    props: { host },
  };
}
