import { journeyMilestones } from '@/lib/landing'
import './Journey.css'

const milestones = journeyMilestones

export function Journey() {
  return (
    <section className="journey" id="our-story" aria-label="From the Philippines to the world">
      <div className="journey-inner">
        <div className="journey-head">
          <p className="journey-eyebrow">Our story</p>
          <h2 className="journey-title">A Student-Built Idea That Went Beyond the Classroom.</h2>
          <p className="journey-sub">
            What started as a project to make nuclear science easier to
            understand grew into an opportunity to represent the Philippines on
            the international stage.
          </p>
        </div>

        <ol className="journey-timeline">
          {milestones.map((milestone) => (
            <li key={milestone.step} className={`journey-stop journey-stop--${milestone.accent}`}>
              <div className="journey-card">
                <span className="journey-step" aria-hidden="true">
                  {milestone.step}
                </span>
                <h3 className="journey-event">{milestone.event}</h3>
                <p className="journey-result">{milestone.result}</p>
                <p className="journey-text">{milestone.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
