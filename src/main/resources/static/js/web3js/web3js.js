let currentAccount,web3;window.addEventListener("load",(async()=>{window.ethereum?(web3=new Web3(window.ethereum),await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x5"}]})):void 0!==window.web3?web3=new Web3(window.web3.currentProvider):reject(new Error("web3 인스턴스가 주입되지 않았습니다.")),web3&&(currentAccount=await web3.eth.requestAccounts())})),document.getElementById("ConnectMetaMask")&&document.getElementById("ConnectMetaMask").addEventListener("click",(async()=>{await ethereum.request({method:"eth_requestAccounts"}),await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x5"}]})}));const getTokenInformation=async function(e){currentAccount=await web3.eth.requestAccounts().then((function(e){return e[0]})),web3.eth.getAccounts(console.log),console.log(currentAccount);try{await web3.currentProvider.request({method:"wallet_watchAsset",params:{type:"ERC20",options:{address:"0x7451425A01Cd543946f7b7DfE99B5010553895Ec",symbol:"MoGaKKoin",decimals:18,image:"https://myzzbucket.s3.ap-northeast-2.amazonaws.com/tokenIcon.png"}}})}catch(e){console.log(e)}};document.getElementById("GetWelcomeTokenInfo")&&document.getElementById("GetWelcomeTokenInfo").addEventListener("click",getTokenInformation),document.getElementById("GetTokenInfo")&&document.getElementById("GetTokenInfo").addEventListener("click",getTokenInformation),$("#exampleModal").on("show.bs.modal",(async function(e){try{currentAccount=web3.eth.requestAccounts().then((function(e){document.getElementById("wallet").value=e[0]})),await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x5"}]}),window.ethereum.on("accountsChanged",(async function(){accounts=await web3.eth.getAccounts(),currentAccount=accounts[0],document.getElementById("wallet").value=currentAccount}))}catch(e){document.getElementById("wallet").value="MetaMask 연동 되지 않았습니다."}})),$("#welcomeModal").on("show.bs.modal",(async function(e){try{currentAccount=web3.eth.requestAccounts().then((function(e){document.getElementById("welcome-wallet").value=e[0]})),await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x5"}]}),window.ethereum.on("accountsChanged",(async function(){accounts=await web3.eth.getAccounts(),currentAccount=accounts[0],document.getElementById("welcome-wallet").value=currentAccount}))}catch(e){document.getElementById("welcome-wallet").value="MetaMask 연동 되지 않았습니다."}})),$("#buyDotModal").on("show.bs.modal",(async function(e){try{currentAccount=web3.eth.requestAccounts().then((function(e){document.getElementById("buydot-wallet").value=e[0]})),await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0x5"}]}),window.ethereum.on("accountsChanged",(async function(){accounts=await web3.eth.getAccounts(),currentAccount=accounts[0],document.getElementById("buydot-wallet").value=currentAccount}))}catch(e){document.getElementById("buydot-wallet").value="MetaMask 연동 되지 않았습니다."}}));const abi=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"tokens",type:"uint256"}],name:"TransferToken",type:"event"},{inputs:[],name:"Buy_Level1_Dot",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"Buy_Level2_Dot",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"Buy_Level3_Dot",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"subtractedValue",type:"uint256"}],name:"decreaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"getTokenOnce",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"getTokenOneDay",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"isChecked",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"userTimeStamp",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],contractAddress="0x7451425A01Cd543946f7b7DfE99B5010553895Ec";document.getElementById("getTokenButton")&&document.getElementById("getTokenButton").addEventListener("click",(async()=>{const e=await web3.eth.requestAccounts(),t=new web3.eth.Contract(abi,contractAddress);await t.methods.getTokenOneDay().send({from:e.toString()},(function(e,t){const n=document.getElementById("oneDay-contract");n.style.display="block";const a=document.getElementById("oneDay-contract-text");e?(a.textContent="다시 시도해 주세요.",a.style.color="firebrick"):(n.href="https://goerli.etherscan.io/tx/"+t,a.textContent="트랜잭션 확인하기")}))})),document.getElementById("getWelcomeTokenButton")&&document.getElementById("getWelcomeTokenButton").addEventListener("click",(async()=>{document.getElementById("banner3-loadingIcon");const e=await web3.eth.requestAccounts(),t=new web3.eth.Contract(abi,contractAddress);await t.methods.getTokenOnce().send({from:e.toString()},(function(e,t){const n=document.getElementById("welcome-contract");n.style.display="block";const a=document.getElementById("welcome-contract-text");e?(a.textContent="다시 시도해 주세요.",a.style.color="firebrick"):(n.href="https://goerli.etherscan.io/tx/"+t,a.textContent="트랜잭션 확인하기")}))})),document.getElementById("buyLandButton")&&document.getElementById("buyLandButton").addEventListener("click",(async()=>{let e=document.getElementById("buyDot-loadingIcon");const t=await web3.eth.requestAccounts(),n=new web3.eth.Contract(abi,contractAddress);let a;await n.methods.balanceOf(t.toString()).call().then((e=>a=web3.utils.fromWei(e)));const o=document.getElementById("level").value,s=document.getElementById("dotmap-contract"),i=document.getElementById("dotmap-contract-text");let c;console.log(a),console.log(typeof a);const u=()=>{s.style.display="block",i.textContent="토큰이 부족합니다.",i.style.color="red"};if("1"===o){if(a<500)return u(),!1;c=await n.methods.Buy_Level1_Dot()}if("2"===o){if(a<1e3)return u(),!1;c=await n.methods.Buy_Level2_Dot()}if("3"===o){if(a<1500)return u(),!1;c=await n.methods.Buy_Level3_Dot()}c.send({from:t.toString(),gasprice:2e10},(async function(t,n){if(e.style.display="block",t)console.log(t),e.style.display="none",s.style.display="block",i.textContent="트랜잭션이 취소됐습니다.",i.style.color="firebrick";else{s.style.display="block",i.style.display="block",i.textContent="트랜잭션 성공후 땅이 구매됩니다.",i.style.color="gray",console.log(n);const t=setInterval((()=>{console.log("트랜잭션 영수증을 기다리고있습니다..."),web3.eth.getTransactionReceipt(n,(function(a,o){if(o){if(!1===o.status)return e.style.display="none",s.style.display="block",i.textContent="구매에 실패했습니다.",clearInterval(t),!1;clearInterval(t);let n={dotId:$("#dotId").val(),description:$("#description").val(),color:$("#dot-color").val(),txHash:o.transactionHash.toString()};$.ajax({type:"POST",url:"/earth/buy/"+$("#userId").val(),data:JSON.stringify(n),contentType:"application/json",dataType:"json",success:function(e){location.reload()},error:function(e){alert("땅 구매에 실패했습니다. 다시 시도해주세요.")}})}else console.log(a),console.log(n)}))}),1e3)}}))}));