import PropTypes, { InferProps } from 'prop-types';
import NetworkSummary from './networkSummary';

const propTypes = {
  processGroups: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

const NetworkSummaryContainer = ({ processGroups }: InferProps<typeof propTypes>) => {
  const formatCurrency = (value: number) =>
    Intl.NumberFormat('en-In', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      currencySign: 'accounting',
    }).format(value);

  const total = processGroups.reduce((acc, { value }) => acc + value.valueOf(), 0);

  const inventory = {
    title: 'Inventory on Hand',
    value: formatCurrency(total),
  };

  const pg = processGroups.map(({ key, value }) => ({
    title: key,
    value: formatCurrency(value),
  }));

  return <NetworkSummary inventory={inventory} processGroups={pg} />;
};

NetworkSummaryContainer.propTypes = propTypes;

export default NetworkSummaryContainer;
