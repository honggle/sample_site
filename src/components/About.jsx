const STATS = [
  { num: '25년+',    label: '업력' },
  { num: '350대+',   label: '보유 차량' },
  { num: '18만 건+', label: '연간 운송 실적' },
  { num: '500사+',   label: '협력 파트너' },
]

const FEATURES = [
  {
    icon: <ShieldIcon />,
    title: '안전 제일 운송',
    desc: '전 차량 GPS 실시간 추적, 화물 보험 완비, 숙련 기사 배치로 화물의 안전을 책임집니다.',
  },
  {
    icon: <ClockIcon />,
    title: '정시 도착 보장',
    desc: '체계적인 배차 시스템과 24시간 관제센터 운영으로 약속한 시간에 반드시 도착합니다.',
  },
  {
    icon: <MapIcon />,
    title: '전국 물류 네트워크',
    desc: '서울·부산·인천·대구·광주·대전 전국 주요 거점을 보유해 어디든 빠르게 연결합니다.',
  },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Visual (hidden on mobile) */}
          <div className="about-visual">
            <div className="about-img-wrap">
              <TruckIllustration />
            </div>
            <div className="about-badge">
              <div className="about-badge-num">No.1</div>
              <div className="about-badge-text">화물 운송 전문기업</div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <div className="section-tag">회사소개</div>
            <h2 className="section-title">
              신뢰와 경험으로<br />
              쌓아온 25년
            </h2>
            <p className="section-desc">
              한국화물운송㈜은 1999년 창립 이래 대·중·소형 화물자동차, 특수화물차, 컨테이너 운송 분야에서
              고객의 든든한 물류 파트너로 성장해 왔습니다. 350여 대의 차량과 전국 네트워크를 바탕으로
              안전하고 신속한 운송을 약속합니다.
            </p>

            {/* Stats */}
            <div className="about-stats">
              {STATS.map(s => (
                <div className="about-stat" key={s.label}>
                  <div className="about-stat-num">{s.num}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="about-features">
              {FEATURES.map(f => (
                <div className="about-feature" key={f.title}>
                  <div className="about-feature-icon">{f.icon}</div>
                  <div>
                    <div className="about-feature-title">{f.title}</div>
                    <div className="about-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Icons ── */
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}
function MapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/>
      <line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  )
}
function TruckIllustration() {
  return (
    <svg viewBox="0 0 520 390" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '80%', opacity: 0.25 }}>
      <rect x="10" y="100" width="340" height="180" rx="16" stroke="white" strokeWidth="8"/>
      <rect x="350" y="130" width="160" height="150" rx="12" stroke="white" strokeWidth="8"/>
      <rect x="365" y="145" width="135" height="85" rx="6" stroke="white" strokeWidth="4" opacity="0.5"/>
      <circle cx="90"  cy="305" r="48" stroke="white" strokeWidth="8"/>
      <circle cx="90"  cy="305" r="24" stroke="white" strokeWidth="5" opacity="0.5"/>
      <circle cx="400" cy="305" r="48" stroke="white" strokeWidth="8"/>
      <circle cx="400" cy="305" r="24" stroke="white" strokeWidth="5" opacity="0.5"/>
      <line x1="10" y1="260" x2="510" y2="260" stroke="white" strokeWidth="5" opacity="0.4"/>
      <rect x="20" y="110" width="80" height="50" rx="8" stroke="white" strokeWidth="4" opacity="0.4"/>
    </svg>
  )
}
