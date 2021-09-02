var APIkey = "&appid=a462c584d163304aa73ed887092171dd&units=imperial";
var queryUrl = "https://openweathermap.org/api/one-call-api";
var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?q=";
var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=";

$('#search-city').on('click', function(event) {
    event.preventDefault();
    var cityName = $('#enter-city').val();
    console.log(cityName);
    currentWeatherForecast(cityName)
    fiveDayForecast(cityName)
});

function currentWeatherForecast(cityName) {
    $.ajax({
        url: queryURL2 + cityName + APIkey, 
        method: "GET"

    }).then(function(APIresponse){
        console.log(APIresponse)
        $("#current-weather").html(`
        <div class='contianer bg-secondary'>
           <h3>City: ${cityName}</h3>
          <h6> Temp: ${APIresponse.main.temp}</h6>
           <h4>Description: ${APIresponse.weather[0].description}
           <img src='https://openweathermap.org/img/wn/${APIresponse.weather[0].icon}@2x.png' /></h4>
           Humditity:
           Wind speed:
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
        var codeHTML = ''
        for(let i=0;i<APIresponse.list.length;i =i+8){
            codeHTML += `
            <div class='contianer bg-secondary'>
            <h3>City: ${cityName}</h3>
           <h6> Temp: ${APIresponse.list[i].main.temp}</h6>
            <h4>Description: ${APIresponse.list[i].weather[0].description}
            <img src='https://openweathermap.org/img/wn/${APIresponse.list[i].weather[0].icon}@2x.png' /></h4>
            Humditity:
            Wind speed:
         </div>
 
            `
        }
        $("#fiveday").html(codeHTML)
    })
}

function uvIndex(cityName) {
    $.ajax({
        url: queryUrl + cityName + APIkey, 
        method: "GET"

    }).then(function(APIresponse){
        console.log(APIresponse)
    })
}

