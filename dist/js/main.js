var monthSelect = '',
    yearRange = [],
    conflictScenario = '',
    geoData = null, geoDataAd = null,
    dataLayer = null, dataLayerAd = null,
    markerGroup = null, markerGroupAd = null,
    stateData = null,
    guineaAdminLayer1, guineaAdminLayer2, liberiaAdminLayer1, liberiaAdminLayer2, sleAdminLayer1, sleAdminLayer2, ngrStateLayer, ngrLgaLayer,
    GINLabels = [], LBRLabels = [], SLELabels = [], NGRLabels = [],
    GINAdmin2 = false, SLEAdmin2 = false, LBRAdmin2 = false, NGRLga = false,
    country = '', country2 = '', country3 = '',
    btnAd


var map = L.map('map', {
    center: [14, -5],
    zoom: 4,
    zoomControl: false
    //minZoom: 6

});


/*map.on('zoomend', function () {
    adjustLayerbyZoom1(map.getZoom())
    adjustLayerbyZoom2(map.getZoom())
    adjustLayerbyZoom3(map.getZoom())
})*/

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

function adjustLayerbyZoom1(zoomGIN) {

    if (zoomGIN > 8) {
        if (!GINAdmin2) {
            map.removeLayer(liberiaAdminLayer2)
            map.removeLayer(sleAdminLayer2)
            map.removeLayer(ngrLgaLayer)
            map.addLayer(guineaAdminLayer2)
                //Add labels to the Admin2
            for (var i = 0; i < GINLabels.length; i++) {
                GINLabels[i].addTo(map)

            }
            GINAdmin2 = true
        }
    } else {
        map.removeLayer(guineaAdminLayer2)
        for (var i = 0; i < GINLabels.length; i++) {
            map.removeLayer(GINLabels[i])

        }

        GINAdmin2 = false
    }

}

function adjustLayerbyZoom2(zoomLBR) {

    if (zoomLBR > 8) {
        if (!LBRAdmin2) {
            map.removeLayer(guineaAdminLayer2)
            map.removeLayer(sleAdminLayer2)
            map.removeLayer(ngrLgaLayer)
            map.addLayer(liberiaAdminLayer2)
                //Add labels to the Admin2
            for (var i = 0; i < LBRLabels.length; i++) {
                LBRLabels[i].addTo(map)
            }
            LBRAdmin2 = true
        }
    } else {
        map.removeLayer(liberiaAdminLayer2)
        for (var i = 0; i < LBRLabels.length; i++) {
            map.removeLayer(LBRLabels[i])
        }

        LBRAdmin2 = false
    }

}

function adjustLayerbyZoom3(zoomSLE) {

    if (zoomSLE > 8) {
        if (!SLEAdmin2) {
          map.removeLayer(liberiaAdminLayer2)
          map.removeLayer(guineaAdminLayer2)
          map.removeLayer(ngrLgaLayer)
          map.addLayer(sleAdminLayer2)
                //Add labels to the Admin2
            for (var i = 0; i < SLELabels.length; i++) {
                SLELabels[i].addTo(map)
            }
            SLEAdmin2 = true
        }
    } else {
        map.removeLayer(sleAdminLayer2)
        for (var i = 0; i < SLELabels.length; i++) {
            map.removeLayer(SLELabels[i])
        }

        SLEAdmin2 = false
    }

}

function adjustLayerbyZoom4(zoomNGR) {

    if (zoomNGR > 8) {
        if (!NGRLga) {
          map.removeLayer(liberiaAdminLayer2)
          map.removeLayer(guineaAdminLayer2)
          map.removeLayer(sleAdminLayer2)
          map.addLayer(ngrLgaLayer)
                //Add labels to the Admin2
            for (var i = 0; i < NGRLabels.length; i++) {
                NGRLabels[i].addTo(map)
            }
            NGRLga = true
        }
    } else {
        map.removeLayer(ngrLgaLayer)
        for (var i = 0; i < NGRLabels.length; i++) {
            map.removeLayer(NGRLabels[i])
        }

        NGRLga = false
    }

}



