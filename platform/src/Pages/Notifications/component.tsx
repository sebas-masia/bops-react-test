import { useNavigate } from 'react-router-dom';
import { FloatingSearchBox, NotificationsLauncher, NotificationsTable } from '@Components';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const onSearchResult = (result: string) => {
    navigate({
      pathname: `/network/?m=${result}`,
    });
  };

  return (
    <>
      <FloatingSearchBox onSearchResult={(result: string) => onSearchResult(result)} />
      <NotificationsLauncher />
      <NotificationsTable />
    </>
  );
};

export default NotificationsPage;
