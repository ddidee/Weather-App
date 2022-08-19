let btn = document.querySelector('#btn')
let result = document.querySelector('#searchResult')
let input = document.querySelector('input')
let search = document.querySelector('#search')

// getting the days of the week
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let date = new Date()
let day = days[date.getDay()]
console.log(day);


// getting the weather in each city
const getWeather = () => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q= ${input.value} &appid=b51729efe28965ec1f969b612b0507a6`)
    .then(res => {
        if(!res.ok){
            search.style.visibility = 'hidden'
            result.style.visibility = 'visible'

            result.innerHTML = 'Oooooops!.... City Not Found!'
        }
        return res.json()
    })
    .then(data =>{
        console.log(data);
        if (input.value.length === 0) {
            input.value = 'please enter a city name!'
        } 
        
        else {

            search.style.visibility = 'hidden'
            result.style.visibility = 'visible'

            // rounding off the temperature before using it
            let temp = Math.round(data.main.temp) 
            
            let display = ''

            display += `
                <h2 id="city">Weather in ${data.name}</h2>
                <div id="day">${day}</div>
                <div id="temp">${temp}C</div>
                <img id='img' src="images/cloud.png" alt="">
                <div id="description">${data.weather[0].description}</div>
                <div id="humid">Humidity: ${data.main.humidity}</div>`

            result.innerHTML = display
            


        }
    })
   
    // result.style.visibility = 'visible'
}
btn.addEventListener('click', getWeather)