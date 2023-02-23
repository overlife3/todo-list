export function setButtonText(state) {
	if (state.defaultState) return 'Add'
	if (state.changeState) return 'Change'
	return '...'
}