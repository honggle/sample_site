const QUICK = [
  { label: '회사소개',   href: '#about' },
  { label: '서비스 안내', href: '#services' },
  { label: '견적 문의',  href: '#contact' },
  { label: '채용 공고',  href: '#' },
  { label: '오시는 길',  href: '#' },
]

const SERVICES_LINKS = [
  { label: '소형 화물차 운송', href: '#services' },
  { label: '중형 화물차 운송', href: '#services' },
  { label: '대형 화물차 운송', href: '#services' },
  { label: '특수화물 운송',    href: '#services' },
  { label: '컨테이너 운송',    href: '#services' },
  { label: '건설자재 운송',    href: '#services' },
]

const CONTACT_INFO = [
  { label: '대표 전화', value: '1588-0000' },
  { label: '긴급 운송', value: '010-0000-0000' },
  { label: '이메일',    value: 'info@hkcargo.co.kr' },
  { label: '운영 시간', value: '평일 08:00 – 18:00' },
]

export default function Footer() {
  const handleNav = (e, href) => {
    if (href === '#') return
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">HK</div>
              <div>
                <div className="logo-name">한국화물운송㈜</div>
                <div className="logo-sub">Korea Cargo Transport</div>
              </div>
            </div>
            <p className="footer-desc">
              1999년 창립 이래 25년간 대·중·소형 화물자동차, 특수화물차, 컨테이너 운송 분야에서
              신뢰와 전문성으로 고객의 곁을 지켜왔습니다.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social" aria-label="YouTube">
                <YoutubeIcon />
              </a>
              <a href="#" className="footer-social" aria-label="Instagram">
                <InstaIcon />
              </a>
              <a href="#" className="footer-social" aria-label="KakaoTalk">
                <KakaoIcon />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <div className="footer-col-title">바로가기</div>
            <ul>
              {QUICK.map(q => (
                <li key={q.label}>
                  <a href={q.href} onClick={e => handleNav(e, q.href)}>{q.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <div className="footer-col-title">서비스</div>
            <ul>
              {SERVICES_LINKS.map(s => (
                <li key={s.label}>
                  <a href={s.href} onClick={e => handleNav(e, s.href)}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <div className="footer-col-title">연락처</div>
            {CONTACT_INFO.map(c => (
              <div className="footer-contact-item" key={c.label}>
                <div className="footer-contact-label">{c.label}</div>
                <div className="footer-contact-val">{c.value}</div>
              </div>
            ))}
            <div className="footer-contact-item" style={{ marginTop: '16px' }}>
              <div className="footer-contact-label">본사 주소</div>
              <div className="footer-contact-val" style={{ fontSize: '13px', lineHeight: 1.6 }}>
                서울특별시 강서구 공항대로 123<br />
                한국화물운송 빌딩 5층
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2024 한국화물운송㈜ All rights reserved. | 사업자등록번호: 123-45-67890 | 대표이사: 홍길동
          </p>
          <div className="footer-links">
            <a href="#">개인정보처리방침</a>
            <a href="#">이용약관</a>
            <a href="#">사이트맵</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── Icons ── */
function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--bg-dark)"/>
    </svg>
  )
}
function InstaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}
function KakaoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.477 3 2 6.58 2 11c0 2.78 1.667 5.23 4.2 6.79L5.1 21l3.7-2.15c1 .28 2.07.44 3.2.44 5.523 0 10-3.58 10-8s-4.477-8-10-8z"/>
    </svg>
  )
}
