import PropTypes, { InferProps } from 'prop-types';
import { LocationSelect } from '@Components';
import { KPIEntry } from '@Models';
import KpiCard from '../KpiCard';
import { Container, SelectContainer, TitleRow, TitleValue, UL, LI } from './component.styles';

const SelectOptions = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}).isRequired;

const propTypes = {
  locations: PropTypes.arrayOf(SelectOptions).isRequired,
  onLocationChange: PropTypes.func.isRequired,
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // TODO refactor this, use interface from Models
      metric: PropTypes.shape({
        calculated: PropTypes.number.isRequired,
        expected: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        uom: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

const fontColor = '#c9d1d9';
const mainColor = '#7b6af6';

const cardBackgroundColor = '#1d1d22be';
const cardBorderColor = '#31313a';

const dropdownBackgroundColor = '#25252c';
const dropdownBorderColor = '#383842';

const MaterialKpiSelect = ({ locations, metrics, onLocationChange }: InferProps<typeof propTypes>) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: cardBackgroundColor,
      color: fontColor,
      // match with the menu
      borderRadius: 4,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? mainColor : cardBorderColor,
      // Removes weird border around container
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      color: fontColor,
      background: dropdownBackgroundColor,
      borderColor: dropdownBorderColor,
      borderRadius: '5px',
      // kill the gap
      marginTop: 5,
      zIndex: 1009,
    }),
    menuList: (base) => ({
      ...base,
      borderColor: cardBorderColor,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  const selectTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: 'rgba(125, 106, 246, 0.1)',
      primary25: 'rgba(20, 20, 20, 0.5)',
      primary50: 'rgba(125, 106, 246, 0.25)',
      neutral80: 'white',
    },
  });

  return (
    <Container>
      <SelectContainer>
        <LocationSelect
          styles={customStyles}
          applyTheme={selectTheme}
          defaultValue={{ value: 'Network', label: 'Network' }}
          onLocationChange={onLocationChange}
          locations={locations}
        />
      </SelectContainer>
      <TitleRow>
        <TitleValue>Expected</TitleValue>
        <TitleValue>Calculated</TitleValue>
      </TitleRow>
      <UL>
        {metrics.map(({ id, metric }) => (
          <LI key={id}>
            <KpiCard metric={metric as KPIEntry} />
          </LI>
        ))}
      </UL>
    </Container>
  );
};

MaterialKpiSelect.propTypes = propTypes;

export default MaterialKpiSelect;
