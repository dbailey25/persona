const router = require("express").Router();
const awsRoutes = require("./aws");

// AWS routes
router.use("/aws", awsRoutes);

module.exports = router;
