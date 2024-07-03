import { useMemo } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faClipboardCheck, faArchive } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Notification } from '@Models';
import { useGetNotificationsQuery } from '@Store';
import { Column } from '@Components';
import NotificationTable from './notificationsTable';
import { CompletedIconDiv, IconDiv, Cell } from './notificationsTable.styles';

const NotificationTableContainer = () => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate({
      pathname: `/network/?m=${row.original.materialId}`,
    });
  };

  const prepareStatusCell = (row): JSX.Element => {
    let icon = faClipboardList as IconDefinition;
    let completed = false;
    if (row.original.status === 'Pass') {
      icon = faArchive as IconDefinition;
      completed = true;
    } else if (row.original.status === 'FollowUp') {
      icon = faClipboardCheck as IconDefinition;
      completed = true;
    }

    return (
      <IconDiv onClick={() => handleRowClick(row)}>
        {completed ? (
          <CompletedIconDiv>
            <FontAwesomeIcon icon={icon} />
          </CompletedIconDiv>
        ) : (
          <FontAwesomeIcon icon={icon} />
        )}
      </IconDiv>
    );
  };

  const prepareBasePropertyCell = (row, accessor): JSX.Element => (
    <Cell onClick={() => handleRowClick(row)}>{row.values[accessor]}</Cell>
  );

  const { data: notificationData, error, isLoading, isFetching } = useGetNotificationsQuery(undefined); // TODO handle error
  if (error) console.log('useGetNotificationsQuery ~ error', error);

  const notifications: Notification[] = notificationData || [];

  const columns: Column[] = useMemo(() => {
    const statusColumn = {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }) => prepareStatusCell(row),
    };

    const properties = [
      { Header: 'Alert', accessor: 'alert' },
      { Header: 'Product', accessor: 'materialId' },
      { Header: 'Location', accessor: 'location' },
      { Header: 'KPI', accessor: 'kpiName' },
      { Header: 'Date', accessor: 'timestamp' },
      { Header: 'Recommended Action', accessor: 'action' },
    ];

    const baseColumns = properties.map(({ Header, accessor }) => ({
      Header,
      accessor,
      Cell: ({ row }) => prepareBasePropertyCell(row, accessor),
    }));

    return [statusColumn, ...baseColumns];
  }, [notifications]);

  const rowsFromNotifications = (notificationList: Notification[]) => {
    interface NotRow {
      materialId: string;
      alert: string;
      status: string;
      material: string;
      location: string;
      kpiName: string;
      timestamp: string;
      action: string;
    }

    const rows: NotRow[] = [];

    notificationList.forEach((notification) => {
      const row: NotRow = {
        materialId: notification.materialId,
        status: notification.status,
        alert: notification.alert,
        material: notification.material,
        location: notification.location,
        kpiName: notification.kpiName,
        timestamp: notification.timestamp,
        action: notification.action ? notification.action : '-',
      };

      rows.push(row);
    });

    return rows;
  };

  const data = useMemo(() => rowsFromNotifications(notifications), [notifications]);

  if (isLoading || isFetching) return null;
  return <NotificationTable title="Alerts" columns={columns} data={data} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
  };
};

export default connect(null, mapDispatchToProps)(NotificationTableContainer);
