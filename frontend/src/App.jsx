import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import OptionPage from './pages/OptionPage.jsx'
import { panels } from './data/panels.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {panels.map((panel) => (
        <Route
          key={panel.id}
          path={panel.path}
          element={<OptionPage panel={panel} />}
        />
      ))}
    </Routes>
  )
}

export default App
