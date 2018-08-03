let path = require('path');
let fs = require('fs');
let solc = require('solc');

    let sourthPath =path.resolve(__dirname,'contracts','Lottery.sol');
    let file = fs.readFileSync(sourthPath,'utf-8');
    let re = solc.compile(file,1);
    console.log(re);
module.exports = re.contracts[':Lottery'];