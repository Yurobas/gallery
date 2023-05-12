document.addEventListener("DOMContentLoaded", () => {

    class Gallery {
        constructor() {
            this.columns = 5
            this.heightGallery = 0

            this.items = [...document.querySelectorAll('.gallery__item')]
            this.widthItem = 0
            this.heightItem = 0

            this.currentItem = null

            this.listeners()
            this.setItemsWidth()
            this.setItemsPosition()
        }

        listeners() {
            window.addEventListener('resize', () => {
                this.setItemsWidth()
                this.setItemsPosition()
            })

            this.items.forEach(item => {
                item.addEventListener('mouseenter', event => {
                    this.currentItem = item
                })
                item.addEventListener('touchstart', event => {
                    this.currentItem = item
                })
            })

            window.addEventListener('wheel', event => {
                const vector = event.deltaY === 100 ? 1 : 0

                for (let i = 0; i < this.columns; i++) {
                    const type = this.currentItem.dataset.index
                    const sibling = i + 1 - type
                    let step

                    switch(sibling) {
                        case 1:
                            step = 32
                            break;
                        case -1:
                            step = 32
                            break;
                        case 2:
                            step = 24
                            break;
                        case -2:
                            step = 24
                            break;
                        case 3:
                            step = 16
                            break;
                        case -3:
                            step = 16
                            break;
                        case 4:
                            step = 8
                            break;
                        case -4:
                            step = 8
                            break;
                    }

                    if (sibling === 0) {
                        this.moveItems(type, vector)
                    } else {
                        this.moveItems(+type + sibling, vector, step)
                    }
                }
            })
        }

        moveItems(type, vector, step = 40) {
            const groupItems = this.items.filter(item => item.dataset.index == type)
            const end = this.heightGallery - window.innerHeight

            groupItems.forEach(item => {
                let stop = false
                let y = +item.dataset.currenty

                if (vector) {
                    let n = 1
                    while (n < step) {
                        if (y <= +item.dataset.starty - end) {
                            y = +item.dataset.starty - end
                            stop = true
                        }
                        n++
                    }
                    if (!stop) y -= step
                } else {
                    let n = 1
                    while (n < step) {
                        if (y >= +item.dataset.starty) {
                            y = +item.dataset.starty
                            stop = true
                        }
                        n++
                    }
                    if (!stop) y += step
                }

                item.dataset.currenty = +Number(y).toFixed(0)
                item.style.transform = `translate3d(${item.dataset.startx}px, ${y}px, 1px)`
            })
        }

        setItemsWidth() {
            const screenWidth = window.innerWidth
            this.widthItem = +Number(screenWidth / this.columns).toFixed(0)

            this.items.forEach(item => {
                item.style.width = `${this.widthItem}px`
            })

            const image = this.items[0].querySelector('.gallery__image')
            this.heightItem = +Number(image.getBoundingClientRect().height).toFixed(0)
        }

        setItemsPosition() {
            let modWidth = 0
            let modHeight = 0
            let type = 0

            this.heightGallery = this.heightItem

            this.items.forEach((item, index) => {
                ++type
                if (modWidth === this.columns) {
                    this.heightGallery += this.heightItem
                    modWidth = 0
                    ++modHeight
                    type = 1
                }

                item.dataset.index = type
                item.dataset.startx = +Number(this.widthItem * modWidth).toFixed(0)
                item.dataset.starty = +Number(this.heightItem * modHeight).toFixed(0)
                item.dataset.currenty = +Number(this.heightItem * modHeight).toFixed(0)
                item.style.transform = `translate3d(${this.widthItem * modWidth}px, ${this.heightItem * modHeight}px, 1px)`

                ++modWidth
            })
        }
    }

    new Gallery()
});
