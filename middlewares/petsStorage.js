import multer from "multer"
function uploadImage(){
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
    // 'avatar' is the name of our file input field in the HTML form

    let upload = multer({ storage: storage}).single('avatar');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields

        if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        const classifiedsadd = {
            image: req.file.filename
        };
        const sql = "INSERT INTO users SET ?";
        connection.query(sql, classifiedsadd, (err, results) => {  if (err) throw err;
            res.json({ success: 1 })      

        });  

    }); 
}
export default uploadImage


