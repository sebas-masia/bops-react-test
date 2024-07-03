import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Container } from './toggleButton.styles';

const propTypes = {
  onStateChange: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
};

const ToggleButton = ({ onStateChange, icon }) => {
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    const active = !isActive;

    setIsActive(active);
    onStateChange(active);
  };

  return (
    <Container isActive={isActive} onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="2x" />
    </Container>
  );
};

ToggleButton.propTypes = propTypes;

export default ToggleButton;

const extendPropTypes = { onStateChange: PropTypes.func.isRequired };

export const TreeToggle = ({ onStateChange }) => {
  return <ToggleButton onStateChange={onStateChange} icon={faSitemap} />;
};
TreeToggle.propTypes = extendPropTypes;

export const DetailedToggle = ({ onStateChange }) => {
  return <ToggleButton onStateChange={onStateChange} icon={faPlusCircle} />;
};
DetailedToggle.propTypes = extendPropTypes;

export const MapToggle = ({ onStateChange }) => {
  return <ToggleButton onStateChange={onStateChange} icon={faCompass as IconDefinition} />;
};
MapToggle.propTypes = extendPropTypes;
