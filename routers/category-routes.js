const app = require('express');
const router = app.Router();
const
{
    createCatController,
    getAllCatController,
    updateCatController,
    deleteCatController,
} = require("../controller/category-controller");

//create category route
router.post("/createcategory",createCatController);
//get all category route
router.get("/getallcategory",getAllCatController);
//update category
router.put("/updatecategory/:id",updateCatController);
//delete category
router.delete("/deletecategory/:id",deleteCatController);

module.exports = router;