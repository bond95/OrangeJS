import { findOrangeChilds, findChildren } from './helpers';
import OrangeElements from './orange-elements';

export default class OrangeElement {
	constructor(element, controller) {
		this.$ = element;
		this.dom = element.get(0);
		this.controller = controller;
		this.nonProxyChildren = {};
		this.children = new Proxy(this.nonProxyChildren, {
			get(target, property) {
				if (!(property in target)) {
					console.error('Can\'t find child with id ', property);
					return null;
				}
				return target[property];
			}
		});
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
		}
	}

	append(element) {
		var jElement = null;
		if (element instanceof OrangeElement) {
			jElement = element;
			jElement.controller = this.controller;
		} else {
			jElement = new OrangeElement($(element).clone(), this.controller);
		}
		this.$.append(jElement.$);
		this.controller.o = findOrangeChilds(this.controller.block, this.controller);
		if (this.controller && this.controller.update) {
			this.controller.update();
		}
		return jElement;
	}

	addChildren(element) {
		const orangeId = element.$.attr('orange-id');
		if (this.nonProxyChildren[orangeId] === undefined) {
			this.children[orangeId] = new OrangeElements(this.controller);	
		}
		this.children[orangeId].push(element);
	}

	clone() {
		const element = new OrangeElement(this.$.clone(), null);
		element.children = findChildren(element.$, null); 
		return element;
	}

	insertBefore(element) {
		var jElement = null;
		jElement = element;
		this.controller = jElement.controller;
		this.$.insertBefore(jElement.$);
		this.controller.o = findOrangeChilds(this.controller.block, this.controller);
		if (this.controller && this.controller.update) {
			this.controller.update();
		}
		return this;
	}
}