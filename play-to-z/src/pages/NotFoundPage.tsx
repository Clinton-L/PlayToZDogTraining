import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="inner-page content-width not-found">
      <p className="eyebrow">A LITTLE DETOUR</p>
      <h1>That page wandered <em>off-leash.</em></h1>
      <Link className="button button-primary" to="/">Back to home</Link>
    </section>
  )
}

export default NotFoundPage