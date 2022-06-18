import Link from 'next/link';
import { useEffect, useState } from 'react';
import MainLayout from '../layouts/main.layout';

export default function Index({ cookies, host, sugData }) {
  // const [sugData, setSugData] = useState(null);

  // async function fetchSugData() {
  //   const resSuggest: Response = await fetch(`${host}/server/suggest`);
  //   const suggestionsData = await resSuggest.json();
  //   if (!suggestionsData) {
  //     alert('Что-то пошло не так, попробуйте еще раз');
  //   }
  //   suggestionsData.sort((a, b) => {
  //     return Date.parse(b.sug_date) - Date.parse(a.sug_date);
  //   });

  //   setSugData({
  //     suggestions: suggestionsData,
  //   });
  // }

  // useEffect(() => {
  //   fetchSugData();
  // }, []);

  async function sendSug(event) {
    event.preventDefault();
    event.target.submit.disabled = true;
    const regex = new RegExp('[\'"]');
    if (
      !regex.exec(event.target.sug_text.value) &&
      event.target.sug_text.value.trim() !== ''
    ) {
      const response = await fetch(`${host}/server/suggest`, {
        method: 'post',
        body: JSON.stringify({
          user_id: cookies.user_id,
          sug_text: event.target.sug_text.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      switch (data.message) {
        case 'success':
          alert('Спасибо за обратную связь');
          break;
        case 'denied':
          alert('Что-то пошло не так, попробуйте еще раз');
          break;
      }
      event.target.sug_text.value = '';
      // fetchSugData();
      event.target.submit.disabled = false;
    } else {
      event.target.submit.disabled = false;
      alert('Кавычки вида \' и " нельзя вводить');
    }
  }
  return (
    <MainLayout
      title={'Home'}
      name={cookies.user_name.split(' ')[0]}
      host={host}
    >
      <div className="container header">
        <h1>Добро пожаловать на Avito на минималках</h1>
        <hr />
        <button
          onClick={() => {
            alert(
              `Это домашняя страница приложения. Тут представлен интерфейс для перехода к разным разделам и модуль обратной связи с разработчиками.`,
            );
          }}
        >
          Помощь
        </button>
        <hr />
        <Link href={'/products'}>
          <a>Перейти к услугам</a>
        </Link>
        <br />
        <Link href={'/orders'}>
          <a>Перейти к моим заказам</a>
        </Link>
        <br />
        <Link href={'/users'}>
          <a>Перейти к пользователям</a>
        </Link>
      </div>

      <div className="suggestions">
        <form action="submit" onSubmit={sendSug}>
          <label htmlFor="sug_text">Введите пожелания для проекта:</label>
          <br />
          <textarea
            name="sug_text"
            title="Кавычки вида ' и &quot; нельзя вводить"
          />
          <br />
          <button type="submit" name="submit">
            Отправить
          </button>
        </form>
        {sugData ? (
          sugData.map((elem) => (
            <div key={elem.sug_id}>
              <hr />
              <h5>{elem.sug_text}</h5>
              <p>{elem.sug_date.toString()}</p>
            </div>
          ))
        ) : (
          <div className="donut" />
        )}
      </div>
    </MainLayout>
  );
}
export async function getServerSideProps(ctx) {
  const { req } = ctx;

  const { cookies } = req;
  const host: string = `${process.env.PROTOCOL}://${req.rawHeaders[1]}`;

  const sugData = await (await fetch(`${host}/server/suggest`)).json();

  return {
    props: { cookies, host, sugData },
  };
}
