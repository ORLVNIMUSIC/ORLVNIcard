import Link from 'next/dist/client/link';
import MainLayout from '../../layouts/main.layout';

export default function Users({ dataUsers }) {
  return (
    <MainLayout title={'Users'}>
      <div className="container">
        <h1>Посмотри какие услуги я зафетчил из своей бд</h1>
        <Link href={'/'}>
          <a>Перейти к домашней странице</a>
        </Link>
      </div>
      {dataUsers.map((item) => (
        <div className="container">
          <p>{item.user_name}</p>
          <p>{item.user_bio}</p>
          <p>{item.user_email}</p>
        </div>
      ))}
    </MainLayout>
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
