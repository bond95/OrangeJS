// window.$ = window.jQuery = require('jquery');

import OrangeElements from './orange-elements';
import OrangeElement from './orange-element';

class Orange {
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
				(this.controllers[i].bind(this, this.findOrangeChilds(block)))();
			}
		}
	}

	findOrangeChilds(block) {
		console.log('Work');
		let src = {};
		let result = new Proxy(src, {
			get(target, property) {
				if (!(property in target)) {
					return new OrangeElements();
				}
				return target[property];
			}
		});
		let blockChilds = block.find('[orange-id]').addBack();
		blockChilds.each(function(index, el) {
			let element = $(this);
			let orangeId = element.attr('orange-id');
			if (orangeId) {
				if (src[orangeId] === undefined) {
					result[orangeId] = new OrangeElements();	
				}
				result[orangeId].push(new OrangeElement(element));
			}
		});

		return result;
	}
}

window.Orange = Orange;

export default Orange;