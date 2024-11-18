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
                        const weatherCode = weatherData.current_weather.weathercode;
                        const currentTime = new Date().getHours();
                        const isDayTime = currentTime >= 6 && currentTime < 18; // Dia entre 6h e 18h

                        // Decodificar o weatherCode para uma descrição e um ícone
                        let weatherDescription;
                        let iconPath;

                        if (weatherCode === 0) {
                            weatherDescription = 'Céu limpo';
                            iconPath = isDayTime ? 'icons/clear-day.png' : 'icons/clear-night.png';
                        } else if (weatherCode >= 1 && weatherCode <= 3) {
                            weatherDescription = 'Parcialmente nublado';
                            iconPath = isDayTime ? 'icons/partly-cloudy-day.png' : 'icons/partly-cloudy-night.png';
                        } else if (weatherCode === 45 || weatherCode === 48) {
                            weatherDescription = 'Nevoeiro';
                            iconPath = isDayTime ? 'icons/fog-day.png' : 'icons/fog-night.png';
                        } else if (weatherCode >= 51 && weatherCode <= 67) {
                            weatherDescription = 'Chuvisco ou chuva leve';
                            iconPath = isDayTime ? 'icons/drizzle-day.png' : 'icons/drizzle-night.png';
                        } else if (weatherCode >= 71 && weatherCode <= 77) {
                            weatherDescription = 'Neve ou neve leve';
                            iconPath = isDayTime ? 'icons/snow-day.png' : 'icons/snow-night.png';
                        } else if (weatherCode >= 80 && weatherCode <= 82) {
                            weatherDescription = 'Chuva forte';
                            iconPath = isDayTime ? 'icons/rain-day.png' : 'icons/rain-night.png';
                        } else if (weatherCode >= 95 && weatherCode <= 99) {
                            weatherDescription = 'Tempestade';
                            iconPath = isDayTime ? 'icons/storm-day.png' : 'icons/storm-night.png';
                        } else {
                            weatherDescription = 'Condições desconhecidas';
                            iconPath = 'icons/unknown.png';
                        }

                        return fetch(geocodeApiUrl)
                            .then(response => response.json())
                            .then(geocodeData => {
                                const location = geocodeData.address.city || geocodeData.address.town || geocodeData.address.village || 'Local desconhecido';

                                const locationElement = document.querySelector('.location');
                                const temperatureElement = document.querySelector('.temperature');
                                const conditionElement = document.querySelector('.condition');
                                const iconElement = document.querySelector('.weather-icon');

                                locationElement.textContent = location;
                                temperatureElement.textContent = `${temperature}°C`;
                                conditionElement.textContent = weatherDescription;
                                iconElement.src = iconPath;
                                iconElement.alt = weatherDescription;
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
