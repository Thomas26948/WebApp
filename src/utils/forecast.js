const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=e2a4314be5be30b90faf009ac26e3669&query="+latitude+","+longitude+"&units=m"
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+". Il fait actuellement " + body.current.temperature +" degres. Le ressenti est de "+body.current.feelslike + " degres." + " Heure actuelle : "+ body.current.observation_time )
        }
    })
}


module.exports= forecast