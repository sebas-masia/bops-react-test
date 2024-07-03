import { useState } from 'react';
import { TimeSeries, LocationMaterialCategory } from '@Models';
import { useGetLocationMaterialCategoriesQuery } from '@Store';
import { SelectedCell, SelectOptions, Loading } from '@Components';
import MaterialCategoriesSummary from './materialCategoriesSummary';
import { LoadingDiv } from './materialCategoriesSummary.styles';

const MaterialCategoriesSummaryContainer = () => {
  const [locationId, setLocationId] = useState('network');
  const [selectedCell, setSelectedCell] = useState({ materialId: 'bodycare', kpiId: 'sales' });

  const { data, error, isLoading, isFetching } = useGetLocationMaterialCategoriesQuery(undefined); // TODO handle error
  if (error) console.log('file: container.tsx ~ line 16 ~ MaterialCategoriesSummaryContainer ~ error', error);

  if (isLoading || isFetching)
    return (
      <LoadingDiv>
        <Loading height={100} width={100} />
      </LoadingDiv>
    );

  const onCellClicked = (cell: SelectedCell) => {
    setSelectedCell(cell);
  };

  const onLocationChange = (locationOption: SelectOptions) => {
    setLocationId(locationOption.value);
  };

  const locationMaterialCategories: LocationMaterialCategory[] = data || [];
  const locations = locationMaterialCategories.map((lm) => ({ value: lm.id, label: lm.name }));
  const location = locationMaterialCategories.find((lm) => lm.id === locationId);
  const materialCategoriesKpis = location ? location.materialCategoriesKpis : [];
  const materialCategoryKpis = materialCategoriesKpis.find((mc) => mc.id === selectedCell.materialId);
  const kpiTimeValue = materialCategoryKpis?.kpis.find((kts) => kts.id === selectedCell.kpiId);
  const timeSeries: TimeSeries[] = kpiTimeValue ? kpiTimeValue.timeValues : [];

  const matCatName = materialCategoryKpis ? materialCategoryKpis.name : '';
  const kpiName = kpiTimeValue ? kpiTimeValue.longName : '';
  return (
    <MaterialCategoriesSummary
      title="Product Summary"
      selectedCell={selectedCell}
      matCatName={matCatName}
      kpiName={kpiName}
      timeSeries={timeSeries}
      locations={locations}
      matCatKpis={materialCategoriesKpis}
      onCellClicked={onCellClicked}
      onLocationChange={onLocationChange}
    />
  );
};

export default MaterialCategoriesSummaryContainer;
