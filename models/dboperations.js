const config = require("../config/DbConnection");
const sql = require("mssql");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { v4: uuidv4 } = require("uuid");

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
      .input("id", sql.NVarChar, productId)
      .query("SELECT * from Orders where Id = @id");
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
      .input("id", sql.NVarChar, uuidv4())
      .input("name", sql.NVarChar, order.name)
      .input("quantity", sql.Int, order.quantity)
      .input("message", sql.NVarChar, order.message)
      .input("city", sql.NVarChar, order.city).query(`
                INSERT INTO Orders (id, name, quantity, message, city, createdAt, updatedAt)
                VALUES (@id, @name, @quantity, @message, @city, GETDATE(), GETDATE());
            `);
    return order;
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

async function registerUser(user) {
  try {
    let pool = await sql.connect(config);
    let register = await pool
      .request()
      .input("objectId", sql.NVarChar, uuidv4())
      .input("username", sql.NVarChar, user.username)
      .input("email", sql.NVarChar, user.email)
      .input("password", sql.NVarChar, hashPassword(user.password))
      .query(
        `INSERT into Users (objectId, username, email, password, createdAt, updatedAt) VALUES (@objectId, @username, @email, @password,GETDATE(),GETDATE())`
      );
    // console.log(register);
    return register;
  } catch (error) {
    console.log(error);
  }
}
async function loginUser(user) {
  try {
    let pool = await sql.connect(config);
    const findUser = await pool
      .request()
      .input("email", sql.NVarChar, user.email)
      .query(`select * from Users where email = @email`);

    console.log(findUser.recordset);
    if (findUser.recordset.length === 0) {
      throw new Error("Invalid Login");
    }

    const invalidPassword = comparePassword(
      user.password,
      findUser.recordset[0].password
    );
    if (!invalidPassword) {
      throw new Error("Invalid Login");
    }
    return findUser.recordset[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserLogin(user) {
  // console.log(user, "ini dbo");
  try {
    let pool = await sql.connect(config);
    const findUser = await pool
      .request()
      .input("email", sql.NVarChar, user)
      .query(`select * from Users where email = @email`);
    // console.log(findUser, "finduser");
    return findUser.recordset[0];
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getOrders: getOrders,
  getOrder: getOrder,
  addOrder: addOrder,
  deleteOrder: deleteOrder,
  registerUser: registerUser,
  loginUser: loginUser,
  getUserLogin: getUserLogin,
};
