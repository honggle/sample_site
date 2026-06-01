import { LOUVER_COLORS } from '../constants.js'

export default function Step1Color({ selected, onSelect, onNext }) {
  return (
    <div className="card">
      <div className="card-title">1단계 - 루버강판 색상 선택</div>
      <div className="card-sub">
        시공할 루버강판의 색상을 선택하세요.
        선택한 색상을 기반으로 AI가 시공 예상 이미지를 생성합니다.
      </div>

      <div className="color-grid">
        {Object.entries(LOUVER_COLORS).map(([key, { label, hex }]) => (
          <div
            key={key}
            className={`color-swatch ${selected?.key === key ? 'selected' : ''}`}
            onClick={() => onSelect({ key, label, hex, desc: LOUVER_COLORS[key].desc })}
            title={label}
          >
            <div className="color-dot" style={{ background: hex }} />
            <span className="color-name">{label}</span>
          </div>
        ))}
      </div>

      {selected && (
        <div className="alert alert-info" style={{ marginTop: 20, marginBottom: 0 }}>
          <span>&#10003;</span>
          <div>
            <strong>{selected.label}</strong> 선택됨
            <span style={{ marginLeft: 8, opacity: 0.7 }}>— {selected.desc}</span>
          </div>
        </div>
      )}

      <div className="step-nav">
        <span />
        <button
          className="btn btn-primary btn-lg"
          disabled={!selected}
          onClick={onNext}
        >
          다음 단계 &#8594;
        </button>
      </div>
    </div>
  )
}
