
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require('express-validator');
const HttpError = require("../models/HttpError");
const defaultOwners = [
  {
    id: uuidv4(),
    name: "Fernando",
    address: "Av. Reforma, col. Satelite",
    pets: [
      {
        name: "Goliat",
        age: 4,
        breed: "Pastor Aleman",
        color: "Black",
        description: "He is a playful dog",
        type: "Canine",
        weight: 5.6,
        image:
          "https://i.pinimg.com/originals/79/b9/ec/79b9ecd88a26a8091d37594d164c5de2.jpg",
      },
      {
        name: "Govani",
        age: 2,
        breed: "Amazonian",
        color: "Green",
        description: "He is a slowly and sleepy iguana",
        type: "Reptile",
        weight: 2.1,
        image: "https://imgcom.masterd.es/12/blog/2017/10/38374.jpg",
      },
    ],
    appointments: [],
    email: "fernando@mail.com",
    phone: "8341254565",
  },
];

const getOwners = (req, res, next) => {
  res.status(200).json({owners: defaultOwners});
}

const searchOwner = (req, res, next) => {
  // fields validations with express-validator
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError("Invalid email passed, try with a correct email.", 422));
  }

  const owner = defaultOwners.filter((item) => item.email === req.body.email);

  if (!owner[0]) {
    return next(new HttpError("Owner could not be found.", 404));
  }
  res.status(202).json({ owner: owner[0] });
}

const addOwner = (req, res, next) => {
  // fields validations with express-validator
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError('Invalid inputs passed, try again.', 422))
  }
  // destructure the variables 
  const { name, email, password, phone, address } = req.body;

  // Verifying if the email already exist
  const ownerExist = defaultOwners.filter(item => item.email === email);
  if(ownerExist.length){
    return next(new HttpError('The owner already exist, try another different.', 200))
  }

  // Creating the new owner
  console.log(name, email, password, phone, address);
  const owner = {
    id: uuidv4(),
    name,
    email,
    password,
    phone,
    address,
    pets: [],
    appointments: []
  };
  // Saving the new owner in the BD
  defaultOwners.push(owner)

  if(!owner){
    return next( new HttpError("Couldn't create the owner, try again later.", 400))
  }

  res.status(201).json({ message: "Owner created successfully", owner });
}
exports.getOwners = getOwners;
exports.searchOwner = searchOwner;
exports.addOwner = addOwner;