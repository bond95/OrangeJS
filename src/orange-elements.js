import OrangeElement from './orange-element';
import { findOrangeChilds } from './helpers';

export default class OrangeElements {
	constructor(controller) { 
		this.elements = [];
		this.parameters = [];
		this.controller = controller;
	}

	g(index) {
		return this.elements[index];
	}

	push(element) {
		if (this.elements.length == 0) {
			$.each(element.$().get(0).attributes, function(index, el) {
				if (el.name.substring(0, 2) == 'o-') {
					this.parameters.push(el.name.substring(2, (el.name.length)));
					Object.defineProperty(this, el.name.substring(2, (el.name.length)), {
				        set: function (value) {
							element.$().attr(el.name, value);
				        },
				        get: function () {
				        	return el.value;
				        }
				    });
				}
			}.bind(this));
		} else {
			if (this.parameters.length > 0) {
				for (let i in this.parameters) {
					this[this.parameters[i]] = undefined;
				}
			}
		}
		this.elements.push(element);
	}

	get length() {
		return this.elements.length;
	}

	$() {
		const arr = [];
		for (let i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].$().get(0));
		}
		return $(arr);
	}

	click(callback) {
		this.$().off('click');
		this.$().click(function () {
			let callback2 = callback.bind(new OrangeElement($(this), this.controller));
			// console.log(new OrangeElement($(this)));
			callback2();
		});
	}

	on(action, callback) {
		this.$().off(action);
		this.$().on(action, function () {
			let callback2 = callback.bind(new OrangeElement($(this), this.controller));
			// console.log(new OrangeElement($(this)));
			callback2();
		});		
	}

	append(element) {
		const arr = [];
		for (let i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].$().get(0));
		}
		$(arr).append(element);
		if (this.controller && this.controller.update) {
			this.controller.o = findOrangeChilds(this.controller.block, this.controller);
			this.controller.update();
		}

	}
}