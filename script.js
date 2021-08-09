document.querySelector('.formLocal').addEventListener('submit', async (event)=>{ //SUBMIT =QUANDO ENVIAR
    event.preventDefault() // PREVINE O COMPORTAMENTO PADRÃO

    let input = document.querySelector('#locClima').value

    if(input !== ''){
        clear()
        showWarning(`Carregando...`)

        let results = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ba44cd987b90e69a802e32e4145ef2bf&units=metric&lang=pt_br`)
        let json = await results.json()
        console.log(json)

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }else{
            clear()
            showWarning('Cidade não encontrada.')
        }

    }else{
        clear()
    }
})

function showInfo(json){
    showWarning('')

    document.querySelector('.titLocal').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.infoTemp').innerHTML = `${json.temp}<sup>°C</sup>`
    document.querySelector('.infoVento').innerHTML = `${json.windSpeed}<span>km/h</span>`
    
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}.png` )

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.res').style.display = 'block'
}

function clear(){
    showWarning('')
    document.querySelector('.res').style.display = 'none'
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}