const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        const validEmail = email.includes("@");
        return validEmail;
      }
    }
  },
  date_joined: {
    type: Date,
    default: Date().toLocaleString()
  }
});

module.exports = mongoose.model("customer", customerSchema);
