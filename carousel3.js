class HorizontalMouseDrivenCarousel {
	constructor(options = {}) {
		const _defaults = {
			carousel: ".js-carousel",
			bgImg: ".js-carousel-bg-img",
			list: ".js-carousel-list",
			listItem: ".js-carousel-list-item"
		};

		this.posY = 0;

		this.defaults = Object.assign({}, _defaults, options);

		this.initCursor();
		this.init();
		this.bgImgController();
	}

	//region getters
	getBgImgs() {
		return document.querySelectorAll(this.defaults.bgImg);
	}

	getListItems() {
		return document.querySelectorAll(this.defaults.listItem);
	}

	getList() {
		return document.querySelector(this.defaults.list);
	}

	getCarousel() {
		return document.querySelector(this.defaults.carousel);
	}

	init() {
		
		TweenMax.set(this.getBgImgs(), {
			autoAlpha: 0,
			scale: 1.05
		});

		TweenMax.set(this.getBgImgs()[0], {
			autoAlpha: 1,
			scale: 1
		});

		TweenMax.set(this.getListItems(), {
            y: 0
        });

		this.listItems = this.getListItems().length - 1;
		
		this.listOpacityController(0);

		/**Call B&W function */
		/* this.convertToBlackAndWhite('colorImage', 'bwCanvas'); */
	}

    initCursor() {
		const listWidth = this.getList().offsetWidth; 
		const carouselWidth = this.getCarousel().offsetWidth; 

		this.getCarousel().addEventListener(
			"mousemove",
			(event) => {
				this.posX = event.pageX - this.getCarousel().offsetLeft;
				let offset = -this.posX / carouselWidth * listWidth * 5;

				TweenMax.to(this.getList(), 0.3, {
					x: offset, 
					ease: Power4.easeOut,
				});
			},
			false
		);
	}

	bgImgController() {
		for (const link of this.getListItems()) {
			link.addEventListener("mouseenter", ev => {
				let currentId = ev.currentTarget.dataset.itemId;

				this.listOpacityController(currentId);

				TweenMax.to(ev.currentTarget, 0.3, {
					autoAlpha: 1
				});

				TweenMax.to(".is-visible", 0.2, {
					autoAlpha: 0,
					scale: 1.05
				});

				if (!this.getBgImgs()[currentId].classList.contains("is-visible")) {
					this.getBgImgs()[currentId].classList.add("is-visible");
				}

				TweenMax.to(this.getBgImgs()[currentId], 0.6, {
					autoAlpha: 1,
					scale: 1
                });
                

                /* rajout */
                TweenMax.to(this.getListItems(), 0.5, {
                    autoAlpha: 0.5,
                    x: 5,
                    ease: Power3.easeOut
                });

			});
		}
	}

	listOpacityController(id) {
		id = parseInt(id);
		let aboveCurrent = this.listItems - id;
		let belowCurrent = parseInt(id);

		if (aboveCurrent > 0) {
			for (let i = 1; i <= aboveCurrent; i++) {
				let opacity = 0.5 / i;
				let offset = 5 * i;
				TweenMax.to(this.getListItems()[id + i], 0.5, {
					autoAlpha: opacity,
					y: offset, // Changed to y for horizontal carousel
					ease: Power3.easeOut,
				});
			}
		}

		if (belowCurrent > 0) {
			for (let i = 0; i <= belowCurrent; i++) {
				let opacity = 0.5 / i;
				let offset = 5 * i;
				TweenMax.to(this.getListItems()[id - i], 0.5, {
					autoAlpha: opacity,
					y: offset, // Changed to y for horizontal carousel
					ease: Power3.easeOut,
				});
			}
		}
	}

	/**Changer les images en B&W */
	/* convertToBlackAndWhite(colorImageId, bwCanvasId) {
		const colorImage = document.getElementById(colorImageId);
		const bwCanvas = document.getElementById(bwCanvasId);
		const context = bwCanvas.getContext('2d');

		const image = new Image();
		image.crossOrigin = 'anonymous'; // Enable CORS for cross-origin images
		image.src = colorImage.src;

		image.onload = function () {
			context.drawImage(image, 0, 0, bwCanvas.width, bwCanvas.height);

			const imageData = context.getImageData(0, 0, bwCanvas.width, bwCanvas.height);
			const data = imageData.data;

			for (let i = 0; i < data.length; i += 4) {
				const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
				data[i] = grayscale;
				data[i + 1] = grayscale;
				data[i + 2] = grayscale;
			}

			context.putImageData(imageData, 0, 0);
		};
	} */



}

new HorizontalMouseDrivenCarousel();
