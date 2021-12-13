import Link from 'next/dist/client/link';
import MainLayout from '../../layouts/main.layout';

export default function Users({ dataUsers, cookies }) {
  return (
    <MainLayout title={'Users'} name={cookies.user_name.split(' ')[0]}>
      <div className="container header">
        <h1>Зарегистрированные пользователи</h1>
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
export async function getServerSideProps(ctx) {
  const { req } = ctx;
  const { cookies } = req;
  const resUsers = await fetch(`http://localhost:3000/server/users`);
  const dataUsers = await resUsers.json();

  if (!dataUsers) {
    return {
      notFound: true,
    };
  }

  return {
    props: { dataUsers, cookies },
  };
}
