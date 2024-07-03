import { useTable, useSortBy, useExpanded, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleDoubleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Select, { SelectOptions } from '../Select/select';

import {
  BodyRow,
  Button,
  Container,
  HeaderRow,
  Pagination,
  PaginationIcon,
  Sorted,
  TableBase,
  TableCard,
  TableContainer,
  TableTools,
  TBody,
  TD,
  TH,
  THead,
} from './table.styles';

export interface Column {
  Header?: string;
  accessor: string;
  Cell?: ({ row: object }) => void;
}

export interface Row {
  values: object;
  depth: number;
  canExpand?: boolean;
  isExpanded?: boolean;
}

interface TableProps {
  columns: Column[];
  data: object[];
  pagination?: boolean;
  sortable?: boolean;
}

const Table = (props: TableProps) => {
  const { columns, data, pagination, sortable } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    useExpanded,
    usePagination,
  );

  const getOptions = () => {
    const options: SelectOptions[] = [10, 15, 20].map((o) => {
      return { value: o.toString(), label: o.toString() };
    });
    return options;
  };

  return (
    <Container>
      <TableContainer>
        <TableCard>
          <TableBase {...getTableProps()}>
            <THead>
              {headerGroups.map((headerGroup) => (
                <HeaderRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    const sortByToggleProps = sortable ? column.getSortByToggleProps() : {};
                    return (
                      <TH {...column.getHeaderProps(sortByToggleProps)}>
                        {column.render('Header')}
                        {column.isSorted && <Sorted>{column.isSortedDesc ? '  ↓' : '  ↑'}</Sorted>}
                      </TH>
                    );
                  })}
                </HeaderRow>
              ))}
            </THead>
            <TBody {...getTableBodyProps()}>
              {pagination
                ? page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <BodyRow {...row.getRowProps()} depth={row.depth}>
                      {row.cells.map((cell) => (
                        <TD {...cell.getCellProps()}>{cell.render('Cell')}</TD>
                      ))}
                    </BodyRow>
                  );
                })
                : rows.map((row) => {
                  prepareRow(row);
                  return (
                    <BodyRow {...row.getRowProps()} depth={row.depth}>
                      {row.cells.map((cell) => (
                        <TD {...cell.getCellProps()}>{cell.render('Cell')}</TD>
                      ))}
                    </BodyRow>
                  );
                })}
            </TBody>
          </TableBase>
        </TableCard>
        <TableTools>
          {pagination && (
            <Pagination>
              <Button onClick={() => gotoPage(0)}>
                <PaginationIcon active={pageIndex !== 0}>
                  <FontAwesomeIcon icon={faAngleDoubleLeft as IconDefinition} />
                </PaginationIcon>
              </Button>
              <Button onClick={() => previousPage()}>
                <PaginationIcon active={pageIndex !== 0}>
                  <FontAwesomeIcon icon={faAngleLeft as IconDefinition} />
                </PaginationIcon>
              </Button>
              {pageOptions.map((i) => (
                <Button onClick={() => gotoPage(i)} active={pageIndex === i}>
                  {i + 1}
                </Button>
              ))}
              <Button onClick={() => nextPage()}>
                <PaginationIcon active={pageIndex !== pageCount - 1}>
                  <FontAwesomeIcon icon={faAngleRight as IconDefinition} />
                </PaginationIcon>
              </Button>
              <Button onClick={() => gotoPage(pageCount - 1)}>
                <PaginationIcon active={pageIndex !== pageCount - 1}>
                  <FontAwesomeIcon icon={faAngleDoubleRight as IconDefinition} />
                </PaginationIcon>
              </Button>
            </Pagination>
          )}
          {pagination && (
            <Select
              defaultValue={getOptions()[0]}
              options={getOptions()}
              onChange={(e: SelectOptions) => {
                setPageSize(Number(e.value));
              }}
            />
          )}
        </TableTools>
      </TableContainer>
    </Container>
  );
};

Table.defaultProps = {
  sortable: true,
  pagination: false,
};

export default Table;
