# Element Remover

Element Remover allows you to remove unwanted HTML elements while you are browsing the internet.
I often find myself removing ads, chat boxes, etc. by manually deleting elements in the dev tools.
This process became tedious so I created a script to do the work for me 😎

<div style="text-align:center"><img src="demo.gif" height="600" /></div>

## Setup guide
### Chrome
1. Create a bookmark on your browser (shortcut: CMD + d)
2. Click on "More..." on the bottom left corner
3. Give it a name that is easily identifiable (e.g. Element Remover)
4. For the URL, copy and paste the script below
```
javascript:!function(){let e;const t=function(e){const t=document.createElement("div");return document.body.appendChild(t),t.style.position="absolute",t.style.background=e,t.style.zIndex="998",t}("rgba(255, 0, 0, 0.3)");function n(e){const n=e.getBoundingClientRect(),o=n.height,c=n.width;t.style.width=c+10+"px",t.style.height=o+10+"px",t.style.top=n.top+window.scrollY-5+"px",t.style.left=n.left+window.scrollX-5+"px"}function o(o){let c;c=o.target===t?document.elementsFromPoint(o.clientX,o.clientY)[1]:o.target,e===c&&(c.remove(),n(e=document.elementsFromPoint(o.clientX,o.clientY)[1]))}const c="rgba(153, 235, 255, 0.5)",i=100;let l,d,s=1,u=0;function r(){t.remove(),document.removeEventListener("mousemove",y),document.removeEventListener("click",o),document.removeEventListener("keydown",m);const e=function(e){const t=document.createElement("div");return t.style.position="absolute",t.style.background=e,t.style.zIndex="999",document.body.appendChild(t),t.style.width="100%",t.style.height=document.body.clientHeight+"px",t.style.top="0px",t.style.left="0px",t}(c);setTimeout(()=>{e.remove()},250)}function m(e){27===e.keyCode&&r()}const y=function(e,t){let n=0;return function(...o){const c=(new Date).getTime();if(!(c-n<e))return n=c,t(...o)}}(100,function(o){!function(o){let c;c=o.target===t?document.elementsFromPoint(o.clientX,o.clientY)[1]:o.target,e!==c&&(e=c,n(c))}(o),function(e){((d=e.clientX)-l)*s>i?(s*=-1,(u+=1)>2&&r()):u=0,l=d}(o)});document.addEventListener("mousemove",y),document.addEventListener("click",o),document.addEventListener("keydown",m),console.log("Created by https://github.com/joshua0308")}();
```
5. Place the bookmark in `Bookmarks Bar` for ease of use
6. That's it! You are good to go ✅

## How it works
Click on the bookmark we just created. This will allow you to pick HTML elements on your current tab.
Hover over to an element you wish to remove and click. The highlighted element will be deleted. You can remove as many elements as you want.
Once you are done, you can disable the script by either:
1. shaking your mouse horizontally 4-5 times in quick succession
2. pressing the escape key on your keyboard

You will see a lightblue blink on your screen when the script is disabled.
