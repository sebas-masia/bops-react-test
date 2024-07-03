import { Table, Column } from '@Components';
import { Container, TableContainer, Title, TitleContainer } from './materialTable.styles';

interface MaterialTableProps {
  columns: Column[];
  data: object[];
  title: string;
}

const MaterialTable = (props: MaterialTableProps) => {
  const { columns, data, title } = props;

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <TableContainer>
        <Table columns={columns} data={data} pagination />
      </TableContainer>
    </Container>
  );
};

export default MaterialTable;
