const fs = require("fs");
const path = require("path");

const htmlBuilder = {
    deleteFolder(){
        const folder = path.join(__dirname, "project-dist"); 
        const routFile = path.join(__dirname, "style.css");
    fs.exists(routFile, (exist) => {
        if(exist){
            fs.unlink(routFile, (err) => {
                if(err){return console.log(err);}
            });
        }
    });
        fs.rm(folder,{recursive: true}, (err) => {
            if(err){return console.error(err);}
            htmlBuilder.createFolder();
         });
   }, 
    createFolder(){
        const folder = path.join(__dirname, "project-dist"); 
        fs.exists(folder, (exist) => {
            if(exist){
                htmlBuilder.deleteFolder();
            }else{
                fs.mkdir(folder, (err) => {
                    if(err){
                        return console.error(err);
                    }
                    htmlBuilder.addHtml();
                    htmlBuilder.addStyle();
                    htmlBuilder.addAssets();
                });
            }
        });
    },
    addHtml(){
        const pathFiles = path.join(__dirname, "template.html");
        fs.readFile(pathFiles, "utf8", function(err, data){
            if(err){
                return console.error(err);
            }
            const routToBundle = path.join(__dirname, "project-dist"); 
            const routToFile = path.join(routToBundle, "index.html");
            fs.exists(routToFile, (exist) => {
                if(exist){
                    fs.truncate(routToFile, () => {if (err) console.error(err);});
                    fs.createWriteStream(routToFile);
                    fs.appendFile(routToFile, data, () => {if (err) console.log(err);
                    newComponents();
                    });
                }else{
                    fs.createWriteStream(routToFile);
                    fs.appendFile(routToFile, data, () => {if (err) console.log(err);
                    newComponents();
                    });
                 }
                 function newComponents(){
                    const htmlText = fs.createReadStream(routToFile);
                          htmlText.on("data", chank => {
                            var text = chank.toString();
                            const components = path.join(__dirname, "components");
                            fs.readdir(components, {withFileTypes: true}, (err, files) => {
                                if(err) console.log(err);
                                files.forEach(file => {
                                    var replace;
                                    const change = `{{${file.name.split(".").slice(0, -1).join(".")}}}`
                                    fs.readFile( path.join(__dirname, "components",file.name),"utf8", function(err, data){
                                        if(err) console.error(err);
                                        replace = text.replace(change, data);
                                        text = replace;
                                        fs.truncate(routToFile, () => {if (err) console.error(err);});
                                        fs.createWriteStream(routToFile);
                                        fs.appendFile(routToFile, replace, () => {if (err) console.log(err);});
                    
                                    });
                                });
                            });
                          });
                 }
            });
        });
    },

    addStyle(){
        const routFile = path.join(__dirname, "styles");
        fs.readdir(routFile, {withFileTypes: true}, (err, files) => {
           if(err)
          console.log(err);
          else{
            files.forEach(file => {
                if(!file.isDirectory()&& file.name.split(".").slice(1, 2).join(".") === "css"){
                    fs.readFile(path.join(routFile,file.name), "utf8", function(err, data){
                        if(err){
                            return console.error(err);
                        }
                        const routToBundle = path.join(__dirname, "project-dist"); 
                        const routToFile = path.join(routToBundle, "style.css");
                        fs.exists(routToFile, (exist) => {
                            if(exist){
                                fs.unlink(routToFile, () => {
                                    if(err){
                                        return console.error(err);
                                    }
                                    fs.createWriteStream(routToFile);
                                    fs.appendFile(routToFile, data, () =>{if(err) console.log(err);});
                                });
                            }else{
                                fs.createWriteStream(routToFile);
                                fs.appendFile(routToFile, data, () => {if (err) console.log(err);});
                            }
                        });
                    });
                }
            });
          } 
        });
    },
    addAssets(){
        const newFile = {
            pathFile: path.join(__dirname, "assets"),
            pathEnd: path.join(__dirname, "project-dist"),
            pathAssets: path.join(__dirname, "project-dist", "assets"),

            deleteDir(from, to){
                fs.rm(to, {recursive: true}, (err) => {
                    if(err){
                        return console.error(err);
                    }
                    newFile.createDir(from, to);
                });
            },
            createDir(from, to){
                fs.exists(to, (exist) => {
                    if(exist){
                        newFile.deleteDir(from, to);
                    }else{
                        fs.mkdir(to, (err) => {
                            if(err){
                                return console.error(err);
                            }
                            newFile.copyFiles(from, to);
                        });
                    }
                });
            },
            copyFiles(from, to){
                fs.readdir(from, {withFileTypes: true},(err, files) => {
                    if(err){
                        console.log(err);
                    }else{
                        files.forEach(file => {
                            if(!file.isDirectory()){
                                fs.copyFile(path.join(from, file.name),path.join(to, file.name),(err) => {
                                    if(err){
                                        console.log("Error: ", err);
                                    }
                                });
                            }else{
                                const routToFile2 = path.join(__dirname, "assets", file.name);
                                const pathAssets2 = path.join(__dirname, "project-dist", "assets", file.name);
                                this.createDir(routToFile2, pathAssets2);
                            }
                        });
                    }
                });
            },
        };
        newFile.createDir(newFile.pathFile, newFile.pathAssets);
    },
    

};
htmlBuilder.createFolder();