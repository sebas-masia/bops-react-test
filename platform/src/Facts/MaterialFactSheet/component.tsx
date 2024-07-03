import { useEffect } from 'react';
import InventoryChart from '../InventoryChart';
import Timelines from '../Timelines';
import MaterialKpis from '../MaterialKpiSelect';
import {
  Container,
  FactContainer,
  MetadataContainer,
  FactTitle,
  FactText,
  Details,
  FactId,
  UL,
} from './component.styles';

const MaterialFactSheet = ({
  id,
  details,
  kpis,
  componentList,
  headerList,
  inventoryLocation,
  leadTimes,
}: {
  id: string;
  details: { title: string; text: string }[];
  kpis: any;
  componentList: any;
  headerList: any;
  inventoryLocation: {
    location: string;
    inventory: number;
  }[];
  leadTimes: {
    id: string;
    leadTime: any;
  }[];
}) => {
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <Container>
      <MetadataContainer>
        <FactId>{id}</FactId>
        <Details>
          {details.map(({ title, text }) => {
            return (
              text && (
                <FactContainer key={`conainter-${title}`}>
                  <FactTitle>{title}:</FactTitle>
                  <FactText>{text}</FactText>
                </FactContainer>
              )
            );
          })}
        </Details>
        {componentList && (
          <>
            <FactTitle>Components:</FactTitle>
            <UL>{componentList}</UL>
          </>
        )}
        {headerList && (
          <>
            <FactTitle>Headers:</FactTitle>
            <UL>{headerList}</UL>
          </>
        )}
        {inventoryLocation && <InventoryChart inventoryLocation={inventoryLocation} />}
      </MetadataContainer>
      {kpis && <MaterialKpis kpis={kpis} />}
      {leadTimes && leadTimes.length > 0 && <Timelines leadTimes={leadTimes} />}
    </Container>
  );
};

export default MaterialFactSheet;
