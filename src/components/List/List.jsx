import React from 'react'
import Item from '../Item/Item'
import "./List.css"
export default function List(props) {
	return (
		<ul className='list'>
			{props.todos.map((item, index) => <Item item={item} index={index} key={item.id}/>)}
		</ul>
	)
}
