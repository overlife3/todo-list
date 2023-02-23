export function setInputText(state) {
	if (state.defaultState) return 'Add todo'
	if (state.changeState) return 'Change todo'
	return '...'
} 