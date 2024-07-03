import { Link } from 'react-router-dom';
import { logo } from '../../Assets';
import { Image } from './bopsIcon.styles';

const BopsLogo = () => {
  return (
    <Link to="/">
      <Image src={logo} alt="bops" />
    </Link>
  );
};

export default BopsLogo;
