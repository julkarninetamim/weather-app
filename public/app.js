const condition = document.getElementById('condition')
const city = document.getElementById('city')
const country = document.getElementById('country')
const mainText = document.getElementById('main')
const description = document.getElementById('description')
const temp = document.getElementById('temp')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')

const cityInput = document.getElementById('city-input')
const historyElm = document.getElementById('history')
const masterHistory = document.getElementById('master-history')


const API_KEY = '2c84cc0a1c3def12365db0033fab7299'
const DEFAULT_CITY = 'London'
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`
const ICON_URL = 'https://openweathermap.org/img/wn/'

//alert('Hi')
window.onload = function () {
    navigator.geolocation.getCurrentPosition(s => {
        console.log(s)
        getWeatherData(null, s.coords)
    }, e => {
        getWeatherData(e)
    })
    axios.get('/api/history')
        .then(({data}) => {
            if (data.length > 0) {
                updateHistory(data)
            } else {// history data না থাকলে
                historyElm.innerHTML = 'There is No History'
            }
        })
    cityInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            console.log(event)
            if (event.target.value) {
                getWeatherData(event.target.value, null, weather => {
                    event.target.value = ''
                    axios.post('/api/history', weather)
                        .then(({data}) => updateHistory(data))
                        .catch(e => {
                            console.log(e)
                            alert('Error Occurred')
                        })
                })
            } else {
                alert('Please Enter a Valid City')
            }
        }
    })
}

function getWeatherData(city = DEFAULT_CITY, coords, cb) {
    let url = BASE_URL
    city === null ? (url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`) : (url = `${url}&q=${city}`)
    //console.log(url)
    axios.get(url)
        .then(({data}) => {
            let weather = {
                icon: data.weather[0].icon,
                name: data.name,
                country: data.sys.country,
                main: data.weather[0].main,
                description: data.weather[0].description,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            }
            console.log(data)
            setWeather(weather)
            if (cb) cb(weather)
        }).catch(e => {
        console.log(e)
        alert('City Not Found')
    })
}

function setWeather(weather) {
    condition.src = `${ICON_URL}${weather.icon}.png`
    city.innerHTML = weather.name
    country.innerHTML = weather.country
    mainText.innerText = weather.main
    temp.innerHTML = weather.temp
    description.innerHTML = weather.temp
    pressure.innerHTML = weather.pressure
    humidity.innerHTML = weather.humidity
}

function updateHistory(history) {
    historyElm.innerHTML = ''
    history = history.reverse()//দেখানোর ক্ষেত্রে রিভার্স করে নিই লেটেস্ট ডাটা আগে দেখানোর জন্য
    //যেহেতু history একটি array তাই প্রত্যেকটি history element এর জন্য একটি করে card তৈরি করে নেই
    history.forEach(h => {
        let tempHistory = masterHistory.cloneNode(true)//masterHistory template কে deep clone করে নেই
        tempHistory.id = ''//প্রত্যেকটা history যাতে দেখা যায় তাই id কে empty করে নেই এবং card গুলো visible  হবে
        tempHistory.getElementsByClassName('condition')[0].src = `${ICON_URL}${h.icon}.png`
        tempHistory.getElementsByClassName('city')[0].innerHTML = h.name
        tempHistory.getElementsByClassName('country')[0].innerHTML = h.country
        tempHistory.getElementsByClassName('main')[0].innerHTML = h.main
        tempHistory.getElementsByClassName('description')[0].innerHTML = h.description
        tempHistory.getElementsByClassName('temp')[0].innerHTML = h.temp
        tempHistory.getElementsByClassName('pressure')[0].innerHTML = h.pressure
        tempHistory.getElementsByClassName('humidity')[0].innerHTML = h.humidity

        historyElm.appendChild(tempHistory)
    })

}

//bd user: users
//db pass: dbPass