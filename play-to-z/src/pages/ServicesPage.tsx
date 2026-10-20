import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Puppy basics',
    imageUrl:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=720&q=80',
    imageAlt: 'Golden retriever outdoors',
    description:
      'Build a kind, confident foundation with early learning, everyday routines, and the skills that help a puppy settle into family life.',
  },
  {
    title: 'Basic obedience',
    imageUrl:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=720&q=80',
    imageAlt: 'Dog looking attentively toward the camera',
    description:
      'Practice useful cues and everyday manners, with training shaped around the situations you and your dog encounter most.',
  },
  {
    title: 'Settling at home or somewhere new',
    imageUrl:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=720&q=80',
    imageAlt: 'Relaxed dog resting at home',
    description:
      'Help your dog feel more comfortable in a new home or environment through supportive routines and gradual, practical steps.',
  },
  {
    title: 'Skills training',
    imageUrl:
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=720&q=80',
    imageAlt: 'Dog running through a grassy field',
    description:
      'Work on specific skills that matter to your life together, with practice tailored to your dog and your goals.',
  },
  {
    title: 'Event assistance',
    imageUrl:
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=720&q=80',
    imageAlt: 'Dogs spending time together outdoors',
    description:
      'Get support travelling to and from a special event, with practice for the specific actions you need included in skills training.',
  },
]

function ServicesPage() {
  return (
    <section className="inner-page content-width services-page" aria-labelledby="services-title">
      <div className="page-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> TRAINING FOR REAL LIFE</p>
        <h1 id="services-title">Practical support for <em>everyday life.</em></h1>
        <p className="page-lede">
          Start with what matters to you and your dog. We can build useful skills
          at a pace that feels manageable for both of you.
        </p>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <article className="service-item" key={service.title}>
            <img className="service-image" src={service.imageUrl} alt={service.imageAlt} loading="lazy" />
            <div className="service-copy">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="services-bottom">
        <Link className="button button-primary" to="/contact">
          Talk about your goals <span aria-hidden="true">↗</span>
        </Link>
        <p className="service-travel-note">
          Please note: a travel fee applies for travel beyond 15 km.
        </p>
      </div>
    </section>
  )
}

export default ServicesPage