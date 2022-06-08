import HomePageLinks from '../components/homePageLinks.client';
import MainLayout from '../layouts/main.layout';

export default function Index() {
  return (
    <MainLayout>
      {/* <HelpButtom
        helpText={
          'Это домашняя страница приложения. Тут представлен интерфейс для перехода к разным разделам и модуль обратной связи с разработчиками.'
        }
      /> */}
      <div className="container header">
        <h1>Добро пожаловать на Avito на минималках</h1>
        <hr />
        <HomePageLinks />
      </div>
    </MainLayout>
  );
}
