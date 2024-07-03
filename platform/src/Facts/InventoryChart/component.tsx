import PropTypes, { InferProps } from 'prop-types';
import { Numbers } from 'humanify-numbers';
import { Container, Title, StyledChart } from './component.styles';

const propTypes = {
  inventoryLocation: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.string.isRequired,
      inventory: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

const InventoryChart = ({ inventoryLocation }: InferProps<typeof propTypes>) => {
  return (
    <Container>
      <Title>Inventory on hand:</Title>
      <StyledChart
        options={{
          labels: inventoryLocation.map((item) => item.location),
          plotOptions: {
            pie: {
              donut: {
                size: '55%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    formatter: (w) => {
                      const total = w.globals.seriesTotals.reduce((previous, current) => previous + current, 0);
                      return Numbers.stringify(total);
                    },
                  },
                  name: { show: false },
                  value: {
                    color: 'white',
                    offsetY: 5,
                    formatter: (value) => Numbers.stringify(parseFloat(value)),
                  },
                },
              },
            },
          },
          dataLabels: {
            formatter: (val, opts) => Numbers.stringify(parseInt(opts.w.config.series[opts.seriesIndex], 10)),
          },
          legend: {
            show: true,
            position: 'bottom',
            labels: { colors: 'white' },
          },
          stroke: { colors: ['#181d27'] },
          theme: { palette: 'palette3' },
        }}
        series={inventoryLocation.map((item) => item.inventory)}
        type="donut"
        height="250"
      />
    </Container>
  );
};

InventoryChart.propTypes = propTypes;

export default InventoryChart;
