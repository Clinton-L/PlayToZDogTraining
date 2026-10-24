import { Link } from 'react-router-dom'

const questions = [
  {
    question: 'Can you help with behavioural issues?',
    paragraphs: [
      'I work with families on puppy foundations, everyday manners, confidence and building the skills that make life with your dog easier.',
      "Some behavioural concerns need a more specialised approach. If your dog is experiencing significant aggression, severe anxiety or other complex behavioural challenges, I may recommend a qualified behaviour professional who is better suited to your dog's needs.",
      'Not sure whether I can help? Get in touch and tell me a little about your dog. We can work out the best next step together.',
    ],
  },
  {
    question: 'Where do training sessions take place?',
    paragraphs: [
      "Most sessions take place in your home, where we can work on the skills and routines that matter in everyday life. Depending on your goals and your dog's needs, we may also meet in a suitable outdoor location.",
      "We'll work out the best setting together.",
    ],
  },
  {
    question: 'How long are sessions, and how many will we need?',
    paragraphs: [
      "Every new client starts with a LEARN initial consultation. We'll discuss your goals, what you'd like to work on and whether Play to Z is the right fit for you and your dog.",
      'From there, we can work out the most suitable next steps and choose a package that fits your needs.',
    ],
  },
  {
    question: 'Does the whole family need to be involved?',
    paragraphs: [
      'The more the merrier! Getting the family involved can help everyone build a shared understanding of your dog and learn how to work together.',
      "As long as everyone can participate calmly and focus on the session, they're welcome to join us. Just let me know ahead of time so we can plan accordingly.",
    ],
  },
  {
    question: 'What training methods do you use?',
    paragraphs: [
      'My approach is grounded in understanding how dogs learn, what motivates them and what makes them tick. I focus on positive reinforcement, using rewards, play and encouragement to help dogs learn new skills and build confidence.',
      "Every dog is different, so I'll tailor our approach to your dog's individual needs, natural instincts and personality. We'll focus on practical, achievable training that fits into your everyday life and helps you and your dog understand each other better.",
      "I don't use aversive training methods. My goal is to make learning a positive experience, build trust and help you develop a relationship with your dog that you both enjoy.",
    ],
  },
  {
    question: "What if my dog isn't very well behaved, or I'm struggling?",
    paragraphs: [
      "Absolutely! You don't need a perfectly behaved dog to get started. Whether you're dealing with puppy chaos, teenage rebellion or everyday challenges that feel a little overwhelming, you're welcome here.",
      "I'll meet you where you're at, without judgement, and we'll work together to find practical ways to make life with your dog a little easier. No silly questions, no expectation of perfection — just small steps forward, together.",
    ],
  },
  {
    question: 'What happens between training sessions?',
    paragraphs: [
      "The learning doesn't stop when our session ends! I'll give you practical guidance and simple things to try with your dog between appointments, helping you build on what we've worked on together.",
      "Small, consistent steps in everyday life can make a real difference. It's not about getting everything perfect — it's about learning to understand your dog, building skills together and celebrating the little wins along the way.",
    ],
  },
  {
    question: 'Do you charge travel fees?',
    paragraphs: [
      'All sessions are in-home, with travel included in the session price for locations within 10 km of my base. For locations further afield, a travel fee applies per appointment.',
    ],
    travelFees: [
      ['Within 10 km', 'No travel fee'],
      ['10–20 km', '$15 per appointment'],
      ['20–30 km', '$25 per appointment'],
      ['Beyond 30 km', 'Quoted individually before booking'],
    ],
    closing: "Not sure if you're in my service area? Get in touch and I'll be happy to work it out with you!",
  },
  {
    question: 'What if I need to cancel or reschedule?',
    paragraphs: [
      "I understand that life happens! If you need to cancel or reschedule, please give at least 24 hours' notice to avoid a cancellation fee.",
      "Changes made with less than 24 hours' notice may incur a fee of up to $40. If you miss your appointment without letting me know, your session will be forfeited. For prepaid packages, this means the session will be deducted from your remaining sessions.",
      'Illness, emergencies and other unexpected circumstances will be considered on a case-by-case basis, and I may waive a fee or allow a session to be rescheduled.',
      "If I need to cancel, we'll arrange a new appointment at no additional cost. You can find the full details in my Cancellation & Rescheduling Policy.",
    ],
    policyLink: true,
  },
]

function FAQPage() {
  return (
    <section className="inner-page content-width faq-page" aria-labelledby="faq-title">
      <div className="page-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> A FEW THINGS YOU MIGHT BE WONDERING</p>
        <h1 id="faq-title">Frequently asked <em>questions.</em></h1>
        <p className="page-lede">A little more about training with Play to Z and what to expect along the way.</p>
      </div>

      <div className="faq-list">
        {questions.map(({ question, paragraphs, travelFees, closing, policyLink }) => (
          <details className="faq-item" key={question}>
            <summary>{question}<span className="faq-toggle" aria-hidden="true">+</span></summary>
            <div className="faq-answer">
              {paragraphs.map((paragraph, index) => (
                <p key={paragraph}>
                  {policyLink && index === paragraphs.length - 1
                    ? (
                      <>
                        {paragraph.slice(0, -'Cancellation & Rescheduling Policy.'.length)}
                        <Link className="text-link" to="/cancellation-policy">Cancellation &amp; Rescheduling Policy</Link>.
                      </>
                    )
                    : paragraph}
                </p>
              ))}
              {travelFees && (
                <dl className="faq-fees">
                  {travelFees.map(([distance, fee]) => (
                    <div key={distance}>
                      <dt>{distance}</dt>
                      <dd>{fee}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {closing && <p>{closing}</p>}
            </div>
          </details>
        ))}
      </div>

      <p className="faq-contact">Still have a question? <Link className="text-link" to="/contact">Get in touch <span aria-hidden="true">↗</span></Link></p>
    </section>
  )
}

export default FAQPage
