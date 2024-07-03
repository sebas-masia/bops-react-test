import PropTypes from 'prop-types';
import { SearchBar, BopsLogo, DetailedToggle, MapToggle } from '@Components';
import { Container, InternalCard } from './floatingSearchBox.styles';

const propTypes = {
  defaultValue: PropTypes.string,
  onSearchResult: PropTypes.func.isRequired,
  onMapChange: PropTypes.func,
  onDetailedChange: PropTypes.func,
};

const FloatingSearchBox = ({ defaultValue, onSearchResult, onMapChange, onDetailedChange }) => {
  return (
    <Container>
      <InternalCard>
        <BopsLogo />
        <SearchBar defaultValue={defaultValue} onSearchResult={onSearchResult} />
        {onMapChange && <MapToggle onStateChange={onMapChange} />}
        {onDetailedChange && <DetailedToggle onStateChange={onDetailedChange} />}
      </InternalCard>
    </Container>
  );
};

FloatingSearchBox.propTypes = propTypes;
FloatingSearchBox.defaultProps = { defaultValue: '', onMapChange: null, onDetailedChange: null };

export default FloatingSearchBox;
