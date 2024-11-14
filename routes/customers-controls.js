import express from 'express';
import db from '../config/dbconfig';
const router = express.Router();

// Delete the customer

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM customers WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send('Customer deleted successfully');
  });
}
);

// Update the customer
router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  db.query('UPDATE customers SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send('Customer updated successfully');
  });
}
);



export default router;
