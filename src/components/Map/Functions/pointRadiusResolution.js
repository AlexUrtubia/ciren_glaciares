// Modifica radio de puntos de acuerdo a zoom actual

export function pointRadiusResolution(map, layer, isGlacier) {

  map.getView().on('change:resolution', function() {
      
    let resolution = this.getResolution();
    var radius = isGlacier ? 9 : 8

    if (resolution <= 100) {
      radius = 12;
    } else if (resolution > 100 && resolution <= 300) {
      radius = 6;
    } else if (resolution > 300 && resolution <= 500) {
      radius = 4;
    } else if (resolution > 500) {
      radius = 2;
    }
    layer.getStyle().getImage().setRadius(radius)
  })
}