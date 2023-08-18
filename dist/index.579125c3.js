document.addEventListener("DOMContentLoaded", ()=>{
    class Gallery {
        constructor(){
            this.columns = 5;
            this.heightGallery = 0;
            this.items = [
                ...document.querySelectorAll(".gallery__item")
            ];
            this.widthItem = 0;
            this.heightItem = 0;
            this.currentItem = this.items[0];
            this.listeners();
            this.setItemsWidth();
            this.setItemsPosition();
        }
        listeners() {
            window.addEventListener("resize", ()=>{
                this.checkScreen();
                this.setItemsWidth();
                this.setItemsPosition();
            });
            this.items.forEach((item)=>{
                item.addEventListener("mouseenter", (event)=>{
                    this.currentItem = item;
                });
                item.addEventListener("touchstart", (event)=>{
                    this.currentItem = item;
                });
            });
            window.addEventListener("wheel", (event)=>{
                const vector = event.deltaY === 100 ? 1 : 0;
                for(let i = 0; i < this.columns; i++){
                    const type = this.currentItem.dataset.index;
                    const sibling = i + 1 - type;
                    let step;
                    switch(sibling){
                        case 1:
                            step = 18;
                            break;
                        case -1:
                            step = 18;
                            break;
                        case 2:
                            step = 12;
                            break;
                        case -2:
                            step = 12;
                            break;
                        case 3:
                            step = 9;
                            break;
                        case -3:
                            step = 9;
                            break;
                        case 4:
                            step = 7;
                            break;
                        case -4:
                            step = 7;
                            break;
                    }
                    if (sibling === 0) this.moveItems(type, vector);
                    else this.moveItems(+type + sibling, vector, step);
                }
            });
        }
        checkScreen() {
            const width = window.innerWidth;
            if (width >= 1200) this.columns = 5;
            else if (width < 1200 && width >= 1024) this.columns = 4;
            else if (width < 1024 && width >= 768) this.columns = 3;
            else this.columns = 2;
        }
        moveItems(type, vector, step = 36) {
            const groupItems = this.items.filter((item)=>item.dataset.index == type);
            const end = this.heightGallery - window.innerHeight;
            groupItems.forEach((item, index)=>{
                let stop = false;
                let y = +item.dataset.currenty;
                if (vector) {
                    if (+item.dataset.to - step <= +item.dataset.starty - end) item.dataset.to = +item.dataset.starty - end;
                    else item.dataset.to = +item.dataset.to - step;
                    let n = 1;
                    while(n < step){
                        if (y <= +item.dataset.starty - end) {
                            y = +item.dataset.starty - end;
                            item.dataset.currenty = +Number(y).toFixed(5);
                            item.style.transform = `translate3d(${item.dataset.startx}px, ${y}px, 1px)`;
                            stop = true;
                        }
                        n++;
                    }
                    if (!stop) this.animate(item, {
                        duration: 700,
                        timing: this.makeEaseInOut,
                        draw: (function(progress) {
                            const value = +Number(y - step * progress).toFixed(5);
                            if (value <= +item.dataset.starty - end) {
                                item.dataset.currenty = +item.dataset.starty - end;
                                item.style.transform = `translate3d(${item.dataset.startx}px, ${+item.dataset.starty - end}px, 1px)`;
                            } else {
                                item.dataset.currenty = value;
                                item.style.transform = `translate3d(${item.dataset.startx}px, ${value}px, 1px)`;
                            }
                        }).bind(this)
                    });
                } else {
                    if (+item.dataset.to + step >= +item.dataset.starty) item.dataset.to = item.dataset.starty;
                    else item.dataset.to = +item.dataset.to + step;
                    let n = 1;
                    while(n < step){
                        if (y >= +item.dataset.starty) {
                            y = +item.dataset.starty;
                            item.dataset.currenty = +Number(y).toFixed(5);
                            item.style.transform = `translate3d(${item.dataset.startx}px, ${y}px, 1px)`;
                            stop = true;
                        }
                        n++;
                    }
                    if (!stop) this.animate(item, {
                        duration: 700,
                        timing: this.makeEaseInOut,
                        draw: (function(progress) {
                            const value = +Number(y + step * progress).toFixed(5);
                            if (value >= +item.dataset.starty) {
                                item.dataset.currenty = +item.dataset.starty;
                                item.style.transform = `translate3d(${item.dataset.startx}px, ${+item.dataset.starty}px, 1px)`;
                            } else {
                                item.dataset.currenty = value;
                                item.style.transform = `translate3d(${item.dataset.startx}px, ${value}px, 1px)`;
                            }
                        }).bind(this)
                    });
                }
            });
        }
        setItemsWidth() {
            const screenWidth = window.innerWidth;
            this.widthItem = +Number(screenWidth / this.columns).toFixed(5);
            this.items.forEach((item)=>{
                item.style.width = `${this.widthItem}px`;
            });
        }
        setItemsPosition() {
            let modWidth = 0;
            let modHeight = 0;
            let type = 0;
            const image = this.items[0].querySelector(".gallery__image");
            this.heightItem = this.heightGallery = +Number(image.getBoundingClientRect().height).toFixed(5);
            this.items.forEach((item, index)=>{
                ++type;
                if (modWidth === this.columns) {
                    this.heightGallery += this.heightItem;
                    modWidth = 0;
                    ++modHeight;
                    type = 1;
                }
                item.dataset.to = 0;
                item.dataset.index = type;
                item.dataset.startx = +Number(this.widthItem * modWidth).toFixed(5);
                item.dataset.starty = +Number(this.heightItem * modHeight).toFixed(5);
                item.dataset.currenty = +Number(this.heightItem * modHeight).toFixed(5);
                item.style.transform = `translate3d(${this.widthItem * modWidth}px, ${this.heightItem * modHeight}px, 1px)`;
                ++modWidth;
            });
        }
        animate(el, { timing , draw , duration  }) {
            let start = performance.now();
            requestAnimationFrame(function animate(time) {
                // timeFraction изменяется от 0 до 1
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;
                // вычисление текущего состояния анимации
                let progress = timing(timeFraction);
                draw(progress) // отрисовать её
                ;
                if (timeFraction < 1) requestAnimationFrame(animate);
            });
        }
        makeEaseInOut(timeFraction) {
            if (timeFraction < .5) return 2 * timeFraction / 2;
            else return (2 - 2 * (1 - timeFraction)) / 2;
        }
    }
    new Gallery();
});

//# sourceMappingURL=index.579125c3.js.map
