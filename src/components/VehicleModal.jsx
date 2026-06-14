import { useEffect } from 'react'

/* ============================================================
   VEHICLE DATA — maps spec tag names → modal content
   ============================================================ */
const VEHICLES = {
  /* ── 소형화물 ── */
  '1톤 카고': {
    name: '1톤 카고트럭',
    category: '소형화물',
    ck: 'small',
    payload: '1,000 kg',
    cargoBox: '2.30 × 1.40 m',
    totalLength: '5.8 m',
    maxWeight: '총중량 3.5 t',
    desc: '도심 골목길도 자유롭게 진입 가능한 소형 카고트럭. 긴급 배송, 당일 배송, 소량 이삿짐 등 빠른 이동이 필요한 모든 화물에 최적입니다.',
    features: ['소량 화물', '이삿짐', '식자재', '당일 배송', '도심 배송'],
    svgType: 'small-cargo',
    img: null, // 예) '/vehicles/1ton-cargo.jpg'
  },
  '1.4톤 카고': {
    name: '1.4톤 카고트럭',
    category: '소형화물',
    ck: 'small',
    payload: '1,400 kg',
    cargoBox: '2.60 × 1.50 m',
    totalLength: '6.2 m',
    maxWeight: '총중량 4.5 t',
    desc: '1톤보다 넓은 적재면으로 소형 가구, 사무기기, 판촉물 등 부피가 조금 큰 소형 화물에 최적입니다.',
    features: ['소형 가구', '사무기기', '판촉물', '쇼핑몰 반품', '전자제품'],
    svgType: 'small-cargo',
    img: null, // 예) '/vehicles/1.4ton-cargo.jpg'
  },
  '2.5톤 카고': {
    name: '2.5톤 카고트럭',
    category: '소형화물',
    ck: 'small',
    payload: '2,500 kg',
    cargoBox: '3.60 × 1.70 m',
    totalLength: '7.0 m',
    maxWeight: '총중량 5.5 t',
    desc: '소형과 중형의 중간 크기. 팔레트 2~3개 분량을 한 번에 운반하기에 최적이며 일반 도로 진입이 자유롭습니다.',
    features: ['팔레트 화물', '소형 기계류', '전자제품', '상업용 물품', '가정 이사'],
    svgType: 'small-cargo',
    img: null, // 예) '/vehicles/2.5ton-cargo.jpg'
  },
  '당일 배송': {
    name: '당일 배송 서비스',
    category: '소형화물',
    ck: 'small',
    payload: '최대 2,500 kg',
    cargoBox: '화물에 따라 배차',
    totalLength: '차종별 상이',
    maxWeight: '최대 2,500 kg',
    desc: '당일 접수 후 즉시 배차, 당일 내 목적지 도착. 긴급 화물, 납기 촉박 물량에 특화된 서비스로 전국 주요 거점에서 바로 출발합니다.',
    features: ['긴급 배송', '당일 배차', 'GPS 추적', 'B2B/B2C', '납기 보장'],
    svgType: 'small-cargo',
    img: null, // 예) '/vehicles/express.jpg'
  },
  /* ── 중형화물 ── */
  '3톤 카고': {
    name: '3톤 카고트럭',
    category: '중형화물',
    ck: 'mid',
    payload: '3,000 kg',
    cargoBox: '4.30 × 1.90 m',
    totalLength: '8.0 m',
    maxWeight: '총중량 8.0 t',
    desc: '가장 수요가 많은 중형 화물차. 팔레트 4~5개, 가정 이사, 중소기업 간 납품 물량에 탁월합니다.',
    features: ['이사', '팔레트 납품', '소형 중장비', '공산품', '식료품'],
    svgType: 'mid-cargo',
    img: null, // 예) '/vehicles/3ton-cargo.jpg'
  },
  '5톤 카고': {
    name: '5톤 카고트럭',
    category: '중형화물',
    ck: 'mid',
    payload: '5,000 kg',
    cargoBox: '5.80 × 2.10 m',
    totalLength: '9.5 m',
    maxWeight: '총중량 11.0 t',
    desc: '중형 최대 적재량. 기업 간 대량 납품, 공장 출고물, 가구·인테리어 자재 운반에 최적입니다.',
    features: ['대량 납품', '공장 출고', '산업자재', '가구·인테리어', '건자재'],
    svgType: 'mid-cargo',
    img: null, // 예) '/vehicles/5ton-cargo.jpg'
  },
  '윙바디': {
    name: '윙바디 트럭',
    category: '중형화물',
    ck: 'mid',
    payload: '4,500 kg',
    cargoBox: '5.80 × 2.40 × 2.20 m',
    totalLength: '9.5 m',
    maxWeight: '총중량 11.0 t',
    desc: '측면이 날개처럼 열려 지게차 하역이 쉽습니다. 포장 화물, 박스 화물을 비와 파손으로부터 완벽히 보호합니다.',
    features: ['포장 박스', '전자제품', '생활용품', '지게차 하역', '우천 화물'],
    svgType: 'wingbody',
    img: null, // 예) '/vehicles/wingbody.jpg'
  },
  '냉동·냉장': {
    name: '냉동·냉장 트럭',
    category: '중형화물',
    ck: 'mid',
    payload: '3,500 kg',
    cargoBox: '5.00 × 2.10 × 2.00 m',
    totalLength: '9.0 m',
    maxWeight: '총중량 9.5 t',
    desc: '영하 20°C~영상 10°C 온도 제어. 신선식품, 의약품, 냉동식품, 유제품 운송에 특화된 냉장·냉동 차량입니다.',
    features: ['신선식품', '냉동식품', '의약품', '유제품', '아이스크림'],
    svgType: 'reefer',
    img: null, // 예) '/vehicles/reefer.jpg'
  },
  /* ── 대형화물 ── */
  '8톤 카고': {
    name: '8톤 카고트럭',
    category: '대형화물',
    ck: 'large',
    payload: '8,000 kg',
    cargoBox: '7.00 × 2.30 m',
    totalLength: '11.0 m',
    maxWeight: '총중량 16.0 t',
    desc: '3축 구동으로 안정적인 주행. 철강재, 건설자재, 산업기계 등 무거운 화물의 장거리 운송에 최적입니다.',
    features: ['철강재', '건설자재', '산업기계', '농자재', '대형 공산품'],
    svgType: 'large-cargo',
    img: null, // 예) '/vehicles/8ton-cargo.jpg'
  },
  '15톤 카고': {
    name: '15톤 카고트럭',
    category: '대형화물',
    ck: 'large',
    payload: '15,000 kg',
    cargoBox: '9.50 × 2.40 m',
    totalLength: '13.5 m',
    maxWeight: '총중량 24.0 t',
    desc: '국내에서 가장 많이 활약하는 대형 화물차. 전국 장거리 운송의 핵심으로 다양한 산업현장에서 사용됩니다.',
    features: ['장거리 운송', '철근·H빔', '원자재', '대형 기계', '컨테이너 부품'],
    svgType: 'large-cargo',
    img: null, // 예) '/vehicles/15ton-cargo.jpg'
  },
  '25톤 트레일러': {
    name: '25톤 세미 트레일러',
    category: '대형화물',
    ck: 'large',
    payload: '25,000 kg',
    cargoBox: '12.00 × 2.50 m',
    totalLength: '16.7 m',
    maxWeight: '총중량 40.0 t',
    desc: '국내 최대 허용 중량 차량. 컨테이너 섀시, 공사 중장비, 고중량 플랜트 설비 운반에 사용됩니다.',
    features: ['컨테이너 섀시', '중장비', '플랜트 설비', '공장 기계', '풍력 부품'],
    svgType: 'semi-trailer',
    img: null, // 예) '/vehicles/25ton-trailer.jpg'
  },
  '건설자재': {
    name: '건설자재 전용 운송',
    category: '대형화물',
    ck: 'large',
    payload: '최대 25,000 kg',
    cargoBox: '용도별 차량 배차',
    totalLength: '차종별 상이',
    maxWeight: '최대 25 t',
    desc: '시멘트·철근·합판·외장재·유로폼 등 모든 건설 자재를 현장 맞춤 차량으로 운반. 현장 진입로 특성 사전 협의 가능합니다.',
    features: ['시멘트·골재', '철근·H빔', '합판·목재', '외장재', '유로폼'],
    svgType: 'large-cargo',
    img: null, // 예) '/vehicles/construction.jpg'
  },
  /* ── 특수화물 ── */
  '로베드 트레일러': {
    name: '로베드 트레일러',
    category: '특수화물',
    ck: 'special',
    payload: '40,000 kg',
    cargoBox: '13.00 × 3.00 m',
    totalLength: '18.0 m',
    maxWeight: '총중량 68.0 t',
    desc: '적재함 높이가 낮아 높이 제한 구간에서도 대형 기계류와 건설 중장비를 안전하게 운반하는 특수 트레일러입니다.',
    features: ['굴착기·불도저', '대형 기계류', '풍력발전 부품', '공장 설비', '초중량물'],
    svgType: 'lowbed',
    img: null, // 예) '/vehicles/lowbed.jpg'
  },
  '평판 트레일러': {
    name: '평판(플랫베드) 트레일러',
    category: '특수화물',
    ck: 'special',
    payload: '25,000 kg',
    cargoBox: '12.50 × 2.50 m',
    totalLength: '16.5 m',
    maxWeight: '총중량 40.0 t',
    desc: '상단이 완전 개방된 평평한 적재대. 크레인으로만 상하차 가능한 강관, 형강, 프리캐스트 콘크리트 등에 사용됩니다.',
    features: ['강관·형강', '프리캐스트 콘크리트', '대형 기계', 'H빔·레일', '석재'],
    svgType: 'flatbed-trailer',
    img: null, // 예) '/vehicles/flatbed.jpg'
  },
  '크레인 카고': {
    name: '크레인 카고트럭',
    category: '특수화물',
    ck: 'special',
    payload: '8,000 kg',
    cargoBox: '6.00 × 2.30 m',
    totalLength: '11.0 m',
    maxWeight: '총중량 16.0 t',
    desc: '내장 크레인 붐으로 별도 장비 없이 현장에서 직접 상하차. 크레인이 없는 협소 현장이나 공장에 최적입니다.',
    features: ['무장비 현장', '기계류', '석재·화강암', '에어컨 실외기', '변압기'],
    svgType: 'crane',
    img: null, // 예) '/vehicles/crane-truck.jpg'
  },
  '저상 장비': {
    name: '저상 트레일러',
    category: '특수화물',
    ck: 'special',
    payload: '50,000 kg',
    cargoBox: '14.00 × 3.20 m',
    totalLength: '20.0 m',
    maxWeight: '총중량 80.0 t',
    desc: '가장 낮은 적재면의 초중량물 전용 트레일러. 터널·교량 높이 제한 구간에서도 대형 발전기, 변전 설비를 운반합니다.',
    features: ['초중량 설비', '변전·발전기', '군수 장비', '터빈', '대형 압력용기'],
    svgType: 'lowbed',
    img: null, // 예) '/vehicles/lowloader.jpg'
  },
  /* ── 컨테이너 ── */
  '20ft': {
    name: '20ft 컨테이너 운송',
    category: '컨테이너',
    ck: 'container',
    payload: '24,000 kg',
    cargoBox: '5.90 × 2.35 × 2.39 m (내부)',
    totalLength: '12.0 m',
    maxWeight: '총 G.W. 30.4 t',
    desc: '20피트(6m) 표준 컨테이너의 항만·물류센터·공장 간 육상 운송. 부산·인천·평택·광양항에서 직접 픽업합니다.',
    features: ['수출입 화물', '소량 LCL', '부산항 픽업', '평택항 픽업', '보세운송'],
    svgType: 'container-20',
    img: null, // 예) '/vehicles/container-20ft.jpg'
  },
  '40ft / 40HQ': {
    name: '40ft / 40HQ 컨테이너 운송',
    category: '컨테이너',
    ck: 'container',
    payload: '26,500 kg',
    cargoBox: '12.00 × 2.35 × 2.39 m (내부)',
    totalLength: '17.0 m',
    maxWeight: '총 G.W. 30.4 t',
    desc: '40피트(12m) 표준·하이큐브 컨테이너 전국 육상 운송. 부피가 크고 대량인 수출입 물량에 최적입니다.',
    features: ['대량 수출입', '가구·목재', '자동차 부품', '소비재', '제조업 납품'],
    svgType: 'container-40',
    img: null, // 예) '/vehicles/container-40ft.jpg'
  },
  '항만 픽업': {
    name: '항만 픽업 서비스',
    category: '컨테이너',
    ck: 'container',
    payload: '26,500 kg',
    cargoBox: '20ft / 40ft / 40HQ',
    totalLength: '17.0 m',
    maxWeight: '총 G.W. 30.4 t',
    desc: '부산·인천·평택·광양항에서 컨테이너를 직접 픽업하여 전국 목적지까지 운송. 선적 일정에 맞춘 배차가 가능합니다.',
    features: ['부산항', '인천항', '평택항', '광양항', '보세운송'],
    svgType: 'container-20',
    img: null, // 예) '/vehicles/port-pickup.jpg'
  },
  '도어 배송': {
    name: '도어-투-도어 배송',
    category: '컨테이너',
    ck: 'container',
    payload: '26,500 kg',
    cargoBox: '20ft / 40ft',
    totalLength: '17.0 m',
    maxWeight: '총 G.W. 30.4 t',
    desc: '항만에서 수령한 컨테이너를 고객의 공장·창고·물류센터 문 앞까지 직접 배송. 환적 없는 원스톱 서비스입니다.',
    features: ['공장 납품', '창고 배송', '물류센터', '도어-투-도어', '직배송'],
    svgType: 'container-40',
    img: null, // 예) '/vehicles/door-delivery.jpg'
  },
  /* ── 건설자재 ── */
  '덤프트럭': {
    name: '덤프트럭',
    category: '건설자재',
    ck: 'construct',
    payload: '15,000 kg',
    cargoBox: '4.80 × 2.20 m (적재함)',
    totalLength: '9.5 m',
    maxWeight: '총중량 24.0 t',
    desc: '토사·골재·모래·자갈 등 벌크 건설 자재를 현장까지 운반 후 자동 덤핑(기울기)으로 즉시 하역합니다.',
    features: ['토사·흙', '모래·자갈', '골재·석재', '폐기물', '성토 작업'],
    svgType: 'dump',
    img: null, // 예) '/vehicles/dump-truck.jpg'
  },
  '카고 장축': {
    name: '카고 장축 트럭',
    category: '건설자재',
    ck: 'construct',
    payload: '12,000 kg',
    cargoBox: '10.50 × 2.30 m',
    totalLength: '14.0 m',
    maxWeight: '총중량 20.0 t',
    desc: '화물함이 일반 카고보다 길어 철근, 파이프, 긴 목재 등 장척 자재를 효율적으로 운반합니다.',
    features: ['철근·파이프', '목재·각재', '유로폼', '비계 자재', '외장 패널'],
    svgType: 'large-cargo',
    img: null, // 예) '/vehicles/long-cargo.jpg'
  },
  '자재 크레인': {
    name: '자재 크레인 카고',
    category: '건설자재',
    ck: 'construct',
    payload: '8,000 kg',
    cargoBox: '6.00 × 2.30 m',
    totalLength: '11.0 m',
    maxWeight: '총중량 16.0 t',
    desc: '내장 크레인 붐으로 현장에서 자재를 직접 상하차. 협소 공간의 건설 현장에서 별도 크레인 없이 자재를 내립니다.',
    features: ['자재 현장 하역', '석재·화강석', '중량 창호', 'AC 실외기', '돌판'],
    svgType: 'crane',
    img: null, // 예) '/vehicles/material-crane.jpg'
  },
  '현장 입고': {
    name: '건설현장 입고 서비스',
    category: '건설자재',
    ck: 'construct',
    payload: '협의 배차',
    cargoBox: '자재 규격 협의',
    totalLength: '차량 협의',
    maxWeight: '협의 가능',
    desc: '현장 진입로 너비, 크레인 유무, 출입 시간 제한 등을 사전 협의 후 가장 적합한 차량을 배차합니다. 현장 맞춤 운송.',
    features: ['현장 사전 협의', '출입 시간 조율', '지게차 연계', '안전 관리', '다차종 배차'],
    svgType: 'large-cargo',
    img: null, // 예) '/vehicles/site-delivery.jpg'
  },
}

