document.addEventListener('DOMContentLoaded', function () {

    var mymap = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);


    L.marker([51.505, -0.09]).addTo(mymap)
        .bindPopup('Hello, World!').openPopup();

     L.marker([53.505, -0.09]).addTo(mymap)
        .bindPopup('Coucou').openPopup();
});
