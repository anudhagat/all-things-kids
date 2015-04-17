/**
 * @author Anu Dhagat
 */

 /* Check for internet connection by checking on google object */
if( typeof(google) != 'object')
  alert('Google Maps Not Responding: Check your Internet connection.');

else{
  /*Global variables for google maps. */
var mapOptions = {
          zoom: 13,
          center: new google.maps.LatLng(37.319621, -121.788192),
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
var map = new google.maps.Map(document.getElementById('map-id'), mapOptions);
var infowindow = new google.maps.InfoWindow();
var currentPlace;

/** Constants for place type. */
var ALL =0,
  SCHOOL =1,
  PARK =2,
  LIBRARY =3,
  PARTY =4,
  DAYCARE=5,
  TUTOR =6,
  MUSIC=7,
  DANCE=8;

/* All Data stored in Array model. */
var model = [
  //Schools:
  {
    name: 'Millbrook Elementary School',
    address: '3200 Millbrook Dr, San Jose, Ca 95148',
    type: SCHOOL,
    lat: 37.3198,
    lng: -121.788149
  },
  {
    name: 'Tom Matsumoto Elementary School',
    address: '4121 Mackin Woods Ln, San Jose, Ca 95135',
    type: SCHOOL,
    lat: 37.312625,
    lng: -121.76534
  },
  {
    name: 'Carolyn A. Clark Elementary School',
    address: '3701 Rue Mirassou, San Jose, Ca 95148',
    type: SCHOOL,
    lat: 37.322222,
    lng: -121.769765
  },
  {
    name: 'Cedar Grove Elementary School',
    address: '2702 Sugarplum Dr, San Jose, Ca 95148',
    type: SCHOOL,
    lat: 37.332014,
    lng: -121.793789
  },
  {
    name: 'Quimby Oak Middle School',
    address: '3190 Quimby Road, San Jose, Ca',
    type: SCHOOL,
    lat: 37.324790,
    lng: -121.784824
  },
  {
    name: 'Chaboya Middle School',
    address: '3276 Cortona Drive, San Jose, Ca',
    type: SCHOOL,
    lat: 37.311892,
    lng: -121.76165200000003
  },
  {
    name: 'Evergreen Valley High School',
    address: '3300 Quimby Road, San Jose, Ca 95148',
    type: SCHOOL,
    lat: 37.324522,
    lng: -121.779252
  },
  // Day Care Centers
  {
    name: 'Evergreen KinderCare',
    address: '3320 San Felipe Rd, San Jose, CA 95135',
    type: DAYCARE,
    lat: 37.313015,
    lng: -121.789875
  },
  {
    name: 'Evergreen Montessori School',
    address: '3122 Fowler Rd, San Jose, CA 95135',
    type: DAYCARE,
    lat: 37.310967,
    lng: -121.773996
  },
  {
    name: 'Yerba Buena Evergreen Montessori',
    address: '3403 Yerba Buena Road, San Jose, Ca',
    type: DAYCARE,
    lat: 37.304029,
    lng: -121.75428799999997
  },
  {
    name: 'Empire Montessori Preschool',
    address: '3095 Yerba Buena Road, San Jose, Ca',
    type: DAYCARE,
    lat: 37.299998,
    lng: -121.76116100000002
  },
  //Library
  {
    name: 'Evergreen Branch Library',
    address: '2635 Aborn Rd, San Jose, CA 95121',
    type: LIBRARY,
    lat: 37.299998,
    lng: -121.76116100000002
  },
  //Tutoring
  {
    name: 'Kumon Learning Center of Evergreen',
    address: '3235 S White Rd, San Jose, CA 95148',
    type: TUTOR,
    lat: 37.316293,
    lng: -121.793109
  },
  {
    name: 'Mathnasium of Silver Creek',
    address: '4035 Evergreen Village Square #30, San Jose, CA 95135',
    type: TUTOR,
    lat: 37.313767,
    lng: -121.773496
  },
  {
    name: 'ThinkTank Learning (Evergreen)',
    address: '4075 Evergreen Village Square #180, San Jose, CA 95135',
    type: TUTOR,
    lat: 37.314347,
    lng: -121.773282
  },
  //Parks
  {
    name: 'Groesbeck Hill Park',
    address: 'Norwood Ave & Klein Rd, San Jose, CA 95148',
    type: PARK,
    lat: 37.336547,
    lng: -121.779204
  },
  {
    name: 'Boggini Park',
    address: 'Remington Way & Millbrook Dr, San Jose, CA 95148',
    type: PARK,
    lat: 37.322692,
    lng: -121.788388
  },
    {
    name: 'Fowler Creek Park',
    address: 'Altia Ln, San Jose, CA 95135',
    type: PARK,
    lat: 37.313955,
    lng: -121.764184
  },
  //Music
  {
    name: "Musician's Warehouse",
    address: '2230 Quimby Rd, San Jose, CA 95122',
    type: MUSIC,
    lat: 37.322965,
    lng: -121.810784
  },
  {
    name: 'Evergreen Studio Music & The Arts',
    address: '2860 Aborn Rd, San Jose, CA 95135',
    type: MUSIC,
    lat: 37.314091,
    lng: -121.789927
  },
  {
    name: 'Pacific Piano School',
    address: '4055 Evergreen Village Square #230, San Jose, CA 95135',
    type: MUSIC,
    lat: 37.313955,
    lng: -121.764184
  },
  //Dance
  {
    name: 'Dance Theatre International',
    address: '4075 Evergreen Village Square, San Jose, CA 95135',
    type: DANCE,
    lat: 37.314433,
    lng: -121.773276
  },
    {
    name: 'Achieve Dance Arts Academy',
    address: '2726 Aborn Rd, San Jose, CA 95121',
    type: DANCE,
    lat: 37.313204,
    lng: -121.793962
  },
  {
    name: 'Kriyaa Dance Academy',
    address: '2955 Silverland Dr, San Jose, CA 95135',
    type: DANCE,
    lat: 37.312521,
    lng: -121.785207
  },
  //Party
  {
    name: 'Party City',
    address: '1986 Tully Rd, San Jose, CA 95122',
    type: PARTY,
    lat: 37.324706,
    lng: -121.819539
  },
  {
    name: 'Michaels',
    address: '2040 Tully Rd, San Jose, CA 95122',
    type: PARTY,
    lat: 37.326617,
    lng: -121.820226
  },
  {
    name: 'Nothing Bundt Cakes San Jose-Evergreen',
    address: '2721 Aborn Rd #10, San Jose, CA 95121',
    type: PARTY,
    lat: 37.313887,
    lng: -121.794047
  }

];

var Place = function (data) {
	this.name = data.name;
	this.address =data.address;
  this.type = data.type;
	this.lat = data.lat;
  this.lng = data.lng;
  this.isVisible = ko.observable(true);
  var image = 'images/party.png';

  if (data.type === SCHOOL)
    image = 'images/school.png';
  else   if (data.type === PARK)
    image = 'images/playground.png';
  else   if (data.type === LIBRARY)
    image = 'images/library.png';
  else   if (data.type === TUTOR)
    image = 'images/tutor.png';
  else   if (data.type === DAYCARE)
    image = 'images/daycare.png';
  else   if (data.type === MUSIC)
    image = 'images/music.png';
  else   if (data.type === DANCE)
    image = 'images/dance.png';
  else   if (data.type === DANCE)
    image = 'images/dance.png';
  else   if (data.type === PARTY)
    image = 'images/party.png';

  this.marker =  new google.maps.Marker({
          position: new google.maps.LatLng(data.lat,data.lng),
          title: data.name,
          icon: image,
          map: map
          });
  this.showMarker = ko.computed(function() {
        if (this.isVisible() ===true)
          this.marker.setMap(map);
        else
          this.marker.setMap(null);
        return true;
    }, this);
};


var triggerMarkerClick = function(place) {
  google.maps.event.trigger(place.marker, 'click');
};

var formatInfoWindow = function(data){
  var header = '<h3>' + data.name + '</h3>';
  var address = '<div>'+ data.address +'</div>';
  var yelpButton = '<div><button id="yelpOpener" onclick="yelpSearch()"> <img src="images/yelp2.png" alt="Yelp"> </button>';
  return header +address+yelpButton;
};

/** This function is the callback function for the Yelp button in the infowindow of a map marker.
 * It uses the oauth.js and sha1.js functions to set up oauth Authentication.
 * Also, it make a jquery ajax call to the Yelp API and displays the retrieved information in a dialog window.
 */
var yelpSearch= function() {
  var placeName = currentPlace.name;
  /*Variable for OAuth Authentication. */
  var auth = {
      consumerKey: "l1ws6flKfhMxLw8TZylK0Q",
      consumerSecret: "odIofxViFX6H7vlZeXxks4NF-c8",
      accessToken: "j5vx-LJNi9qwk8nlGgXgEl7eysclAtIY",
      accessTokenSecret: "atAMBIYtuwvrRR3SYN9ua-57Ilg",
      serviceProvider : {signatureMethod : "HMAC-SHA1"}
      };



  var accessor = {
      consumerSecret : auth.consumerSecret,
      tokenSecret : auth.accessTokenSecret
      };
  /*Terms to search */
  var terms = placeName.replace(' ','+');
  var near = 'San+Jose';
  var parameters = [];

  parameters.push(['term', terms]);
  parameters.push(['location', near]);
  parameters.push(['limit', 1]);
  parameters.push(['callback', 'cb']);
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);
  parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

  var message = {
      'action' : 'http://api.yelp.com/v2/search',
      'method' : 'GET',
      'parameters' : parameters
      };

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);

  var parameterMap = OAuth.getParameterMap(message.parameters);

  $.ajax({
    'cache': true,
    'url' : message.action,
    'data' : parameterMap,
    'dataType' : 'jsonp',
    'jsonpCallback' : 'cb',
    'success' : function(data, textStats, XMLHttpRequest) {
                    var headerName = '%data%';
                    var phone = '<div>%data%</div>';
                    var rating = '%data%';
                    var ratingImg = '<img src="%data%" alt="Rating image">';
                    var address = '<div>%data%</div>';
                    var reviewCount = '<div>Review Count: %data%</div>';
                    var url = '<div> <a href="%data%" target="_blank">Full Review</a> </div>';
                    var snippet = '<div>%data%</div>';
                    var windowContent ='';

                    data.businesses.forEach( function(result) {
                        if(result.display_phone === undefined) result.display_phone ='';
                        windowContent += headerName.replace('%data%',result.name) +
                                      phone.replace('%data%',result.display_phone) +
                                      address.replace('%data%',result.location.display_address.toString()) +
                                      ratingImg.replace('%data%',result.rating_img_url_small) +
                                      rating.replace('%data%',result.rating) +
                                      reviewCount.replace('%data%',result.review_count) +
                                      snippet.replace('%data%', result.snippet_text) +
                                      url.replace('%data%', result.url);
                    });
                    $( "#yelpWindow" ).html(windowContent);
                    $( "#yelpWindow" ).draggable();
                    $( "#yelpWindow" ).dialog({autoOpen: false, title: data.businesses[0].name});

                    $( "#yelpWindow" ).dialog( "open" );
                },
    'error' : function(XMLHttpRequest, textStats, errorThrown) {
      alert('Error: Problem connecting to Yelp.');
    }

  });

};

