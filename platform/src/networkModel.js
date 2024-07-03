const printData = (movements, locations, materials) => {
  const locationSet = new Set();
  const materialSet = new Set();
  const skuSet = new Set();

  /* eslint-disable no-restricted-syntax, guard-for-in */
  for (const movement in Object.values(movements)) {
    if (typeof movement.source_location_id !== 'undefined') {
      locationSet.add(movement.source_location_id);
    }
    if (typeof movement.destination_location_id !== 'undefined') {
      locationSet.add(movement.destination_location_id);
    }

    if (typeof movement.sku !== 'undefined') {
      skuSet.add(movement.sku);
    }
    if (typeof movement.material_id !== 'undefined') {
      materialSet.add(movement.material_id);
    }
  }

  locationSet.forEach((id) => {
    if (!(id in locations)) {
      console.log(`location: ${id}`);
    }
  });

  materialSet.forEach((id) => {
    if (!(id in materials)) {
      console.log(`material: ${id}`);
    }
  });
};

const computeChart = (locations, materials, selected, expanded = {}) => {
  const selectedMaterials = selected.materials;

  const selectedMovements = {};
  const selectedLocations = {};

  if (locations || materials) {
    Object.values(selectedMaterials).forEach((material) => {
      Object.values(material.movements).forEach((movement) => {
        if (movement.source_location_id) {
          selectedLocations[movement.source_location_id] = locations[movement.source_location_id];
        }
        if (movement.destination_location_id) {
          selectedLocations[movement.destination_location_id] = locations[movement.destination_location_id];
        }
        selectedMovements[movement.id] = movement;
      });

      if (expanded.materials && material.id in expanded.materials && expanded.materials[material.id]) {
        const expandedMaterials = [];
        if ('components' in material) {
          expandedMaterials.push(...material.components);
        }

        if ('headers' in material) {
          expandedMaterials.push(...material.headers);
        }

        expandedMaterials.forEach((expandedMaterial) => {
          const expMaterial = materials[expandedMaterial];
          Object.values(expMaterial.movements).forEach((movement) => {
            if (movement.source_location_id) {
              selectedLocations[movement.source_location_id] = locations[movement.source_location_id];
            }
            if (movement.destination_location_id) {
              selectedLocations[movement.destination_location_id] = locations[movement.destination_location_id];
            }
            selectedMovements[movement.id] = movement;
          });
        });
      }
    });
  }

  return {
    movements: selectedMovements,
    locations: selectedLocations,
  };
};

export { printData, computeChart };
