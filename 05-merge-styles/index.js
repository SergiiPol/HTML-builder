const fs = require('fs');
const path = require('path');
const routFile = path.join(__dirname, "project-dist","bundle.css");

const folder = path.join(__dirname, "styles");
function create(folder){
    fs.access(routFile, fs.F_OK, (err) => {
        if(err) {
            fs.readdir(folder, (err, data) => {
               if (err) console.error(err.message);
               data.forEach(item => {
                const itemFolder =path.join(folder, `${item}`);
                fs.stat(itemFolder, (error, stats) => {
                    if(error){
                        console.log(error)
                    }else{
                        if(!stats.isFile()){
                            create(itemFolder);
                        }else{
                            if(path.extname(itemFolder) === ".css"){
                                fs.readFile(itemFolder, "utf8", function(err, data){
                                    if(!err){
                                        const ws = fs.createWriteStream(routFile, {
                                            flags: "a+"
                                        });
                                        ws.write(data + "\n");
                                    }else{
                                        console.log("Error");
                                    }
                                });
                            }
                        }
                    }
                });
               }); 
            });
        }else{
            fs.unlink(routFile, () => {
                create(folder);
            });
        }
    });
}
create(folder);