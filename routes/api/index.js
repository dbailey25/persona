const router = require("express").Router();
const awsRoutes = require("./aws");
const customerRoutes = require("./customers");

// customer routes
router.use("/customers", customerRoutes);
// AWS routes
router.use("/aws", awsRoutes);

module.exports = router;
