cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city).then(data => updateUI(data))
        .catch(err => console.log(err))

    // set local storage
    localStorage.setItem('city', city);
    if (localStorage.getItem('city')){
        updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    }
});

// getting city code 
const getCity = async(city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

// getting weather conditions from city code
const getWeather = async(id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

// updating city
const updateCity = async(city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    return { cityDets, weather }
}

// updating the user interface
const updateUI = data => {
    const cityDets = data.cityDets;
    const weather = data.weather;

    details.innerHTML = `
    <h1>${cityDets.LocalizedName}</h1>
    <h1>${weather.Temperature.Metric.Value}<span>&deg;C</h1>
    <h1>${weather.WeatherText}</h1>
    `;
    // update day or night img
    let day = weather.IsDayTime ? 'img/day.png' : 'img/night.png';
    daytime.setAttribute('src', day);

    //update weather icon
    let weatherIcon = `img/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', weatherIcon);
}