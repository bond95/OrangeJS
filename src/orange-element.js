export default class OrangeElement {
	constructor(element) {
		this.jElement = element;
		$.each(this.jElement.get(0).attributes, function(index, el) {
			if (el.name.substring(0, 2) == 'o-') {
				Object.assign(this, {
		            get [el.name.substring(2, (el.name.length))]() {
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
		var jElement = new OrangeElement($(element));
		this.jElement.append(jElement.$());
		return jElement;
	}
}