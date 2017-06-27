// window.$ = window.jQuery = require('jquery');

import OrangeElements from './orange-elements';
import OrangeElement from './orange-element';
import { findOrangeChilds } from './helpers';

export default class Orange {
	constructor() {
		this.controllers = {};
		this.preloader = null;
		this.plugins = [];
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
		this.plugins.push(new plugin(this));
	}

	dynamicConnect(element, controller) {
		controller(this.findOrangeChilds(element.$()));
	}

	run() {
		if (this.preloader !== null) {
			this.preloader();
		}
		for (let i in this.controllers) {
			if ($('#' + i).length) {
				console.log(i);
				let block = $('#' + i);
				this.controllers[i].block = block;
				this.controllers[i].o = findOrangeChilds(block, this.controllers[i]);
				this.app = this;
				this.controllers[i].mount();
				if (this.controllers[i].update) {
					this.controllers[i].update();
				}
			}
		}
	}

}

window.Orange = Orange;

// export default Orange;
