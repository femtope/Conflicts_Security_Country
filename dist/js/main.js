var monthSelect = '',
    yearRange = [],
    conflictScenario = '',
    geoData = null,
    dataLayer = null,
    markerGroup = null,
    stateData = null,
    guineaAdminLayer1, guineaAdminLayer2, liberiaAdminLayer1, liberiaAdminLayer2, sleAdminLayer1, sleAdminLayer2
    lgaLabels = [],
    showAdminLayer2 = false,
    country = ''


var map = L.map('map', {
    center: [11.5, -9.9],
    zoom: 7,
    zoomControl: false
    //minZoom: 6

});


/*//Nigeria
map.fitBounds([
    [2.668432, 4.277144], [14.680073, 13.892007]
])*/



map.on('zoomend', function () {
    adjustLayerbyZoom(map.getZoom())
})

//'https://maps.nlp.nokia.com/maptiler/v2/maptile/newest/normal.day.grey/{z}/{x}/{y}/256/png8?lg=eng&token=61YWYROufLu_f8ylE0vn0Q&app_id=qIWDkliFCtLntLma2e6O'
//'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

new L.Control.Zoom({
    position: 'topright'
}).addTo(map);

L.control.scale({
    position: 'bottomright',
    maxWidth: 150,
    metric: true,
    updateWhenIdle: true
}).addTo(map);

function adjustLayerbyZoom(zoomLevel) {

    if (zoomLevel > 8) {
        if (!showAdminLayer2) {
            map.addLayer(guineaAdminLayer2)
            map.addLayer(liberiaAdminLayer2)
            map.addLayer(sleAdminLayer2)
                //Add labels to the Admin2
            for (var i = 0; i < lgaLabels.length; i++) {
                lgaLabels[i].addTo(map)
            }
            showAdminLayer2 = true
        }
    } else {
        map.removeLayer(guineaAdminLayer2)
        map.removeLayer(liberiaAdminLayer2)
        map.removeLayer(sleAdminLayer2)
        for (var i = 0; i < lgaLabels.length; i++) {
            map.removeLayer(lgaLabels[i])
        }

        showAdminLayer2 = false
    }

}

// var infoContent = buildPopupContent(feature)
        //console.log("info", infoContent)
   // $('#infoContent').html(infoContent)


/*function countrySelector() {
  countrySelect = $('#countryScope').val()
  country = countrySelect.concat(" ")
  $('#country').html(country)
  console.log("Country is: ", countrySelect)

}*/

function triggerUiUpdate() {
    getAdminLayers()
    countrySelect = $('#countryScope').val()
    country = countrySelect.concat(" ")
    $('#country').html(country)
    console.log("Country is: ", countrySelect)

    // Working on Coiuntry Selection and Zooming to Each Country
    if(countrySelect == "Guinea") {
        map.setView([10.6, -13.8], 7, {animation: true})
        map.addLayer(guineaAdminLayer1)
    }

    if(countrySelect == "Liberia") {
        map.setView([6.5, -10.5], 7, {animation: true})
        map.addLayer(liberiaAdminLayer1)
        //map.removeLayer(guineaAdminLayer1)
    }


    if(countrySelect == "Sierra Leone") {
        map.setView([8.5, -12], 7, {animation: true})
        map.addLayer(sleAdminLayer1)

    }


    conflictScenario = $('#categoryScope').val()
    monthSelect = $('#monthScope').val()
    yr = $("#amount").val();
    yrs = yr.split('  -  ');
    country = $('#countryScope').val()

    var query = buildQuery(monthSelect, yrs, conflictScenario)
    console.log("QUERY:  ",query)
    getData(query)
   // map.setZoom(6)
}



function buildQuery(monthSelect, yearRange, conflictScenario) {
  var needsAnd = false;

  if(country == "Nigeria") {
    query = 'http://ehealthafrica.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM conflict_and_security_data';
  if (monthSelect.length > 0 || yearRange.length > 0 || conflictScenario > 0){
    query = query.concat(' WHERE')
    if (conflictScenario.length > 0){
      query = query.concat(" conflict_scenario = '".concat(conflictScenario.concat("'")))
      needsAnd = true
    }
    if (monthSelect.length > 0){
      query = needsAnd  ? query.concat(" AND event_month = '".concat(monthSelect.concat("'"))) :  query.concat(" event_month = '".concat(monthSelect.concat("'")))
      needsAnd = true
    }

    if (yearRange.length > 1){
      query = needsAnd  ? query.concat(" AND event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1]))) : query = query.concat(" event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1])))
    }

    else query = 'http://ehealthafrica.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM conflict_and_security_data';
  }

  }

  if(country == "Liberia") {


  }
  if(country == "Guinea") {


  }
  if(country == "Sierra Leone") {


  }
  return query
}

