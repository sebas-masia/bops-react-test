import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMaterialsQuery } from '@Store';
import { Column } from '@Components';
import { Row } from 'react-table';
import MaterialTable from './materialTable';

const MaterialTableContainer = () => {
  const DISPLAY_KPI_ID = 'Network';

  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate({
      pathname: `/network/?m=${row.values.materialId}`,
    });
  };

  const thresholdClassName = (expected: number, calculated: number): string => {
    const threshold = Math.abs(expected - calculated) / expected > 0.65;
    return `table-cell-value ${threshold ? 'table-cell-value-alert' : ''}`;
  };

  const prepareVariableCell = (row, accessor: string): JSX.Element => {
    const kpi = row.values[accessor];
    const className = kpi.alertConfigured ? thresholdClassName(kpi.expected, kpi.calculated) : '';

    return (
      <div className="table-cell">
        <div className={className} onClick={() => handleRowClick(row)}>
          {`${kpi.calculated}`}
        </div>
      </div>
    );
  };

  const prepareBasePropertyCell = (row: Row<object>, accessor: string): JSX.Element => (
    <div onClick={() => handleRowClick(row)}>{row.values[accessor]}</div>
  );

  const { data: materials, error, isLoading, isFetching } = useGetMaterialsQuery(undefined);
  if (error) console.log('useGetMaterialsQuery ~ error', error);

  const columns: Column[] = useMemo(() => {
    if (!materials) return [];

    const baseProperties = [
      { Header: 'Location', accessor: 'locationId' },
      { Header: 'Product', accessor: 'materialId' },
      { Header: 'Sub Brand', accessor: 'materialType' },
      { Header: 'Lifecycle', accessor: 'materialLifecycle' },
    ];

    const baseColumns = baseProperties.map(({ Header, accessor }) => ({
      Header,
      accessor,
      Cell: ({ row }) => prepareBasePropertyCell(row, accessor),
    }));

    const networkKpi = (Object.values(materials)[0] as any).kpis[DISPLAY_KPI_ID];

    const variableColumns = Object.keys(networkKpi).map((networkKpiKey) => {
      const { title, uom } = networkKpi[networkKpiKey];

      return {
        Header: `${title} (${uom})`,
        accessor: networkKpiKey,
        Cell: ({ row }) => prepareVariableCell(row, networkKpiKey),
      };
    });

    return [...baseColumns, ...(variableColumns || [])];
  }, [materials]);

  const rowsFromMaterials = () => {
    if (!materials) return [];
    interface MatRow {
      locationId: string;
      materialId: string;
      materialName: string;
      materialType: string;
      materialLifecycle: string;
    }

    const rows: MatRow[] = [];
    Object.values(materials).forEach((material) => {
      Object.keys(material.kpis).forEach((locationId) => {
        const row: MatRow = {
          locationId,
          materialId: material.id,
          materialName: material.name,
          materialType: material.type,
          materialLifecycle: material.lifecycle,
        };

        const displayKpi = material.kpis[locationId];
        Object.keys(displayKpi).forEach((kpiEntry) => {
          row[kpiEntry] = displayKpi[kpiEntry];
        });
        rows.push(row);
      });
    });

    return rows;
  };

  const data = useMemo(() => rowsFromMaterials(), [materials]);

  if (isLoading || isFetching) return null;

  return <MaterialTable title="Product Health" columns={columns} data={data} />;
};

export default MaterialTableContainer;
