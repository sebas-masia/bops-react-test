import { OptionsOrGroups, GroupBase, StylesConfig } from 'react-select';
import { baseTheme } from '@Themes';
import { StyledSelect } from './select.styles';

export interface SelectOptions {
  value: string;
  label: string;
}

const Select = ({
  options,
  onChange,
  styles,
  applyTheme,
  defaultValue,
}: {
  options: OptionsOrGroups<unknown, GroupBase<unknown>>;
  onChange: ((newValue: any) => void) | undefined;
  styles?: StylesConfig<unknown, boolean, GroupBase<unknown>>;
  applyTheme?: (theme: any) => any;
  defaultValue?: any;
}) => {
  const customStyles = styles ?? {
    control: (base, state) => ({
      ...base,
      background: baseTheme.colors.cardBackgroundTransparent,
      color: baseTheme.colors.fontGrey,
      // match with the menu
      borderRadius: 4,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? baseTheme.colors.bopsPurple : baseTheme.colors.cardBorder,
      // Removes weird border around container
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      color: baseTheme.colors.fontGrey,
      background: baseTheme.colors.cardBackground2,
      borderColor: baseTheme.colors.cardBorder2,
      borderRadius: '5px',
      // kill the gap
      marginTop: 5,
      zIndex: 1009,
    }),
    menuList: (base) => ({
      ...base,
      borderColor: baseTheme.colors.cardBorder,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  const selectTheme =
    applyTheme ??
    ((theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary: baseTheme.colors.bopsPurpleTransparent,
        primary25: baseTheme.colors.transparentBlack,
        primary50: baseTheme.colors.bopsPurpleTransparent2,
        neutral80: baseTheme.colors.white,
      },
    }));

  return (
    <StyledSelect
      styles={customStyles}
      theme={(theme) => selectTheme(theme)}
      defaultValue={defaultValue || options[0]}
      onChange={onChange}
      options={options}
    />
  );
};

Select.defaultProps = {
  styles: null,
  applyTheme: null,
  defaultValue: null,
};

export default Select;
