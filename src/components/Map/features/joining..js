import { Feature } from "ol";
import { MultiPolygon, Polygon } from "ol/geom";

import { union } from '@turf/turf';
import glaciar2 from './glaciar2.geojson'


export function unirMultipoligonos(featureCollection) {
  // Crea un arreglo vacío para almacenar las geometrías de los multipolígonos
  const geometrias = [];

  // Itera a través de cada feature en el FeatureCollection
  featureCollection.features.forEach((feature) => {
    console.log('first', feature.geometry)
    // Verifica si la geometría del feature es un multipolígono
    if (feature.geometry.type === 'MultiPolygon') {
      // Si es un multipolígono, agrega sus coordenadas al arreglo de geometrías
      geometrias.push(...feature.geometry.coordinates);
    }
  });

  // Une las geometrías usando la función turf.union
  const union = union(...geometrias);

  // Crea un nuevo multipolígono a partir del resultado de la unión
  const nuevoMultipoligono = turf.multiPolygon([union.geometry.coordinates]);

  // Retorna el nuevo multipolígono
  return nuevoMultipoligono;
}

