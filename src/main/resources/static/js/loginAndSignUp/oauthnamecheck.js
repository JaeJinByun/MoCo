let nameCheck=!1;function nameLastCheck(){if(!nameCheck)return alert("별명 중복체크를 해주세요."),!1}function checknameDuplication(){const e=document.getElementById("nameAvailable"),t=document.getElementById("nameNotAvailable");let n=document.getElementById("name").value;return n?/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/.test(n)?(httpRequest=new XMLHttpRequest,httpRequest.open("GET","/name/check?nickname="+n),httpRequest.responseType="text",httpRequest.send(),void(httpRequest.onreadystatechange=()=>{if(httpRequest.readyState===XMLHttpRequest.DONE)if(200===httpRequest.status){let n=httpRequest.response;t.style.display="none",e.style.display="block",e.innerText=n,nameCheck=!0}else{let n=JSON.parse(httpRequest.response);e.style.display="none",t.style.display="block",t.innerText=n.message,nameCheck=!1}})):(e.style.display="none",t.style.display="block",t.innerText="닉네임 형식이 올바르지 않습니다. 2~10 글자 사이로 입력해주세요.(특수문자 제외)",nameCheck=!1,!1):(e.style.display="none",t.style.display="block",t.innerText="아이디를 입력하세요.",nameCheck=!1,!1)}