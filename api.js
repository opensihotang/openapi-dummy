require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const router = require("./routes/index")
const PORT = 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(router)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})