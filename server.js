// let http = require("http");
// let url = require("url");
// let fs = require("fs");
// let formidable = require("formidable");

// let server = http.createServer((req, res) => {

// let urlData = url.parse(req.url, true);

// if (urlData.pathname == "/upload" && req.method.toLowerCase() == "post") {

//     let form = new formidable.IncomingForm();
//     form.uploadDir = "uploads/";

//     form.parse(req, (err, fields, files) => {

//         if (err) {
//             console.log(err);
//             res.end("Lỗi parse");
//             return;
//         }

//         let file = files.file;

//         if (Array.isArray(file)) {
//             file = file[0];
//         }

//         if (!file) {
//             res.end("Không có file");
//             return;
//         }

//         let tmpPath = file.filepath;
//          let newPath = "uploads/" + file.originalFilename;

//         fs.rename(tmpPath, newPath, (err) => {
//             if (err) {
//                 console.log(err);
//                 res.end("error upload");
//                 return;
//             }
//             res.end("Upload thanh cong");
//         });
//     });

//     return;
// }

// let fileName = "./views" + urlData.pathname;

// if (urlData.pathname === "/") {
//     fileName = "./views/master.html";
// }

// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         res.writeHead(404, {"Content-Type": "text/html"});
//         res.write("404 Not Found");
//         return res.end();
//     }

//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.write(data);
//     return res.end();
// });

// });

// server.listen(8017, "localhost", () => {
// console.log("Running at http://localhost:8017");
// });

// Cách 2: Sử dụng Express và Multer
// const express = require("express");
// const multer = require("multer");

// const app = express();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads"),
//     filename: (req, file, cb) => cb(null, file.originalname)
// });

// const upload = multer({ storage: storage }).single("file");

// app.get("/", (req, res) => {
//     res.send(`
// <form action="/upload" method="post" enctype="multipart/form-data">
// <input type="file" name="file" />
// <button type="submit">Upload</button>
// </form>
// `);
// });

// app.post("/upload", (req, res) => {
//     upload(req, res, (err) => {
//         if (err) return res.send("Lỗi upload");
//         res.send("Upload thành công");
//     });
// });

// app.listen(8017, () => {
//     console.log("Server chạy tại http://localhost:8017");
// });

// Cách 3: Upload nhiều file với Express và Multer  

const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, file.originalname)
});

let uploadManyFiles = multer({ storage: storage }).array("many-files", 17);

app.get("/", (req, res) => {
    res.send(`
<form action="/upload" method="post" enctype="multipart/form-data">
<input type="file" name="many-files" multiple />
<button type="submit">Upload</button>
</form>
`);
});

app.post("/upload", (req, res) => {
    uploadManyFiles(req, res, (err) => {
        if (err) return res.send("Lỗi upload");
        res.send("Upload nhiều file thành công");
    });
});

app.listen(8017, () => {
    console.log("Server chạy tại http://localhost:8017");
});