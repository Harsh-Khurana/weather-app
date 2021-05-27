const path = require('path'),
    express = require('express'),
    hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setting static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res)=>{
    res.render('index', {
        title : 'Weather App',
        name : 'John'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'some random image',
        name : 'John'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message : 'help me',
        title : 'Help',
        name : 'John'
    })
})

app.get('/weather', (req, res)=>{
    res.send([
        {
            forecast : 'Cloudy',
            temprature : 25
        },
        {
            forecast : 'Sunny',
            temprature : 35
        }
    ]);
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        message : 'Help article not found.',
        title : '404',
        name : 'john'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        message : 'Page not found.',
        title : '404',
        name : 'john'
    })
})

app.listen(3000, ()=>{
    console.log('Server started');
})