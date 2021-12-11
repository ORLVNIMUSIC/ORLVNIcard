import Link from 'next/dist/client/link';

export default function Users({ dataUsers }) {
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
