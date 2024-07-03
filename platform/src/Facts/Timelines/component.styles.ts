import styled from 'styled-components';

export const TimelinesContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
`;

export const FactTitle = styled.h3`
  margin-bottom: 2px;
`;

export const TimeLineContainer = styled.div``;

export const LeadTimeItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  padding: 0px 20px 25px 20px;
  margin: 30px 5px 30px 5px;
  border: solid 1px $main-color;
  border-radius: 10px;
  background-color: #1d1d1d;
  box-shadow: 0 0 15px lighten($card-bg-color, 15%);
`;

export const LeadTimeId = styled.p`
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: center;
`;

export const LeadTimeIdTitle = styled.span`
  font-weight: bold;
`;

export const LocationTimeline = styled.div`
  display: inline-flex;
  justify-items: center;
  justify-content: center;
`;

export const SourcePoint = styled.div`
  margin-right: 160px;
`;
export const DestinationPoint = styled.div`
  margin-left: 160px;
`;

export const TimelineTransit = styled.div`
  margin-top: 10px;
  display: inline-flex;
  justify-items: center;
  justify-content: center;
`;

export const TransitPoint = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 15px;
  background-color: rgba(126, 108, 246, 0.55);
`;

export const TransitTime = styled.div`
  margin-top: 3px;
  width: 365px;
  height: 2px;
  border: 0px 5px;
  background-color: rgba(126, 108, 246, 0.55);
`;

export const DateTimeline = styled.div`
  margin-top: 8px;
  display: inline-flex;
  justify-items: center;
  justify-content: center;
`;

export const StartPoint = styled.div``;

export const Duration = styled.div`
  margin: 0px 40px;
`;

export const EndPoint = styled.div``;
