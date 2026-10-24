import { Link } from 'react-router-dom'
import { services, type Service } from './services'

function RichText({ content }: { content: string }) {
  return <span dangerouslySetInnerHTML={{ __html: content }} />
}

function ServiceDetails({ service }: { service: Service }) {
  const { what, how } = service.details
  const closingNote = service.closingNote
  const structuredHowItems = how?.list?.filter((item) => typeof item !== 'string') ?? []
  const textHowItems = how?.list?.filter((item): item is string => typeof item === 'string') ?? []

  return (
    <>
      {what && (what.title || what.subtitle || what.content || what.list?.length) && (
        <section className="service-detail-section">
          {what.title && <h4>{what.title}</h4>}
          {what.subtitle && <p><RichText content={what.subtitle} /></p>}
          {what.content && <p><RichText content={what.content} /></p>}
          {what.list && (
            <ul>
              {what.list.map((item) => <li key={item}><RichText content={item} /></li>)}
            </ul>
          )}
        </section>
      )}

      {how && (how.title || how.list?.length) && (
        <section className="service-detail-section">
          {how.title && <h4>{how.title}</h4>}
          {structuredHowItems.length > 0 && (
            <dl className="service-fee-list">
              {structuredHowItems.map((item) => (
                <div key={item.item}>
                  <dt>{item.item}</dt>
                  <dd><RichText content={item.description} /></dd>
                </div>
              ))}
            </dl>
          )}
          {textHowItems.length > 0 && (
            <ul>
              {textHowItems.map((item) => <li key={item}><RichText content={item} /></li>)}
            </ul>
          )}
        </section>
      )}

      {closingNote && (closingNote.title || closingNote.description || closingNote.content) && (
        <section className="service-closing-note">
          {closingNote.title && <h4>{closingNote.title}</h4>}
          {(closingNote.description || closingNote.content) && (
            <p><RichText content={closingNote.description || closingNote.content || ''} /></p>
          )}
        </section>
      )}
    </>
  )
}

function ServiceCard({ service, logistics = false }: { service: Service; logistics?: boolean }) {
  const { description = [] } = service.details
  const hasMoreDetails = Boolean(
    service.details.what?.title ||
    service.details.what?.subtitle ||
    service.details.what?.content ||
    service.details.what?.list?.length ||
    service.details.how?.title ||
    service.details.how?.list?.length ||
    service.closingNote?.title ||
    service.closingNote?.description ||
    service.closingNote?.content,
  )

  return (
    <article className={`service-card${logistics ? ' service-card-logistics' : ''}`}>
      <div className="service-card-heading">
        <img
          className="service-image"
          src={service.imageUrl}
          alt={service.imageAlt}
          loading="lazy"
          style={{ objectPosition: service.imagePosition ?? 'center' }}
        />
        <div>
          <h3>
            <span className="service-keyword">{service.title.split(' ')[0]}</span>
            {service.title.slice(service.title.indexOf(' '))}
          </h3>
          <p className="service-subtitle">{service.subtitle}</p>
          <p className="service-price"><RichText content={logistics ? 'Travel fees vary by distance' : service.cost} /></p>
        </div>
      </div>

      <div className="service-copy">
        {description.map((paragraph, index) => (
          <p key={`${service.title}-description-${index}`}><RichText content={paragraph} /></p>
        ))}

        {logistics ? (
          <div className="service-expanded-content">
            <ServiceDetails service={service} />
          </div>
        ) : hasMoreDetails && (
          <details className="service-details">
            <summary>Explore what's included</summary>
            <div className="service-expanded-content">
              <ServiceDetails service={service} />
            </div>
          </details>
        )}

        <Link className="text-link" to="/contact" aria-label={`Ask about ${service.title}`}>
          Ask about this service <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  )
}

function ServicesPage() {
  const visibleServices = services.filter((service) => service.display)
  const programServices = visibleServices.filter((service) => service.category !== 'logistics')
  const logisticsService = visibleServices.find((service) => service.category === 'logistics')

  return (
    <section className="inner-page content-width services-page" aria-labelledby="services-title">
      <div className="page-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> WE'RE NOT CHASING PERFECT DOGS</p>
        <h1 id="services-title">We're helping you raise a dog <em>you love living with.</em></h1>
        <p className="page-lede">
          We’ll work at your pace, build skills that fit your everyday life and celebrate the little wins along the way.
          I’ll help you understand what makes your dog tick and give you the tools to keep building on what we learn together.
          Because training doesn’t stop when our session ends — it’s about the relationship you build, the things you practise together and finding more joy in everyday life.
          <br />
          All training is private, in-home and tailored to you, your dog and your family. 🐾
        </p>
        <br />
        <p>
          <small>
            A little note on pricing

            Play to Z is just getting started, so all services are currently offered at introductory rates.
            These rates are available for a limited time while I grow the business and continue building my experience working with local families and their dogs.
          </small>
        </p>
      </div>

      <section className="service-section" aria-labelledby="programs-title">
        <h2 id="programs-title">Find the right support</h2>
        <div className="services-list">
          {programServices.map((service) => <ServiceCard key={service.title} service={service} />)}
        </div>
      </section>

      {logisticsService && (
        <section className="service-section logistics-section" aria-labelledby="travel-title">
          <h2 id="travel-title">In-home sessions &amp; travel</h2>
          <div className="services-list">
            <ServiceCard service={logisticsService} logistics />
          </div>
        </section>
      )}

      <div className="services-bottom">
        <Link className="button button-primary" to="/contact">
          Talk about your goals <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  )
}

export default ServicesPage
