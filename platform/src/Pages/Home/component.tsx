import { useNavigate } from 'react-router-dom';
import { MaterialTable, MaterialCategoriesSummary, FloatingSearchBox, NotificationsLauncher } from '@Components';
import { Container } from './component.styles';

const Home = () => {
  const navigate = useNavigate();

  const onSearchResult = (result: string) => {
    if (result) {
      navigate(`/network/?m=${result}`);
    }
  };

  return (
    <Container>
      <FloatingSearchBox onSearchResult={onSearchResult} />
      <NotificationsLauncher />
      <MaterialCategoriesSummary />
      <MaterialTable />
    </Container>
  );
};

export default Home;