function triggerUiUpdate() {
   /* getAdminLayers()*/
    countrySelect = $('#countryScope').val()
    country = countrySelect.concat(" ")
    country2 = countrySelect.concat(" Has ")
    country3 = countrySelect.concat("")
    $('#country').html(country)
    $('#country2').html(country2)
    console.log("Country is: ", countrySelect)

    // Working on Country Selection and Zooming to Each Country
    if(countrySelect == "Guinea") {
        map.setView([10.6, -13.8], 7, {animation: true})
        map.addLayer(guineaAdminLayer1)
        map.removeLayer(liberiaAdminLayer1)
        map.removeLayer(sleAdminLayer1)
        map.removeLayer(ngrStateLayer)
        map.on('zoomend', function () {
          adjustLayerbyZoom1(map.getZoom())
        })
    }

    if(countrySelect == "Liberia") {
        map.setView([6.5, -10.5], 7, {animation: true})
        map.addLayer(liberiaAdminLayer1)
        map.removeLayer(guineaAdminLayer1)
        map.removeLayer(sleAdminLayer1)
        map.removeLayer(ngrStateLayer)
        map.on('zoomend', function () {
          adjustLayerbyZoom2(map.getZoom())
        })

    }


    if(countrySelect == "Sierra Leone") {
        map.setView([8.5, -12], 7, {animation: true})
        map.addLayer(sleAdminLayer1)
        map.removeLayer(guineaAdminLayer1)
        map.removeLayer(liberiaAdminLayer1)
        map.removeLayer(ngrStateLayer)
        map.on('zoomend', function () {
          adjustLayerbyZoom3(map.getZoom())
        })

      }

    if(countrySelect == "Nigeria") {
        map.setView([10, 8], 6.5, {animation: true})
        map.addLayer(ngrStateLayer)
        map.removeLayer(guineaAdminLayer1)
        map.removeLayer(liberiaAdminLayer1)
        map.removeLayer(sleAdminLayer1)
        map.on('zoomend', function () {
          adjustLayerbyZoom4(map.getZoom())
        })

      }

    conflictScenario = $('#categoryScope').val()
    monthSelect = $('#monthScope').val()
    yr = $("#amount").val();
    yrs = yr.split('  -  ');
    country = $('#countryScope').val()

    var query = buildQuery(monthSelect, yrs, conflictScenario)
    console.log("QUERY:  ", query)
    getData(query)
   // map.setZoom(6)
}



