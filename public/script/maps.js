
                          function addDummyQuests(centerLatLng) {
                              //TODO
                              let locations = [];
                              for (let i = 0; i < 20; i++)
                                  locations.push({
                                      'lat': centerLatLng['lat'] + Math.random() * 0.05,
                                      'lng': centerLatLng['lng'] + Math.random() * 0.05
                                  });
                              return locations;
                          }
                        //Called when gmaps loads:
                          function initMap() {
                              //GEO LOCATION
                              //var infoWindow = new google.maps.InfoWindow;

                              // Try HTML5 geolocation.
                              console.log('initmap called.')
                            //  if (navigator.geolocation) {
                  //                navigator.geolocation.getCurrentPosition(function(position) {

                                    //Hardcoded UCLA position:
                                      var pos = {
                                          lat:  34.068921,//position.coords.latitude
                                          lng:-118.445181,//position.coords.longitude
                                      };


                                      var map = new google.maps.Map(document.getElementById('map'), {
                                          zoom: 13,
                                          center: pos,
                                          styles: gmapsStyle
                                      });
                                      console.log('creating a map here.');
                                      // Create an array of alphabetical characters used to label the markers.
                                      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                                      // -------------------REAL CODE FOR MAP UPDATING ----------------------------------//
                            //          socket.on('QUESTS_NEAR_USER', function(quests) {
                            //TODO: We need a quests object for initialisation.
                                                //console.log('quests near user response received.');
                                                console.log(`no of quests queried: ${quests.length}`)
                                                   var markers= quests.map(function(quest, i) {

                                                               // console.log(dog.name+' marker added.'+i)
                                                        return new google.maps.Marker({
                                                            position: new google.maps.LatLng(quest.coordinates[1], quest.coordinates[0]),// quest: [lng,lat]. maps: [lat,lng]
                                                            label: labels[i % labels.length],
                                                           map:map,//,
                                                           icon:"https://png.icons8.com/metro/1600/finish-flag.png",
                                                           name:quest.name
                                                        });
                                                    });


                                                    var infowindows=[];
                                                         // Add a marker clusterer to manage the markers.

                                                         markers.forEach((marker,i)=>{
                                                                   console.log('putting marker '+i)
                                                                 infowindows.push(  new google.maps.InfoWindow({
                                                                                content:marker.name//  getdogPopupString(marker.dogName,'public/quests/samoyed-puppy.jpg',marker.dogUrl,'/user/'+marker.ownerUrl)
                                                                      }));
                                                                      google.maps.event.addListener(marker, 'click', function() {
                                                                                infowindows[i].open(map,this);
                                                         });
                                               });
                                                      var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
                                    //  });
                                                //    map.setCenter(pos);
                                                google.maps.event.addListener(map, 'tilesloaded', function(){

                                                     $(`#loading`).css("display", "none");

                                                });


                                  }
