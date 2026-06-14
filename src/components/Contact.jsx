import { useState } from 'react'

/* ── Cargo type tabs ── */
const CARGO_TYPES = [
  { id: 'general',   label: '일반화물',   icon: <BoxIcon /> },
  { id: 'special',   label: '특수화물',   icon: <SpecialIcon /> },
  { id: 'container', label: '컨테이너',   icon: <ContainerIcon /> },
  { id: 'construct', label: '건설자재',   icon: <BuildIcon /> },
]

/* ── Extra fields per cargo type ── */
const EXTRA_FIELDS = {
  general: [
    { id: 'weight',    label: '화물 중량', placeholder: '예) 5톤', type: 'text' },
    { id: 'cargoDesc', label: '화물 내용', placeholder: '예) 가전제품 팔레트 10개', type: 'text' },
  ],
  special: [
    { id: 'weight',    label: '화물 중량 / 길이', placeholder: '예) 20톤, 12m', type: 'text' },
    { id: 'equipment', label: '필요 장비',
      type: 'select',
      options: ['로베드 트레일러', '평판 트레일러', '크레인 카고', '저상 트레일러', '기타'],
    },
    { id: 'cargoDesc', label: '화물 상세', placeholder: '화물 명칭, 규격, 특이사항 등', type: 'text' },
  ],
  container: [
    { id: 'containerSize', label: '컨테이너 규격',
      type: 'select',
      options: ['20ft (일반)', '40ft (일반)', '40ft HQ', '20ft (냉동)', '40ft (냉동)'],
    },
    { id: 'port', label: '출발 항만',
      type: 'select',
      options: ['부산항', '인천항', '평택항', '광양항', '기타'],
    },
    { id: 'cnt', label: '컨테이너 수량', placeholder: '예) 3개', type: 'text' },
  ],
  construct: [
    { id: 'material', label: '자재 종류', placeholder: '예) 외장 패널, 철근, 모래, 골재 등', type: 'text' },
    { id: 'weight',   label: '중량 / 수량', placeholder: '예) 20톤, 100박스', type: 'text' },
    { id: 'crane',    label: '크레인 필요 여부',
      type: 'select',
      options: ['불필요', '크레인 카고 필요', '별도 장비 협의'],
    },
  ],
}

const CONTACT_ITEMS = [
  {
    icon: <PhoneIcon />,
    label: '대표 전화',
    value: <><a href="tel:1588-0000">1588-0000</a><br /><span style={{ fontSize: '13px', opacity: 0.7 }}>평일 08:00 – 18:00</span></>,
  },
  {
    icon: <MailIcon />,
    label: '이메일',
    value: <a href="mailto:info@hkcargo.co.kr">info@hkcargo.co.kr</a>,
  },
  {
    icon: <MapPinIcon />,
    label: '본사',
    value: '서울특별시 강서구 공항대로 123\n한국화물운송 빌딩 5층',
  },
  {
    icon: <ClockIcon />,
    label: '긴급 운송 문의',
    value: <><a href="tel:010-0000-0000">010-0000-0000</a><br /><span style={{ fontSize: '13px', opacity: 0.7 }}>24시간 접수 가능</span></>,
  },
]

/* ── Initial form state ── */
const INIT = {
  name: '', company: '', phone: '', email: '',
  origin: '', destination: '', date: '', note: '',
  // extra
  weight: '', cargoDesc: '', equipment: '', containerSize: '',
  port: '', cnt: '', material: '', crane: '',
}

export default function Contact() {
  const [tab, setTab]       = useState('general')
  const [form, setForm]     = useState(INIT)
  const [submitted, setSub] = useState(false)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSub(true)
    setTimeout(() => setSub(false), 4000)
    setForm(INIT)
  }

  const extras = EXTRA_FIELDS[tab]

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Left: info */}
          <div className="contact-info">
            <div className="section-tag">고객서비스</div>
            <h2 className="section-title white">언제든지<br />문의해 주세요</h2>
            <p className="section-desc">
              화물 종류를 선택하시면 맞춤 견적을 빠르게 안내드립니다.<br />
              긴급 운송은 전화로 바로 접수하실 수 있습니다.
            </p>

            <div className="contact-items">
              {CONTACT_ITEMS.map(it => (
                <div className="contact-item" key={it.label}>
                  <div className="contact-item-icon">{it.icon}</div>
                  <div>
                    <div className="contact-item-label">{it.label}</div>
                    <div className="contact-item-value">{it.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form-box">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#fff' }}>
                <CheckCircle />
                <p style={{ fontSize: '20px', fontWeight: 700, marginTop: '20px', marginBottom: '10px' }}>접수 완료!</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  담당자가 1시간 이내에 연락드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>
                  화물 종류를 선택해 주세요
                </p>

                {/* Cargo type tabs */}
                <div className="cargo-tabs">
                  {CARGO_TYPES.map(ct => (
                    <button
                      key={ct.id}
                      type="button"
                      className={`cargo-tab${tab === ct.id ? ' active' : ''}`}
                      onClick={() => setTab(ct.id)}
                    >
                      {ct.icon}
                      <span>{ct.label}</span>
                    </button>
                  ))}
                </div>

                {/* Basic fields */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">이름 *</label>
                    <input className="form-input" placeholder="홍길동" required
                      value={form.name} onChange={e => set('name', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">회사명</label>
                    <input className="form-input" placeholder="(주)한국물류"
                      value={form.company} onChange={e => set('company', e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">연락처 *</label>
                    <input className="form-input" type="tel" placeholder="010-0000-0000" required
                      value={form.phone} onChange={e => set('phone', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">이메일</label>
                    <input className="form-input" type="email" placeholder="mail@company.com"
                      value={form.email} onChange={e => set('email', e.target.value)} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">출발지 *</label>
                    <input className="form-input" placeholder="예) 서울 강남구" required
                      value={form.origin} onChange={e => set('origin', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">도착지 *</label>
                    <input className="form-input" placeholder="예) 부산 사상구" required
                      value={form.destination} onChange={e => set('destination', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">운송 희망일</label>
                  <input className="form-input" type="date"
                    value={form.date} onChange={e => set('date', e.target.value)} />
                </div>

                {/* Dynamic extra fields */}
                <div className="form-extra" key={tab}>
                  {extras.map(f => (
                    <div className="form-group" key={f.id}>
                      <label className="form-label">{f.label}</label>
                      {f.type === 'select' ? (
                        <select className="form-select"
                          value={form[f.id]} onChange={e => set(f.id, e.target.value)}>
                          <option value="">선택해 주세요</option>
                          {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input className="form-input" placeholder={f.placeholder}
                          value={form[f.id]} onChange={e => set(f.id, e.target.value)} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Note */}
                <div className="form-group">
                  <label className="form-label">추가 요청사항</label>
                  <textarea className="form-textarea"
                    placeholder="기타 요청사항, 특이사항 등을 자유롭게 입력해 주세요."
                    value={form.note} onChange={e => set('note', e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary form-submit">
                  견적 요청 보내기
                  <SendIcon />
                </button>
                <p className="form-note">영업일 기준 1시간 이내 담당자가 연락드립니다.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Icons ── */
function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )
}
function SpecialIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}
function ContainerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="12" rx="2"/>
      <line x1="8"  y1="7" x2="8"  y2="19"/>
      <line x1="14" y1="7" x2="14" y2="19"/>
      <line x1="2"  y1="13" x2="22" y2="13"/>
    </svg>
  )
}
function BuildIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.06 6.06l1.51-1.52a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}
function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
}
function CheckCircle() {
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
}
