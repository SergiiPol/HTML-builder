const fs = require("fs");
const path = require("path");
const promis = fs.promises;
const finishDir = path.join(__dirname, "files-copy");
create(finishDir);

function create(finishRout){ 
fs.stat(finishRout, (error) => {
    if(error) {
        promis.mkdir(finishRout)
        .then(function(){
            console.log("Add copy-folder");
        })
        .catch(function(){
            console.log("Add files");
        });
        copy();
    }else{
        fs.readdir(finishRout, (err, data) => {
            if(err) console.error(err.message);
            data.forEach(file => {
                fs.unlink(`${__dirname}/files-copy/${file}`,(err) => {
                   if (err) throw err; 
                });
            });
        });

        fs.mkdir(finishRout, (err) => {
            if(err)console.log("ERROR: A copy already exists. To create a new copy, delete the old one.");
            process.exit(0);
        });
    }
});
};  
function copy(){ 
    fs.readdir(path.join(__dirname, "files"),(err, data) => {
        data.forEach(file => {
            const oldFile = path.join(__dirname, "files",`${file}`);
            const newFile = path.join(__dirname, "files-copy",`${file}`);
            try{
                promis.copyFile(oldFile, newFile);
            }catch{
                console.log("Try again");
            }
        });
    });
}