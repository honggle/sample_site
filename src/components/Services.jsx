import { useState } from 'react'
import VehicleModal from './VehicleModal.jsx'

const SERVICES = [
  {
    icon: <SmallTruckIcon />,
    title: '소형 화물차',
    desc: '1~2.5톤 카고트럭으로 소량 화물, 긴급 배송, 도심 내 배송에 최적화된 서비스입니다.',
    specs: ['1톤 카고', '1.4톤 카고', '2.5톤 카고', '당일 배송'],
  },
  {
    icon: <MidTruckIcon />,
    title: '중형 화물차',
    desc: '3~5톤 카고트럭으로 중형 화물, 팔레트 화물, 기업 간 정기 운송에 적합합니다.',
    specs: ['3톤 카고', '5톤 카고', '윙바디', '냉동·냉장'],
  },
  {
    icon: <LargeTruckIcon />,
    title: '대형 화물차',
    desc: '8~25톤 카고트럭으로 대용량 산업 자재, 건설자재, 철강 등 중량 화물을 운반합니다.',
    specs: ['8톤 카고', '15톤 카고', '25톤 트레일러', '건설자재'],
  },
  {
    icon: <SpecialTruckIcon />,
    title: '특수 화물차',
    desc: '중량물·장척물·정밀기계를 위한 로베드, 평판, 저상, 크레인 카고 등 전문 장비를 보유합니다.',
    specs: ['로베드 트레일러', '평판 트레일러', '크레인 카고', '저상 장비'],
  },
  {
    icon: <ContainerIcon />,
    title: '컨테이너 운송',
    desc: '20ft·40ft 컨테이너 전국 육상 운송. 부산·인천·평택·광양항 항만과 직접 연계됩니다.',
    specs: ['20ft', '40ft / 40HQ', '항만 픽업', '도어 배송'],
  },
  {
    icon: <BuildingIcon />,
    title: '건설·산업 자재',
    desc: '흙·골재·모래·외장재·합판·철근 등 건설 현장의 다양한 자재를 정시에 안전하게 운반합니다.',
    specs: ['덤프트럭', '카고 장축', '자재 크레인', '현장 입고'],
  },
]

export default function Services() {
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const handleNav = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-head">
          <div>
            <div className="section-tag">서비스</div>
            <h2 className="section-title">모든 화물을 위한<br />맞춤 운송 서비스</h2>
          </div>
          <a
            href="#contact"
            className="btn btn-outline-dark"
            onClick={e => handleNav(e, '#contact')}
            style={{ flexShrink: 0 }}
          >
            견적 문의하기
          </a>
        </div>

        <div className="services-grid">
          {SERVICES.map((svc, i) => (
            <div className="service-card" key={svc.title}>
              <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="service-icon">{svc.icon}</div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <div className="service-specs">
                {svc.specs.map(sp => (
                  <button
                    key={sp}
                    className="service-spec"
                    onClick={() => setSelectedVehicle(sp)}
                    title={`${sp} 상세 보기`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <VehicleModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </section>
  )
}

/* ── Service Icons ── */
function SmallTruckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  )
}
function MidTruckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z" rx="1"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
      <line x1="1" y1="9" x2="16" y2="9"/>
    </svg>
  )
}
function LargeTruckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="14" height="11" rx="1"/>
      <path d="M15 7h5l3 4v5H15V7z"/>
      <circle cx="4"  cy="18" r="2"/>
      <circle cx="12" cy="18" r="2"/>
      <circle cx="19" cy="18" r="2"/>
    </svg>
  )
}
function SpecialTruckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="9" width="17" height="9" rx="1"/>
      <path d="M18 12h3l2 3v3h-5v-6z"/>
      <rect x="4" y="5" width="10" height="4" rx="1"/>
      <circle cx="5"  cy="20" r="1.5"/>
      <circle cx="12" cy="20" r="1.5"/>
      <circle cx="19.5" cy="20" r="1.5"/>
    </svg>
  )
}
function ContainerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="22" height="13" rx="2"/>
      <line x1="7"  y1="6" x2="7"  y2="19"/>
      <line x1="13" y1="6" x2="13" y2="19"/>
      <line x1="19" y1="6" x2="19" y2="19"/>
      <line x1="1"  y1="12" x2="23" y2="12"/>
    </svg>
  )
}
function BuildingIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
    </svg>
  )
}
