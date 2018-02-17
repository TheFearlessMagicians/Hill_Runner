<script src = "/public/gmapsStyle.js"></script>
                          <script>
                          //dummy data
                          function addDummyDogs(centerLatLng) {
                              let locations = [];
                              for (let i = 0; i < 20; i++)
                                  locations.push({
                                      'lat': centerLatLng['lat'] + Math.random() * 0.05,
                                      'lng': centerLatLng['lng'] + Math.random() * 0.05
                                  });
                              return locations;
                          }

                          function initMap() {
                              //GEO LOCATION
                              //var infoWindow = new google.maps.InfoWindow;

                              // Try HTML5 geolocation.
                              console.log('initmap called.')
                            //  if (navigator.geolocation) {
                  //                navigator.geolocation.getCurrentPosition(function(position) {
                                      var pos = {
                                          lat:  33.6488294,//position.coords.longitude
                                          lng:-117.84275960000001,//position.coords.latitude,
                                      };

                                      socket.emit('POSITION_RECEIVED', pos);
                                      var map = new google.maps.Map(document.getElementById('map'), {
                                          zoom: 13,
                                          center: pos,
                                          styles: gmapsStyle
                                      });
                                      console.log('creating a map here.');
                                      // Create an array of alphabetical characters used to label the markers.
                                      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                                      // -------------------REAL CODE FOR MAP UPDATING ----------------------------------//
                                      socket.on('DOGS_NEAR_USER', function(dogs) {
                                                console.log('dogs near user response received.');
                                                console.log(`no of dogs queried: ${dogs.length}`)
                                                   var markers= dogs.map(function(dog, i) {

                                                               // console.log(dog.name+' marker added.'+i)
                                                        return new google.maps.Marker({
                                                            position: new google.maps.LatLng(parseFloat(dog.geo['lat'])+ Math.random() * 0.02, parseFloat(dog.geo['lng'])+ Math.random() * 0.02),//TODO: DIFFERENT FORMAT.
                                                            label: labels[i % labels.length],
                                                            dogName:dog.name,
                                                           map:map,//,
                                                            dogPicUrl:dog.picURL,
                                                            dogUrl: dog.url,
                                                            ownerUrl:dog.owner // TODO : get owner uri.
                                                        });
                                                    });


                                                    //

                                                    var infowindows=[];
                                                         // Add a marker clusterer to manage the markers.

                                                         markers.forEach((marker,i)=>{
                                                                   console.log('putting marker '+i)
                                                                 infowindows.push(  new google.maps.InfoWindow({
                                                                                content:  getdogPopupString(marker.dogName,'public/Dogs/samoyed-puppy.jpg',marker.dogUrl,'/user/'+marker.ownerUrl)
                                                                      }));


                                                                      google.maps.event.addListener(marker, 'click', function() {
                                                                                infowindows[i].open(map,this);
                                                         });

                                               });


                                                      var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });


                                      });
                                                //    map.setCenter(pos);
                                                google.maps.event.addListener(map, 'tilesloaded', function(){
                                                     //document.getElementById('loading').innerHTML = '';
                                                     $(`#loading`).css("display", "none");
                                                    // map.setCenter(pos);
                                                });


                                  }
