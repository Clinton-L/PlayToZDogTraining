import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <section className="hero content-width" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> PLAYTOZ DOG TRAINING</p>
          <h1 id="home-title">Dog training for <em>real life.</em></h1>
          <p className="hero-intro">
            Thoughtful, practical training for the everyday moments you share
            with your dog. Start where you are and build from there, together.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/contact">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" to="/about">Meet PlayToZ</Link>
          </div>
          <p className="hero-footnote">Good progress is made one small win at a time.</p>
        </div>
        <div className="hero-visual">
          <div
            className="hero-photo"
            role="img"
            aria-label="Golden retriever enjoying time outdoors"
          />
          <div className="photo-caption">
            <span>GOOD DOGS, GROWING TOGETHER</span>
            <span aria-hidden="true">✳</span>
          </div>
          <div className="hero-stamp">Progress<br />over perfect</div>
        </div>
      </section>

      <section className="intro-section content-width" aria-labelledby="intro-title">
        <div className="intro-heading">
          <p className="eyebrow">A GOOD PLACE TO BEGIN</p>
          <h2 id="intro-title">More connection.<br /><em>Less guesswork.</em></h2>
        </div>
        <p className="intro-copy">
          Training can fit the life you already have. We focus on clear
          communication, useful skills, and steady progress that feels good
          for both ends of the leash.
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