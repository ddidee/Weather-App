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
            const temp = Math.round(data.main.temp) 

            const main = data.weather[0].main
            const icon = data.weather[0].icon
            const desc = data.weather[0].description

           
            
            let display = ''

            display += `
                <h2 id="city">Weather in ${data.name}</h2>
                <div id="day">${day}</div>
                <div id="temp">${temp}C</div>
                <img id='img' src="" alt="">
                <div id="description">${desc}</div>
                <div id="humid">Humidity: ${data.main.humidity}</div>`

            result.innerHTML = display
            const image = document.querySelector('img')
            if (main) {
                image.src =` http://openweathermap.org/img/wn/${icon}@2x.png`
            } 
            
        }
    })
   
    // result.style.visibility = 'visible'
}

// event listener
btn.addEventListener('click', getWeather)



// || main === 'Thunderstorm' || main === 'drizzle' || main === 'snow' || main === 'clear' || main === 'rain' || main === 'mist'