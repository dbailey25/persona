const router = require("express").Router();
const booksController = require("../../controllers/cusotmersController");

// Matches with "/api/cusotmers"
router.route("/")
  .get(cusotmersController.findAll)
  .post(cusotmersController.create);

// Matches with "/api/cusotmers/:id"
router
  .route("/:id")
  .get(cusotmersController.findById)
  .put(cusotmersController.update)
  .delete(cusotmersController.remove);

module.exports = router;
