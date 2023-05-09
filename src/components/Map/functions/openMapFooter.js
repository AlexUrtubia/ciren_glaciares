export function openMapFooter(map, setId, handleOpenFooter) {
  map.on('click', function(event) { 
    
    const resolution = map.getView().getResolution();
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
    let lastHitTolerance = null;
    const feature = map.forEachFeatureAtPixel(
      event.pixel,
      function(feature, layer) {
        if (hitTolerance !== lastHitTolerance) {
          console.log('hitTolerance', hitTolerance);
          lastHitTolerance = hitTolerance;
        }
        return layer.get('zIndex') === 5 ? feature : undefined
      },
      
      { hitTolerance: hitTolerance }
    );

    if (feature) {
      const featureId = feature.getId();
      setId(featureId);
      handleOpenFooter()
    }
  });
}