import PropTypes, { InferProps } from 'prop-types';
import { Numbers } from 'humanify-numbers';
import { Container, Title, StyledChart } from './component.styles';

const propTypes = {
  processGroup: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      signed: PropTypes.bool.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
  ).isRequired,
};

const ProcessStackedBar = ({ processGroup }: InferProps<typeof propTypes>) => {
  return (
    <Container>
      <Title>Process:</Title>
      <StyledChart
        height={105}
        type="bar"
        options={{
          chart: {
            type: 'bar',
            stacked: true,
            stackType: '100%',
            animations: { enabled: true },
            toolbar: { show: false },
          },
          grid: {
            show: false,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: false } },
          },
          legend: {
            show: true,
            position: 'bottom',
            labels: { colors: 'white' },
          },
          theme: { palette: 'palette3' },
          plotOptions: {
            bar: { horizontal: true, barHeight: '100%' },
          },
          dataLabels: {
            formatter(val, opts) {
              const n = parseInt(opts.w.config.series[opts.seriesIndex].data[0], 10);
              if (opts.w.config.series[opts.seriesIndex].signed) {
                return `(${Numbers.stringify(Math.abs(n))})`;
              }
              return Numbers.stringify(n);
            },
          },
          xaxis: {
            axisBorder: { show: false },
            labels: { show: false },
            axisTicks: { show: false },
            crosshairs: { show: false },
          },
          yaxis: {
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false },
            crosshairs: { show: false },
          },
          tooltip: { enabled: false },
        }}
        series={processGroup}
      />
    </Container>
  );
};

ProcessStackedBar.propTypes = propTypes;

export default ProcessStackedBar;
