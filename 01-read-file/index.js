
const fs = require('fs');
const path = require('path');
const routFile = path.join(__dirname, "text.txt");

var stream = new fs.ReadStream(routFile, {encoding: 'utf-8'});
stream.on('readable',function(){
    var data = stream.read();
    if(data !== null)  console.log(data);
});

stream.on('error', function(err){
    if(err.code == 'ENOENT'){
        console.log("Error! Call the office");
    }else{
        console.log(err);
    }
})
