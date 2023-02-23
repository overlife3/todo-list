import React from 'react'
import { useState, useEffect } from 'react'
import List from '../List/List'
import { nanoid } from 'nanoid'
import "./TodoList.css"
import sendLocalStorage from '../../utils/sendLocalStorage'
import getLocalStorage from '../../utils/getLocalStorage'
import { ItemContext } from "../../context/itemContext"
import { setInputText } from '../../utils/setInputText'
import { setButtonText } from '../../utils/setButtonText'
import { setStateElem } from '../../utils/setStateElem'

import { useTodos } from '../../hooks/useTodos'
//ctrl + space

export default function TodoList() {
	const [inputVal, setInputVal] = useState('')
	// const [todos, setTodos] = useState([])
	const [todos, setTodos] = useTodos([], 'todos')
	const [state, setState] = useState({ // нужен для того чтобы описать состояние ЭТОГО элемента
		defaultState: true,
		changeState: false,
		searchState: false,     // добавить функцию поиска. В строке буду писать добавленую задачу ранее. во время написания, под строкой будет выпадатьсписок с предложением выбрать задачу, для того чтобы быстрее ее найти. Нужная строка будет выделяться каким-нить цветом или произойдет автоматический скролл до этой задачи.
	
	})

	//посмотреть как я это делал в нетологии
	//проблма в том что, для того чтобы дать изменение элементу, мне необходимо дважды перебирать массив. Чтобы этого избежать нужно создать общий стейт, где будет хранится вся информация о элементах, которые имеют особые свойства (например для свойства completedState может быть у многих элементов, но в состоянии changeState может находиться только один элемент. Это свойство и является особым)
	// сделать то же самое но через редакс(или похожее приложение)
	useEffect(() => {
		const raw = getLocalStorage('todos') || []
		setTodos(raw)
	}, [])
	
	const handleChange = (e) => {
		setInputVal(e.target.value)
	}

	const handleAdd = () => {
		const objTodo = {
			id: nanoid(),
			text: inputVal,
			completedState: false, 
			changeState: false
		}
		setTodos([...todos, objTodo])
	}

	const handleEnterPress = (e) => {
		if (e.key === "Enter") {
			handleAdd()
		}
	}

	const removeTodo = (id) => {
		setTodos(todos.filter(item => item.id !== id))
	}

	const togleTodo = (id) => {
		setTodos(todos.map(item => {
			if (item.id === id) {
				item.completedState = !item.completedState
			}
			return item
		}))
	}

	const changeTodo = (id) => {
		setState(setStateElem(state, 'changeState'))
		setInputVal(todos.find(item => item.id === id).text)
		setTodos(todos.map(item => {
			if (item.id === id) {
				item.changeState = !item.changeState
			}
			return item
		}))
	}

	const handleClick = () => {
		if (state.defaultState) handleAdd()
		if (state.changeState) {
			setTodos(todos.map(item => {
				if (item.changeState) {
					item.text = inputVal
					item.changeState = false
				}
				return item
			}))

			setState(setStateElem(state, 'defaultState'))
		}
		setInputVal('')
	}

	return (

		<ItemContext.Provider value={{
			removeTodo, togleTodo,  changeTodo
		}}>
			<div className='todo-list'>
				<h1 className="title">
					Todos
				</h1>
				<input 
					type="text" 
					placeholder={setInputText(state)}
					onChange={handleChange} 
					value={inputVal} 
					onKeyPress={handleEnterPress}
				/>
				<div className="add-todo" onClick={handleClick}>
					{setButtonText(state)}
				</div>
				<List todos={todos} />

			</div>
		</ItemContext.Provider>
	)
}
