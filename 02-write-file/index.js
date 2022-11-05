const fs = require("fs");
const readline = require("readline");
const path = require("path");
const rootFile = path.join(__dirname, "text.txt");
const textLine = fs.createWriteStream(rootFile, {encoding: 'utf-8'});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.on('line', line => {
      process.stdout(line);
  }).on('close', () => {
    console.log('Прощай! Ты сделал свой выбор.'); 
       process.exit(0);
  });

  function inputText(){
    rl.question("Потыкай буковки на клаве...  ", text =>{
        console.log(text);

    if(text.toLocaleLowerCase() === "exit"){
        rl.close();
        return 
    }
    textLine.write(text + '\n', err => {
        if (err){
            console.log("Что-то ты не то натыкал... Держи ошибку ;)");
        }else{
            inputText(); 
        }
      });
    });
  };
  inputText();