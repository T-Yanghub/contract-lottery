let{interface,bytecode} = require('./compile');
let Web3 = require('web3');
let HDWalletProvider = require("truffle-hdwallet-provider");
let mnemonic = "robot stay sister hand cart fiscal monkey middle shy before wrap grocery"; // 12 word mnemonic
let provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/8ff3c5f5dfbd4635aef76d00ca94058c");
let web3 = new Web3(provider);
del =async ()=>{

    let acconuts = await web3.eth.getAccounts();
    console.log(acconuts[0])
    console.log('------------------');
    console.log(interface)
   let contract= await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data:bytecode
    }).send({
       nonce:22,
        from:acconuts[0],
        gas:'3000000'
    });
         console.log(contract.options.address);
         console.log(contract)
}

del();
