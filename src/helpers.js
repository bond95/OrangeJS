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
		console.log(orangeId);
		if (orangeId) {
			if (src[orangeId] === undefined) {
				result[orangeId] = new OrangeElements(controller);	
			}
			const oElement = new OrangeElement(element, controller);
			let parent = element.parents('[orange-id]');
			if (parent.length) {
				parent = parent[0];
				console.log('parent', $(parent).attr('orange-id'));
				if ($(parent).attr('orange-id')) {
					const orangeParent = result[$(parent).attr('orange-id')];
					for (let i = 0; i < orangeParent.length; i++) {
						if (orangeParent.g(i).dom == parent) {
							orangeParent.g(i).addChildren(oElement);
							break;
						}
					}
					orangeParent.addChildren(oElement);
					console.log(orangeParent);
				}
			}
			result[orangeId].push(new OrangeElement(element, controller));
		}
	});

	return result;
}
