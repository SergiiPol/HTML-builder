const fs = require("fs");
const path = require("path");

const folderCopy =path.join(__dirname, "files-copy"); 

fs.exists(folderCopy, (exist) => {
    if(exist) {
        folder.deleteFolder();
    }else{
        folder.createFolder();
        folder.copyFiles();
    }
});

const folder ={
    deleteFolder(){
        fs.rm(folderCopy,{recursive: true}, (err) => {
            if(err){
                return console.error(err);
            }
            folder.createFolder();
            folder.copyFiles();
        });
    },
    createFolder(){
        fs.mkdir(folderCopy, (err) => {
            if(err){
                return console.error(err);
            }
            console.log("Add folder");
        });
    },
    copyFiles(){
        const pathFiles = path.join(__dirname, "files");
        fs.readdir(pathFiles, {withFileTypes: true}, (err, files) => {
            if(err)
            console.log(err);
            else {
                files.forEach(file => {
                    if(!file.isDirectory()){
                        fs.copyFile(path.join(pathFiles, file.name),path.join(folderCopy, file.name), (err) => {
                            if (err){
                                console.log("Error", err);
                            }
                        });
                    }
                });
            }
        });
    },
};




