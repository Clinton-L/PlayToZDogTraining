import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <section className="inner-page content-width" aria-labelledby="about-title">
      <div className="page-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> ABOUT PLAYTOZ</p>
        <h1 id="about-title">A little more about <em>the person behind the leash.</em></h1>
        <p className="page-lede">
          PlayToZ is built around a simple belief: understanding each other
          changes the way everyday life feels.
        </p>
      </div>
      <div className="about-story">
        <div
          className="about-photo"
          role="img"
          aria-label="A person spending a quiet moment with a dog"
        />
        <div className="story-copy">
          <p className="eyebrow">A THOUGHTFUL WAY FORWARD</p>
          <h2>Training should make room for <em>both of you.</em></h2>
          <p>
            Dogs are individuals, and so are the people who love them. There is
            no one-size-fits-all version of a good day together. The best place
            to start is with the life you have, the moments that feel hard, and
            the changes you would most like to see.
          </p>
          <p>
            PlayToZ keeps the focus on clear communication, kind guidance, and
            practical steps you can carry into real life. No need to have it
            all figured out before you begin.
          </p>
          <Link className="button button-primary" to="/contact">
            Come say hello <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className="about-values" aria-label="PlayToZ values">
        <span>Curiosity first</span>
        <span>Progress at your pace</span>
        <span>More good days together</span>
      </div>
    </section>
  )
}

export default AboutPage