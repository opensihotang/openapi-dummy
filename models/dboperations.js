const config = require("../config/DbConnection");
const sql = require("mssql");

async function getOrders() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * from Orders");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getOrder(productId) {
  try {
    let pool = await sql.connect(config);
    let product = await pool
      .request()
      .input("input_parameter", sql.Int, productId)
      .query("SELECT * from Orders where Id = @input_parameter");
    if (product.recordset.length === 0) {
      throw new Error(`Product with id : ${productId} not found`);
    } else {
      return product.recordsets;
    }
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

async function addOrder(order) {
  try {
    let pool = await sql.connect(config);
    let insertOrder = await pool
      .request()
      .input("id", sql.Int, order.id)
      .input("name", sql.NVarChar, order.name)
      .input("quantity", sql.Int, order.quantity)
      .input("message", sql.NVarChar, order.message)
      .input("city", sql.NVarChar, order.city).query(`
                INSERT INTO Orders (id, name, quantity, message, city)
                VALUES (@id, @name, @quantity, @message, @city);
            `);
    // console.log(insertOrder, ">>>>>>>>>>>>");
    return insertOrder.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function deleteOrder(productId) {
  try {
    let pool = await sql.connect(config);

    let checkProduct = await pool
      .request()
      .input("productId", sql.Int, productId)
      .query("SELECT * from orders where Id = @productId");
    if (checkProduct.recordset.length === 0) {
      throw new Error(`Product with id : ${productId} not found`);
    }
    let product = await pool
      .request()
      .input("productId", sql.Int, productId)
      .query("DELETE from orders where Id = @productId");
    return product.recordsets;
  } catch (error) {
    throw error;
    // console.log(err);
  }
}
module.exports = {
  getOrders: getOrders,
  getOrder: getOrder,
  addOrder: addOrder,
  deleteOrder: deleteOrder,
};
