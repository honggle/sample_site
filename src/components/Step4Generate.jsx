import { useState } from 'react'
import { API_BASE, LOUVER_COLORS } from '../constants.js'

export default function Step4Generate({ selectedColor, louverImage, buildingData, serverReady, onBack }) {
  const [loading, setLoading]       = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [result, setResult]         = useState(null)
  const [error, setError]           = useState(null)

  async function handleGenerate() {
    if (!serverReady) { alert('AI 모델이 아직 로딩 중입니다. 잠시 후 다시 시도해주세요.'); return }
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      setLoadingMsg('이미지 준비 중...')

      const fd = new FormData()
      fd.append('color_key', selectedColor.key)
      fd.append('markers',   JSON.stringify(buildingData.markers))

      if (buildingData.file) {
        fd.append('building_file', buildingData.file)
      } else if (buildingData.previewUrl) {
        fd.append('preview_b64', buildingData.previewUrl)
      }

      if (buildingData.markedDataUrl) {
        fd.append('marked_preview', buildingData.markedDataUrl)
      }

      if (louverImage?.file) {
        fd.append('louver_file', louverImage.file)
      }

      setLoadingMsg('AI 생성 중... (기기 성능에 따라 상이)')
      const res = await fetch(`${API_BASE}/generate`, { method: 'POST', body: fd })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail ?? '서버 오류')
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setLoadingMsg('')
    }
  }

  function downloadResult() {
    if (!result) return
    const a    = document.createElement('a')
    a.href     = result.image
    a.download = `louver_${selectedColor.key}_${Date.now()}.jpg`
    a.click()
  }

  return (
    <div className="card">
      <div className="card-title">4단계 - AI 시공 예상 이미지 생성</div>
      <div className="card-sub">
        선택한 내용을 확인하고 AI 생성을 시작하세요.
        체크 표시한 외벽에만 루버강판이 시공된 이미지가 생성됩니다.
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="s-label">루버강판 색상</div>
          <div className="s-value">
            {selectedColor ? (
              <div className="color-preview-chip">
                <div className="color-chip-dot" style={{ background: selectedColor.hex }} />
                {selectedColor.label}
              </div>
            ) : '-'}
          </div>
        </div>

        <div className="summary-card">
          <div className="s-label">강판 샘플 이미지</div>
          <div className="s-value">
            {louverImage
              ? <span style={{ color: 'var(--primary)' }}>업로드됨</span>
              : <span style={{ color: 'var(--text-muted)' }}>없음</span>}
          </div>
        </div>

        <div className="summary-card">
          <div className="s-label">건물 이미지 소스</div>
          <div className="s-value">
            {buildingData?.source === 'pdf' ? 'PDF 도면' : '건물 사진'}
          </div>
        </div>

        <div className="summary-card">
          <div className="s-label">체크 위치 수</div>
          <div className="s-value" style={{ color: 'var(--primary)' }}>
            {buildingData?.markers?.length ?? 0}개
          </div>
        </div>
      </div>

      {buildingData?.previewUrl && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8 }}>
            체크 표시된 원본 이미지
          </div>
          <img
            src={buildingData.markedDataUrl ?? buildingData.previewUrl}
            alt="체크 표시 원본"
            style={{
              maxWidth: '100%', maxHeight: 300,
              borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'block',
            }}
          />
        </div>
      )}

      {error && (
        <div className="alert alert-warn" style={{ marginBottom: 16 }}>
          <span>&#9888;</span>
          <div><strong>생성 실패:</strong> {error}</div>
        </div>
      )}

      {!result && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary btn-lg"
            disabled={loading || !serverReady}
            onClick={handleGenerate}
          >
            {loading ? '생성 중...' : 'AI 시공 이미지 생성'}
          </button>
          {!serverReady && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              AI 모델 로딩 중 - 잠시 기다려주세요
            </span>
          )}
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <div className="loading-text">{loadingMsg}</div>
          <div className="loading-sub">CPU 환경에서는 수초~수십초 소요될 수 있습니다</div>
        </div>
      )}

      {result && (
        <div className="result-section">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12, marginBottom: 16,
          }}>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)' }}>
                생성 완료
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                {result.elapsed}초 소요 · {result.device?.toUpperCase()} · {result.markers}개 외벽 시공
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" onClick={downloadResult}>
                &#8595; 이미지 다운로드
              </button>
              <button className="btn btn-secondary" onClick={() => { setResult(null); setError(null) }}>
                재생성
              </button>
            </div>
          </div>

          <div className="result-compare">
            <div className="result-img-wrap">
              <div className="result-img-label">원본</div>
              <img className="result-img" src={buildingData.previewUrl} alt="원본" />
            </div>
            <div className="result-img-wrap">
              <div className="result-img-label">루버강판 시공 후 (AI 생성)</div>
              <img className="result-img" src={result.image} alt="AI 생성 결과" />
            </div>
          </div>

          <details style={{ marginTop: 16 }}>
            <summary style={{ fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              적용 색상 정보 보기
            </summary>
            <div style={{
              marginTop: 8, padding: '10px 14px', background: 'var(--surface2)',
              borderRadius: 6, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.7,
            }}>
              색상 키: {result.color} / RGB: {result.color_rgb?.join(', ')} / 모드: {result.mode}
            </div>
          </details>
        </div>
      )}

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>&#8592; 이전</button>
      </div>
    </div>
  )
}
