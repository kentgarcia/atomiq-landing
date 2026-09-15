import type { CSSProperties } from 'react'
import './Team.css'
import { useReveal } from '@/hooks/useReveal'
import { teamMembers } from '@/lib/landing'

export function Team() {
  const sectionRef = useReveal<HTMLElement>(0.15)

  return (
    <section ref={sectionRef} className="team reveal" id="team" aria-label="Meet the team">
      <div className="team-inner">
        <div className="team-head reveal-child">
          <p className="team-eyebrow">Meet the team</p>
          <h2 className="team-title">
            Behind AtomIQ Are People Who Believe Science Should Be for Everyone.
          </h2>
          <p className="team-sub">
            Three developers, one mission — make nuclear science clear, playful, and accessible.
          </p>
        </div>

        <ul className="team-grid">
          {teamMembers.map((member, index) => (
            <li
              key={member.name}
              className={`reveal-child${member.leader ? ' team-card team-card--leader' : ' team-card'}`}
              style={{ '--i': index } as CSSProperties}
            >
              <div className="team-photo">
                <img src={member.img} alt={`${member.name} — ${member.role}`} loading="lazy" />
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
