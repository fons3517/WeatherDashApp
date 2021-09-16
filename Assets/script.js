var APIkey = "&appid=a462c584d163304aa73ed887092171dd&units=imperial";
var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?q=";
var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?q=";
var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=";


$('#search-city').on('click', function(event) {
    event.preventDefault();
    var cityName = $('#enter-city').val();
    console.log(cityName);
    currentWeatherForecast(cityName)
    fiveDayForecast(cityName)
    $('#enter-city').val('');
    // localStorage.setItem("cityName", cityName);
    // localStorage.getItem(cityName);
});

function currentWeatherForecast(cityName) {
    $.ajax({
        url: queryURL2 + cityName + APIkey, 
        method: "GET"

    }).then(function(APIresponse){
        console.log(APIresponse)
        var previousCity = JSON.parse(localStorage.getItem("citySearch")) || []
        previousCity.push(cityName)
        localStorage.setItem("citySearch", JSON.stringify(previousCity))
        displayLocalStorage();
        const lat = APIresponse.coord.lat
        const lon = APIresponse.coord.lon
        uvIndex(lat, lon)
        $("#current-weather").html(`
        <div class='container bg-info'>
           <h3>City: ${cityName}</h3>
          <h6>Temp: ${APIresponse.main.temp}</h6>
           <h4>Description: ${APIresponse.weather[0].description}
           <img src='https://openweathermap.org/img/wn/${APIresponse.weather[0].icon}@2x.png'></h4>
            <h6>Humditity: ${APIresponse.main.humidity}%</h6>
            <h6>Wind speed: ${APIresponse.wind.speed}mph</h6>
            <h6 class="uvIndex">UV Index:</h6>
        </div>
        `)
    })
}

function fiveDayForecast(cityName) {
    $.ajax({
        url: queryURL3 + cityName + APIkey, 
        method: "GET"

    }).then(function(APIresponse){
        console.log(APIresponse)
        var codeHTML = "";
        for(let i = 0; i < APIresponse.list.length; i = i + 8){
            codeHTML += `
            <div class='container bg-info m-2 p-2' style="width:30%;">
            <h3>City: ${cityName}</h3>
           <h6>Temp: ${APIresponse.list[i].main.temp}</h6>
            <h4>Description: ${APIresponse.list[i].weather[0].description}
            <img src='https://openweathermap.org/img/wn/${APIresponse.list[i].weather[0].icon}@2x.png' /></h4>
            <h6>Humditity: ${APIresponse.list[i].main.humidity}%</h6>
            <h6>Wind speed: ${APIresponse.list[i].wind.speed}mph</h6>
         </div>
            `
        }
        $("#fiveday").html(codeHTML)
    })
}

function uvIndex(lat, lon) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily${APIkey}`,
        method: "GET"

    }).then(uvIndexCallBack)
}

function uvIndexCallBack(APIresponse){
    console.log(APIresponse)
    $(".uvIndex").text(`UV Index: ${APIresponse.current.uvi}`)
}

function displayLocalStorage(){
    var previousCity = JSON.parse(localStorage.getItem("citySearch")) || []
    var cityList = "";
    for(var i = 0; i < previousCity.length; i++) {
        cityList += `
        <button class= "cityButton btn btn-warning m-2 p-2">${previousCity[i]}</button>
        `
    }
    $("#city-list").html(cityList)
}
displayLocalStorage();