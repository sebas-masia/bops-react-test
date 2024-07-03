import PropTypes, { InferProps } from 'prop-types';
import { Numbers } from 'humanify-numbers';
import { CalculatedData, Container, Data, Title, Value, ValueNumber, ValueNumberCalculated } from './component.styles';

const propTypes = {
  metric: PropTypes.shape({
    calculated: PropTypes.number.isRequired,
    expected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    uom: PropTypes.string.isRequired,
  }).isRequired,
};

const Kpis = ({ metric }: InferProps<typeof propTypes>) => {
  const { expected, calculated, title, uom } = metric;
  const expectedNumber = Numbers.stringify(expected);
  const calculatedNumber = Numbers.stringify(calculated);

  return (
    <Container>
      <Data>
        <Title>{title}</Title>
        <Value>
          <ValueNumber>{expectedNumber} </ValueNumber> {uom}
        </Value>
      </Data>
      <CalculatedData>
        <Title>{title}</Title>
        <Value>
          <ValueNumberCalculated>{calculatedNumber} </ValueNumberCalculated> {uom}
        </Value>
      </CalculatedData>
    </Container>
  );
};

export default Kpis;
