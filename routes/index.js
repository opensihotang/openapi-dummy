const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const userController = require("../controllers/UserController");
const authentication = require("../middleware/authentication");

router.get("/", (req, res) => {
  res.send("Server Connected");
});
router.post("/register", userController.registerUser);
router.post("/login", userController.handleLogin);

router.use(authentication);
router.get("/orders", productController.getProduct);
router.get("/orders/:id", productController.getProductById);
router.post("/orders", productController.addProduct);
router.delete("/orders/:productId", productController.deleteProduct);

module.exports = router;
