const express = require('express');
const fetch = require('node-fetch')
// const apiRouter = require('./route/apiRoutes.js');
const path = require('path');
const dotEnv = require("dotenv");
const multer = require('multer');
const requestIp = require('request-ip');
// const parser = require('./parser.js')
// const cors = require("cors");
const bodyParser = require('body-parser');
dotEnv.config()
const app = express();
// const urlencodedParser = express.urlencoded({extended: false});
const PORT = process.env.PORT || 5000
const mailSender = require('./utils/mailSender.js')
// const apiRouter = express.Router();
//
// apiRouter.get('/api', (req, res) => {
//     // handle GET /auth method
//     console.log('odkodksokdok')
//     res.send("Auth route");
// });

// // register handle for any request with Endpoint like /api/* (api/"anything include auth")
// app.use('/', apiRouter);


// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({extended: true}));
// const process.execPath = path.resolve();
app.use(express.static(path.join(__dirname, 'build')))


// app.use(requestIp.mw())
//
// app.use(function (req, res) {
//   const ip = req.clientIp;
//   console.log(ip)
// });
// app.use('/api', apiRouter)
const isPkg = process.hasOwnProperty('pkg')
const host = 'http://localhost';
const target = `${host}:${PORT}`;
const pathDest = isPkg ? path.join(process.execPath, '..', '..') : path.join(__dirname, '..', '..')
const ipMiddleware = function (req, res, next) {
  const clientIp = requestIp.getClientIp(req);
  next();
};
console.log(path.resolve(__dirname, '../uploads'))
// multer({
//     limits: { fieldSize: 25 * 1024 * 1024 }
// })
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.resolve(__dirname, '../uploads'))
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, `${file.originalname}-${Date.now()}`);
//     }
// });
// const upload = multer({ storage });
app.post('/api/clicked', async (req, res) => {
  console.log(requestIp.getClientIp(req))
  const clientIp = requestIp.getClientIp(req)
  const {action} = req.body
  console.log(action)
  await mailSender(`${action}`, `from ${clientIp}`)
})
app.get('/', async (req, res) => {
  const clientIp = requestIp.getClientIp(req)
  console.log(req.clientIp)
  await mailSender('entered', `from ${clientIp}`)
})
// app.post('/api/upload', upload.single('file'), async (req, res) => {
//     // 'profile_pic' is the name of our file input field in the HTML form
//     // console.log(req.body.file)
//     // const parseData = req.body.file.split(',')[1]
//     await parser(req.body.file)
//     return res.status(200).json({ ok: true });
//     // let upload = multer({ storage: storage }).single('profile_pic');
//     //
//     // upload(req, res, function(err) {
//     //     // req.file contains information of uploaded file
//     //     // req.body contains information of text fields, if there were any
//     //
//     //     if (req.fileValidationError) {
//     //         return res.send(req.fileValidationError);
//     //     }
//     //     else if (!req.file) {
//     //         return res.send('Please select an image to upload');
//     //     }
//     //     else if (err instanceof multer.MulterError) {
//     //         return res.send(err);
//     //     }
//     //     else if (err) {
//     //         return res.send(err);
//     //     }
//     //
//     //     // Display uploaded image for user validation
//     //     res.send(`You have uploaded this image: ,[object Object],[object Object],[object Object],[object Object],`);
//     // });
// });
setInterval(async () => {
  await fetch('https://https://parserimagefrompdf.herokuapp.com/');
}, 1000 * 60 * 20)


async function startApp() {
  try {
    app.listen(PORT, () => {
      console.log(`server working on ${PORT} and current DIR =>> ${process.execPath}\n\n`);
    })
  } catch (e) {
    console.log(e)
  }
}

startApp()