//TODO: fix the issue of lga layer not reoving after data filtering
function addDataToMap(geoData) {
    // adjustLayerbyZoom(map.getZoom())
    //remove all layers first

    if (dataLayer != null)
        map.removeLayer(dataLayer)

    if (markerGroup != null)
        map.removeLayer(markerGroup)


    var _radius = 12
    var _outColor = "#fff"
    var _weight = 1
    var _opacity = 1
    var _fillOpacity = 1.0

    var allColours = {
        'Assassination/Homicide/Armed Robbery/Arm Assault': {
            radius: _radius,
            fillColor: "#ffff00",
            color: _outColor,
            weight: _weight,
            opacity: _opacity,
            fillOpacity: _fillOpacity
        },
        'Civil Conflicts': {
            radius: _radius,
            fillColor: "#008000",
            color: _outColor,
            weight: _weight,
            opacity: _opacity,
            fillOpacity: _fillOpacity
        },
        'Kidnapping/Abductions': {
            radius: _radius,
            fillColor: "#00ffff",
            color: _outColor,
            weight: _weight,
            opacity: _opacity,
            fillOpacity: _fillOpacity
        },
        'Insurgency/Terrorists Attacks': {
            radius: _radius,
            fillColor: "#ff0000",
            color: _outColor,
            weight: _weight,
            opacity: _opacity,
            fillOpacity: _fillOpacity
        },
        'Religious Conflicts': {
            radius: _radius,
            fillColor: "#800080",
            color: _outColor,
            weight: _weight,
            opacity: _opacity,
            fillOpacity: _fillOpacity
        },
        'Protests/Demonstrations': {
            radius: _radius,
            fillColor: "#a52a2a",
            color: _outColor,
            weight: _weight,
            opacity: _opacity,
            fillOpacity: _fillOpacity
        },
        'Others': {
            radius: _radius,
            fillColor: "#ff00ff",
            color: _outColor,
            weight: _weight,
            opacity: _opacity,
            fillOpacity: _fillOpacity
        }
    }


    $('#projectCount').text(geoData.features.length)

    markerGroup = L.markerClusterGroup({
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            removeOutsideVisibleBounds: true
        })
        //console.log("geoData", geoData)
    dataLayer = L.geoJson(geoData, {
        pointToLayer: function (feature, latlng) {
            var marker = L.circleMarker(latlng, allColours[feature.properties.conflict_scenario])
                //markerGroup.addLayer(marker);
            return marker
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.cartodb_id) {
                //layer.bindPopup(buildPopupContent(feature));
                layer.on('click', function () {
                    displayInfo(feature)
                })
            }

        }

    })

    markerGroup.addLayer(dataLayer);
    map.addLayer(markerGroup);

}

