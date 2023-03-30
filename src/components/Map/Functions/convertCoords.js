import proj4 from 'proj4';

// Convierte coordenadas de un punto en formato wkt, src 3857 a latitud, longitud

export function convertCoords(wktPoint) {
  // Definimos la proyección de origen y destino
  const source = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs';
  const dest = '+proj=longlat +datum=WGS84 +no_defs';

  // Convertimos las coordenadas de formato WKT a un array
  const coords = wktPoint.replace('POINT (', '').replace(')', '').split(' ');

  // Creamos un objeto point de la clase Point de proj4js
  const pointObj = new proj4(source, dest).forward([parseFloat(coords[0]), parseFloat(coords[1])-8000]);

  // Retornamos las coordenadas convertidas como un objeto { lat, lng }
  return { lat: pointObj[1], lng: pointObj[0] };
}