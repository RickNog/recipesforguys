var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
var router = require('./routes/index');

// Front-end code
app.use('/', express.static('public'));


// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable


// use morgan to log requests to the console
app.use(morgan('dev'));


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// ***************************
// Authenticate user router
// ***************************
router.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    email: req.body.email

  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, message: 'User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.status(401).send({ success: false, message: 'Password incorrect.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

// Route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token, return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}); 


// apply the routes to our application with the prefix /api
app.use('/api', router);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('The server is running at http://localhost:' + port);