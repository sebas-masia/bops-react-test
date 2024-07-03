import { useMemo } from 'react';
import { MaterialCategoryKpis } from '@Models';
import { Column } from '@Components';
import { Numbers } from 'humanify-numbers';
import MaterialCategoriesTable from './materialCategoriesTable';

import { Kpi, KpiCell, SelectedKpi } from './materialCategoriesTable.styles';

export interface SelectedCell {
  materialId: string;
  kpiId: string;
}

const MaterialCategoriesTableContainer = ({
  selectedCell,
  materialCategoriesKpis,
  onCellClicked,
}: {
  selectedCell: SelectedCell;
  materialCategoriesKpis: MaterialCategoryKpis[];
  onCellClicked: (cell: SelectedCell) => void;
}) => {
  const prepareMaterialCategoryCell = (row, accessor): JSX.Element => <div>{row.values[accessor]}</div>;

  const prepareKpiCell = (row, accessor): JSX.Element => {
    const clickedCell = {
      materialId: row.original.materialId,
      kpiId: accessor,
    };
    if (selectedCell.materialId === clickedCell.materialId && selectedCell.kpiId === clickedCell.kpiId) {
      return (
        <KpiCell>
          <SelectedKpi>
            <Kpi onClick={() => onCellClicked(clickedCell)}>{row.values[accessor]}</Kpi>
          </SelectedKpi>
        </KpiCell>
      );
    }
    return (
      <KpiCell>
        <Kpi onClick={() => onCellClicked(clickedCell)}>{row.values[accessor]}</Kpi>
      </KpiCell>
    );
  };

  const columns: Column[] = useMemo(() => {
    const kpiNameColumns = {
      accessor: 'material',
      Cell: ({ row }) => prepareMaterialCategoryCell(row, 'material'),
    };

    const variableColumns = materialCategoriesKpis[0].kpis.map(({ id, name, uom }) => ({
      Header: uom ? `${name} (${uom})` : name,
      accessor: id,
      Cell: ({ row }) => prepareKpiCell(row, id),
    }));

    return [kpiNameColumns, ...variableColumns];
  }, [materialCategoriesKpis, selectedCell]);

  const rowsFromMaterialCategoriesKpi = (matCatKpis: MaterialCategoryKpis[]) => {
    const rows: object[] = [];

    matCatKpis.forEach((materialKpis) => {
      const row: object = {
        materialId: materialKpis.id,
        material: materialKpis.name,
      };

      materialKpis.kpis.forEach((kpi) => {
        row[kpi.id] = Numbers.stringify(Number(kpi.timeValues[0].value));
      });

      rows.push(row);
    });

    return rows;
  };

  const data = useMemo(() => rowsFromMaterialCategoriesKpi(materialCategoriesKpis), materialCategoriesKpis);
  return <MaterialCategoriesTable columns={columns} data={data} />;
};

export default MaterialCategoriesTableContainer;
