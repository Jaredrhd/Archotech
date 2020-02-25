//After page load get location
window.addEventListener('load', () => {
    let long;
    let lat;
    let tempretureDegree = document.querySelector(".temperature-degree");

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`;
            //fetch the data, then put into "data" variable
            fetch(api).then(data =>{
                return data.json();
            })
            .then(response => {
                const weatherApi = `${proxy}https://www.metaweather.com/api/location/${response[0].woeid}/`

                fetch(weatherApi).then(weatherdata =>{
                    return weatherdata.json();
                })
                .then(weatherReponse => {
                    console.log(weatherReponse.consolidated_weather[0].the_temp);
                    
                    //Set DOM Elements from API
                    tempretureDegree.textContent = weatherReponse.consolidated_weather[0].the_temp;
                })
            })
        });
    }
});