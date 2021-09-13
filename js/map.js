let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.752004, 37.576133],
    zoom: 16,
    controls: [],
  });

  var myPlacemark = new ymaps.Placemark([55.752004, 37.576133], {}, {
    iconLayout: 'default#image',
    iconImageHref: "img/map-marker.svg",
    iconImageSize: [58, 73],
    iconImageOffset: [-3, -42]
  });
  myMap.geoObjects.add(myPlacemark);
};

ymaps.ready(init);
