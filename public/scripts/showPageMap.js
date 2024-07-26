mapboxgl.accessToken = mbxToken;

const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v12', 
    center: restaurant.geometry.coordinates, 
    zoom: 10, 
});

// Add a marker on the map for our restaurant location
new mapboxgl.Marker()
    .setLngLat(restaurant.geometry.coordinates)
    // Popup for when you click on the marker
    .setPopup( 
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${restaurant.title}</h3>`
        )
    )
    .addTo(map);
