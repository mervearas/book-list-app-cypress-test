import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BookEdit from './components/BookEdit'
import BookList from './components/BookList'

function App() {
  return (
    <Router>
      <Route path='/create' component={BookEdit} />
      <Route path='/update/:id' component={BookEdit} />
      <Route path='/' component={BookList} exact />
    </Router>
  )
}

export default App
