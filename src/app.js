const path = require('path'),
    express = require('express'),
    hbs = require('hbs'),
    axios = require('axios');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public'),
    viewsPath = path.join(__dirname, '../templates/views'),
    partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setting static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get('/', (req, res)=>{
    res.render('index', {
        title : 'Weather App',
        name : 'Harsh'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About',
        name : 'Harsh'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message : 'Just type the location in the input box and get the weather',
        title : 'Help',
        name : 'Harsh'
    })
})

app.get('/weather', async (req, res)=>{
    if(!req.query.address){
        res.send({
            error : 'Please provide the address'
        })
        return;
    }
    try{
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${req.query.address}`);
        const weatherData = response.data;
        if(weatherData.error) throw weatherData;
        res.send({
            location : `${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`,
            temperature : weatherData.current.temperature,
            forecast : weatherData.current.weather_descriptions[0],
            feelsLike : weatherData.current.feelslike
        })
    } catch(err){
        res.status(400).send(err);
    }
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        message : 'Help article not found.',
        title : '404',
        name : 'Harsh'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        message : 'Page not found.',
        title : '404',
        name : 'Harsh'
    })
})

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})