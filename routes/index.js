const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const userController = require("../controllers/UserController");

router.get("/", (req, res) => {
  res.send("Server Connected");
});
router.get("/orders", productController.getProduct);
router.get("/orders/:id", productController.getProductById);
router.post("/orders", productController.addProduct);
router.delete("/orders/:productId", productController.deleteProduct);

router.post("/users", userController.registerUser);
router.post("/login", userController.handleLogin);

module.exports = router;
