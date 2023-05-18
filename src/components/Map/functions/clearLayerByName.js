export const clearLayerByName = (map, name) => {
  var layers = map.getLayers().getArray();
  var layerByName = layers.find(function(layer) {
    return layer.get('name') === name;
  });
  if (layerByName) {
    layerByName.getSource().clear()
  } else {
    console.log("Layer not found")
  }
};