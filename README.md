# Element Remover

Element Remover allows you to remove unwanted HTML elements while you are browsing the internet.
I often find myself removing ads, chat boxes, etc. by manually deleting elements in the dev tools.
This process became tedious so I created a script to do the work for me 😎

<div style="text-align:center"><img src="demo.gif" height="600" /></div>

## How to setup
1. Create a bookmark on your browser
2. In the URL of the bookmark, copy and paste the script below
```
javascript:!function(){console.log("Created by https://github.com/joshua0308");let t;const e=function(t){const e=document.createElement("div");return document.body.appendChild(e),e.style.position="absolute",e.style.background=t,e.style.zIndex="998",e}("rgba(255, 0, 0, 0.3)");const n="rgba(153, 235, 255, 0.5)",o=100;let i,l,c=1,s=0;function u(t){if(((l=t.clientX)-i)*c>o){if(c*=-1,(s+=1)>2){e.remove(),document.removeEventListener("mousemove",d);const t=function(t){const e=document.createElement("div");return e.style.position="absolute",e.style.background=t,e.style.zIndex="999",document.body.appendChild(e),e.style.width="100%",e.style.height="100%",e.style.top="0px",e.style.left="0px",e}(n);setTimeout(()=>{t.remove()},250)}}else s=0;i=l}const d=function(t,e){let n=0;return function(...o){const i=(new Date).getTime();if(!(i-n<t))return n=i,e(...o)}}(100,function(n){!function(n){let o;if(o=n.target===e?document.elementsFromPoint(n.clientX,n.clientY)[1]:n.target,t===o)return;t=o;const i=o.getBoundingClientRect(),l=i.height,c=i.width;e.style.width=c+10+"px",e.style.height=l+10+"px",e.style.top=i.top+window.scrollY-5+"px",e.style.left=i.left+window.scrollX-5+"px"}(n),u(n)});document.addEventListener("mousemove",d),document.addEventListener("click",function(n){let o;o=n.target===e?document.elementsFromPoint(n.clientX,n.clientY)[1]:n.target,t===o&&o.remove()})}();
```
3. That's it! You are good to go ✅

## How it works
Simply click on the bookmark to run the script. This will allow you to pick HTML elements on your current tab.
If you wish to remove an element, simply hover over the element and click. You can remove as many elements as you want.
Once you are done, disable the script by shaking your mouse horizontally 4-5 times in quick succession until you see a lightblue blink on your screen.
