


const express = require('express');
const path = require('path');
const multer = require('multer');
const { log } = require('console');

const {mergePdfs} = require('./merge');

const app = express();
const upload = multer({dest: "uploads/"});
const PORT=80;
app.use('/static', express.static('public'))


app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'./template/index.html'));
})

app.get('/home',(req, res)=>{
    res.sendFile(path.join(__dirname, '/template/index.html'));
})

app.listen(PORT,()=>{
    console.log("server is ok");
})


app.post('/merge', upload.array('pdfs', 3),async (req,res,next)=>{
    // console.log(req.files);// checking the data
    const result = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname, req.files[1].path));
    let url = `http://localhost:3000/static/${result}.pdf`;
    res.redirect(url);
})
