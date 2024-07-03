import PropTypes, { InferProps } from 'prop-types';
import {
  Container,
  GroupBlock,
  InventoryBlock,
  InventoryCard,
  ProcessGroupCard,
  Title,
  Value,
} from './networkSummary.styles';

const Display = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const propTypes = {
  inventory: PropTypes.shape(Display).isRequired,
  processGroups: PropTypes.arrayOf(PropTypes.shape(Display).isRequired).isRequired,
};

const NetworkSummary = ({ inventory, processGroups }: InferProps<typeof propTypes>) => {
  return (
    <Container>
      <InventoryBlock>
        <InventoryCard>
          <Title>{inventory.title}</Title>
          <Value>{inventory.value}</Value>
        </InventoryCard>
      </InventoryBlock>
      <GroupBlock>
        {processGroups.map((processGroup) => (
          <ProcessGroupCard key={processGroup.title}>
            <Title>{processGroup.title}</Title>
            <Value>{processGroup.value}</Value>
          </ProcessGroupCard>
        ))}
      </GroupBlock>
    </Container>
  );
};

NetworkSummary.propTypes = propTypes;

export default NetworkSummary;
