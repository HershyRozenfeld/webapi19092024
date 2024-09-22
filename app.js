const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();





const logger = function (req, res, next) {
    console.log(`${req.ip} ${req.method}`);
    next();
};


const secure = function (req, res, next) {
    if (req.ip != "::1" && req.ip != "127.0.0.1")
        return res.status(401).json({ Msg: "Not Authorized" })
    next();
};

app.use(cors({
    origin:["http://www.google.co.il"]
}));
app.use(morgan('dev'))
app.use(logger);//הוספת שכבת אבטחה
app.use(secure);//הוספת שכבת הביניים בהתחלה
app.use(express.json());//שכבת ביניים שמטפלת  בתוכן שנשלח בפורמט JSON 
app.use(express.urlencoded({ extended: true }));//שכבת ביניים שמטפלת בתוכן שנשלח בפורמט יואראל אינכודד
app.get('/products', (req, res) => {

    return res.status(200).json({ Msg: "All Products" });
})
app.post('/product', (req, res) => {
    console.log(req.body)
    res.status(200).json({ Msg: "Add new Product" });
});



module.exports = app;