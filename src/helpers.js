import OrangeElements from './orange-elements';
import OrangeElement from './orange-element';

export function findOrangeChilds(block, controller) {
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
			const oElement = new OrangeElement(element, controller);
			result[orangeId].push(new OrangeElement(element, controller));
		}
	});
	for (let i in src) {
		for (let j = 0; j < src[i].length; j++) {
			let parent = src[i].g(j).$.parents('[orange-id]');
			if (parent.length) {
				parent = parent[0];
				if ($(parent).attr('orange-id')) {
					const orangeParent = result[$(parent).attr('orange-id')];
					for (let o = 0; o < orangeParent.length; o++) {
						if (orangeParent.g(o).dom == parent) {
							orangeParent.g(o).addChildren(result[i].g(j));
							break;
						}
					}
					orangeParent.addChildren(result[i].g(j));
				}
			}
		}
	}

	for (let i in src) {
		src[i].recalculateChildren();
	}

	return result;
}
