import PropTypes, { InferProps } from 'prop-types';
import { Numbers } from 'humanify-numbers';
import {
  TimelinesContainer,
  FactTitle,
  TimeLineContainer,
  LeadTimeItem,
  LeadTimeId,
  LeadTimeIdTitle,
  LocationTimeline,
  SourcePoint,
  DestinationPoint,
  TimelineTransit,
  TransitPoint,
  TransitTime,
  DateTimeline,
  StartPoint,
  Duration,
  EndPoint,
} from './component.styles';

const TimeLinepropTypes = {
  id: PropTypes.string.isRequired,
  leadTime: PropTypes.object.isRequired,
};

const Timeline = ({ leadTime, id }) => {
  const { source, destination, start, end, duration } = leadTime;
  return (
    <LeadTimeItem>
      <LeadTimeId>
        {' '}
        <LeadTimeIdTitle>PO:</LeadTimeIdTitle>
        {id}
      </LeadTimeId>
      <LocationTimeline>
        <SourcePoint>{source}</SourcePoint>
        <DestinationPoint>{destination}</DestinationPoint>
      </LocationTimeline>
      <TimelineTransit>
        <TransitPoint />
        <TransitTime />
        <TransitPoint />
      </TimelineTransit>
      <DateTimeline>
        <StartPoint>{start.toDateString()}</StartPoint>
        <Duration>{Numbers.stringify(duration)} days</Duration>
        <EndPoint>{end.toDateString()}</EndPoint>
      </DateTimeline>
    </LeadTimeItem>
  );
};

Timeline.propTypes = TimeLinepropTypes;

const TimeLinespropTypes = {
  leadTimes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      leadTime: PropTypes.object.isRequired,
    }).isRequired,
  ).isRequired,
};

const Timelines = ({ leadTimes }: InferProps<typeof TimeLinespropTypes>) => {
  return (
    <TimelinesContainer>
      <FactTitle>Transit: </FactTitle>
      <TimeLineContainer>
        {leadTimes.map(({ id, leadTime }) => (
          <Timeline key={id} id={id} leadTime={leadTime} />
        ))}
      </TimeLineContainer>
    </TimelinesContainer>
  );
};

Timelines.propTypes = TimeLinespropTypes;

export default Timelines;
