document.addEventListener('DOMContentLoaded', function () {
    var mymap = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap contributors'
    }).addTo(mymap);

    var searchForm = document.getElementById('Recherche');
    var searchInput = document.getElementById('barreRecherche');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var cityName = searchInput.value;

        fetch(`https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(function(data) {
                if (data.length > 0) {
                    var lat = parseFloat(data[0].lat);
                    var lon = parseFloat(data[0].lon);

                    fetch(`https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`, {
                        headers: { 'X-Api-Key': 'LMnUABvTai3EhRX0ZDKjTg==kDJaaH8jGmRHAvtN' }
                    })
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error('Erreur lors de la récupération du temps');
                        }
                        return response.json();
                    })
                    .then(function(result) {
                        console.log(result);
                        mymap.setView([lat, lon], 13);
                        L.marker([lat, lon]).addTo(mymap)
                            .bindPopup(`<b>Ville :</b> ${cityName}<br><b>Date et heure :</b> ${result.datetime}`).openPopup();
                    })
                    .catch(function(error) {
                        console.error('Erreur lors de la récupération du temps:', error);
                    });
                } else {
                    alert("Ville non trouvée !");
                }
            })
            .catch(function(error) {
                console.error('Erreur lors de la recherche de la ville:', error);
            });
    });
});