function addAdminLayersToMap(layers) {
    var layerStyles = {
            'admin1': {
                "clickable": true,
                "color": '#B81609',
                "fillColor": '#FFFFFF',
                "weight": 1.5,
                "opacity": 0.5,
                "fillOpacity": 0.1
            },
            'admin2': {
                "clickable": true,
                "color": '#412406',
                "fillColor": '#FFFFFF',
                "weight": 1.5,
                "opacity": 0.7,
                "fillOpacity": 0.1
            }
      }

    guineaAdminLayer1 = L.geoJson(layers['guineaAdmin1'], {
        style: layerStyles['admin1']
    })

    liberiaAdminLayer1 = L.geoJson(layers['liberiaAdmin1'], {
        style: layerStyles['admin1']
    })

    sleAdminLayer1 = L.geoJson(layers['sleAdmin1'], {
        style: layerStyles['admin1']
    })

    guineaAdminLayer2 = L.geoJson(layers['guineaAdmin2'], {
        style: layerStyles['admin2'],
        onEachFeature: function (feature, layer) {
            var labelIcon = L.divIcon({
                className: 'labelLga-icon',
                html: feature.properties.NAME_2
            })
            lgaLabels.push(L.marker(layer.getBounds().getCenter(), {
                    icon: labelIcon
                }))

        }
    })

    liberiaAdminLayer2 = L.geoJson(layers['liberiaAdmin2'], {
        style: layerStyles['admin2'],
        onEachFeature: function (feature, layer) {
            var labelIcon = L.divIcon({
                className: 'labelLga-icon',
                html: feature.properties.NAME_2
            })
            lgaLabels.push(L.marker(layer.getBounds().getCenter(), {
                    icon: labelIcon
                }))

        }
    })

    sleAdminLayer2 = L.geoJson(layers['sleAdmin2'], {
        style: layerStyles['admin2'],
        onEachFeature: function (feature, layer) {
            var labelIcon = L.divIcon({
                className: 'labelLga-icon',
                html: feature.properties.NAME_2
            })
            lgaLabels.push(L.marker(layer.getBounds().getCenter(), {
                    icon: labelIcon
                }))

        }
    })

}


function displayInfo(feature) {
    //console.log('displaying info..')
    var infoContent = buildPopupContent(feature)
        //console.log("info", infoContent)
    $('#infoContent').html(infoContent)
}

function normalizeName(source) {
    source = source.replace("_", " ").replace('of_', ' of ')
    source = source.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    return source
}

function buildPopupContent(feature) {
    var subcontent = ''
    var propertyNames = ['event_type', 'event_year', 'event_month', 'event_date', 'state', 'lga', 'location', 'source', 'perpetrator', 'notes', 'fatalities', 'conflict_scenario']
    for (var i = 0; i < propertyNames.length; i++) {
        subcontent = subcontent.concat('<p><strong>' + normalizeName(propertyNames[i]) + ': </strong>' + feature.properties[propertyNames[i]] + '</p>')

    }
    return subcontent;
}

function showLoader() {
    $('.fa-spinner').addClass('fa-spin')
    $('.fa-spinner').show()
}

function hideLoader() {
    $('.fa-spinner').removeClass('fa-spin')
    $('.fa-spinner').hide()
}


function getData(queryUrl) {
    showLoader()
    $.post(queryUrl, function (data) {
        hideLoader()
        addDataToMap(data)
    }).fail(function () {
        console.log("error!")
    });
}

function getAdminLayers() {
    //showLoader()
    var adminLayers = {}

    //Add Admin Layers to Map
    $.get('resources/GIN_Admin1.geojson', function (guinea_admin1) {
        adminLayers['guineaAdmin1'] = JSON.parse(guinea_admin1)
        addAdminLayersToMap(adminLayers)
		}).fail(function () {
            logError(null)
        })

      $.get('resources/LBR_Admin1.geojson', function (liberia_admin1) {
        adminLayers['liberiaAdmin1'] = JSON.parse(liberia_admin1)
        addAdminLayersToMap(adminLayers)
		}).fail(function () {
            logError(null)
        })

     $.get('resources/SLE_Admin1.geojson', function (sle_admin1) {
        adminLayers['sleAdmin1'] = JSON.parse(sle_admin1)
        addAdminLayersToMap(adminLayers)
		}).fail(function () {
            logError(null)
        })

        $.get('resources/GIN_Admin2.geojson', function (guinea_admin2) {
        adminLayers['guineaAdmin2'] = JSON.parse(guinea_admin2)
        addAdminLayersToMap(adminLayers)
		}).fail(function () {
            logError(null)
        })

        $.get('resources/LBR_Admin2.geojson', function (liberia_admin2) {
        adminLayers['liberiaAdmin2'] = JSON.parse(liberia_admin2)
        addAdminLayersToMap(adminLayers)
		}).fail(function () {
            logError(null)
        })

        $.get('resources/SLE_Admin2.geojson', function (sle_admin2) {
        adminLayers['sleAdmin2'] = JSON.parse(sle_admin2)
        addAdminLayersToMap(adminLayers)
		}).fail(function () {
            logError(null)
        })




}

function logError(error) {
    console.log("error!")
}

/*getAdminLayers()*/
hideLoader()
/*triggerUiUpdate()*/
