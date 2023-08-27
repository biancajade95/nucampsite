console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 2000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
}) 
   

async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = "Cleveland";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayWeather(data);
        } else {
            console.error('API request was not successful:', data.message);
        }
    } catch (error) {
        console.error('There was an error!', error);
    }
}

(async () => {
    await fetchWeather();
   })();


function displayWeather(weatherData) {
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

    const weatherIcon = document.createElement('img');
    weatherIcon.src = iconUrl;

    const temperatureElement = document.getElementById('weather-temp');
    const descriptionElement = document.getElementById('weather-description');
    const iconContainer = document.getElementById('weather-icon');

    temperatureElement.textContent = `${temperature} \u00B0F`;
    descriptionElement.textContent = `${description}`;

    iconContainer.innerHTML = '';
    iconContainer.appendChild(weatherIcon);
}

