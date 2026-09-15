import './SectionTransition.css'

interface Props {
  from: string
  to: string
  variant?: 'ribbon' | 'wave' | 'diagonal' | 'seam' | 'gradient' | 'blend' | 'blend-out'
  tint?: string
}

export function SectionTransition({ from, to, variant = 'ribbon', tint = '#fff4e5' }: Props) {
  if (variant === 'blend-out') {
    return (
      <div className="st-blend-out" aria-hidden="true">
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
          <defs>
            <radialGradient id="st-blend-out-glow" cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor="#eef7ff" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#eef7ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M0,110 L0,55 C240,25 480,20 720,45 C960,70 1200,75 1440,50 L1440,110 Z"
            fill="#ffffff"
          />
          <path
            d="M0,110 L0,55 C240,25 480,20 720,45 C960,70 1200,75 1440,50 L1440,110 Z"
            fill="url(#st-blend-out-glow)"
          />
        </svg>
      </div>
    )
  }

  if (variant === 'blend') {
    return (
      <div className="st-blend" aria-hidden="true">
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
          <defs>
            <radialGradient id="st-blend-glow" cx="50%" cy="100%" r="90%">
              <stop offset="0%" stopColor="#ff8a1a" stopOpacity="0.22" />
              <stop offset="55%" stopColor="#ff8a1a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M0,110 L0,55 C240,25 480,20 720,45 C960,70 1200,75 1440,50 L1440,110 Z"
            fill="#171226"
          />
          <path
            d="M0,110 L0,55 C240,25 480,20 720,45 C960,70 1200,75 1440,50 L1440,110 Z"
            fill="url(#st-blend-glow)"
          />
        </svg>
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className="st-gradient" aria-hidden="true">
        <div className="st-gradient__line" />
      </div>
    )
  }

  if (variant === 'diagonal') {
    return (
      <div className="st-diagonal" aria-hidden="true">
        <div className="st-diagonal__bar" />
      </div>
    )
  }

  if (variant === 'seam') {
    return (
      <div className="st-seam" aria-hidden="true">
        <div className="st-seam__top">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path
              d="M0,0 H1440 V30 C1200,60 960,68 720,50 C480,32 240,30 0,52 Z"
              fill={from}
            />
          </svg>
        </div>
        <div className="st-seam__band">
          <span className="st-seam__dot st-seam__dot--1" />
          <span className="st-seam__dot st-seam__dot--2" />
          <span className="st-seam__dot st-seam__dot--3" />
        </div>
        <div className="st-seam__bottom">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path
              d="M0,70 H1440 V40 C1200,10 960,2 720,20 C480,38 240,40 0,18 Z"
              fill={to}
            />
          </svg>
        </div>
      </div>
    )
  }
  if (variant === 'wave') {
    return (
      <div className="st-wave" style={{ background: from }} aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path
            d="M0,90 L0,52 C240,26 480,24 720,48 C960,72 1200,78 1440,50 L1440,90 Z"
            fill={to}
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="st-ribbon" style={{ background: tint }} aria-hidden="true">
      <svg className="st-ribbon__edge" viewBox="0 0 1440 48" preserveAspectRatio="none">
        <path
          d="M0,0 H1440 V20 C1180,44 940,48 700,32 C460,16 220,18 0,34 Z"
          fill={from}
        />
      </svg>
      <div className="st-ribbon__mid">
        <span className="st-ribbon__dot st-ribbon__dot--1" />
        <span className="st-ribbon__dot st-ribbon__dot--2" />
        <span className="st-ribbon__dot st-ribbon__dot--3" />
      </div>
      <svg className="st-ribbon__edge" viewBox="0 0 1440 48" preserveAspectRatio="none">
        <path
          d="M0,48 H1440 V28 C1200,6 960,4 720,20 C480,36 240,38 0,24 Z"
          fill={to}
        />
      </svg>
    </div>
  )
}
