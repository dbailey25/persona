const router = require("express").Router();
const awsRoutes = require("./aws");
const customerRoutes = require("./customers");
const menuRoutes = require("./menu");
const orderRoutes = require("./order");

// AWS routes
router.use("/aws", awsRoutes);
// customer routes
router.use("/customers", customerRoutes);
//Menu routes
router.use("/menu", menuRoutes);
//Order routes
router.use("/order", menuRoutes);

module.exports = router;
