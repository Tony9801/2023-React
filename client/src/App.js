import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Champions  from './components/LeagueComponents/Champions'


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [champions, setChampions] = useState([])
  //const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  useEffect(() => {
    const getChampions = async () => {
      const championsFromServer = await fetchChampions()
      setChampions(championsFromServer)
    }

    getChampions()
  }, [])


  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/record/')

    if (!res.ok) {
      const message = `An error occurred: ${res.statusText}`;
      window.alert(message);
      return;
    }
    const data = await res.json()
    
    return data
  }

  // Fetch Task
  const fetchTask = async (_id) => {
    
    const res = await fetch(`http://localhost:5000/record/${_id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    await fetch('http://localhost:5000/record/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    //const data = await res.json()
    
    setTasks([...tasks, task])
    

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (_id) => {
    const res = await fetch(`http://localhost:5000/${_id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task._id !== _id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (_id) => {
    const taskToToggle = await fetchTask(_id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    await fetch(`http://localhost:5000/update/${_id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    //const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task._id === _id ? { ...task, reminder: updTask.reminder } : task
      )
    )
  }


  // Fetch Champions
  const fetchChampions = async () => {
    const res = await fetch('http://localhost:5000/champions/')

    if (!res.ok) {
      const message = `An error occurred: ${res.statusText}`;
      window.alert(message);
      return;
    }
    const data = await res.json()
    
    return data
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              // <>
              //   {showAddTask && <AddTask onAdd={addTask} />}
              //   {tasks.length > 0 ? (
              //     <Tasks
              //       tasks={tasks}
              //       onDelete={deleteTask}
              //       onToggle={toggleReminder}
              //     />
              //   ) : (
              //     'No Tasks To Show'
              //   )}
              // </>
              <>
              <Champions champions={champions}/>
              </>
            }
          />
          <Route path='/about' element={<About />} />
          <Route path='/champions' element={<Champions/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
