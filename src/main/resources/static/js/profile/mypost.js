let loading=!1,page=2;const totalPage=document.getElementById("totalPage").value;let container=document.getElementById("container");const userId=document.getElementById("userId").value;function nextPage(){if(loading)return!1;loading=!0,httpRequest=new XMLHttpRequest,httpRequest.open("GET","/profile/MyListJson/"+page+"/"+userId),httpRequest.responseType="json",httpRequest.send(),httpRequest.onreadystatechange=()=>{if(httpRequest.readyState===XMLHttpRequest.DONE)if(200===httpRequest.status){httpRequest.response.forEach(((e,t)=>{let{id:n,title:s,writer:a,thumbnail:l,subcontent:i,view:o,created_date:d,user_id:c,picture:r,comment_count:u,like_count:p,hashTag:g,isfull:h}=e;CustomDate=d.split("T")[0].split(/-/),createdDate=CustomDate[0]+"년 "+CustomDate[1]+"월 "+CustomDate[2]+"일",null!=l&&""!=l.trim()||(l="/img/panda.png"),null!=r&&""!=r.trim()||(r="/img/userIcon.svg"),g?g+="#":g="",null==u&&(u=0),null==p&&(p=0);let v="";h&&(h="isFullPost",v='<div class="isFull">모집 마감</div>');const m=document.createElement("span");let w=`<div class="card ${h}" >\n                                  <div class="card-header">`+v+`\x3c!-- 썸네일 --\x3e\n                                    <a href="/board/post/read/${n}">\n                                    <span>\n                                       <img src="${l}" alt="썸네일" />\n                                    </span>\n                                    </a>\n                                  </div>\n                                  \x3c!-- 몸통 --\x3e\n                                  <div class="card-body">\n                                    \x3c!-- 해시태그 --\x3e\n                                    <span class="tag tag-pink">${g}</span>\n                                    \x3c!-- 제목 --\x3e\n                                    <a href="/board/post/read/${n}"><h4> ${s} </h4></a>\n                                    \x3c!-- 글 내용 --\x3e\n                                    <p>\n                                      ${i}\n                                    </p>\n                                    \x3c!-- 좋아요 --\x3e\n                                    <div class="like">\n                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" class="bi bi-heart-fill" viewBox="0 0 24 24" fill="currentColor">\n                                        <path fill-rule="evenodd" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" clip-rule="evenodd" />\n                                      </svg>\n                                      <b>&nbsp;️${p}</b> • ${o} views\n                                    </div>\n                                    \x3c!-- 유저 정보 --\x3e\n                                    <div class="user">\n                                      <img src="${r}" alt="user" />\n                                      <div class="user-info">\n                                        <h5>${a}</h5>\n                                        <small> ${createdDate} • <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 20">\n                                          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>\n                                          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>\n                                        </svg>&nbsp;${u}</small>\n                                      </div>\n                                    </div>\n                                  </div>\n                                </div>`;m.innerHTML=w,console.log(container.appendChild(m))})),page++}else{let e=httpRequest.response;console.log(e.message)}}}window.addEventListener("scroll",(function(){const e=window.scrollY;window.innerHeight+e+100>=document.body.offsetHeight&&totalPage>=page&&nextPage()}));