const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req , file , callback)=>{
    const uploadPath = path.join(__dirname, '..', 'public', 'images', 'users');
    console.log(uploadPath);
    callback(null , uploadPath);
  },
  filename: (req,file , callback)=>{
    const extension = path.extname(file.originalname);
    console.log(file.originalname)
    const newFilename = Date.now() + extension;
    callback(null , newFilename)
  }
})
module.exports = multer({
  storage : storage,
  limits:{fileSize:1024*1024*5}
})