import { useNavigate } from 'react-router-dom';
import { useGetNotificationsQuery } from '@Store';
import { Notification } from '@Models';
import NotificationsLauncher from './notificationsLauncher';

const propTypes = {};

const NotificationsLauncherContainer = () => {
  const navigate = useNavigate();
  const handleNotificationClick = (materialId: string) => {
    navigate({
      pathname: `/network/?m=${materialId}`,
    });
  };

  const handleShowMoreClick = () => {
    navigate({
      pathname: `/notifications`,
    });
  };

  const { data, error, isLoading, isFetching } = useGetNotificationsQuery(undefined); // TODO handle error
  if (error) console.log('file: container.tsx ~ line 16 ~ MaterialCategoriesSummaryContainer ~ error', error);
  if (isLoading || isFetching) return null;

  const notifications: Notification[] = data || [];

  return (
    <NotificationsLauncher
      notifications={notifications}
      onShowMoreClick={handleShowMoreClick}
      onNotificationClick={handleNotificationClick}
    />
  );
};

NotificationsLauncherContainer.propTypes = propTypes;

export default NotificationsLauncherContainer;
