import { findOrangeChilds } from './helpers';

export default class OrangeElement {
	constructor(element, controller) {
		this.$ = element;
		this.controller = controller;
		const that = this;
		$.each(this.$.get(0).attributes, function(index, el) {
			if (el.name.substring(0, 2) == 'o-') {
				Object.defineProperty(this, el.name.substring(2, (el.name.length)), {
			        set: function (value) {
						that.$.attr(el.name, value);
			        },
			        get: function () {
			        	return el.value;
			        }
			    });
			}
		}.bind(this));
		if (this.$.prop('tagName') === 'INPUT') {
			Object.defineProperty(this, 'value', {
		        set: function (value) {
					that.$.val(value);
		        },
		        get: function () {
		        	return that.$.val();
		        }
		    });
			// this.value = this.$.val();
			// this.$.change(function() {
			// 	that.value = that.$.val();
			// });
		}
	}

	// $() {
	// 	return this.$;
	// }

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