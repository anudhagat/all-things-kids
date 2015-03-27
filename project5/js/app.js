var model = [
	{
		name: 'Almaden Country School',
		address: '6835 Trinidad Dr, San Jose, Ca 95120',
		lat: 37.2195,
    lng: -121.8518
	},
	{
		name: 'Millbrook Elementary School',
		address: '3200 Millbrook Dr, San Jose, Ca 95148',
    lat: 37.3198,
    lng: -121.788149
	},
	{
		name: 'Tom Matsumoto Elementary School',
		address: '4121 Mackin Woods Ln, San Jose, Ca 95135',
    lat: 37.312625,
    lng: -121.76534
	},
	{
		name: 'Carolyn A. Clark Elementary School',
		address: '3701 Rue Mirassou, San Jose, Ca 95148',
    lat: 37.322222,
    lng: -121.769765
	},
	{
		name: 'Cedar Grove Elementary School',
		address: '2702 Sugarplum Dr, San Jose, Ca 95148',
    lat: 37.332014,
    lng: -121.793789
	},
];

var map, infowindow;

var Place = function (data) {
	this.name = data.name;
	this.address =data.address;
	this.lat = data.lat;
  this.lng = data.lng;
  this.marker = {};
};

ko.bindingHandlers.map = {

    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var placesList = ko.utils.unwrapObservable(valueAccessor());
        var mapOptions = {
          zoom: 11,
          center: new google.maps.LatLng(37.3126, -121.7653),
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
            mapTypeIds: [
              google.maps.MapTypeId.ROADMAP,
              google.maps.MapTypeId.TERRAIN
            ]
          },
          zoomControl: true,
          zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
          }
        };
        map = new google.maps.Map(element, mapOptions);
        infowindow = new google.maps.InfoWindow();

        for( var i = 0; i< placesList.length; i++) {
          place=placesList[i];
          var latLng = new google.maps.LatLng(
            ko.utils.unwrapObservable(place.lat),
            ko.utils.unwrapObservable(place.lng));
          var marker = new google.maps.Marker({
          position: latLng,
          title: place.name,
          map: map
          });

          google.maps.event.addListener(marker, 'click', function() {
            var self = this;
            if (this.getAnimation() != null) {
              this.setAnimation(null);
            } else {
              this.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function(){ self.setAnimation(null); }, 750);
            }
            infowindow.setContent(this.title);
            infowindow.open(map, this);
          });
          place.marker =  marker;
        }
    }
};

function triggerMarkerClick(place) {
  google.maps.event.trigger(place.marker, 'click');
}

var viewModel = function () {
	var self = this;

	this.placesList = ko.observableArray([]);
	model.forEach(function (place){
		self.placesList.push(new Place(place));
	});
  this.searchStr = ko.observable();

  this.updatePlaces = function () {
    self.placesList.removeAll();
    model.forEach(function (place){
      if (place.name.search(self.searchStr()) > -1)
        self.placesList.push(new Place(place));
    });
  }
};

ko.applyBindings (new viewModel());