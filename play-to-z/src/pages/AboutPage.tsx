import { Link } from 'react-router-dom'
import KelsHawkOnDuty from '../assets/KelsHawkOnDuty-about.jpg'
import KelsBanjoField from '../assets/KelsBanjoField.jpg'
import KelsKoala from '../assets/KelsKoala.jpg'
import KelsGrad from '../assets/KelsGrad.jpg'

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
      <div className="about-story about-story-feature">
        <img
          className="about-photo about-photo-feature"
          src={KelsHawkOnDuty}
          alt="Kelsey with Hawk, a scent-detection dog in training"
        />
        <div className="story-copy">
          <p className="eyebrow">HI I'M THE PERSON BEHIND PLAY TO Z.</p>
          <h2><em>Meet</em> the human behind the treats.</h2>
          <p>
            I've loved dogs for as long as I can remember. Growing up with dogs of all shapes, sizes and levels of good manners taught me early on that living with dogs is rarely as straightforward as puppy school might have us believe!
          </p>
          <p>
            My fascination with animals eventually led me to zoology, where I developed a deeper understanding of how animals behave, learn and interact with their environment.
            That passion took me into conservation, where I now work with scent detection dogs helping protect the species and places that matter.
          </p>
          <p>
            Working alongside these incredible dogs opened my eyes to just how much goes on beneath the surface of what we see.
            It deepened my curiosity about what motivates dogs, how their natural instincts shape their behaviour, and how we can use that understanding to help them thrive.
          </p>
          <p>
            But my journey into dog training is personal, too.
          </p>
          <p>
            Living with a dog who struggled with significant behavioural challenges taught me just how complicated life with a dog can become.
          </p>
          <p>
            It changed the way I think about behaviour, the importance of understanding the individual dog in front of us, and how much families need support that is practical, compassionate and free from judgement.
            That's a big part of why I created Play to Z.
          </p>
          <p>
            I want to help families build the skills and confidence to navigate life with their dogs — from those early puppy days through to the teenage chaos and all the everyday adventures in between.
          </p>
          <p>
            That means understanding not just how dogs learn, but who they are as dogs: their natural instincts, individual needs and what makes them tick. By tapping into those instincts and working with them rather than against them, we can channel natural behaviours, build practical skills and create a life together that works for everyone.
          </p>
          <p>My approach is simple:</p>
          <ul>
            <li>Training should make life better for both ends of the lead.</li>
            <li>We'll focus on practical skills that fit your family, celebrate the little wins and keep things clear, kind and achievable.</li>
            <li>No expectation of perfection, no silly questions and no judgement when things get messy.</li>
          </ul>
          <p>
            Because the goal isn't just a dog who knows what to do. It's a dog you understand, a relationship you trust, and a life together that you genuinely enjoy.
          </p>
          <p><b>That's what Play to Z is all about.</b></p>
          <p>
            <Link className="button button-primary" to="/contact">
              Come say hello <span aria-hidden="true">↗</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="about-story about-story-reversed about-story-banjo">
        <img
          className="about-photo about-photo-feature about-photo-banjo"
          src={KelsBanjoField}
          aria-hidden="true"
          alt="Kelsey with Banjo, a scent-detection dog in action"
        />
        <div className="story-copy">
          <p className="eyebrow">Training that works with your dog, not against them.</p>
          <h2><em>Believe</em> what we believe.</h2>
          <p>
            Every dog is different. The key is understanding what makes them tick, tapping into their natural instincts and building skills that work in everyday life.
          </p>
          <p>No one-size-fits-all approach.</p>
          <p>No expectation of perfection.</p>
          <p>Just practical, kind training that helps you and your dog thrive together.</p>
        </div>
      </div>
      <div className="about-story about-story-graduation">
        <img
          className="about-photo about-photo-graduation"
          src={KelsGrad}
          aria-hidden="true"
          alt="Kelsey graduating with her Master of Environment and Conservation (science communications) degree"
        />
        <div className="story-copy">
          <p className="eyebrow">A LITTLE MORE ABOUT MY BACKGROUND.</p>
          <h2><em>Know</em> a little more about my background.</h2>
          <p>
            My background is in zoology and conservation, where understanding animal behaviour and the way animals interact with their environment is a big part of what I do.
          </p>
          <p>
            <b>Qualifications</b>
            <ul>
              <li>Bachelor of Science (Zoology)</li>
              <li>Master of Environment and Conservation (science communications)</li>
              <li>Certificate IV in Animal Behaviour and Training (currently enrolled)</li>
            </ul>
            <b>Professional Experience</b>
            <ul>
              <li>3+ years working as a conservation scent detection dog handler</li>
              <li>Training operational scent detection dogs</li>
              <li>Training and supporting operational scent detection dog handlers</li>
            </ul>
            <b>Dog training education</b>
            <ul>
              <li>Austin's Education Dog Training and Behaviour Course — theory and practical components undertaken</li>
              <li>Conservation Detection Dog Handler Course</li>
              <li>Additional short courses in dog training and behaviour</li>
            </ul>
          </p>
        </div>
      </div>
      <div className="about-story about-story-reversed about-story-koala">
        <img
          className="about-photo about-photo-koala"
          src={KelsKoala}
          aria-hidden="true"
        />
        <div className="story-copy">
          <p className="eyebrow">READY TO MAKE LIFE WITH YOUR DOG A LITTLE EASIER.</p>
          <h2><em>Connect</em> and lets chat!</h2>
          <p>
            The key is understanding what makes them tick, tapping into their natural instincts and building skills that work in everyday life.
            No one-size-fits-all approach.
            No expectation of perfection.
            Just practical, kind training that helps you and your dog thrive together.
          </p>
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