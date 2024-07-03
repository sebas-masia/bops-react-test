import ReactLoading from 'react-loading';

const Loading = ({ height, width }) => {
  return <ReactLoading type="spokes" color="white" height={height} width={width} />;
};

export default Loading;
