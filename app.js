const express = require('express');
const app = express();
const bodyParse = require('body-parser');

const ownerRoutes = require('./routes/owner-routes');

// convert the petition to json
app.use(bodyParse.json());

app.use('/api/owner', ownerRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  if(res.headerSent){
    return next(error);
  }
  res.status(error.code || 500).json({message: error.message || 'Unknown message.'});
})

app.listen( 5000, () => {
  console.log('Server listening on port 5000');
});