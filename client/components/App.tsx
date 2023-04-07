import { Route, Routes } from "react-router-dom"
import Books from './Books'

function App() {
  return (
    <>
      <header className="header">
        <h1>My Book Collection 📚</h1>
      </header>
      <Routes>
        <Route path='/' element={<Books />} />
      </Routes>
    </>
  )
}

export default App
