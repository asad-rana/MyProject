const express = require('express');
const cors = require('cors');

require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');
const JwtKey = 'e-commm'
const app = express();
app.use(express.json());
app.use(cors());
app.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},JwtKey,{expiresIn: '2h'},(error,token)=>{
        if(error){
            resp.send("Something went wrong,Please try again")
        }
        resp.send({result,auth:token});

    })
})


app.post('/login', async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({user},JwtKey,{expiresIn: '2h'},(error,token)=>{
                if(error){
                    resp.send("Something went wrong,Please try again")
                }
                resp.send({user,auth:token});

            })
        } else {
            resp.send({ result: 'Nothing found in dataBase' })
        }
    } else {
        resp.send({ result: 'Nothing found in data' })
    }
})


app.post('/add-product',async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result)
})

app.get('/products',verifytoken, async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No data Found in Products" });

    }
});
app.delete('/product/:id', verifytoken,async (req, resp) => {

    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result);

})
app.get('/product/:id',verifytoken, async (req, resp) => {

    const result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No data found" })
    }
})
app.put('/product/:id',verifytoken, async (req, resp) => {

    let result = await Product.updateOne({ _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result);

})
app.get('/search/:key', verifytoken,async (req, resp) => {

    let result = await Product.find({

        '$or': [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]

    })
    resp.send(result);

})
function verifytoken(req,resp,next){
    let token=req.headers['authorization'];
    if(token){
         token=token.split(' ')[1];
         Jwt.verify(token,JwtKey,(err,ok)=>{
         if(err){
            resp.status(401).send({result:'Please provide valid token  in headers'})

         }else{
          next();
         }
         })

    }else{
      resp.status(403).send({result:'Please enter token  in headers'})
    }
}


app.listen(5000);









// connectDB();

// // const connectDB=async()=>{
// // mongoose.connect('mongodb://127.0.0.1/e-com');
// // const productSchema=new mongoose.Schema({});
// // const product= mongoose.model('products',productSchema);
// // const data= await product.find();
// // console.warn(data);

// // }