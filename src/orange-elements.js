import OrangeElement from './orange-element';
import { findOrangeChilds } from './helpers';

export default class OrangeElements {
	constructor(controller) { 
		this.elements = [];
		this.parameters = [];
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
		Object.defineProperty(this, '$', {
	        get: function () {
	        	const arr = [];
				for (let i = 0; i < this.elements.length; i++) {
					arr.push(this.elements[i].$.get(0));
				}
				return $(arr);
	        }
	    });
	}

	g(index) {
		return this.elements[index];
	}

	push(element) {
		for (let i in this.elements) {
			if (element.dom == this.elements[i].dom) {
				return;
			}
		}
		if (this.elements.length == 0) {
			$.each(element.$.get(0).attributes, function(index, el) {
				if (el.name.substring(0, 2) == 'o-') {
					this.parameters.push(el.name.substring(2, (el.name.length)));
					Object.defineProperty(this, el.name.substring(2, (el.name.length)), {
				        set: function (value) {
				        	if (value) {
				        		element[el.name] = value;
								element.$.attr(el.name, value);
							}
				        },
				        get: function () {
				        	return el.value;
				        }
				    });
				}
			}.bind(this));
			if (element.$.prop('tagName') === 'INPUT') {
				this.parameters.push('value');
				Object.defineProperty(this, 'value', {
			        set: function (value) {
			        	if (value) {
							element.$.val(value);
						}
			        },
			        get: function () {
			        	return element.$.val();
			        }
			    });
			}
			this.parameters.push('dom');
			this.dom = element.dom;

		} else {
			if (this.parameters.length > 0) {
				for (let i in this.parameters) {
					this[this.parameters[i]] = undefined;
				}
			}
		}
		for (let i in element.children) {
			if (this.nonProxyChildren[i] === undefined) {
				this.children[i] = new OrangeElements(this.controller);	
			}
			for (let j = 0; j < element.children[i].length; j++) {
				this.children[i].push(element.children[i].g(j));
			}
		}
		this.elements.push(element);
	}

	get length() {
		return this.elements.length;
	}

	click(callback) {
		this.$.off('click');
		this.$.click(function (e) {
			let callback2 = callback.bind(new OrangeElement($(this), this.controller));
			callback2(e);
		});
	}

	on(action, callback) {
		this.$.off(action);
		this.$.on(action, function () {
			let callback2 = callback.bind(new OrangeElement($(this), this.controller));
			callback2();
		});		
	}

	append(element) {
		const arr = [];
		for (let i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].$.get(0));
		}
		$(arr).append(element);
		if (this.controller && this.controller.update) {
			this.controller.o = findOrangeChilds(this.controller.block, this.controller);
			this.controller.update();
		}
	}

	insertBefore(element) {
		const arr = [];
		for (let i = 0; i < this.elements.length; i++) {
			arr.push(this.elements[i].$.get(0));
		}
		$(arr).insertBefore(element.$);
		this.controller = element.controller;
		if (this.controller && this.controller.update) {
			this.controller.o = findOrangeChilds(this.controller.block, this.controller);
			this.controller.update();
		}
	}

	addChildren(element) {
		const orangeId = element.$.attr('orange-id');
		if (this.nonProxyChildren[orangeId] === undefined) {
			this.children[orangeId] = new OrangeElements(this.controller);	
		}
		this.children[orangeId].push(element);
	}

	clone() {
		const res = new OrangeElements(null);
		for (let i = 0; i < this.elements.length; i++) {
			res.push(this.elements[i].clone());
		}
		return res;
	}

	recalculateChildren() {
		for (let j in this.elements) {
			let element = this.elements[j];
			for (let i in element.children) {
				if (this.nonProxyChildren[i] === undefined) {
					this.children[i] = new OrangeElements(this.controller);	
				}
				for (let j = 0; j < element.children[i].length; j++) {
					this.children[i].push(element.children[i].g(j));
				}
				this.children[i].recalculateChildren();
			}

		}
	}
}