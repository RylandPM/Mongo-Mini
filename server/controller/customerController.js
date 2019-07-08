const Customer = require("../collections/customer");
module.exports = {
  getAllCustomers: (req, res, next) => {
    Customer.find({}).then(customers => {
      res.status(200).send(customers);
    });
  },
  postCustomer: (req, res, next) => {
    const { name, email } = req.body;

    const customer = new Customer({ name, email });
    customer.save(err => {
      if (err) {
        res.status(400).send("there was an error on the server");
      }
      Customer.find({}).then(customers => {
        res.status(200).send(customers);
      });
    });
  },
  updateCustomer: (req, res, next) => {
    const { id } = req.params;
    const { email } = req.query;

    Customer.findById(id).then(foundCustomer => {
      foundCustomer.email = email;
      foundCustomer.save(err => {
        if (err) {
          res.status(400).send("error on the server");
        }
        Customer.find({}).then(customers => {
          res.status(200).send(customers);
        });
      });
    });
  },
  deleteCustomer: (req, res, next) => {
    const { id } = req.params;
    Customer.findByIdAndDelete(id).then(deletedCustomer => {
      Customer.find({}).then(customers => {
        res.status(200).send(customers);
      });
    });
  }
};