/**This function animates the marker for the place that has been clicked either in the list view or on the map.
 * Also, it opens an information window about the place clicked.
 */
var clickCallback = function(place) {
  return function() {
    currentPlace = place;
    var self = place.marker;
    $("#map-id")[0].scrollIntoView(true);
    this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ self.setAnimation(null); }, 750);
    var infoWindowContent = formatInfoWindow(place);
    infowindow.setContent(infoWindowContent);
    infowindow.open(map, self);
  };
};

/* viewModel interacts with view(html) and model (data): definded to work with Knockout.js */
var viewModel = function () {
	var self = this;  // self is used in later functions like updatePlaces

  /* placesList stores all the places that appear in listview id in the html. Initialize
   * it with data from the model. */
	this.placesList = ko.observableArray([]);
	for( var i =0; i<model.length; i++) {
    var place = model[i];
    var thisPlace = new Place(place);
		self.placesList.push(thisPlace);
    google.maps.event.addListener(thisPlace.marker, 'click', clickCallback(thisPlace));
	}

  /* searchStr is the knockout observable that stores the text entered in the Search input box. */
  this.searchStr = ko.observable();

  /* availableTypes stores the types of places and chosenType is selected entry in this dropdown box.
   * Both are knockout observables as they will update the list view and map view as they are changed. */
  this.availableTypes = ko.observableArray([
    {name: 'All', id: ALL},
    {name: 'School', id: SCHOOL},
    {name: 'Park', id: PARK},
    {name: 'Library', id: LIBRARY},
    {name: 'Party', id: PARTY},
    {name: 'Daycare', id: DAYCARE},
    {name: 'Tutor', id: TUTOR},
    {name: 'Music', id: MUSIC},
    {name: 'Dance', id: DANCE}]);

  this.chosenType = ko.observable();
  this.chosenType(ALL); //Initial value of Type dropdown

  /* This function is called when something is keyed into Search input box or the Type dropdown entry is changed. */
  this.updatePlaces = function () {
    /*Go through the list of places and make them invisible if they do not have the search type and are not of the correct type. */
    self.placesList().forEach(function (place){
      var tempStr = place.name.toLowerCase();
      var searchTerm = self.searchStr();

      var chosen = self.chosenType();

      if(chosen === ALL){
        if(searchTerm !==undefined){
          if (tempStr.search(searchTerm.toLowerCase()) > -1)
            place.isVisible(true);
          else
            place.isVisible(false);
          }
          else
            place.isVisible(true);
        }
        else{
          if(searchTerm !==undefined){
            if ((tempStr.search(searchTerm.toLowerCase()) > -1) && place.type === chosen)
              place.isVisible(true);
            else
              place.isVisible(false);
          }
          else{
            if  (place.type === chosen)
              place.isVisible(true);
            else
              place.isVisible(false);
          }
        }

      });
      return true;
    };
  };

  ko.applyBindings (new viewModel());
}