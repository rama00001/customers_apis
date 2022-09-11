const Customer = require("../model/CustomerModal");

const getCustomers = (req, res) => {
  Customer.find((err, customers) => {
    if (err) {
      res.send(err);
    }
    res.json(customers);
  });
};

const createCustomer = (req, res) => {
  var customer = new Customer({
    name: req.body.name,
    gender: req.body.gender,
    phone: req.body.phone,
    age: req.body.age
  });
  Customer.findOne({ phone: customer.phone }, function(err, data) {
    if (err) {
      res.send(err);
    } else if (data && data.phone) {
      res.send("This has already been saved");
    } else {
      customer.save((err, customer) => {
        if (err) {
          res.send(err);
        }
        res.json(customer);
      });
    }
  });
};

const getSingleCustomer = (req, res) => {
  Customer.findOne({ _id: req.params.id }, (err, customer) => {
    if (err) {
      res.send(err);
    }
    res.json(customer);
  });
};

const updateCustomer = (req, res) => {
  Customer.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age
      }
    },
    (err, CustomerData) => {
      if (err) {
        res.send(err);
      } else {
        Customer.find({ name: req.phone }, function(err, data) {
            console.log(CustomerData.phone)
               console.log(data.phone)
          if (CustomerData.phone==req.body.phone) {
            res.send("Record Already Present");
          } else {
            res.json(Customer);
          }
        });
      }
    }
  );
};

// const updateCustomer = (req, res) => {
//   Customer.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       $set: {
//         name: req.body.name,
//         gender: req.body.gender,
//         phone: req.body.phone,
//         age: req.body.age
//       }
//     },
//     (err, Customer) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(Customer);
//       }
//     }
//   );
// };

const deleteCustomer = (req, res) => {
  Customer.deleteOne({ _id: req.params.id })
    .then(() => res.json({ message: "Customer Deleted" }))
    .catch(err => res.send(err));
};

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getSingleCustomer
};