/* ============================================================
   SVG ILLUSTRATIONS
   ============================================================ */

/* 1. 소형 카고 (1~2.5t) */
function SmallCargoSVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      {/* Ground shadow */}
      <ellipse cx="270" cy="196" rx="230" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Front wheel */}
      <circle cx="128" cy="162" r="22" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="128" cy="162" r="9"  stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="128" y1="153" x2="128" y2="171" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <line x1="119" y1="162" x2="137" y2="162" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      {/* Rear wheel */}
      <circle cx="398" cy="162" r="22" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="398" cy="162" r="9"  stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      {/* Chassis */}
      <line x1="78"  y1="140" x2="445" y2="140" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Cab body */}
      <rect x="62"  y="80"  width="148" height="60" rx="7" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      {/* Cab window */}
      <rect x="77"  y="90"  width="96"  height="36" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      {/* Door divider */}
      <line x1="132" y1="90" x2="132" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Front bumper */}
      <line x1="62"  y1="140" x2="46"  y2="140" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="38"  y="122" width="24"  height="18" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      {/* Headlight */}
      <rect x="42"  y="88"  width="20"  height="12" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* Flatbed floor */}
      <rect x="210" y="114" width="235" height="26" rx="2" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      {/* Flatbed stakes */}
      <line x1="210" y1="114" x2="210" y2="90"  stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="445" y1="114" x2="445" y2="90"  stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="285" y1="114" x2="285" y2="90"  stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="360" y1="114" x2="360" y2="90"  stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="210" y1="90"  x2="445" y2="90"  stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      {/* Exhaust */}
      <line x1="198" y1="80" x2="198" y2="54" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="198" cy="52" rx="6" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 2. 중형 카고 (3~5t) */
function MidCargoSVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="280" cy="196" rx="240" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Front wheel */}
      <circle cx="130" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="130" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="130" y1="148" x2="130" y2="168" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <line x1="120" y1="158" x2="140" y2="158" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      {/* Rear dual wheels */}
      <circle cx="418" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="418" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="452" cy="158" r="26" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      {/* Chassis */}
      <line x1="72"  y1="132" x2="490" y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Cab */}
      <rect x="55"  y="68"  width="162" height="64" rx="8" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <rect x="73"  y="80"  width="104" height="40" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <line x1="138" y1="80"  x2="138" y2="132" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Front */}
      <line x1="55"  y1="132" x2="36"  y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="27"  y="112" width="28"  height="20" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="32"  y="82"  width="23"  height="14" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* Flatbed */}
      <rect x="217" y="104" width="273" height="28" rx="2" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="217" y1="104" x2="217" y2="78"  stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="490" y1="104" x2="490" y2="78"  stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="300" y1="104" x2="300" y2="78"  stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="390" y1="104" x2="390" y2="78"  stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="217" y1="78"  x2="490" y2="78"  stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      {/* Exhaust */}
      <line x1="202" y1="68" x2="202" y2="40" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="202" cy="38" rx="7" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 3. 윙바디 */
function WingbodySVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="280" cy="196" rx="240" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Wheels */}
      <circle cx="130" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="130" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="418" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="418" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="452" cy="158" r="26" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      {/* Chassis */}
      <line x1="72"  y1="132" x2="490" y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Cab */}
      <rect x="55"  y="68"  width="162" height="64" rx="8" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <rect x="73"  y="80"  width="104" height="40" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <line x1="55"  y1="132" x2="36"  y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="27"  y="112" width="28"  height="20" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="32"  y="82"  width="23"  height="14" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* Box body */}
      <rect x="217" y="62"  width="273" height="70" rx="4" stroke="rgba(255,255,255,0.9)" strokeWidth="2" fill="rgba(255,255,255,0.03)" />
      {/* Wing door (open upward) */}
      <path d="M 217 62 L 180 38 L 355 38 L 355 62" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(255,255,255,0.03)" />
      {/* Wing hinge dot */}
      <circle cx="217" cy="62" r="3" fill="rgba(255,255,255,0.6)" />
      {/* Box vertical ribs */}
      <line x1="305" y1="62" x2="305" y2="132" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <line x1="395" y1="62" x2="395" y2="132" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      {/* Exhaust */}
      <line x1="202" y1="68" x2="202" y2="40" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="202" cy="38" rx="7" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 4. 냉동·냉장 */
function ReeferSVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="280" cy="196" rx="240" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Wheels */}
      <circle cx="130" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="130" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="418" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="418" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="452" cy="158" r="26" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
      {/* Chassis */}
      <line x1="72"  y1="132" x2="490" y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Cab */}
      <rect x="55"  y="68"  width="162" height="64" rx="8" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <rect x="73"  y="80"  width="104" height="40" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <line x1="55"  y1="132" x2="36"  y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="27"  y="112" width="28"  height="20" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="32"  y="82"  width="23"  height="14" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* Insulated box body */}
      <rect x="217" y="58"  width="273" height="74" rx="4" stroke="rgba(100,200,255,0.9)" strokeWidth="2" fill="rgba(100,200,255,0.03)" />
      {/* Refrigeration unit on front of box */}
      <rect x="215" y="64"  width="30"  height="42" rx="3" stroke="rgba(100,200,255,0.8)" strokeWidth="1.8" fill="rgba(100,200,255,0.06)" />
      {/* Cooling fins */}
      <line x1="220" y1="70" x2="240" y2="70" stroke="rgba(100,200,255,0.6)" strokeWidth="1" />
      <line x1="220" y1="76" x2="240" y2="76" stroke="rgba(100,200,255,0.6)" strokeWidth="1" />
      <line x1="220" y1="82" x2="240" y2="82" stroke="rgba(100,200,255,0.6)" strokeWidth="1" />
      <line x1="220" y1="88" x2="240" y2="88" stroke="rgba(100,200,255,0.6)" strokeWidth="1" />
      <line x1="220" y1="94" x2="240" y2="94" stroke="rgba(100,200,255,0.6)" strokeWidth="1" />
      <line x1="220" y1="100" x2="240" y2="100" stroke="rgba(100,200,255,0.6)" strokeWidth="1" />
      {/* Insulation ribs on box */}
      <line x1="305" y1="58"  x2="305" y2="132" stroke="rgba(100,200,255,0.25)" strokeWidth="1.2" />
      <line x1="395" y1="58"  x2="395" y2="132" stroke="rgba(100,200,255,0.25)" strokeWidth="1.2" />
      {/* Snowflake icon */}
      <text x="370" y="102" textAnchor="middle" fontSize="22" fill="rgba(100,220,255,0.35)" fontFamily="system-ui">❄</text>
      {/* Exhaust */}
      <line x1="202" y1="68" x2="202" y2="40" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="202" cy="38" rx="7" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 5. 대형 카고 (8~15t) */
function LargeCargoSVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="290" cy="196" rx="260" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Front wheel */}
      <circle cx="108" cy="154" r="30" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="108" cy="154" r="12" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <line x1="108" y1="142" x2="108" y2="166" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <line x1="96"  y1="154" x2="120" y2="154" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      {/* Rear axle 1 */}
      <circle cx="400" cy="154" r="30" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="400" cy="154" r="12" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      {/* Rear axle 2 */}
      <circle cx="445" cy="154" r="30" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
      <circle cx="445" cy="154" r="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      {/* Chassis */}
      <line x1="48"  y1="124" x2="510" y2="124" stroke="rgba(255,255,255,0.9)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Cab (with sleeper bump at rear) */}
      <rect x="30"  y="52"  width="185" height="72" rx="8" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      {/* Sleeper pod */}
      <rect x="170" y="62"  width="45"  height="56" rx="6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
      {/* Window */}
      <rect x="48"  y="64"  width="108" height="46" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <line x1="102" y1="64"  x2="102" y2="124" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Front */}
      <line x1="30"  y1="124" x2="10"  y2="124" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="2"   y="100" width="28"  height="24" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="6"   y="68"  width="24"  height="16" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* Flatbed */}
      <rect x="215" y="92"  width="295" height="32" rx="2" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="215" y1="92"  x2="215" y2="62"  stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="510" y1="92"  x2="510" y2="62"  stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="300" y1="92"  x2="300" y2="62"  stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="390" y1="92"  x2="390" y2="62"  stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="215" y1="62"  x2="510" y2="62"  stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      {/* Exhaust */}
      <line x1="198" y1="52" x2="198" y2="22" stroke="rgba(255,255,255,0.8)" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="198" cy="20" rx="8" ry="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 6. 세미 트레일러 (25t+) */
function SemiTrailerSVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="290" cy="196" rx="270" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Tractor front wheel */}
      <circle cx="72"  cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="72"  cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      {/* Tractor rear axles */}
      <circle cx="196" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="196" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="228" cy="158" r="26" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      {/* Trailer axles */}
      <circle cx="436" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="436" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="468" cy="158" r="26" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      {/* Tractor chassis */}
      <line x1="24"  y1="132" x2="256" y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Tractor cab */}
      <rect x="8"   y="68"  width="138" height="64" rx="7" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <rect x="22"  y="80"  width="88"  height="40" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <line x1="8"   y1="132" x2="-5"  y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="-12" y="110" width="20"  height="22" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="-9"  y="80"  width="18"  height="14" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* 5th wheel / coupling */}
      <path d="M 200 132 Q 220 120 240 132" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
      <circle cx="218" cy="126" r="4" fill="rgba(255,255,255,0.5)" />
      {/* Trailer chassis */}
      <line x1="218" y1="132" x2="496" y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Trailer flatbed */}
      <rect x="230" y="98"  width="266" height="34" rx="2" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="230" y1="98"  x2="230" y2="72"  stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="496" y1="98"  x2="496" y2="72"  stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <line x1="315" y1="98"  x2="315" y2="72"  stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="405" y1="98"  x2="405" y2="72"  stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="230" y1="72"  x2="496" y2="72"  stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
      {/* Exhaust */}
      <line x1="140" y1="68" x2="140" y2="38" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="140" cy="36" rx="7" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 7. 로베드 / 저상 트레일러 */
function LowbedSVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="290" cy="196" rx="270" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Tractor wheels */}
      <circle cx="72"  cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="72"  cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="196" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="196" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="228" cy="158" r="26" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      {/* Trailer axles (4 axles on lowbed) */}
      <circle cx="380" cy="162" r="22" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="380" cy="162" r="8"  stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="414" cy="162" r="22" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
      <circle cx="448" cy="162" r="22" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
      <circle cx="482" cy="162" r="22" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      {/* Tractor chassis */}
      <line x1="24"  y1="132" x2="254" y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Tractor cab */}
      <rect x="8"   y="68"  width="138" height="64" rx="7" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <rect x="22"  y="80"  width="88"  height="40" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <line x1="8"   y1="132" x2="-5"  y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="-12" y="110" width="20"  height="22" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="-9"  y="80"  width="18"  height="14" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* 5th wheel */}
      <path d="M 200 132 Q 220 120 240 132" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
      {/* Lowbed neck (ramped down) */}
      <path d="M 240 132 L 275 140" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Very low flatbed */}
      <line x1="275" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Ramp indicators */}
      <line x1="275" y1="140" x2="275" y2="148" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="500" y1="140" x2="500" y2="148" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      {/* Platform width bars (showing wide load) */}
      <line x1="275" y1="136" x2="500" y2="136" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      {/* Trailer frame side bars */}
      <line x1="270" y1="132" x2="504" y2="132" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      {/* Exhaust */}
      <line x1="140" y1="68" x2="140" y2="38" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="140" cy="36" rx="7" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 8. 평판 트레일러 */
function FlatbedTrailerSVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="290" cy="196" rx="270" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Tractor wheels */}
      <circle cx="72"  cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="72"  cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="196" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="196" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="228" cy="158" r="26" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      {/* Trailer axles */}
      <circle cx="420" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="420" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="456" cy="158" r="26" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      {/* Tractor chassis */}
      <line x1="24"  y1="132" x2="254" y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Tractor cab */}
      <rect x="8"   y="68"  width="138" height="64" rx="7" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <rect x="22"  y="80"  width="88"  height="40" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <line x1="8"   y1="132" x2="-5"  y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="-12" y="110" width="20"  height="22" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="-9"  y="80"  width="18"  height="14" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* 5th wheel */}
      <path d="M 200 132 Q 220 120 240 132" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
      <circle cx="218" cy="126" r="4" fill="rgba(255,255,255,0.5)" />
      {/* Trailer chassis */}
      <line x1="218" y1="132" x2="484" y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Flatbed deck — slightly elevated */}
      <rect x="228" y="108" width="256" height="24" rx="2" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      {/* Stake pockets (vertical marks) */}
      {[250, 300, 350, 400, 440].map(x => (
        <line key={x} x1={x} y1="108" x2={x} y2="90" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      ))}
      {[250, 300, 350, 400, 440].map(x => (
        <rect key={x + 'r'} x={x - 4} y="86" width="8" height="6" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="rgba(255,255,255,0.05)" />
      ))}
      {/* Exhaust */}
      <line x1="140" y1="68" x2="140" y2="38" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="140" cy="36" rx="7" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 9. 크레인 카고 */
function CraneSVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="280" cy="196" rx="240" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Wheels */}
      <circle cx="108" cy="154" r="30" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="108" cy="154" r="12" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="390" cy="154" r="30" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="390" cy="154" r="12" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="434" cy="154" r="30" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      {/* Chassis */}
      <line x1="48"  y1="124" x2="478" y2="124" stroke="rgba(255,255,255,0.9)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Cab */}
      <rect x="30"  y="52"  width="152" height="72" rx="8" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <rect x="48"  y="64"  width="96"  height="46" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <line x1="30"  y1="124" x2="10"  y2="124" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="2"   y="100" width="28"  height="24" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="6"   y="68"  width="24"  height="16" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* Short flatbed behind cab */}
      <rect x="182" y="96"  width="100" height="28" rx="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" />
      {/* Crane base (on flatbed rear section) */}
      <rect x="282" y="82"  width="40"  height="42" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="rgba(255,255,255,0.03)" />
      {/* Crane boom */}
      <path d="M 302 82 L 420 22" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Boom stays */}
      <line x1="302" y1="82"  x2="350" y2="40"  stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
      {/* Hook cable */}
      <line x1="420" y1="22"  x2="420" y2="62"  stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Hook */}
      <path d="M 415 62 Q 420 72 425 62" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" />
      {/* Flatbed continuation */}
      <rect x="322" y="96"  width="156" height="28" rx="2" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      {/* Exhaust */}
      <line x1="178" y1="52" x2="178" y2="22" stroke="rgba(255,255,255,0.8)" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="178" cy="20" rx="8" ry="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 10. 20ft 컨테이너 */
function Container20SVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="280" cy="196" rx="240" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Wheels */}
      <circle cx="130" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="130" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="400" cy="158" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="400" cy="158" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="435" cy="158" r="26" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      {/* Chassis */}
      <line x1="72"  y1="132" x2="478" y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Cab */}
      <rect x="55"  y="68"  width="140" height="64" rx="8" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <rect x="72"  y="80"  width="88"  height="40" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <line x1="55"  y1="132" x2="36"  y2="132" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="27"  y="112" width="28"  height="20" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="32"  y="82"  width="23"  height="14" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* 20ft container box */}
      <rect x="195" y="56"  width="283" height="76" rx="4" stroke="rgba(255,255,255,0.9)" strokeWidth="2" fill="rgba(255,255,255,0.02)" />
      {/* Container ribs (vertical) */}
      {[245, 295, 345, 395, 435].map(x => (
        <line key={x} x1={x} y1="56" x2={x} y2="132" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
      ))}
      {/* Top rail */}
      <line x1="195" y1="66"  x2="478" y2="66"  stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      {/* Bottom rail */}
      <line x1="195" y1="122" x2="478" y2="122" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      {/* Corner castings */}
      <rect x="192" y="53"  width="8" height="8" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="475" y="53"  width="8" height="8" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="192" y="129" width="8" height="8" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="475" y="129" width="8" height="8" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      {/* Door markings */}
      <line x1="432" y1="66"  x2="432" y2="122" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <line x1="445" y1="66"  x2="445" y2="122" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      {/* Exhaust */}
      <line x1="186" y1="68" x2="186" y2="40" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="186" cy="38" rx="7" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 11. 40ft 컨테이너 */
function Container40SVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="290" cy="196" rx="275" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Wheels */}
      <circle cx="78"  cy="158" r="24" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="78"  cy="158" r="9"  stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="436" cy="158" r="24" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="436" cy="158" r="9"  stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="468" cy="158" r="24" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      {/* Chassis */}
      <line x1="22"  y1="134" x2="506" y2="134" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Cab */}
      <rect x="6"   y="70"  width="128" height="64" rx="7" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <rect x="20"  y="82"  width="82"  height="40" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <rect x="-18" y="112" width="24"  height="22" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="-14" y="82"  width="20"  height="14" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* 40ft container box (very long) */}
      <rect x="134" y="54"  width="372" height="80" rx="4" stroke="rgba(255,255,255,0.9)" strokeWidth="2" fill="rgba(255,255,255,0.02)" />
      {/* Container ribs */}
      {[180, 226, 272, 318, 364, 410, 460].map(x => (
        <line key={x} x1={x} y1="54" x2={x} y2="134" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      ))}
      {/* Rails */}
      <line x1="134" y1="66"  x2="506" y2="66"  stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="134" y1="122" x2="506" y2="122" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      {/* Corner castings */}
      <rect x="130" y="51"  width="8" height="8" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="503" y="51"  width="8" height="8" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="130" y="130" width="8" height="8" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <rect x="503" y="130" width="8" height="8" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      {/* Door markings */}
      <line x1="462" y1="66"  x2="462" y2="122" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      {/* Exhaust */}
      <line x1="126" y1="70" x2="126" y2="42" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="126" cy="40" rx="7" ry="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

