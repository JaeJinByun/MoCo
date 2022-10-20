function notification(e){return Swal.mixin({toast:!0,position:"top-end",showCloseButton:!0,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}}).fire({icon:"warning",background:"#e76876",title:'<h4 style="color: white;">'+e+"</h4>"}),!1}function SuccessAlert(e){return Swal.mixin({toast:!0,position:"top-end",showCloseButton:!0,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}}).fire({icon:"success",background:"#37b837",title:'<h4 style="color: white;">'+e+"</h4>"}),!1}function confirm(e,t){return new Promise((function(n,o){Swal.fire({title:t,text:e,icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"승인",cancelButtonText:"취소"}).then((e=>{n(e)}))}))}function likeCheck(e){"noclick"===document.getElementsByName("isClick").item(0).value?(httpRequest=new XMLHttpRequest,httpRequest.open("POST","/board/post/"+e+"/like"),httpRequest.responseType="json",httpRequest.send(),httpRequest.onreadystatechange=()=>{if(httpRequest.readyState===XMLHttpRequest.DONE)if(200===httpRequest.status)document.getElementsByName("isClick").item(0).value="clicked",document.getElementsByClassName("new").item(0).textContent++,document.getElementsByClassName("current").item(0).textContent++;else{let e=httpRequest.response;console.log(e.message)}}):(httpRequest=new XMLHttpRequest,httpRequest.open("DELETE","/board/post/"+e+"/like"),httpRequest.responseType="json",httpRequest.send(),httpRequest.onreadystatechange=()=>{if(httpRequest.readyState===XMLHttpRequest.DONE)if(200===httpRequest.status)document.getElementsByName("isClick").item(0).value="noclick",document.getElementsByClassName("new").item(0).textContent--,document.getElementsByClassName("current").item(0).textContent--;else{let e=httpRequest.response;console.log(e.message)}})}function recruit(e){const t=document.getElementById("boardId").value;$.ajax({url:"/board/recruit/"+t+"/"+e,type:"POST",success:function(e){notification("참가신청완료!"),document.getElementById("currentJoin").textContent++},error:function(e){notification("이미 참가 되어있는 모집입니다.")}})}function recruitCancel(e){const t=document.getElementById("boardId").value;$.ajax({url:"/board/recruitCancel/"+t+"/"+e,type:"DELETE",success:function(e){notification("참가취소완료!"),document.getElementById("currentJoin").textContent--},error:function(e){notification("참가상태가 아닙니다.")}})}async function recruitClose(e){const t=document.getElementById("recruitCloseButton").textContent;(await confirm("","정말로 "+t+" 하시겠습니까?")).isConfirmed&&$.ajax({url:"/board/recruitClose/"+e,type:"PATCH",success:function(e){e?(SuccessAlert("모집마감되었습니다."),document.getElementById("recruitCloseButton").innerText="마감취소",document.getElementById("recruitCloseButton").style.backgroundColor="#94324b"):(notification("모집마감취소."),document.getElementById("recruitCloseButton").innerText="마감하기",document.getElementById("recruitCloseButton").style.backgroundColor="#74d65c")},error:function(e){notification("다시 시도해주세요.")}})}function saveComment(e){const t=document.getElementById("boardId").value;let n;var o;if(void 0===e||null==e||""==e?(n=document.getElementById("comment").value,o=!1):(n=document.getElementById("recomment-content-"+e).value,o=!0),!n||""===n.trim())return alert("공백 또는 빈 문자열은 입력하실수 없습니다."),!1;httpRequest=new XMLHttpRequest;var s=new Object;s.comment=n,s.boardId=t,o?httpRequest.open("POST","/board/recomment/"+t+"/"+e):httpRequest.open("POST","/board/comment/"+t),httpRequest.setRequestHeader("Content-Type","application/json"),httpRequest.responseType="json",httpRequest.send(JSON.stringify(s)),httpRequest.onreadystatechange=()=>{httpRequest.readyState===XMLHttpRequest.DONE&&(200===httpRequest.status?o?($("#ul-"+e).load(location.href+" #ul-"+e+" li"),$("#recomment-content-"+e).val("")):($("#commentList").load(location.href+" #commentList"),$("#comment").val("")):console.log(httpRequest.response))}}function commentUpdate(e,t){var n;if(!(n="comment"===e?{commentId:t.querySelector("#commentId").value,boardId:t.querySelector("#comment_boardId").value,comment:t.querySelector("#comment-content").value}:{commentId:t.querySelector("#recommentId").value,boardId:t.querySelector("#recomment_boardId").value,comment:t.querySelector("#recomment-content").value}).comment||""===n.comment.trim())return alert("댓글을 입력해주세요."),!1;httpRequest=new XMLHttpRequest;const o=document.getElementById("userId").value;httpRequest.open("PUT","/board/post/comment/"+n.commentId+"/"+o),httpRequest.setRequestHeader("Content-Type","application/json; charset=utf-8"),httpRequest.responseType="json",httpRequest.send(JSON.stringify(n)),httpRequest.onreadystatechange=()=>{if(httpRequest.readyState===XMLHttpRequest.DONE)if(200===httpRequest.status)if("comment"===e)$("#multi-collapse-"+n.commentId).collapse("hide"),$("#comment-collapse-"+n.commentId).collapse("show"),$("#comment-collapse-"+n.commentId).text(n.comment);else{const e=t.querySelector("#parentId").value;$("#ul-"+e).load(location.href+" #ul-"+e+" li")}else{let e=httpRequest.response;console.log(e.message)}}}async function commentDelete(e,t,n){const o=await confirm("","정말로 삭제 하시겠습니까?");console.log(o.isConfirmed),o.isConfirmed&&(httpRequest=new XMLHttpRequest,httpRequest.open("DELETE","/board/post/"+e+"/comment/"+t),httpRequest.setRequestHeader("Content-Type","application/json; charset=utf-8"),httpRequest.responseType="json",httpRequest.send(),httpRequest.onreadystatechange=()=>{if(httpRequest.readyState===XMLHttpRequest.DONE)if(200===httpRequest.status)if("comment"===n)$("#commentList").load(location.href+" #commentList");else{const e=$("#multi-collapse-"+t).closest("ul").attr("id");$("#"+e).load(location.href+" #"+e+" li")}else{let e=httpRequest.response;console.log(e.message)}})}console.log(sessionStorage.getItem("user"));