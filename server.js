const express = require('express');
const app = express();
const https = require('https')
const path = require('path')
require('dotenv').config()
const apiKey = process.env.API_KEY

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));


app.get('/',(req,res)=>{
    res.render('index',{data:{}})
    
})
app.post('/',(req,res)=>{
    const city = req.body.city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    https.get(url,(resp)=>{
        resp.on('data',(data)=>{
            const weatherData = JSON.parse(data)
            res.render('index',{data:{content:`Temperature:${weatherData.main.temp}     Humidity:${weatherData.main.humidity}`}})
        })
        
    })
    

}) 


app.listen(5000)
