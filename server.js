const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.render('index.ejs')
})

app.listen(port, () => {
    console.log(`Server up on Port ${port}...`);
});
