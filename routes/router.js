const router = require("express").Router();

const customers = require("../controllers/Customer");

router.get('/get-all', customers.getCustomers);
router.get('/get-single/:id', customers.getSingleCustomer);
router.put('/update-customer/:id', customers.updateCustomer);
router.delete('/delete-customer/:id', customers.deleteCustomer);
router.post('/add-customer', customers.createCustomer);



module.exports = router;