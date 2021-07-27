const router = require('express').Router();
const { Customer } = require("../../models");
const withAuth = require('../../utils/auth');

router.get("/", async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      where: {username: req.session.user_id}
    })
    const formatCust = await JSON.parse(JSON.stringify(customers));
    res.status(200).json(formatCust);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    await Customer.create({
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      industry: req.body.industry,
      phone: req.body.phone,
      username: req.session.user_id,
    })
    res.status(200)
  } catch (err) {
    res.status(500).json(err);
  }
})

// router.post("/", async (req, res) => {
//   try {

//   } catch (err) {

//   }
// })

module.exports = router;