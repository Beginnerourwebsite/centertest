const express = require('express');
const multer = require("multer");
const cors = require("cors");

const app = express();
const fs = require('fs');
const path = require('path');
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
var data = multer({
    storage: multer.diskStorage({
        destination: (res, file, cg) => {
            cg(null, "https://centertest.onrender.com")
        },
        filename: (res, file, cb) => {
            cb(null, file.originalname )
        }
    })
}).single("use")

app.use(express.static("datafiles"))
// require("path")
app.set('port', process.env.PORT || 3000)

// app.get('/insert/:keys/:data', (req, res, next) => {
//     let keys = req.params.keys
//     let data = req.params.data

//     let frontend_data = `localStorage.setItem('${keys}', JSON.stringify(${data}))`
//     fs.writeFile('./datafiles/sg.js', frontend_data, function (err) {
//         if (err) throw err;
//         console.log('Saved!');
//     });
// })
app.post('/mult',data ,(req, res, next)=>{
   console.log(req.file)
   res.send(req.file.originalname)
    // res.redirect("https://centertest.onrender.com/index.html")

    res.end()
})

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})