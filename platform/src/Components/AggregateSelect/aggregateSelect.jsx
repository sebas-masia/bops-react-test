import React from 'react';
import Select, { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LayerGroupIcon = () => {
  return <FontAwesomeIcon icon="layer-group" size="lg" />;
};

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <LayerGroupIcon />
    </components.DropdownIndicator>
  );
};

class AggregateSelect extends React.Component {
  constructor(props) {
    super(props);
    this.aggregateOptions = [
      { value: 'process_group', label: 'Process' },
      { value: 'movement_type', label: 'Movement' },
    ];
  }

  render() {
    const fontColor = '#c9d1d9';
    const mainColor = '#7b6af6';

    const cardBackgroundColor = '#1d1d22be';
    const cardBorderColor = '#31313a';

    const dropdownBackgroundColor = '#25252c';
    const dropdownBorderColor = '#383842';

    const customStyles = {
      control: (base, state) => ({
        ...base,
        background: cardBackgroundColor,
        color: fontColor,
        height: '30px',
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

    const { onAggregateTypeChange } = this.props;

    return (
      <Select
        className="select"
        styles={customStyles}
        theme={(theme) => selectTheme(theme)}
        components={{ Placeholder, DropdownIndicator }}
        defaultValue={this.aggregateOptions[0]}
        onChange={onAggregateTypeChange}
        options={this.aggregateOptions}
      />
    );
  }
}

export default AggregateSelect;
