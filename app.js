// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json').results

const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurantsList })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantsList.find(item => item.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const OriginKeyword = req.query.keyword

  if (!OriginKeyword) {
    res.redirect("/")
  }
  const keyword = OriginKeyword.toLowerCase().trim()
  const restaurantSearch = restaurantsList.filter(item => {
    return item.name.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurantsList: restaurantSearch, OriginKeyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})