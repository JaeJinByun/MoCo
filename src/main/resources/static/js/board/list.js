let loading=!1,page=2;const totalPage=document.getElementById("totalPage").value;let container=document.getElementById("container"),toggleActive=!0;const toggle=document.getElementById("recruitOntoggle");function nextPage(){if(loading)return!1;loading=!0,httpRequest=new XMLHttpRequest,httpRequest.open("GET","/board/listJson/"+page+"/"+toggleActive),httpRequest.responseType="json",httpRequest.send(),httpRequest.onreadystatechange=()=>{if(httpRequest.readyState===XMLHttpRequest.DONE)if(200===httpRequest.status){httpRequest.response.forEach(((e,t)=>{let{id:n,title:o,writer:a,thumbnail:i,subcontent:s,view:l,created_date:c,user_id:d,picture:r,comment_count:g,like_count:u,hashTag:p,isfull:m}=e;CustomDate=c.split("T")[0].split(/-/),createdDate=CustomDate[0]+"년 "+CustomDate[1]+"월 "+CustomDate[2]+"일",null!=i&&""!=i.trim()||(i="/img/thumbnail.png"),null!=r&&""!=r.trim()||(r="/img/userIcon.svg"),p?p+="#":p="",null==g&&(g=0),null==u&&(u=0);let h="";m&&(m="isFullPost",h='<div class="isFull">모집 마감</div>');const v=document.createElement("span");let w=`<div class="card ${m}" >\n                                  <div class="card-header">`+h+`\x3c!-- 썸네일 --\x3e\n                                    <a href="/board/post/read/${n}">\n                                    <span>\n                                       <img src="${i}" alt="썸네일" />\n                                    </span>\n                                    </a>\n                                  </div>\n                                  \x3c!-- 몸통 --\x3e\n                                  <div class="card-body">\n                                    \x3c!-- 해시태그 --\x3e\n                                    <span class="tag tag-pink">${p}</span>\n                                    \x3c!-- 제목 --\x3e\n                                    <a href="/board/post/read/${n}"><h4> ${o} </h4></a>\n                                    \x3c!-- 글 내용 --\x3e\n                                    <p>\n                                      ${s}\n                                    </p>\n                                    \x3c!-- 좋아요 --\x3e\n                                    <div class="like">\n                                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" class="bi bi-heart-fill" viewBox="0 0 24 24" fill="currentColor">\n                                        <path fill-rule="evenodd" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" clip-rule="evenodd" />\n                                      </svg>\n                                      <b>&nbsp;️${u}</b> • ${l} views\n                                    </div>\n                                    \x3c!-- 유저 정보 --\x3e\n                                    <div class="user">\n                                      <img src="${r}" alt="user" />\n                                      <div class="user-info">\n                                        <h5>${a}</h5>\n                                        <small> ${createdDate} • <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 20">\n                                          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>\n                                          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>\n                                        </svg>&nbsp;${g}</small>\n                                      </div>\n                                    </div>\n                                  </div>\n                                </div>`;v.innerHTML=w,container.appendChild(v)})),page++}else{let e=httpRequest.response;console.log(e.message)}}}function setCookie(e,t,n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3),document.cookie=e+"="+t+";expires="+o.toUTCString()+";path=/"}function getCookie(e){var t=document.cookie.match("(^|;) ?"+e+"=([^;]*)(;|$)");return t?t[2]:null}function loadPage(){document.getElementById("container").innerHTML=sessionStorage.getItem("data")}toggle.addEventListener("change",(()=>{toggleActive=toggle.checked,toggleActive?$("#top-container").load(location.href+" #container",(()=>{container=document.getElementById("container"),loading=!1,page=2})):$("#top-container").load("/board/AllBoard #container",(()=>{container=document.getElementById("container"),loading=!1,page=2}))})),window.addEventListener("scroll",(function(){const e=window.scrollY;window.innerHeight+e+100>=document.body.offsetHeight&&nextPage()})),window.onpageshow=async function(e){(e.persisted||"back_forward"===window.performance.getEntriesByType("navigation")[0].type)&&(page=getCookie("page"),await loadPage(),window.scrollTo(0,getCookie("scroll")))},window.onbeforeunload=function(e){setCookie("scroll",window.scrollY,1),window.sessionStorage.setItem("data",document.getElementById("container").innerHTML),setCookie("page",page,1)},$(".slider-nav").slick({autoplay:!0,autoplaySpeed:13500,slidesToScroll:1,dots:!0,arrows:!1,focusOnSelect:!0}),$("a[data-slide]").click((function(e){e.preventDefault();var t=$(this).data("slide");$(".slider-nav").slick("slickGoTo",t-1)}));