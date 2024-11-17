function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
                const geocodeApiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=pt`;

                fetch(weatherApiUrl)
                    .then(response => response.json())
                    .then(weatherData => {
                        const temperature = weatherData.current_weather.temperature;
                        const weatherDescription = 'tempo atual';

                        return fetch(geocodeApiUrl)
                            .then(response => response.json())
                            .then(geocodeData => {
                                const location = geocodeData.address.city || geocodeData.address.town || geocodeData.address.village || 'Local desconhecido';

                                const locationElement = document.querySelector('.location');
                                const temperatureElement = document.querySelector('.temperature');
                                const conditionElement = document.querySelector('.condition');
                                const weatherContainer = document.querySelector('.weather-container');

                                locationElement.textContent = location;
                                temperatureElement.textContent = `${temperature}°C`;
                                conditionElement.textContent = `Condição: ${weatherDescription}`;

                                // Adicionar classes de estilo com base na temperatura
                                if (temperature > 25) {
                                    weatherContainer.classList.add('hot');
                                    weatherContainer.classList.remove('mild', 'cold');
                                } else if (temperature < 10) {
                                    weatherContainer.classList.add('cold');
                                    weatherContainer.classList.remove('hot', 'mild');
                                } else {
                                    weatherContainer.classList.add('mild');
                                    weatherContainer.classList.remove('hot', 'cold');
                                }
                            });
                    })
                    .catch(error => {
                        console.error('Erro ao obter os dados:', error);
                        document.querySelector('.location').textContent = 'Erro ao carregar a localização';
                        document.querySelector('.condition').textContent = 'Erro ao carregar o clima';
                    });
            },
            (error) => {
                console.error('Erro ao obter a localização:', error);
                document.querySelector('.location').textContent = 'Permita o acesso à localização';
            }
        );
    } else {
        document.querySelector('.location').textContent = 'Geolocalização não suportada pelo navegador';
    }
}

getWeather();
