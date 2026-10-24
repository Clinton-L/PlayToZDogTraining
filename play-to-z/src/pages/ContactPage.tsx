function ContactPage() {
  return (
    <section className="inner-page content-width contact-page" aria-labelledby="contact-title">
      <div className="page-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> CONTACT</p>
        <h1 id="contact-title">Good things start<br />with <em>a hello.</em></h1>
        <p className="page-lede">
          Have a question or want to talk about life with your dog? Reach out
          and let’s take the first step.
        </p>
      </div>
      <div className="contact-layout">
        <div className="contact-note">
          <span className="contact-symbol" aria-hidden="true">✳</span>
          <h2>Tell me a little about your dog.</h2>
          <p>
            Thinking about training?
            Tell me a little about you and your dog and I'll get back to you soon.
          </p>
        </div>
        <div className="contact-details">
          <div className="contact-row">
            <span className="contact-label">PHONE</span>
            <a href="tel:+61401363375">0401 363 375</a>
          </div>
          <div className="contact-row">
            <span className="contact-label">EMAIL</span>
            <a href="mailto:kelsey@playtozdogtraining.com.au">kelsey@playtozdogtraining.com.au</a>
          </div>
          <div className="contact-row">
            <span className="contact-label">FOLLOW ALONG</span>
            <div className="social-links">
              <a href="https://www.instagram.com/play.to.z.dogtraining/" target="_blank" rel="noreferrer">
                Instagram <span>@play.to.z.dogtraining</span> <span aria-hidden="true">↗</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61594495531864" target="_blank" rel="noreferrer">
                Facebook <span>@playtozdogtraining</span> <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage