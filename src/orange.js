// window.$ = window.jQuery = require('jquery');

import OrangeElements from './orange-elements';
import OrangeElement from './orange-element';
import { findOrangeChilds } from './helpers';

export default class Orange {
	constructor({ preloader, controllers, plugins }) {
		if (preloader) {
			preloader();
		}
		this.controllers = {};
		for (let i in controllers) {
			let block = null;
			if (i[0] === '.') {
				block = $(i);
			} else {
				block = $('#' + i);
			}
			if (block.length) {
				// console.log(i);
				if (this.controllers[i] === undefined) {
					this.controllers[i] = [];
				} else {
					console.info('Controller ' + i + ' already exists');
				}
				const that = this;
				block.each(function (index) {
					let controller = new (controllers[i])(that);
					controller.block = $(this);
					controller.o = findOrangeChilds($(this), controller);
					that.controllers[i].push(controller);
				});
			}
		}
		// this.preloader = null;
		this.plugins = {};

		if (plugins) {
			for (var i in plugins) {
				if (this.plugins[i] === undefined) {
					if (typeof this.plugins[i] === 'object') {
						this.plugins[i] = new (plugins[i].plugin)(plugins[i].parameters);
					} else {
						this.plugins[i] = new (plugins[i])();
					}
					this.plugins[i].connectControllers(this.controllers);
				} else {
					console.info('Plugin ' + i + ' already exists');
				}
			}			
		}
		for (let i in this.controllers) {
			for (let j in this.controllers[i]) {
				this.controllers[i][j].mount();
				if (this.controllers[i][j].update) {
					this.controllers[i][j].update();
				}
			}
		}
	}

	setControllers(controllers) {
		for (var i in controllers) {
			if (this.controllers[i] === undefined) {
				this.controllers[i] = controllers[i];
			} else {
				console.info('Controller ' + i + ' already exists');
			}
		}
	}

	setPreloader(preloader) {
		this.preloader = preloader;
	}

	connectPlugin(plugin) {
		const pl = new plugin(this);
		this.plugins[pl.constructor.name] = pl;
	}

	dynamicConnect(element, controller) {
		controller(findOrangeChilds(element.$));
	}

	// run() {
	// 	if (this.preloader !== null) {
	// 		this.preloader();
	// 	}
	// 	for (let i in this.controllers) {
	// 		if ($('#' + i).length) {
	// 			console.log(i);
	// 			let block = $('#' + i);
	// 			this.controllers[i].block = block;
	// 			this.controllers[i].o = findOrangeChilds(block, this.controllers[i]);
	// 			this.controllers[i].app = this;
	// 			this.controllers[i].mount();
	// 			if (this.controllers[i].update) {
	// 				this.controllers[i].update();
	// 			}
	// 		}
	// 	}
	// }

}

window.Orange = Orange;

// export default Orange;
