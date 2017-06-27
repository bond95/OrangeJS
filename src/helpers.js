import OrangeElements from './orange-elements';
import OrangeElement from './orange-element';

export function findOrangeChilds(block, controller) {
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
				result[orangeId] = new OrangeElements(controller);	
			}
			result[orangeId].push(new OrangeElement(element, controller));
		}
	});

	return result;
}
