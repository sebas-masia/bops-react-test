import React from 'react';
import PropTypes from 'prop-types';
import { MaterialCategoryKpis, TimeSeries } from '@Models';
import {
  MaterialCategoriesChart,
  MaterialCategoriesTable,
  SelectedCell,
  LocationSelect,
  SelectOptions,
} from '@Components';
import {
  Container,
  Title,
  TitleContainer,
  ContentContainer,
  TopContainer,
  SelectContainer,
} from './materialCategoriesSummary.styles';

export const propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
      accessor: PropTypes.string.isRequired,
      Cell: PropTypes.func.isRequired,
    }).isRequired,
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  timeSeriesTitle: PropTypes.string.isRequired,
  timeSeriesSubTitle: PropTypes.string.isRequired,
  xAxis: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  yAxis: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

const MaterialCategoriesSummary = ({
  title,
  selectedCell,
  matCatName,
  kpiName,
  timeSeries,
  matCatKpis,
  locations,
  onCellClicked,
  onLocationChange,
}: {
  title: string;
  selectedCell: SelectedCell;
  matCatName: string;
  kpiName: string;
  timeSeries: TimeSeries[];
  matCatKpis: MaterialCategoryKpis[];
  locations: SelectOptions[];
  onCellClicked: (selectedCell: SelectedCell) => void;
  onLocationChange: (selectedLocation: SelectOptions) => void;
}) => {
  return (
    <Container>
      <TopContainer>
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <SelectContainer>
          <LocationSelect locations={locations} onLocationChange={onLocationChange} />
        </SelectContainer>
      </TopContainer>
      <ContentContainer>
        <MaterialCategoriesTable
          selectedCell={selectedCell}
          materialCategoriesKpis={matCatKpis}
          onCellClicked={onCellClicked}
        />
        <MaterialCategoriesChart materialCategoryName={matCatName} kpiName={kpiName} timeSeries={timeSeries} />
      </ContentContainer>
    </Container>
  );
};

export default MaterialCategoriesSummary;
