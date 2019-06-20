const path = require('path');
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//Define Paths for Express congig
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../view/views');
const partialPath = path.join(__dirname, '../view/partials');
//handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup sattic directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home Page',
    name: 'Cormac',
    msg: 'Open on Port 3000'
  });
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error : 'Must provide address'
    })
  }

  geocode(req.query.address, (error, {lat, long, location} = {}) => {
    if(error){
      return res.send({
        error : 'Must provide address'
      })
    }

    forecast(lat,long, (error, forecastData) => {

      if(error){
        return res.send({
          error : 'Must provide address'
        })
      }

      res.send({
        forcast:forecastData ,
        location,
        address: req.query.address
      })

    });
  });
})



app.get('/weather/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Cormac',
    msg: 'Weather Not Found'
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Cormac',
    msg: 'Page Not Found'
  });
})


app.listen(3000, () => {
  console.log('Starting Server on port 3000');
});
