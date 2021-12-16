import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import SigninLayout from '../layouts/signin.layout';

export default function Login({ host }) {
  const router = useRouter();

  async function createUser(event) {
    event.preventDefault();
    event.target.submit.disabled = true;
    const regex = new RegExp('[\'"]');
    if (!regex.exec(event.target.user_bio.value)) {
      const response = await fetch(`${host}/server/users`, {
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
          alert('Вы удачно зарегистрировались');
          router.push('/login');
          break;
        case 'denied':
          alert('Что-то пошло не так, попробуйте еще раз');
          break;
        case 'email is used':
          alert('Эта почта уже занята');
          break;
      }
      event.target.submit.disabled = false;
    } else {
      event.target.submit.disabled = false;
      alert('Кавычки вида \' и " нельзя вводить');
    }
  }
  return (
    <SigninLayout title={'Sign up'}>
      <div className="container">
        <h1>Укажите данные для регистрации</h1>
        <form onSubmit={createUser}>
          <label htmlFor="user_email">Электронная почта</label>
          <input
            name="user_email"
            type="text"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <label htmlFor="user_password">Пароль</label>
          <input
            name="user_password"
            type="text"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <label htmlFor="user_name">Имя</label>
          <input
            name="user_name"
            type="text"
            autoComplete="name"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <label htmlFor="user_bio">Биография</label>
          <br />
          <textarea
            name="user_bio"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <button type="submit" name="submit">
            Регистрация
          </button>
        </form>
        <h2>Уже зарегистрированны?</h2>
        <Link href={'/login'}>Войти</Link>
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
