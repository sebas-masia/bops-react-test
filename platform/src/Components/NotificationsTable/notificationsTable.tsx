import React from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from '@Components';
import { Container, Title } from './notificationsTable.styles';

export const propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
      accessor: PropTypes.string.isRequired,
      Cell: PropTypes.func.isRequired,
    }).isRequired,
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  title: PropTypes.string.isRequired,
};

const NotificationTable = ({ title, columns, data }: { title: string; columns: Column[]; data: object[] }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Table columns={columns} data={data} pagination />
    </Container>
  );
};

NotificationTable.propTypes = propTypes;

export default NotificationTable;
