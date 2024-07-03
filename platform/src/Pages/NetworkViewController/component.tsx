import { ProSidebar } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { AggregateSelect, MeasureSelect, FloatingSearchBox, NetworkChart, ProcessGroupBar } from '@Components';
import { FactSheets } from '../../Facts';
import { Container, SelectRow, Sidebar, Main, ProcessGroupContainer } from './component.styles';

const NetworkViewController = ({
  materialSelected,
  onMapChange,
  onSearchResult,
  onDetailedChange,
  onAggregateTypeChange,
  onMeasureTypeChange,
  selected,
  networkConfig,
  network,
  processGroups,
  edgeConfig,
  onRangeChange,
  onChartClick,
}) => {
  const { range } = networkConfig;

  return (
    <Container>
      <FloatingSearchBox
        defaultValue={materialSelected}
        onMapChange={onMapChange}
        onSearchResult={onSearchResult}
        onDetailedChange={onDetailedChange}
      />
      <SelectRow>
        <AggregateSelect onAggregateTypeChange={onAggregateTypeChange} />
        <MeasureSelect onMeasureTypeChange={onMeasureTypeChange} />
      </SelectRow>
      <Sidebar>
        <ProSidebar>
          <FactSheets materials={selected.materials} locationMaterials={selected.locationMaterials} range={range} />
        </ProSidebar>
      </Sidebar>
      <Main>
        <ProcessGroupContainer>
          <ProcessGroupBar processGroups={processGroups} />
        </ProcessGroupContainer>
        <NetworkChart
          network={network}
          edgeConfig={edgeConfig}
          map={networkConfig.map}
          onChartClick={onChartClick}
          onRangeChange={onRangeChange}
        />
      </Main>
    </Container>
  );
};

export default NetworkViewController;
