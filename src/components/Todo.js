import { useState } from "react"

export default function Todo({ todo, completeTodo, editTodoText }) {
    const [showInput, setShowInput] = useState(false)
    return (
        <li>
        <div className="left">
            <h2
            onClick={(e) => {
                setShowInput(!showInput)
            }}
            >
            {todo.text}
            </h2>
        </div>
        <label className="middle">
            Complete
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => {
                completeTodo(todo.id, e)
            }}
            />
        </label>
        </li>
    )
}