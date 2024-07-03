import { useState } from 'react';
import 'leaflet/dist/leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import { baseTheme } from '@Themes';
import { Items } from '../../Chart';
import { Container, TooltipStyled, TooltipArrow, TooltipContent } from './networkChart.styles';

const Tooltip = ({ tooltip }) => {
  const { message, x, y } = tooltip;
  return (
    <TooltipStyled x={x} y={y}>
      <TooltipArrow />
      <TooltipContent>{message}</TooltipContent>
    </TooltipStyled>
  );
};

const NetworkChart = ({ onRangeChange, network, edgeConfig, map, onChartClick }) => {
  const [range, setRange] = useState({});
  const [tooltip] = useState({});

  const setTimeRange = (change) => {
    if (change.items) {
      setRange(change.range);
      onRangeChange(change.range);
    }
  };

  const items = new Items();
  items.setNodes(network.nodes);
  items.setEdges(network.edges);

  return <Container />;
};

export default NetworkChart;
