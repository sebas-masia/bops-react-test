import { GroupBase, StylesConfig } from 'react-select';
import { Select, SelectOptions } from '@Components';
import { Container, SelectLabel } from './locationSelect.styles';

const Loading = ({
  locations,
  onLocationChange,
  styles,
  applyTheme,
  defaultValue,
}: {
  locations: SelectOptions[];
  onLocationChange: (selectedLocation: SelectOptions) => void;
  styles?: StylesConfig<unknown, boolean, GroupBase<unknown>>;
  applyTheme?: (theme: any) => any;
  defaultValue?: any;
}) => {
  return (
    <Container>
      <SelectLabel>Locations</SelectLabel>
      <Select
        options={locations}
        onChange={onLocationChange}
        styles={styles}
        applyTheme={applyTheme}
        defaultValue={defaultValue}
      />
    </Container>
  );
};

Loading.defaultProps = {
  styles: null,
  applyTheme: null,
  defaultValue: null,
};

export default Loading;
