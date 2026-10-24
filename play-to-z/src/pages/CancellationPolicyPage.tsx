import { Link } from 'react-router-dom'

function CancellationPolicyPage() {
  return (
    <article className="inner-page content-width policy-page" aria-labelledby="policy-title">
      <header className="page-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> A LITTLE CLARITY FOR THE UNEXPECTED</p>
        <h1 id="policy-title">Play to Z — Cancellation &amp; Rescheduling Policy</h1>
        <p className="page-lede">
          I understand that life doesn't always go to plan, and sometimes appointments need to change. This policy helps us respect everyone's time while allowing for a little flexibility when unexpected things happen.
        </p>
      </header>

      <div className="policy-content">
        <section aria-labelledby="client-cancellations-title">
          <h2 id="client-cancellations-title">Client cancellations and rescheduling</h2>
          <div className="policy-rule">
            <h3>More than 24 hours' notice</h3>
            <p>If you need to cancel or reschedule, please provide at least 24 hours' notice before your appointment. There is no cancellation fee, and we'll arrange a new time if you'd like to reschedule.</p>
          </div>
          <div className="policy-rule">
            <h3>Less than 24 hours' notice</h3>
            <p>Cancellations or rescheduling requests made less than 24 hours before your appointment may incur a late-cancellation fee of up to $40. I'll consider the circumstances and any reasonable costs incurred when deciding whether a fee is appropriate. Please contact me as soon as possible if something comes up.</p>
          </div>
          <div className="policy-rule">
            <h3>Missed appointments (no-shows)</h3>
            <p>If you miss your appointment without notifying me, the session will be considered forfeited. For prepaid packages, the missed session will be deducted from your remaining sessions. For standalone bookings, the full session fee may be charged. I understand that unexpected circumstances can arise, and exceptional situations will be considered on a case-by-case basis. Any fees will be applied in accordance with applicable consumer rights.</p>
          </div>
        </section>

        <section aria-labelledby="unexpected-title">
          <h2 id="unexpected-title">Illness, emergencies and unexpected circumstances</h2>
          <p>I understand that illness, family emergencies and other unexpected situations can happen. Please let me know as soon as possible if something comes up. I'll consider these situations individually and may waive an applicable fee or allow the session to be rescheduled. If your dog is unwell, please let me know before the appointment so we can decide whether it's appropriate to proceed.</p>
        </section>

        <section aria-labelledby="provider-cancellation-title">
          <h2 id="provider-cancellation-title">If Play to Z needs to cancel</h2>
          <p>Occasionally, I may need to reschedule due to illness, unforeseen circumstances or unsafe weather conditions. If I need to cancel your appointment, we'll arrange a new time at no additional cost. Your session won't be forfeited. If we're unable to arrange a suitable alternative, any refund will be handled in accordance with applicable consumer rights.</p>
        </section>

        <section aria-labelledby="contact-policy-title">
          <h2 id="contact-policy-title">Getting in touch</h2>
          <p>If you need to change your appointment, please contact me as soon as possible so we can work out the best next step. Thank you for understanding and for helping Play to Z make the most of our time together!</p>
          <Link className="text-link" to="/contact">Get in touch <span aria-hidden="true">↗</span></Link>
        </section>
      </div>
    </article>
  )
}

export default CancellationPolicyPage
