// Modifica radio de puntos de acuerdo a zoom actual

export function pointRadiusResolution(map, layer, isGlacier) {

  map.getView().on('change:resolution', function() {
      
    let resolution = this.getResolution();
    
    var radius = isGlacier ? 9 : 8

    if (resolution <= 60) {
      radius = 9;
    } else if (resolution > 60 && resolution <= 140) {
      radius = 6;
    } else if (resolution > 140 && resolution <= 300) {
      radius = 4;
    } else if (resolution > 300) {
      radius = 2;
    }
    layer.getStyle().getImage().setRadius(radius)
  })
}