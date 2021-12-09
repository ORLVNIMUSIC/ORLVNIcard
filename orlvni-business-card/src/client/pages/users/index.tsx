import Link from 'next/dist/client/link';

export default function Users({ dataUsers }) {
  async function createUser(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/server/users', {
      method: 'post',
      body: JSON.stringify({
        user_id: 'default',
        user_name: event.target.user_name.value,
        user_bio: event.target.user_bio.value,
        user_password: event.target.user_password.value,
        user_email: event.target.user_email.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = response.json();
    if (data) {
      console.log('Удачный INSERT');
    }
  }
  return (
    <>
      <h1>Посмотри какие услуги я зафетчил из своей бд</h1>
      <Link href={'/'}>
        <a>Перейти к домашней странице</a>
      </Link>
      <ul>
        {dataUsers.map((item) => (
          <li key={item.user_id}>
            <p>{item.user_name}</p>
            <p>{item.user_bio}</p>
            <p>{item.user_email}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={createUser}>
        <label htmlFor="user_email">Электронная почта</label>
        <input name="user_email" type="text" required />
        <label htmlFor="user_password">Пароль</label>
        <input name="user_password" type="text" required />
        <label htmlFor="user_name">Имя</label>
        <input name="user_name" type="text" autoComplete="name" required />
        <label htmlFor="user_bio">Биография</label>
        <input name="user_bio" type="text" />
        <button type="submit">Создать</button>
      </form>
    </>
  );
}
export async function getServerSideProps() {
  const resUsers = await fetch(`http://localhost:3000/server/users`);
  const dataUsers = await resUsers.json();

  if (!dataUsers) {
    return {
      notFound: true,
    };
  }

  return {
    props: { dataUsers },
  };
}