/* 12. 덤프트럭 */
function DumpSVG() {
  return (
    <svg viewBox="0 0 580 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <ellipse cx="280" cy="196" rx="240" ry="7" fill="rgba(255,255,255,0.04)" />
      {/* Wheels */}
      <circle cx="118" cy="154" r="30" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="118" cy="154" r="12" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="395" cy="154" r="30" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <circle cx="395" cy="154" r="12" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <circle cx="440" cy="154" r="30" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      {/* Chassis */}
      <line x1="60"  y1="124" x2="490" y2="124" stroke="rgba(255,255,255,0.9)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Cab (stocky/boxy for dump) */}
      <rect x="42"  y="52"  width="148" height="72" rx="8" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
      <rect x="60"  y="64"  width="92"  height="46" rx="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(120,190,255,0.07)" />
      <line x1="42"  y1="124" x2="20"  y2="124" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="12"  y="100" width="28"  height="24" rx="3" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
      <rect x="16"  y="68"  width="26"  height="18" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,240,100,0.1)" />
      {/* Dump body (raised/angled) */}
      <path
        d="M 192 124 L 192 60 L 480 60 L 480 124 Z"
        stroke="rgba(255,255,255,0.9)" strokeWidth="2" fill="rgba(255,255,255,0.03)"
      />
      {/* Tipping angle visual */}
      <line x1="190" y1="124" x2="480" y2="60" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4 4" />
      {/* Hydraulic cylinder */}
      <line x1="240" y1="124" x2="266" y2="88"  stroke="rgba(255,200,80,0.8)"  strokeWidth="4" strokeLinecap="round" />
      <line x1="266" y1="88"  x2="276" y2="74"  stroke="rgba(255,200,80,0.6)"  strokeWidth="2.5" strokeLinecap="round" />
      {/* Dump body ribs */}
      <line x1="290" y1="60" x2="290" y2="124" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
      <line x1="380" y1="60" x2="380" y2="124" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
      {/* Tailgate */}
      <line x1="480" y1="60" x2="480" y2="90"  stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Exhaust */}
      <line x1="185" y1="52" x2="185" y2="22" stroke="rgba(255,255,255,0.8)" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="185" cy="20" rx="8" ry="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

function getSVG(type) {
  switch (type) {
    case 'small-cargo':     return <SmallCargoSVG />
    case 'mid-cargo':       return <MidCargoSVG />
    case 'wingbody':        return <WingbodySVG />
    case 'reefer':          return <ReeferSVG />
    case 'large-cargo':     return <LargeCargoSVG />
    case 'semi-trailer':    return <SemiTrailerSVG />
    case 'lowbed':          return <LowbedSVG />
    case 'flatbed-trailer': return <FlatbedTrailerSVG />
    case 'crane':           return <CraneSVG />
    case 'container-20':    return <Container20SVG />
    case 'container-40':    return <Container40SVG />
    case 'dump':            return <DumpSVG />
    default:                return <MidCargoSVG />
  }
}

/* ============================================================
   MODAL COMPONENT
   ============================================================ */
export default function VehicleModal({ vehicle, onClose }) {
  /* ESC to close */
  useEffect(() => {
    if (!vehicle) return
    const fn = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    /* Body scroll lock */
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', fn)
      document.body.style.overflow = ''
    }
  }, [vehicle, onClose])

  if (!vehicle) return null
  const d = VEHICLES[vehicle]
  if (!d) return null

  const handleContact = () => {
    onClose()
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }

  return (
    <div className="vm-overlay" onClick={onClose}>
      <div className="vm-modal" onClick={e => e.stopPropagation()}>
        <button className="vm-close" onClick={onClose} aria-label="닫기">✕</button>

        {/* Illustration — 이미지가 있으면 사진, 없으면 SVG */}
        <div className={`vm-illustration${d.img ? ' vm-illustration-photo' : ''}`}>
          {d.img
            ? <img src={d.img} alt={d.name} className="vm-photo" />
            : getSVG(d.svgType)
          }
        </div>

        {/* Body */}
        <div className="vm-body">
          <span className={`vm-badge vm-badge-${d.ck}`}>{d.category}</span>
          <h3 className="vm-title">{d.name}</h3>
          <p className="vm-desc">{d.desc}</p>

          {/* Specs grid */}
          <div className="vm-specs">
            <div className="vm-spec">
              <div className="vm-spec-label">최대 적재량</div>
              <div className="vm-spec-val">{d.payload}</div>
            </div>
            <div className="vm-spec">
              <div className="vm-spec-label">화물함 규격</div>
              <div className="vm-spec-val">{d.cargoBox}</div>
            </div>
            <div className="vm-spec">
              <div className="vm-spec-label">차량 전장</div>
              <div className="vm-spec-val">{d.totalLength}</div>
            </div>
            <div className="vm-spec">
              <div className="vm-spec-label">총중량 / 제원</div>
              <div className="vm-spec-val">{d.maxWeight}</div>
            </div>
          </div>

          {/* Feature tags */}
          <div className="vm-features-title">적합 화물</div>
          <div className="vm-features">
            {d.features.map(f => (
              <span className="vm-feature-tag" key={f}>{f}</span>
            ))}
          </div>

          {/* CTA */}
          <button className="btn btn-primary vm-cta" onClick={handleContact}>
            이 차량으로 견적 문의하기 →
          </button>
        </div>
      </div>
    </div>
  )
}
