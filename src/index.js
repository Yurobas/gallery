document.addEventListener("DOMContentLoaded", () => {

    class Gallery {
        constructor() {
            this.columns = 5
            this.heightGallery = 0

            this.items = [...document.querySelectorAll('.gallery__item')]

            this.widthItem = 0
            this.heightItem = 0

            this.widthOpenedItem = 0
            this.heightOpenedItem = 0

            this.currentItem = this.items[0]

            this.currentY = 0
            this.wheelMod = 0

            this.listeners()

            this.checkScreen()
            this.setItemsWidth()
            this.setItemsPosition()
        }

        listeners() {
            window.addEventListener('resize', () => {
                this.checkScreen()
                this.setItemsWidth()
                this.setItemsPosition()
            })

            this.items.forEach(item => {
                item.addEventListener('mouseenter', event => {
                    this.currentItem = item
                    this.setActiveItems(item.dataset.index)
                })

                item.addEventListener('mouseleave', event => {
                    this.setActiveItems(null)
                })

                item.addEventListener('touchstart', event => {
                    this.currentItem = item
                    this.setActiveItems(item.dataset.index)
                })

                item.addEventListener('click', event => {
                    if (!item.classList.contains('--open')) {
                        this.openItems(item.dataset.index)
                    } else {
                        this.closeItems()
                    }
                })
            })

            window.addEventListener('touchstart', event => {
                this.currentY = event.changedTouches[0].clientY
            })

            window.addEventListener('touchend', event => {
                this.currentY = 0
            })

            window.addEventListener('touchmove', event => {
                let range = 0
                let vector = null
                const y = event.changedTouches[0].clientY

                this.currentY > y ? vector = 1 : vector = 0

                if (vector) {
                    range = this.currentY - y
                } else {
                    range = y - this.currentY
                }

                for (let i = 0; i < this.columns; i++) {
                    const type = this.currentItem.dataset.index
                    const sibling = i + 1 - type
                    let step
    
                    switch(sibling) {
                        case 0:
                            step = +Number(+range / 1.25).toFixed(1)
                            break;
                        case 1:
                            step = +Number(+range / 1.75).toFixed(1)
                            break;
                        case -1:
                            step = +Number(+range / 1.75).toFixed(1)
                            break;
                        case 2:
                            step = +Number(+range / 2).toFixed(1)
                            break;
                        case -2:
                            step = +Number(+range / 2).toFixed(1)
                            break;
                        case 3:
                            step = +Number(+range / 2.25).toFixed(1)
                            break;
                        case -3:
                            step = +Number(+range / 2.25).toFixed(1)
                            break;
                        case 4:
                            step = +Number(+range / 2.5).toFixed(1)
                            break;
                        case -4:
                            step = +Number(+range / 2.5).toFixed(1)
                            break;
                    }
    
                    if (sibling === 0) {
                        this.moveItems(type, vector, step)
                    } else {
                        this.moveItems(+type + sibling, vector, step)
                    }
                }
            })

            window.addEventListener('wheel', event => {
                ++this.wheelMod
                setTimeout(() => --this.wheelMod, 100)

                const vector = event.deltaY > 0 ? 1 : 0

                for (let i = 0; i < this.columns; i++) {
                    const type = this.currentItem.dataset.index
                    const sibling = i + 1 - type
                    let step
    
                    switch(sibling) {
                        case 0:
                            step = 54
                            break;
                        case 1:
                            step = 27
                            break;
                        case -1:
                            step = 27
                            break;
                        case 2:
                            step = 18
                            break;
                        case -2:
                            step = 18
                            break;
                        case 3:
                            step = 14
                            break;
                        case -3:
                            step = 14
                            break;
                        case 4:
                            step = 10
                            break;
                        case -4:
                            step = 10
                            break;
                    }
    
                    if (sibling === 0) {
                        this.moveItems(type, vector, step * this.wheelMod)
                    } else {
                        this.moveItems(+type + sibling, vector, step * this.wheelMod)
                    }
                }
            })
        }

        openItems(index) {
            this.setItemsWidth(index)
            this.setItemsPosition(index)
        }

        closeItems() {
            this.setItemsWidth()
            this.setItemsPosition()
        }

        setItemsWidth(index = null) {
            const screenWidth = window.innerWidth

            this.widthItem = +Number(screenWidth / this.columns).toFixed(1)
            this.widthOpenedItem = +Number(this.widthItem * 1.5).toFixed(1)

            if (index) {
                this.items.forEach(item => {
                    if (item.dataset.index == index) {
                        item.classList.add('--open')
                        item.style.width = `${this.widthOpenedItem}px`
                    } else {
                        item.classList.remove('--open')
                        item.style.width = `${this.widthItem}px`
                    }
                })
            } else this.items.forEach(item => {
                item.classList.remove('--open')
                item.style.width = `${this.widthItem}px`
            })
        }

        setItemsPosition(index = null) {
            let modWidth = 0
            let modHeight = 0
            let type = 0

            const image = this.items[0].querySelector('.gallery__image')
            this.heightItem = this.heightGallery = +Number(image.getBoundingClientRect().height).toFixed(1)

            this.items.forEach(item => {

                ++type
                if (modWidth === this.columns) {
                    this.heightGallery += this.heightItem
                    modWidth = 0
                    ++modHeight
                    type = 1
                }

                item.dataset.index = type

                if (index && item.dataset.index == index) {
                    const height = +Number(item.getBoundingClientRect().height).toFixed(1)
                    height != this.heightOpenedItem ? this.heightOpenedItem = height : false

                    item.dataset.starty = +Number(this.heightOpenedItem * modHeight).toFixed(1)
                    item.dataset.currenty = +Number(this.heightOpenedItem * modHeight).toFixed(1)
                    item.style.transform = `translate3d(${this.widthItem * modWidth}px, ${this.heightOpenedItem * modHeight}px, 1px)`
                } else {
                    item.dataset.starty = +Number(this.heightItem * modHeight).toFixed(1)
                    item.dataset.currenty = +Number(this.heightItem * modHeight).toFixed(1)
                    item.style.transform = `translate3d(${this.widthItem * modWidth}px, ${this.heightItem * modHeight}px, 1px)`
                }

                item.dataset.startx = +Number(this.widthItem * modWidth).toFixed(1)
                
                ++modWidth
            })
        }

        moveItems(type, vector, step) {
            const groupItems = this.items.filter(item => item.dataset.index == type)
            const end = this.heightGallery - window.innerHeight

            groupItems.forEach(item => {
                let y = +item.dataset.currenty

                if (vector) {
                    this.animate(item, {
                        duration: 400,
                        timing: this.makeEaseInOut,
                        draw: function(progress) {
                            const value = +Number(y - step * progress).toFixed(1)
                            if (value <= +item.dataset.starty - end) {
                                item.dataset.currenty = +item.dataset.starty - end
                                item.style.transform = `translate3d(${item.dataset.startx}px, ${+item.dataset.starty - end}px, 1px)`
                            } else {
                                item.dataset.currenty = value
                                item.style.transform = `translate3d(${item.dataset.startx}px, ${value}px, 1px)`
                            }
                        }.bind(this)
                    })
                } else {
                    this.animate(item, {
                        duration: 400,
                        timing: this.makeEaseInOut,
                        draw: function(progress) {
                            const value = +Number(y + step * progress).toFixed(1)
                            if (value >= +item.dataset.starty) {
                                item.dataset.currenty = +item.dataset.starty
                                item.style.transform = `translate3d(${item.dataset.startx}px, ${+item.dataset.starty}px, 1px)`
                            } else {
                                item.dataset.currenty = value
                                item.style.transform = `translate3d(${item.dataset.startx}px, ${value}px, 1px)`
                            }
                        }.bind(this)
                    })
                }
            })
        }

        animate(el, {timing, draw, duration}) {
    
            let start = performance.now()
    
            requestAnimationFrame(function animate(time) {
                // timeFraction изменяется от 0 до 1
                let timeFraction = (time - start) / duration
                if (timeFraction > 1) timeFraction = 1
            
                // вычисление текущего состояния анимации
                let progress = timing(timeFraction)
            
                draw(progress) // отрисовать её
            
                if (timeFraction < 1) {
                    requestAnimationFrame(animate)
                } else {
                    // finish
                }
            })
        }

        makeEaseInOut(timeFraction) {
            if (timeFraction < .5)
                return 2 * timeFraction / 2
            else
                return (2 - 2 * (1 - timeFraction)) / 2
        }

        setActiveItems(index) {
            this.items.forEach(item => {
                item.dataset.index == index ? 
                    item.classList.add('--active') : 
                    item.classList.remove('--active')
            })
        }

        checkScreen() {
            const width = window.innerWidth
            if (width >= 1200) {
                this.columns = 5
            } else if (width < 1200 && width >= 1024) {
                this.columns = 4
            } else if (width < 1024 && width >= 768) {
                this.columns = 3
            } else {
                this.columns = 2
            }
        }
    }

    new Gallery()
})
