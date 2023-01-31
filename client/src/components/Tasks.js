import Task from './Task'
import { Link } from 'react-router-dom'
import Button from './Button'

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
    <Link to='/champions'><Button
          color={'green'}
          text={ 'Add Champion'}
        /></Link>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Tasks
