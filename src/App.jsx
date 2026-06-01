import { useState, useEffect } from 'react'
import { STEPS, API_BASE } from './constants.js'
import Step1Color       from './components/Step1Color.jsx'
import Step2LouverImage from './components/Step2LouverImage.jsx'
import Step3Building    from './components/Step3Building.jsx'
import Step4Generate    from './components/Step4Generate.jsx'

export default function App() {
  const [step, setStep] = useState(1)

  // ── 전역 상태 ──────────────────────────────────────────────────
  const [selectedColor, setSelectedColor]         = useState(null)
  // { key, label, hex, desc }

  const [louverImage, setLouverImage]             = useState(null)
  // { file, previewUrl } | null

  const [buildingData, setBuildingData]           = useState(null)
  // { file, previewUrl, source: 'photo'|'pdf', markers: [{x,y}], markedDataUrl }

  const [serverStatus, setServerStatus]           = useState('checking')
  // 'checking' | 'ready' | 'loading' | 'error'

  // ── 서버 상태 폴링 ────────────────────────────────────────────
  useEffect(() => {
    let timer
    async function poll() {
      try {
        const res  = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(4000) })
        const data = await res.json()
        setServerStatus(data.pipe_ready ? 'ready' : 'loading')
      } catch {
        setServerStatus('error')
      }
      timer = setTimeout(poll, 8000)
    }
    poll()
    return () => clearTimeout(timer)
  }, [])

  // ── 스텝 이동 가드 ────────────────────────────────────────────
  function canGoTo(n) {
    if (n <= step) return true          // 뒤로는 항상 가능
    if (n === 2) return !!selectedColor
    if (n === 3) return !!selectedColor
    if (n === 4) return !!(selectedColor && buildingData?.markers?.length)
    return false
  }

  function goTo(n) {
    if (canGoTo(n)) setStep(n)
  }

  // ── 스텝 완료 여부 ────────────────────────────────────────────
  function isDone(n) {
    if (n === 1) return !!selectedColor
    if (n === 2) return !!louverImage
    if (n === 3) return !!(buildingData?.markers?.length)
    return false
  }

  // ── 서버 상태 배지 ────────────────────────────────────────────
  const statusMeta = {
    checking: { cls: 'yellow', label: '서버 확인 중…' },
    ready:    { cls: 'green',  label: 'AI 준비 완료' },
    loading:  { cls: 'yellow', label: '모델 로딩 중' },
    error:    { cls: 'red',    label: '서버 연결 실패' },
  }[serverStatus]

  return (
    <div className="app-shell">
      {/* ── 헤더 ─────────────────────────────────────────────── */}
      <header className="app-header">
        <span style={{ fontSize: '1.5rem' }}>🏢</span>
        <h1>루버강판 AI 시각화</h1>
        <span className="version-badge">AI Inpainting</span>

        <div className="server-status">
          <span className={`status-dot ${statusMeta.cls}`} />
          {statusMeta.label}
        </div>
      </header>

      <main className="app-body">
        {/* ── 스테퍼 ──────────────────────────────────────────── */}
        <nav className="stepper">
          {STEPS.map((s, idx) => {
            const done   = isDone(s.id)
            const active = step === s.id
            const locked = !canGoTo(s.id) && !active && !done

            return (
              <div className="step-item" key={s.id}>
                <div
                  className={`step-pill ${active ? 'active' : done ? 'done' : locked ? 'locked' : ''}`}
                  onClick={() => goTo(s.id)}
                  title={s.label}
                >
                  <span className="step-num">
                    {done && !active ? '✓' : s.icon}
                  </span>
                  <span className="step-label">{s.label}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`step-connector ${isDone(s.id) ? 'done' : ''}`} />
                )}
              </div>
            )
          })}
        </nav>

        {/* ── 스텝 콘텐츠 ─────────────────────────────────────── */}
        {step === 1 && (
          <Step1Color
            selected={selectedColor}
            onSelect={setSelectedColor}
            onNext={() => goTo(2)}
          />
        )}
        {step === 2 && (
          <Step2LouverImage
            image={louverImage}
            onChange={setLouverImage}
            onNext={() => goTo(3)}
            onBack={() => goTo(1)}
          />
        )}
        {step === 3 && (
          <Step3Building
            data={buildingData}
            onChange={setBuildingData}
            onNext={() => goTo(4)}
            onBack={() => goTo(2)}
          />
        )}
        {step === 4 && (
          <Step4Generate
            selectedColor={selectedColor}
            louverImage={louverImage}
            buildingData={buildingData}
            serverReady={serverStatus === 'ready'}
            onBack={() => goTo(3)}
          />
        )}
      </main>
    </div>
  )
}
