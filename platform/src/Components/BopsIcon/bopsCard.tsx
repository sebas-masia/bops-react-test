import { Link } from 'react-router-dom';
import { logo } from '../../Assets';
import { BopsCardContainer, Image } from './bopsIcon.styles';

const BopsCard = () => {
  return (
    <BopsCardContainer>
      <Link to="/">
        <Image src={logo} alt="bops" />
      </Link>
    </BopsCardContainer>
  );
};

export default BopsCard;
