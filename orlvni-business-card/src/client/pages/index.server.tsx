import HomePageLinks from '../components/homePageLinks.client';
import MainLayout from '../layouts/main.layout';
import HelpButton from '../components/helpButton.client';
import Suggestions from '../components/suggestions.client';
import SuggestionsData from '../components/suggestions.server';

export default function Index({ suggestionsData }) {
  return (
    <MainLayout>
      <div className="container header">
        <h1>Добро пожаловать на Avito на минималках</h1>
        <hr />
        <HelpButton
          helpText={
            'Это домашняя страница приложения. Тут представлен интерфейс для перехода к разным разделам и модуль обратной связи с разработчиками.'
          }
        />
        <HomePageLinks />
        <Suggestions>
          <SuggestionsData sugData={suggestionsData} />
        </Suggestions>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const resSuggest = await fetch(`http://localhost:3000/server/suggest`);
  const suggestionsData = await resSuggest.json();
  if (!suggestionsData) {
    alert('Что-то пошло не так, попробуйте еще раз');
  }
  suggestionsData.sort((a, b) => {
    return Date.parse(b.sug_date) - Date.parse(a.sug_date);
  });

  return { props: { suggestionsData } };
}
