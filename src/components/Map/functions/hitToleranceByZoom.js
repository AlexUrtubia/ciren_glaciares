export const hitToleranceByZoom = (resolution) => {
  let hitTolerance;

  if (resolution <= 100) {
    hitTolerance = 25;
  } else if (resolution > 100 && resolution <= 300) {
    hitTolerance = 15;
  } else if (resolution > 300 && resolution <= 500) {
    hitTolerance = 10;
  } else {
    hitTolerance = 8;
  }

  return hitTolerance;
};