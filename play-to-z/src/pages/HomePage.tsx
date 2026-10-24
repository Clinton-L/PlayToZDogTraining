import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <section className="banner-intro content-width" aria-label="Welcome">
        <strong>Good days start together.</strong>
        <p>Supportive training for the small moments that make up life with your dog.</p>
      </section>

      <section className="intro-section content-width" aria-labelledby="intro-title">
        <div className="intro-heading">
          <p className="eyebrow">A GOOD PLACE TO BEGIN</p>
          <h2 id="intro-title">More connection.<br /><em>Less guesswork.</em></h2>
        </div>
        <p className="intro-copy">
          Training can fit the life you already have. We don't chase perfection. We focus on...
        </p>
        <div className="principles">
          <article className="principle">
            <span className="principle-number">01</span>
            <h3>Start with understanding</h3>
            <p>Notice what your dog is telling you and meet the moment with curiosity.</p>
          </article>
          <article className="principle">
            <span className="principle-number">02</span>
            <h3>Practice what matters</h3>
            <p>Build everyday skills around your routines, not an imaginary perfect day.</p>
          </article>
          <article className="principle">
            <span className="principle-number">03</span>
            <h3>Celebrate the small wins</h3>
            <p>Real change grows from patient practice and progress you can repeat.</p>
          </article>
        </div>
      </section>

      <section className="closing-band">
        <div className="content-width closing-content">
          <p className="eyebrow">READY WHEN YOU ARE</p>
          <h2>A better everyday<br /><em>starts together.</em></h2>
          <Link className="button button-light" to="/contact">
            Get in touch <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage