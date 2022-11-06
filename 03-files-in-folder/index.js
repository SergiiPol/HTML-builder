const fs = require("fs");
const path = require("path");
const routFolder = path.join(__dirname, "secret-folder");

const fileBasename = (pathFile, ext) => {
    return path.basename(pathFile, ext)
};

const fileExtension = (pathFile) => {
    const ext = path.extname(pathFile);
    return ext.slice(1);
}

fs.readdir(routFolder, (err, data) => {
    if(err) console.error(err.message);
    data.forEach(item => {
        const pathFile = path.join(routFolder, `${item}`);
        fs.stat(pathFile, (error, stats) => {
            if(error){
                console.log(error);
            }else{
                if(stats.isFile()){
                    const ext = path.extname(pathFile);
                    const basename = fileBasename(pathFile, ext);
                    const extension = fileExtension(pathFile);
                    const size = stats.size;
                    const finishData = `${basename} - ${extension} - ${size}b`;
                    console.log(finishData);
             
                }
            }
        });
    });
});