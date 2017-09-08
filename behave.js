var lat;
var lon;
document.getElementById('button').addEventListener('click', getCoordinates);
function getCoordinates(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else {
        document.getElementById('loc').innerHTML = "Geolocation is not supported by this browser or you didn't give permission.";
    }
    
    function showPosition(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        getWeather();
    }
}
function getWeather(){
    fetch('https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon)
    .then((res) => res.json())
    .then((wd) => {
        var mainAndLogo = `
            <img src='${wd.weather[0].icon}' alt=''>
            ${wd.weather[0].main}
        `;
        if(wd.weather[0].main === "Haze"){
            document.body.style.backgroundImage = "url('https://ak6.picdn.net/shutterstock/videos/11923133/thumb/1.jpg')";
        }
        else if(wd.weather[0].main === "Rain"){
            document.body.style.backgroundImage = "url('https://wallpaperscraft.com/image/umbrella_rain_drops_cane_clouds_precipitation_49139_1920x1080.jpg')";
        }
        else if(wd.weather[0].main === "Clouds"){
            document.body.style.backgroundImage = "url('https://goo.gl/images/7YHae7')";
        }
        document.getElementById('weatherName').innerHTML = mainAndLogo;
        document.getElementById('loc').innerHTML =  wd.weather[0].description;
        var od = `
            <h3>Temperature: ${wd.main['temp']}C</h3><br>
            <h3>Humidity: ${wd.main['humidity']}</h3><br>
            <h3>Wind speed: ${wd.wind['speed']}km/hr</h3><br>
        `;
        document.getElementById('otherDetails').innerHTML = od;
    })

}