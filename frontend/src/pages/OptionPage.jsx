import { Link } from 'react-router-dom'

function OptionPage({ panel }) {
  return (
    <main className="option-page">
      <Link className="back-link" to="/">
        Back
      </Link>
      <h1>{panel.title}</h1>
      <p>Add this page’s content here.</p>
    </main>
  )
}

export default OptionPage
