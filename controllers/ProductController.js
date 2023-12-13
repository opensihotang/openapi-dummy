const Db = require("../models/dboperations");

class ProductController {
  static async getProduct(req, res) {
    const data = await Db.getOrders();
    // console.log(data);
    res.status(200).json(data[0]);
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const data = await Db.getOrder(id);
      // console.log(data);
      res.status(200).json(data[0]);
    } catch (error) {
      res.status(500).json(error.message);
      //   console.log(error);
    }
  }

  static async addProduct(req, res) {
    try {
      const { name, quantity, message, city } = req.body;
      // console.log(req.body);
      const newData = await Db.addOrder({ name, quantity, message, city });
      // const newOrder = await Db.getOrder(newData.id);
      res.status(201).json(newData);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      const deletedOrder = await Db.deleteOrder(productId);
      res.status(200).json(`Product with ${productId} has been deleted`);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = ProductController;
