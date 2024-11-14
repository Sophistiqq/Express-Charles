import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'roi',
  password: '123',
  database: 'Charles',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
}
);

// Create a table for Customers
const createCustomersTable = `CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  days_visited INT DEFAULT 0,
  last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_spent INT DEFAULT 0,
  visited_today BOOLEAN DEFAULT FALSE
)`;

// Create a table for Products
const createProductsTable = `CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  stock INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  description TEXT,
  image_url VARCHAR(255),
  category VARCHAR(255)
)`;

// Create a table for Orders
const createOrdersTable = `CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  total_price INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
)`;

// Create the tables
db.query(createCustomersTable, (err) => {
  if (err) {
    throw err;
  }
  console.log('Customers table created');
});

db.query(createProductsTable, (err) => {
  if (err) {
    throw err;
  }
  console.log('Products table created');
});

db.query(createOrdersTable, (err) => {
  if (err) {
    throw err;
  }
  console.log('Orders table created');
});

//// Sample data for Customers table
//const insertSampleCustomers = `INSERT INTO customers (name, email, phone, days_visited, last_visit, total_spent, visited_today) VALUES
//('John Doe', 'john.doe@example.com', '123-456-7890', 5, '2024-10-01 10:00:00', 100, TRUE),
//('Jane Smith', 'jane.smith@example.com', '234-567-8901', 3, '2024-10-02 11:00:00', 150, FALSE),
//('Alice Johnson', 'alice.johnson@example.com', '345-678-9012', 7, '2024-10-03 12:00:00', 200, TRUE),
//('Bob Brown', 'bob.brown@example.com', '456-789-0123', 2, '2024-10-04 13:00:00', 50, FALSE)`;
//
//db.query(insertSampleCustomers, (err) => {
//  if (err) {
//    throw err;
//  }
//  console.log('Sample customers data inserted');
//});

//// Sample data for Products table
//const insertSampleProducts = `INSERT INTO products (name, price, stock, description, image_url, category) VALUES
//('Product 1', 100, 10, 'This is product 1', 'https://via.placeholder.com/150', 'Category 1'),
//('Product 2', 200, 20, 'This is product 2', 'https://via.placeholder.com/150', 'Category 2'),
//('Product 3', 300, 30, 'This is product 3', 'https://via.placeholder.com/150', 'Category 3'),
//('Product 4', 400, 40, 'This is product 4', 'https://via.placeholder.com/150', 'Category 4')`;
//
//db.query(insertSampleProducts, (err) => {
//  if (err) {
//    throw err;
//  }
//  console.log('Sample products data inserted');
//});

export default db;


