
const state = { // нужен для того чтобы описать состояние ЭТОГО элемента
	defaultState: true,
	changeState: true,
	searchState: true,     // добавить функцию поиска. В строке буду писать добавленую задачу ранее. во время написания, под строкой будет выпадатьсписок с предложением выбрать задачу, для того чтобы быстрее ее найти. Нужная строка будет выделяться каким-нить цветом или произойдет автоматический скролл до этой задачи.
	
}

let obj

for (let key in state) {
	obj = {...state, [key]: false}
}

console.log(obj)