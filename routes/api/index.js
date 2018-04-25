const router = require("express").Router();
const awsRoutes = require("./aws");
const customerRoutes = require("./customers");
const menuRoutes = require("./menu");

// AWS routes
router.use("/aws", awsRoutes);
// customer routes
router.use("/customers", customerRoutes);
//Menu routes
router.use("/menu", menuRoutes);

module.exports = router;
