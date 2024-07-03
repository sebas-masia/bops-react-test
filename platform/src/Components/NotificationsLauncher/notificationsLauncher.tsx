import { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container,
  DropdownContainer,
  IconContainer,
  Button,
  LauncherTitle,
  ListContainer,
  List,
  ListItem,
  TopContainer,
  DetailsButton,
  OpenItem,
  OpenIndicator,
  ItemContainer,
} from './notificationsLauncher.styles';

const defaultState = false;

const propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      materialId: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      alert: PropTypes.string.isRequired,
      material: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      action: PropTypes.string,
    }).isRequired,
  ).isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onNotificationClick: PropTypes.func.isRequired,
};

const NotificationsLauncher = ({
  notifications,
  onShowMoreClick,
  onNotificationClick,
}: InferProps<typeof propTypes>) => {
  const [active, setActive] = useState(defaultState);
  const onClick = () => {
    const updateActive = !active;
    setActive(updateActive);
  };

  return (
    <Container>
      <IconContainer>
        <Button active={active} onClick={onClick}>
          <FontAwesomeIcon icon="bell" size="lg" />
        </Button>
      </IconContainer>
      {active ? (
        <DropdownContainer>
          <ListContainer>
            <TopContainer>
              <LauncherTitle>Notifications</LauncherTitle>
              <DetailsButton onClick={onShowMoreClick}>Show More</DetailsButton>
            </TopContainer>
            <List>
              {notifications.slice(0, 8).map((notification) => {
                const item = (
                  <ItemContainer key={notification.materialId + notification.timestamp}>
                    <ListItem
                      key={notification.materialId + notification.timestamp}
                      onClick={() => onNotificationClick(notification.materialId)}>
                      {notification.alert} on <b>{notification.material}</b> @ <b>{notification.location}</b>
                    </ListItem>
                  </ItemContainer>
                );

                const openItem = (
                  <OpenItem key={notification.materialId + notification.timestamp}>
                    <ItemContainer>
                      <OpenIndicator />
                      <ListItem onClick={() => onNotificationClick(notification.materialId)}>
                        {notification.alert} on <b>{notification.material}</b> @ <b>{notification.location}</b>
                      </ListItem>
                    </ItemContainer>
                  </OpenItem>
                );

                return notification.status === 'Open' ? openItem : item;
              })}
            </List>
          </ListContainer>
        </DropdownContainer>
      ) : null}
    </Container>
  );
};

NotificationsLauncher.propTypes = propTypes;

export default NotificationsLauncher;
