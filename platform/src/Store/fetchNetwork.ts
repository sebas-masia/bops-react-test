function computeSelected(materials, locations, locationMaterials, selected) {
  const selectedMaterials = {};
  const selectedLocations = {};
  if (selected in materials) {
    selectedMaterials[selected] = materials[selected];
  }
  if (selected in locations) {
    selectedLocations[selected] = locations[selected];
  }

  const selectedLocationMaterials: any[] = [];
  Object.values(locationMaterials).forEach((locationMaterial: any) => {
    if (locationMaterial.locationId === selected || locationMaterial.materialId === selected) {
      selectedLocationMaterials.push(locationMaterial);
    }
  });

  return {
    materials: selectedMaterials,
    locations: selectedLocations,
    locationMaterials: selectedLocationMaterials,
  };
}

function computeMovements(locations, materials, searched) {
  const movementResults = {};
  const locationsResults = {};

  if (!(searched in materials)) {
    return [movementResults, locationsResults];
  }

  Object.values(materials[searched].movements).forEach((movement: any) => {
    movementResults[movement.id] = movement;
    if (typeof movement.source_location_id !== 'undefined') {
      locationsResults[movement.source_location_id] = locations[movement.source_location_id];
    }
    if (typeof movement.destination_location_id !== 'undefined') {
      locationsResults[movement.destination_location_id] = locations[movement.destination_location_id];
    }
  });

  return [movementResults, locationsResults];
}

export default function fetchNetwork(materials, locations, locationMaterials, selected) {
  const [movementResults, locationsResults] = computeMovements(locations, materials, selected);
  return {
    selected: computeSelected(materials, locations, locationMaterials, selected),
    network: {
      locations: locationsResults,
      movements: movementResults,
    },
  };
}
