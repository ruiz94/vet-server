const router = require("express").Router();
const { check } = require('express-validator');

const ownerController = require('../controllers/owner-controller');

router.get('/', ownerController.getOwners);

router.get("/search", [ check('email').normalizeEmail().isEmail() ],ownerController.searchOwner);

router.post("/add-owner",
[
  check('email').normalizeEmail().isEmail(), 
  check('name').notEmpty(),
  check('phone').isLength({min: 10, max: 10}),
  check('password').isLength({min: 5})
], 
ownerController.addOwner);

module.exports = router;
