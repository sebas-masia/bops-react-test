import { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { baseTheme } from '@Themes';
import { useGetMaterialsQuery } from '@Store';
import { SelectStyled } from './searchBar.styles';

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon icon={faSearch as IconDefinition} size="lg" />
    </components.DropdownIndicator>
  );
};

const SearchBar = ({ defaultValue, onSearchResult }) => {
  const onChange = (selected) => {
    const value = selected ? selected.value : null;
    onSearchResult(value);
  };

  const options = [
    {
      label: 'Products',
      options: [],
    },
  ];

  const defaultValue1 = defaultValue ? { value: defaultValue, label: defaultValue } : null;
  return (
    <SelectStyled
      theme={(theme) => ({
        ...theme,
        colors: { ...theme.colors, primary: baseTheme.colors.bopsPurple2, primary25: baseTheme.colors.bopsPurple3 },
      })}
      defaultValue={defaultValue1}
      components={{ Placeholder, DropdownIndicator }}
      isSearchable
      isClearable
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      options={options}
      name="MovementsSearch"
      placeholder="Search for products..."
      onChange={(selected) => onChange(selected)}
    />
  );
};

export default SearchBar;
