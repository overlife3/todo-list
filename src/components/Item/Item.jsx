import React, { useContext, useState } from 'react'
import "./Item.css"
import sendLocalStorage from '../../utils/sendLocalStorage'
import { ItemContext } from '../../context/itemContext'

export default function Item({item, index}) {
	const {removeTodo, togleTodo, changeTodo} = useContext(ItemContext)
	// const [state, setState] = useState({
	// 	completedState: false,
	// 	changeState: false,
	// 	searhcState: false
	// })

	const handleTogle = () => {
		togleTodo(item.id)
		// setState({...state, completedState: true})
	}

	const handleRemove = () => {
		removeTodo(item.id)
	}

	const handleChange = () => {
		changeTodo(item.id)
		// setState({...state, changeState: true})
	}
	return (
		<li className='item'>
			<div className={`index${item.completedState ? ' completed' : ''}`} onClick={handleTogle}>{index}</div>
			<div className={`todo${item.changeState ? ' change' : ''}`}>{item.text}</div>
			<div className="controller">
				<button className="change" onClick={handleChange}>Change</button>
				<button className="remove" onClick={handleRemove} >Remove</button>
			</div>
		</li>
	)
}
