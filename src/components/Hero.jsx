import { useState, useEffect, useCallback } from 'react'

const SLIDES = [
  {
    tag: '대·중·소형 화물 전문',
    title: '화물운송의\n새로운 기준',
    titleEm: null,
    subtitle: '소형 카고부터 대형 트레일러, 특수화물차, 컨테이너까지\n고객의 모든 운송 요구에 완벽하게 대응합니다.',
    ctaPrimary: { label: '서비스 보기', href: '#services' },
    ctaSecond:  { label: '무료 견적 문의', href: '#contact' },
    bg: 'hero-slide-1',
  },
  {
    tag: '특수화물 전문 운송',
    title: '어떤 화물도\n안전하게',
    titleEm: '안전하게',
    subtitle: '중량물·로베드 트레일러·크레인 카고 등\n전문 특수화물 장비와 숙련 기사가 목적지까지 책임집니다.',
    ctaPrimary: { label: '특수화물 문의', href: '#contact' },
    ctaSecond:  { label: '서비스 보기',   href: '#services' },
    bg: 'hero-slide-2',
  },
  {
    tag: '전국 컨테이너 운송',
    title: '전국 어디든\n컨테이너 운송',
    titleEm: '컨테이너 운송',
    subtitle: '부산·인천·평택 등 전국 주요 항만과 연계된\n안정적인 컨테이너 육상 운송 서비스를 제공합니다.',
    ctaPrimary: { label: '컨테이너 견적', href: '#contact' },
    ctaSecond:  { label: '네트워크 보기', href: '#about' },
    bg: 'hero-slide-3',
  },
]

const STATS = [
  { num: '25', unit: '년+',  label: '업력' },
  { num: '350', unit: '대+', label: '보유 차량' },
  { num: '18만', unit: '+',  label: '연간 운송' },
  { num: '500', unit: '+',   label: '파트너사' },
]

const INTERVAL = 5000

export default function Hero() {
  const [cur, setCur] = useState(0)
  const [prog, setProg] = useState(true)

  const next = useCallback(() => {
    setCur(c => (c + 1) % SLIDES.length)
    setProg(false)
    setTimeout(() => setProg(true), 30)
  }, [])

  useEffect(() => {
    const id = setInterval(next, INTERVAL)
    return () => clearInterval(id)
  }, [next])

  const goTo = (i) => {
    setCur(i)
    setProg(false)
    setTimeout(() => setProg(true), 30)
  }

  const handleLink = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const s = SLIDES[cur]

  return (
    <section className="hero" id="home">
      {/* Progress bar */}
      {prog && <div key={cur + 'p'} className="hero-progress" />}

      {/* Slides */}
      <div className="hero-slides">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide ${slide.bg}${i === cur ? ' active' : ''}`}
          >
            {/* Background truck graphic */}
            <div className="hero-graphic">
              <TruckSvg />
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-tag">
              <span className="hero-tag-dot" />
              {s.tag}
            </div>

            <h1 className="hero-title" key={cur + 't'} style={{ animation: 'heroIn .7s ease' }}>
              {s.titleEm
                ? s.title.split(s.titleEm).map((part, idx, arr) => (
                    <span key={idx}>
                      {part}
                      {idx < arr.length - 1 && <em>{s.titleEm}</em>}
                    </span>
                  ))
                : s.title
              }
            </h1>

            <p className="hero-subtitle" key={cur + 's'} style={{ animation: 'heroIn .7s .12s ease both' }}>
              {s.subtitle}
            </p>

            <div className="hero-actions" key={cur + 'a'} style={{ animation: 'heroIn .7s .22s ease both' }}>
              <a
                href={s.ctaPrimary.href}
                className="btn btn-primary"
                onClick={e => handleLink(e, s.ctaPrimary.href)}
              >
                {s.ctaPrimary.label}
                <ArrowIcon />
              </a>
              <a
                href={s.ctaSecond.href}
                className="btn btn-outline-white"
                onClick={e => handleLink(e, s.ctaSecond.href)}
              >
                {s.ctaSecond.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="hero-controls">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === cur ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`슬라이드 ${i + 1}`}
          />
        ))}
      </div>

      {/* Stats strip */}
      <div className="hero-stats">
        <div className="container">
          {STATS.map(st => (
            <div className="hero-stat" key={st.label}>
              <div className="hero-stat-num">
                {st.num}<span>{st.unit}</span>
              </div>
              <div className="hero-stat-label">{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes heroIn {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

function TruckSvg() {
  return (
    <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="120" width="480" height="200" rx="12" fill="white"/>
      <rect x="500" y="160" width="200" height="160" rx="10" fill="white"/>
      <rect x="520" y="175" width="170" height="90" rx="6" fill="white" opacity="0.3"/>
      <circle cx="120" cy="340" r="50" fill="white"/>
      <circle cx="120" cy="340" r="28" fill="white" opacity="0.4"/>
      <circle cx="580" cy="340" r="50" fill="white"/>
      <circle cx="580" cy="340" r="28" fill="white" opacity="0.4"/>
      <rect x="20" y="295" width="680" height="25" rx="4" fill="white" opacity="0.5"/>
    </svg>
  )
}
