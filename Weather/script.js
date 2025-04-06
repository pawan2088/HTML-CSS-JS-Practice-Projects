
let weatherData;
let cityData;

function locationSuccess(position){
    const lati=position.coords.latitude;
    const longi=position.coords.longitude;   
    apiCall(lati,longi)   
}


function locationFail(position){
    console.log("Error",position);
    
}

const  apiCall = async function (lati, longi) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${longi}&daily=weather_code&hourly=temperature_2m,weather_code,precipitation&current=temperature_2m,weather_code`);
        const response2 = await fetch(`https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${lati}&longitude=${longi}&localityLanguage=en`);
        const data = await response.json();
        const data2 = await response2.json();

        
        weatherData = data;
        cityData=data2
         document.querySelector("#preloader").style.display="none"
        
        rawData();
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

function rawData(){
    console.log(weatherData);
    
    const currentTemperature=Math.ceil(weatherData.current.temperature_2m)
    const precipitation=weatherData.current.precipitation
    const is_day=weatherData.current.is_day
    const temperature_2m_max=weatherData.daily.temperature_2m_max
    const temperature_2m_min=weatherData.daily.temperature_2m_min
    const weather_code=weatherData.current.weather_code
    const location=`Near ${cityData.city}, ${cityData.localityInfo.administrative[1].name}`
    document.querySelector('.city').innerText=location

    editDashboard(currentTemperature,weather_code)
}



function editDashboard(currentTemperature,weather_code){
    document.querySelector(".temperature").innerHTML=`${currentTemperature}<span>°</span>`
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    document.querySelector(".date").innerText=` ${monthName} ${day}, ${year}`
    const svgUrl=checkWeatherCode(weather_code) 
    document.querySelector(".weather-svg").innerHTML=`<div><img src=${svgUrl[0]}></div><div>${svgUrl[1]}</div>`
    
    hourly()
}



function checkWeatherCode(code){
    if(code === 0){
        return ["icon/clear-day.svg","Clear Day"]
    }else if([1,2,3].includes(code)){
        return ["icon/partly-cloudy-day-fog.svg","Cloudy"]
    }else if([45,48].includes(code)){
        return ["icon/fog.svg","Foggy"]
    }else if([51,53,55,56,57].includes(code)){
        return ["icon/drizzle.svg","Drizzle"]
    }else if([61, 63, 65,66, 67,80, 81, 82].includes(code)){
        return ["icon/rain.svg","Rain"]
    }else if([71, 73, 75,77,85, 86].includes(code)){
        return ["icon/snow.svg","Snowey"]
    }else if([95,96,99].includes(code)){
        return ["icon/thunderstorms-day.svg","Thunderstorm"]
    }
}


window.addEventListener("DOMContentLoaded",async ()=>{  
    
    if (window.innerWidth < 800) {
        document.querySelector("#preloader").innerText="This Site is not Visible on Mobile Devices switch to Desktop"
    } else {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);
    }
})



function hourly(){
    const boxes=document.querySelectorAll(".box")
    let startPoint=(new Date).getHours()+1
    let k=0
    let p=0
    for (let i = startPoint; i < startPoint+6; i++) {
        if(i>=24){
            
            boxes[p].innerHTML=`<div>0${k}:00</div><img src=${checkWeatherCode(weatherData.hourly.weather_code[i])[0]}><div>${Math.ceil(weatherData.hourly.temperature_2m[i])}°</div>`
            k++
        }else{
            boxes[p].innerHTML=`<div>${i}:00</div><img src=${checkWeatherCode(weatherData.hourly.weather_code[i])[0]}><div>${Math.ceil(weatherData.hourly.temperature_2m[i])}°</div>`
        }
        
        p++
        
        
    }

}

document.querySelector(".hourly").addEventListener("click",hourly)
document.querySelectorAll('.options a').forEach(link => {
    link.addEventListener('click', (e) => {
        document.querySelectorAll('.options a').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
    });
});
