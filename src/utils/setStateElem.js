export function setStateElem(state, property) {
	const obj = {}
	
	for (let key in state) {
		obj[key] = false
	}

	return {...obj, [property]: true}
}