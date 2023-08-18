document.addEventListener("DOMContentLoaded",(()=>{new class{constructor(){this.columns=5,this.heightGallery=0,this.items=[...document.querySelectorAll(".gallery__item")],this.widthItem=0,this.heightItem=0,this.currentItem=this.items[0],this.listeners(),this.setItemsWidth(),this.setItemsPosition()}listeners(){window.addEventListener("resize",(()=>{this.checkScreen(),this.setItemsWidth(),this.setItemsPosition()})),this.items.forEach((t=>{t.addEventListener("mouseenter",(e=>{this.currentItem=t})),t.addEventListener("touchstart",(e=>{this.currentItem=t}))})),window.addEventListener("wheel",(t=>{const e=100===t.deltaY?1:0;for(let t=0;t<this.columns;t++){const s=this.currentItem.dataset.index,a=t+1-s;let i;switch(a){case 1:case-1:i=18;break;case 2:case-2:i=12;break;case 3:case-3:i=9;break;case 4:case-4:i=7}0===a?this.moveItems(s,e):this.moveItems(+s+a,e,i)}}))}checkScreen(){const t=window.innerWidth;this.columns=t>=1200?5:t<1200&&t>=1024?4:t<1024&&t>=768?3:2}moveItems(t,e,s=36){const a=this.items.filter((e=>e.dataset.index==t)),i=this.heightGallery-window.innerHeight;a.forEach(((t,a)=>{let r=!1,n=+t.dataset.currenty;if(e){+t.dataset.to-s<=+t.dataset.starty-i?t.dataset.to=+t.dataset.starty-i:t.dataset.to=+t.dataset.to-s;let e=1;for(;e<s;)n<=+t.dataset.starty-i&&(n=+t.dataset.starty-i,t.dataset.currenty=+Number(n).toFixed(5),t.style.transform=`translate3d(${t.dataset.startx}px, ${n}px, 1px)`,r=!0),e++;r||this.animate(t,{duration:700,timing:this.makeEaseInOut,draw:function(e){const a=+Number(n-s*e).toFixed(5);a<=+t.dataset.starty-i?(t.dataset.currenty=+t.dataset.starty-i,t.style.transform=`translate3d(${t.dataset.startx}px, ${+t.dataset.starty-i}px, 1px)`):(t.dataset.currenty=a,t.style.transform=`translate3d(${t.dataset.startx}px, ${a}px, 1px)`)}.bind(this)})}else{+t.dataset.to+s>=+t.dataset.starty?t.dataset.to=t.dataset.starty:t.dataset.to=+t.dataset.to+s;let e=1;for(;e<s;)n>=+t.dataset.starty&&(n=+t.dataset.starty,t.dataset.currenty=+Number(n).toFixed(5),t.style.transform=`translate3d(${t.dataset.startx}px, ${n}px, 1px)`,r=!0),e++;r||this.animate(t,{duration:700,timing:this.makeEaseInOut,draw:function(e){const a=+Number(n+s*e).toFixed(5);a>=+t.dataset.starty?(t.dataset.currenty=+t.dataset.starty,t.style.transform=`translate3d(${t.dataset.startx}px, ${+t.dataset.starty}px, 1px)`):(t.dataset.currenty=a,t.style.transform=`translate3d(${t.dataset.startx}px, ${a}px, 1px)`)}.bind(this)})}}))}setItemsWidth(){const t=window.innerWidth;this.widthItem=+Number(t/this.columns).toFixed(5),this.items.forEach((t=>{t.style.width=`${this.widthItem}px`}))}setItemsPosition(){let t=0,e=0,s=0;const a=this.items[0].querySelector(".gallery__image");this.heightItem=this.heightGallery=+Number(a.getBoundingClientRect().height).toFixed(5),this.items.forEach(((a,i)=>{++s,t===this.columns&&(this.heightGallery+=this.heightItem,t=0,++e,s=1),a.dataset.to=0,a.dataset.index=s,a.dataset.startx=+Number(this.widthItem*t).toFixed(5),a.dataset.starty=+Number(this.heightItem*e).toFixed(5),a.dataset.currenty=+Number(this.heightItem*e).toFixed(5),a.style.transform=`translate3d(${this.widthItem*t}px, ${this.heightItem*e}px, 1px)`,++t}))}animate(t,{timing:e,draw:s,duration:a}){let i=performance.now();requestAnimationFrame((function t(r){let n=(r-i)/a;n>1&&(n=1);let d=e(n);s(d),n<1&&requestAnimationFrame(t)}))}makeEaseInOut(t){return t<.5?2*t/2:(2-2*(1-t))/2}}}));
//# sourceMappingURL=index.9b8885d6.js.map
