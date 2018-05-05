const router = require("express").Router();
const ordersController = require("../../controllers/ordersController");

// Matches with "/api/order"
router.route("/")
  .get(ordersController.findAll)
  .post(ordersController.create);

// Matches with "/api/order/:id"
router
  .route("/:id")
  .get(ordersController.findHistoricalData)
  .put(ordersController.update)
  .delete(ordersController.remove);

  router
  .route("/current-order/customer/:id")
  .get(ordersController.findCurrentOrders);

router
  .route("/total/customer/:id")
  .get(ordersController.findTotalOrders)
module.exports = router;
