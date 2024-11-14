import express from 'express';
const app = express();
// Import the dbconfig
import db from './config/dbconfig.js';

// Set up the server and the view engine
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Changes ni Charles
//Changees
// CHANGES NI ROI
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/customers', (req, res) => {
  // Fetch all the customers from the database
  db.query('SELECT * FROM customers', (err, result) => {
    if (err) {
      console.log(err);
    }

    // Calculate the number of customers today using the visited_today
    const customersToday = result.filter(customer => customer.visited_today === true);

    // Calculate the numbers of customers visited this week using the last_visit
    const customersThisweek = result.filter(customer => {
      const lastVisit = new Date(customer.last_visit).getTime();
      const today = new Date().getTime();
      const diff = today - lastVisit;
      const days = diff / (1000 * 60 * 60 * 24);
      return days <= 7;
    });

    res.render('customers', { customers: result, customersToday: customersToday.length, customersThisweek: customersThisweek.length });
  });
});

app.get('/products', (req, res) => {
  // Fetch all the products from the database
  db.query('SELECT * FROM products', (err, result) => {
    if (err) {
      console.log(err);
    }
    res.render('products', { products: result });
  });
});


import productsManagementRouter from './routes/products.js';
app.use('/products', productsManagementRouter);
import customersControlsRouter from './routes/customers-controls.js';
app.use('/customers', customersControlsRouter);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


