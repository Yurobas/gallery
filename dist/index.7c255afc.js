document.addEventListener("DOMContentLoaded",(()=>{new class{constructor(){this.columns=5,this.heightGallery=0,this.items=[...document.querySelectorAll(".gallery__item")],this.widthItem=0,this.heightItem=0,this.widthOpenedItem=0,this.heightOpenedItem=0,this.currentItem=this.items[0],this.currentY=0,this.wheelMod=0,this.listeners(),this.checkScreen(),this.setItemsWidth(),this.setItemsPosition()}listeners(){window.addEventListener("resize",(()=>{this.checkScreen(),this.setItemsWidth(),this.setItemsPosition()})),this.items.forEach((t=>{t.addEventListener("mouseenter",(e=>{this.currentItem=t,this.setActiveItems(t.dataset.index)})),t.addEventListener("mouseleave",(t=>{this.setActiveItems(null)})),t.addEventListener("touchstart",(e=>{this.currentItem=t,this.setActiveItems(t.dataset.index)})),t.addEventListener("click",(e=>{t.classList.contains("--open")?this.closeItems():this.openItems(t.dataset.index)}))})),window.addEventListener("touchstart",(t=>{this.currentY=t.changedTouches[0].clientY})),window.addEventListener("touchend",(t=>{this.currentY=0})),window.addEventListener("touchmove",(t=>{let e=0,s=null;const i=t.changedTouches[0].clientY;s=this.currentY>i?1:0,e=s?this.currentY-i:i-this.currentY;for(let t=0;t<this.columns;t++){const i=this.currentItem.dataset.index,a=t+1-i;let h;switch(a){case 0:h=+Number(+e/1.5).toFixed(1);break;case 1:case-1:h=+Number(+e/2).toFixed(1);break;case 2:case-2:h=+Number(+e/2.5).toFixed(1);break;case 3:case-3:h=+Number(+e/3).toFixed(1);break;case 4:case-4:h=+Number(+e/4).toFixed(1)}0===a?this.moveItems(i,s,h):this.moveItems(+i+a,s,h)}})),window.addEventListener("wheel",(t=>{++this.wheelMod,setTimeout((()=>--this.wheelMod),100);const e=t.deltaY>0?1:0;for(let t=0;t<this.columns;t++){const s=this.currentItem.dataset.index,i=t+1-s;let a;switch(i){case 0:a=36;break;case 1:case-1:a=18;break;case 2:case-2:a=12;break;case 3:case-3:a=9;break;case 4:case-4:a=7}0===i?this.moveItems(s,e,a*this.wheelMod):this.moveItems(+s+i,e,a*this.wheelMod)}}))}openItems(t){this.setItemsWidth(t),this.setItemsPosition(t)}closeItems(){this.setItemsWidth(),this.setItemsPosition()}setItemsWidth(t=null){const e=window.innerWidth;this.widthItem=+Number(e/this.columns).toFixed(1),this.widthOpenedItem=+Number(1.5*this.widthItem).toFixed(1),t?this.items.forEach((e=>{e.dataset.index==t?(e.classList.add("--open"),e.style.width=`${this.widthOpenedItem}px`):(e.classList.remove("--open"),e.style.width=`${this.widthItem}px`)})):this.items.forEach((t=>{t.classList.remove("--open"),t.style.width=`${this.widthItem}px`}))}setItemsPosition(t=null){let e=0,s=0,i=0;const a=this.items[0].querySelector(".gallery__image");this.heightItem=this.heightGallery=+Number(a.getBoundingClientRect().height).toFixed(1),this.items.forEach((a=>{if(++i,e===this.columns&&(this.heightGallery+=this.heightItem,e=0,++s,i=1),a.dataset.index=i,t&&a.dataset.index==t){const t=+Number(a.getBoundingClientRect().height).toFixed(1);t!=this.heightOpenedItem&&(this.heightOpenedItem=t),a.dataset.starty=+Number(this.heightOpenedItem*s).toFixed(1),a.dataset.currenty=+Number(this.heightOpenedItem*s).toFixed(1),a.style.transform=`translate3d(${this.widthItem*e}px, ${this.heightOpenedItem*s}px, 1px)`}else a.dataset.starty=+Number(this.heightItem*s).toFixed(1),a.dataset.currenty=+Number(this.heightItem*s).toFixed(1),a.style.transform=`translate3d(${this.widthItem*e}px, ${this.heightItem*s}px, 1px)`;a.dataset.startx=+Number(this.widthItem*e).toFixed(1),++e}))}moveItems(t,e,s){const i=this.items.filter((e=>e.dataset.index==t)),a=this.heightGallery-window.innerHeight;i.forEach((t=>{let i=+t.dataset.currenty;e?this.animate(t,{duration:400,timing:this.makeEaseInOut,draw:function(e){const h=+Number(i-s*e).toFixed(1);h<=+t.dataset.starty-a?(t.dataset.currenty=+t.dataset.starty-a,t.style.transform=`translate3d(${t.dataset.startx}px, ${+t.dataset.starty-a}px, 1px)`):(t.dataset.currenty=h,t.style.transform=`translate3d(${t.dataset.startx}px, ${h}px, 1px)`)}.bind(this)}):this.animate(t,{duration:400,timing:this.makeEaseInOut,draw:function(e){const a=+Number(i+s*e).toFixed(1);a>=+t.dataset.starty?(t.dataset.currenty=+t.dataset.starty,t.style.transform=`translate3d(${t.dataset.startx}px, ${+t.dataset.starty}px, 1px)`):(t.dataset.currenty=a,t.style.transform=`translate3d(${t.dataset.startx}px, ${a}px, 1px)`)}.bind(this)})}))}animate(t,{timing:e,draw:s,duration:i}){let a=performance.now();requestAnimationFrame((function t(h){let n=(h-a)/i;n>1&&(n=1);let r=e(n);s(r),n<1&&requestAnimationFrame(t)}))}makeEaseInOut(t){return t<.5?2*t/2:(2-2*(1-t))/2}setActiveItems(t){this.items.forEach((e=>{e.dataset.index==t?e.classList.add("--active"):e.classList.remove("--active")}))}checkScreen(){const t=window.innerWidth;this.columns=t>=1200?5:t<1200&&t>=1024?4:t<1024&&t>=768?3:2}}}));
//# sourceMappingURL=index.7c255afc.js.map
