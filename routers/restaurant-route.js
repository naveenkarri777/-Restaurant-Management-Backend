//imports
const app = require('express');
const router = app.Router();

const {
    createrestcontroller,
    getallRestaurant,
    getRestaurantbyId,
    deleterestacontroller,
    } = require('../controller/restaurant-controller');

//restaurant create route
router.post("/createrestaurant",createrestcontroller);
//get all restaurants route
router.get("/getallrestaurant",getallRestaurant);
//get restaurant by id
router.get("/getrestaurantbyid/:id",getRestaurantbyId);
//delete restaurant by id
router.delete("/deleterestaurantbyid/:id",deleterestacontroller);


//exports
module.exports = router;