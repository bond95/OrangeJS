import OrangeElement from './orange-element';

export default class OrangeElements {
	constructor() { 
		this.elements = [];
		this.parameters = [];
	}

	g(index) {
		return this.elements[index];
	}

	push(element) {
		if (this.elements.length == 0) {
			$.each(element.$().get(0).attributes, function(index, el) {
				if (el.name.substring(0, 2) == 'o-') {
					this.parameters.push(el.name.substring(2, (el.name.length)));
					Object.assign(this, {
			            get [el.name.substring(2, (el.name.length))]() {
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
		this.$().click(function () {
			let callback2 = callback.bind(new OrangeElement($(this)));
			callback2();
		});
	}
}