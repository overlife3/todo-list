export default function sendLocalStorage(key, elem) {
	localStorage.setItem(key, JSON.stringify(elem))
}