const express = require("express");

const app = express();

app.use(express.json());

app.get('/',(req, res)=>{
    res.json({message: 'Hello from Express REST API'});
});

app.get('/about', (req, res)=>{
    res.join({Message: 'This is About Us Page'});
});
app.get('/Electronic_items',(req, res) => {
    const items=[{id: 1232, name: "Samsung", price:40000},]
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Welcom to csn');
});