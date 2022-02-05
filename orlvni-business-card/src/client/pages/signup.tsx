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
          user_password: event.target.user_password.value,
          user_nickname: event.target.user_nickname.value,
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
          <label htmlFor="user_nickname">Имя пользователя (псевдоним)</label>
          <input
            name="user_nickname"
            type="text"
            required
            pattern="[^'&quot;]+$"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <label htmlFor="user_password">Пароль</label>
          <input
            name="user_password"
            type="password"
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
        <hr />
        <button
          onClick={() => {
            alert(
              `Вы можете зарегистрироваться используя уникальное имя пользователя и пароль.

Убедитесь, что вы помните пароль, так как не существует на данный момент способа восстановления пароля.

Ваше имя будет отображаться сверху в блоке навигации после входа в систему.

После регистрации необходимо будет войти в систему.`,
            );
          }}
        >
          Помощь
        </button>
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
