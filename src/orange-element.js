import { findOrangeChilds } from './helpers';

export default class OrangeElement {
	constructor(element, controller) {
		this.jElement = element;
		this.controller = controller;
		const that = this;
		$.each(this.jElement.get(0).attributes, function(index, el) {
			if (el.name.substring(0, 2) == 'o-') {
				Object.defineProperty(this, el.name.substring(2, (el.name.length)), {
			        set: function (value) {
						that.jElement.attr(el.name, value);
			        },
			        get: function () {
			        	return el.value;
			        }
			    });
			}
		}.bind(this));
	}

	$() {
		return this.jElement;
	}

	append(element) {
		this.jElement.append($(element));
		if (this.controller && this.controller.update) {
			this.controller.o = findOrangeChilds(this.controller.block, this.controller);
			this.controller.update();
		}
		// var jElement = new OrangeElement($(element));
		// return jElement;
	}
}