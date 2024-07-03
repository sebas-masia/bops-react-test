import MaterialFactSheet from '../MaterialFactSheet';
import { Container, UL, LI } from './component.styles';

const FactSheets = ({
  materials,
  locationMaterials,
  range,
}: {
  materials: any;
  locationMaterials: any;
  range: any;
}) => {
  if (Object.keys(materials).length === 0) {
    return null;
  }

  return (
    <Container>
      <UL>
        <LI>
          {Object.values(materials).map((material: any) => (
            <MaterialFactSheet
              key={material.id}
              material={material}
              locationMaterials={locationMaterials}
              range={range}
            />
          ))}
        </LI>
      </UL>
    </Container>
  );
};

export default FactSheets;
