import React from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from '@Components';
import { Container } from './materialCategoriesTable.styles';

export const propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
      accessor: PropTypes.string.isRequired,
      Cell: PropTypes.func.isRequired,
    }).isRequired,
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const MaterialCategoriesTable = ({ columns, data }: { columns: Column[]; data: object[] }) => {
  return (
    <Container>
      <Table columns={columns} data={data} sortable={false} />
    </Container>
  );
};

MaterialCategoriesTable.propTypes = propTypes;

export default MaterialCategoriesTable;