function buildQuery(monthSelect, yearRange, conflictScenario) {
  var needsAnd = false;

  if(country == "Sierra Leone") {
    query = 'http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM sierra_leone_conflict_data';
  if (monthSelect.length > 0 || yearRange.length > 0 || conflictScenario > 0){
    query = query.concat(' WHERE')
    if (conflictScenario.length > 0){
      query = query.concat(" conflicts_scenario = '".concat(conflictScenario.concat("'")))
      needsAnd = true
    }
    if (monthSelect.length > 0){
      query = needsAnd  ? query.concat(" AND event_month = '".concat(monthSelect.concat("'"))) :  query.concat(" event_month = '".concat(monthSelect.concat("'")))
      needsAnd = true
    }

    if (yearRange.length > 1){
      query = needsAnd  ? query.concat(" AND event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1]))) : query = query.concat(" event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1])))
    }

    else query = 'http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM sierra_leone_conflict_data';
  }


  }


  else if(country == "Guinea") {
    query = 'http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM guinea_conflict_data';
  if (monthSelect.length > 0 || yearRange.length > 0 || conflictScenario > 0){
    query = query.concat(' WHERE')
    if (conflictScenario.length > 0){
      query = query.concat(" conflicts_scenario = '".concat(conflictScenario.concat("'")))
      needsAnd = true
    }
    if (monthSelect.length > 0){
      query = needsAnd  ? query.concat(" AND event_month = '".concat(monthSelect.concat("'"))) :  query.concat(" event_month = '".concat(monthSelect.concat("'")))
      needsAnd = true
    }

    if (yearRange.length > 1){
      query = needsAnd  ? query.concat(" AND event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1]))) : query = query.concat(" event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1])))
    }

    else query = 'http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM guinea_conflict_data';
  }

}

  else if(country == "Liberia") {
     query = 'http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM liberia_conflict_data';
  if (monthSelect.length > 0 || yearRange.length > 0 || conflictScenario > 0){
    query = query.concat(' WHERE')
    if (conflictScenario.length > 0){
      query = query.concat(" conflicts_scenario = '".concat(conflictScenario.concat("'")))
      needsAnd = true
    }
    if (monthSelect.length > 0){
      query = needsAnd  ? query.concat(" AND event_month = '".concat(monthSelect.concat("'"))) :  query.concat(" event_month = '".concat(monthSelect.concat("'")))
      needsAnd = true
    }

    if (yearRange.length > 1){
      query = needsAnd  ? query.concat(" AND event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1]))) : query = query.concat(" event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1])))
    }

    else query = 'http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM liberia_conflict_data';
  }

}


  else if(country == "Nigeria") {
     query = 'http://ehealthafrica.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM conflict_and_security_data';
  if (monthSelect.length > 0 || yearRange.length > 0 || conflictScenario > 0){
    query = query.concat(' WHERE')
    if (conflictScenario.length > 0){
      query = query.concat(" conflicts_scenario = '".concat(conflictScenario.concat("'")))
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
  return query
}



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

    dataLayer = L.geoJson(geoData, {
        pointToLayer: function (feature, latlng) {
            var marker = L.circleMarker(latlng, allColours[feature.properties.conflicts_scenario])
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

    ngrStateLayer = L.geoJson(layers['ngrAdmin1'], {
        style: layerStyles['admin1']
    })

    guineaAdminLayer2 = L.geoJson(layers['guineaAdmin2'], {
        style: layerStyles['admin2'],
        onEachFeature: function (feature, layer) {
            var labelIcon = L.divIcon({
                className: 'labelLga-icon',
                html: feature.properties.NAME_2
            })
            GINLabels.push(L.marker(layer.getBounds().getCenter(), {
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
            LBRLabels.push(L.marker(layer.getBounds().getCenter(), {
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
            SLELabels.push(L.marker(layer.getBounds().getCenter(), {
                    icon: labelIcon
                }))

        }
    })


    ngrLgaLayer = L.geoJson(layers['ngrAdmin2'], {
    style: layerStyles['admin2'],
    onEachFeature: function (feature, layer) {
        var labelIcon = L.divIcon({
            className: 'labelLga-icon',
            html: feature.properties.LGAName
        })
        NGRLabels.push(L.marker(layer.getBounds().getCenter(), {
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
    var propertyNames = ['country','event_type', 'event_year', 'event_month', 'event_date', 'country', 'admin1', 'admin2', 'state', 'lga','location', 'source', 'perpetrator', 'notes', 'fatalities', 'conflicts_scenario']
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
    showLoader()
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

     $.get('resources/state_boundary.geojson', function (ngr_admin1) {
        adminLayers['ngrAdmin1'] = JSON.parse(ngr_admin1)
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

        $.get('resources/lga_boundary.geojson', function (ngr_admin2) {
        adminLayers['NGRLga'] = JSON.parse(ngr_admin2)
        addAdminLayersToMap(adminLayers)
		}).fail(function () {
            logError(null)
        })





}

function logError(error) {
    console.log("error!")
}

getAdminLayers()
hideLoader()
/*triggerUiUpdate()*/


// This sectionhas to do with Adjoining Countries
function addDataToMapAd(geoDataAd) {
    // adjustLayerbyZoom(map.getZoom())
    //remove all layers first

    if (dataLayerAd != null)
        map.removeLayer(dataLayerAd)

    if (markerGroupAd != null)
        map.removeLayer(markerGroupAd)


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


    $('#projectCountAd').text(geoDataAd.features.length)

    markerGroupAd = L.markerClusterGroup({
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            removeOutsideVisibleBounds: true
        })
        //console.log("geoData", geoData)
    dataLayerAd = L.geoJson(geoDataAd, {
        pointToLayer: function (feature, latlng) {
            var markerAd = L.circleMarker(latlng, allColours[feature.properties.conflicts_scenario])
                //markerGroup.addLayer(marker);
            return markerAd
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

    markerGroupAd.addLayer(dataLayerAd);
    map.addLayer(markerGroupAd);

}

function adjoiningCountry (monthSelect, yearRange, conflictScenario, country) {
    var needsAnd = false;
    queryAd = ''
  if(country == "Liberia") {

    queryAd = 'http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM ivory_coast_conflict_data';
  if (monthSelect.length > 0 || yearRange.length > 0 || conflictScenario > 0 || country.length > 0){
    queryAd = queryAd.concat(' WHERE')
    if (conflictScenario.length > 0){
      queryAd = queryAd.concat(" conflicts_scenario = '".concat(conflictScenario.concat("'")))
      needsAnd = true
    }
    if (monthSelect.length > 0){
      queryAd = needsAnd  ? queryAd.concat(" AND event_month = '".concat(monthSelect.concat("'"))) :  queryAd.concat(" event_month = '".concat(monthSelect.concat("'")))
      needsAnd = true
    }

    if (yearRange.length > 1){
      queryAd = needsAnd  ? queryAd.concat(" AND event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1]))) : queryAd = queryAd.concat(" event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1])))
    }

   if (country.length > 0){
      queryAd = needsAnd  ? queryAd.concat(" AND country = 'Ivory Coast'") :  queryAd.concat(" AND country = 'Ivory Coast'")
      needsAnd = true
    }

   // else query = 'http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM sierra_leone_conflict_data';
  }


  }


  else if(country == "Guinea") {
    queryAd = 'http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM ivory_coast_conflict_data';
  if (monthSelect.length > 0 || yearRange.length > 0 || conflictScenario > 0 || country.length > 0){
    queryAd = queryAd.concat(' WHERE')
    if (conflictScenario.length > 0){
      queryAd = queryAd.concat(" conflicts_scenario = '".concat(conflictScenario.concat("'")))
      needsAnd = true
    }
    if (monthSelect.length > 0){
      queryAd = needsAnd  ? queryAd.concat(" AND event_month = '".concat(monthSelect.concat("'"))) :  queryAd.concat(" event_month = '".concat(monthSelect.concat("'")))
      needsAnd = true
    }

    if (yearRange.length > 1){
      queryAd = needsAnd  ? queryAd.concat(" AND event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1]))) : queryAd = queryAd.concat(" event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1])))
    }

   if (country.length > 0){
      queryAd = needsAnd  ? queryAd.concat(" AND country IN('Guinea-Bissau', 'Mali')") :  queryAd.concat(" AND country IN('Guinea-Bissau', 'Mali')")
      needsAnd = true
    }

 }


  }

  else if (country == "Sierra Leone") {
   queryAd = "http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM ivory_coast_conflict_data WHERE country = 'Sierra Leone'";



  }


  else if(country == "Nigeria") {
    queryAd = 'http://femtope.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM nigeria_adjoining';
  if (monthSelect.length > 0 || yearRange.length > 0 || conflictScenario > 0 || country.length > 0){
    queryAd = queryAd.concat(' WHERE')
    if (conflictScenario.length > 0){
      queryAd = queryAd.concat(" conflicts_scenario = '".concat(conflictScenario.concat("'")))
      needsAnd = true
    }
    if (monthSelect.length > 0){
      queryAd = needsAnd  ? queryAd.concat(" AND event_month = '".concat(monthSelect.concat("'"))) :  queryAd.concat(" event_month = '".concat(monthSelect.concat("'")))
      needsAnd = true
    }

    if (yearRange.length > 1){
      queryAd = needsAnd  ? queryAd.concat(" AND event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1]))) : queryAd = queryAd.concat(" event_year BETWEEN ".concat(yearRange[0]).concat(" AND ".concat(yearRange[1])))
    }

   if (country.length > 0){
      queryAd = needsAnd  ? queryAd.concat(" AND country IN('Benin', 'Chad', 'Cameroon', 'Niger')") :  queryAd.concat(" AND country IN('Benin', 'Chad', 'Cameroon', 'Niger')")
      needsAnd = true
    }

    }
  }


  return queryAd

}

function getDataAd(queryUrl) {
    showLoader()
    $.post(queryUrl, function (data) {
        hideLoader()
        addDataToMapAd(data)
    }).fail(function () {
        console.log("error!")
    });
}

function callAdjoining() {
/*    if (dataLayerAd != null)
        map.removeLayer(dataLayerAd)

    if (markerGroupAd != null)
        map.removeLayer(markerGroupAd)*/
    yr = $("#amount").val();
    yrs = yr.split('  -  ');

    console.log("Testing Country: ", country2)
    var queryAd = adjoiningCountry(monthSelect, yrs, conflictScenario, country)
    console.log("QUERY Country:  ", queryAd)
    getDataAd(queryAd)

}

function showBtn() {
  btnAd = document.getElementById("btnAd");
  if(country3 == "Nigeria") {
      btnAd.style.visibility = "visible"
      /*btnAd.Visible = true*/
      console.log("Am Here:  ", country3)
    }
  if (country3 == "Sierra Leone") {
    btnAd.style.visibility = "hidden"
    alertSRL();
  }

  if (country3 == "Liberia") {
    btnAd.style.visibility = "visible"
  }

  if (country3 == "Guinea") {
    btnAd.style.visibility = "visible"
  }

  else if (country3 == "") {
    btnAd.style.visibility = "hidden"
  }

}

function clearData () {
  if (dataLayerAd != null)
        map.removeLayer(dataLayerAd)

    if (markerGroupAd != null)
        map.removeLayer(markerGroupAd)
}

function alertSRL () {
  alert("There is no Adjoining Country Apart from the two involving Countries of Interest which are Guinea and Liberia. Thanks!!!")
}
