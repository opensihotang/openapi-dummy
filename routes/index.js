const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", (req, res) => {
  res.send("Server Connected");
});
router.get("/orders", controller.getProduct);
router.get("/orders/:id", controller.getProductById);
router.post("/orders", controller.addProduct);
router.delete("/orders/:productId", controller.deleteProduct);

module.exports = router;
