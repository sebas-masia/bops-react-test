import { MaterialTable, MaterialCategoriesSummary, FloatingSearchBox, NotificationsLauncher } from '@Components';
import { Container } from './component.styles';

const Home = () => {
  const onSearchResult = (result: string) => {};

  return (
    <Container>
      <FloatingSearchBox onSearchResult={(result: string) => onSearchResult(result)} />
      <NotificationsLauncher />
      <MaterialCategoriesSummary />
      <MaterialTable />
    </Container>
  );
};

export default Home;
