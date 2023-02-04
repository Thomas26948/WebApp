const path = require('path')
const fs = require('fs')
const express = require('express')
const fileUpload = require('express-fileupload');
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hf = require('./utils/hf')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))


const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setp handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setp static directory to serve
app.use(express.static(path.join(__dirname,'../public')))
app.use(fileUpload({
    limits: {
        fileSize: 10000000,
    },
    abortOnLimit: true,
}));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'AI Web App',
        name: 'Thomson'
    })
})



app.get('/tts',(req,res)=>{
    if(!req.query.text){
        return res.send({
            error: "No text was provided, please input a text to translate in german"
        })
    }
    hf(req.query.text, (error, response)=>{
        console.log(response)
        res.send(
            response)
        }
    )


    // res.send({
    //     forecast: 50,
    //     location: "Philiadelphia",
    //     address: req.query.adress
    // })
})

app.get('/image',(req,res)=>{
    var file = path.join(publicDirectoryPath, "hf2.svg");
    var s = fs.readFile(file, (err, data) => { 
        if (err) throw err;
        console.log(data);
        res.contentType('image/svg+xml');
        res.send(data);
        });
})

//* = tt ce qui n'a pas ete precise avant
app.get('*',(rep,res)=>{
    res.render('error',{
        error: 'page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})