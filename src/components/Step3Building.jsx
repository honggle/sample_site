import { useRef, useState } from 'react'
import { API_BASE } from '../constants.js'
import CanvasMarker from './CanvasMarker.jsx'

export default function Step3Building({ data, onChange, onNext, onBack }) {
  const [tab, setTab]         = useState('photo')
  const [loading, setLoading] = useState(false)
  const [drag, setDrag]       = useState(false)
  const canvasRef             = useRef(null)
  const photoInputRef         = useRef(null)
  const pdfInputRef           = useRef(null)

  function handlePhotoFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    onChange({ file, previewUrl: url, source: 'photo', markers: [], markedDataUrl: null })
  }

  async function handlePdfFile(file) {
    if (!file) return
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('pdf_file', file)
      const res = await fetch(`${API_BASE}/pdf-to-image`, { method: 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).detail ?? '변환 실패')
      const { image } = await res.json()
      onChange({ file: null, previewUrl: image, source: 'pdf', markers: [], markedDataUrl: null })
    } catch (err) {
      alert(`PDF 변환 오류: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  function onMarkersChange(newMarkers) {
    const exp = canvasRef.current?.getExport()
    onChange(prev => ({
      ...prev,
      markers:       newMarkers,
      markedDataUrl: exp?.dataUrl ?? null,
    }))
  }

  function removeImage() {
    if (data?.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(data.previewUrl)
    onChange(null)
  }

  function clearAll()  { canvasRef.current?.clearMarkers() }
  function undoLast()  { canvasRef.current?.undoLast() }

  const hasImage   = !!data?.previewUrl
  const hasMarkers = (data?.markers?.length ?? 0) > 0
  const canProceed = hasImage && hasMarkers

  return (
    <div className="card">
      <div className="card-title">3단계 - 건물 이미지 선택 및 외관 표시</div>
      <div className="card-sub">
        건물 사진을 업로드하거나 건축 도면(PDF)에서 이미지를 추출한 뒤,
        루버강판을 시공할 외벽을 <strong style={{ color: 'var(--primary)' }}>클릭</strong>하여 체크 표시하세요.
      </div>

      <div className="tab-bar">
        <button
          className={`tab-btn ${tab === 'photo' ? 'active' : ''}`}
          onClick={() => { setTab('photo'); removeImage() }}
        >
          건물 사진
        </button>
        <button
          className={`tab-btn ${tab === 'pdf' ? 'active' : ''}`}
          onClick={() => { setTab('pdf'); removeImage() }}
        >
          건축 도면 (PDF)
        </button>
      </div>

      {tab === 'photo' && !hasImage && (
        <div
          className={`dropzone ${drag ? 'dragover' : ''}`}
          onClick={() => photoInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handlePhotoFile(e.dataTransfer.files[0]) }}
          role="button"
          tabIndex={0}
        >
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => { handlePhotoFile(e.target.files[0]); e.target.value = '' }}
          />
          <div className="dz-icon">&#127968;</div>
          <div className="dz-title">건물 사진 업로드</div>
          <div className="dz-sub">클릭하거나 드래그 · JPG, PNG</div>
        </div>
      )}

      {tab === 'pdf' && !hasImage && (
        <div
          className={`dropzone ${drag ? 'dragover' : ''}`}
          onClick={() => pdfInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handlePdfFile(e.dataTransfer.files[0]) }}
          role="button"
          tabIndex={0}
        >
          <input
            ref={pdfInputRef}
            type="file"
            accept=".pdf,application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => { handlePdfFile(e.target.files[0]); e.target.value = '' }}
          />
          <div className="dz-icon">&#128196;</div>
          <div className="dz-title">건축 도면 PDF 업로드</div>
          <div className="dz-sub">첫 번째 페이지를 이미지로 자동 변환합니다 · PDF</div>
        </div>
      )}

      {hasImage && (
        <div>
          <div className="alert alert-info" style={{ marginBottom: 14 }}>
            <span>&#128161;</span>
            <span>
              이미지를 <strong>클릭</strong>하면 체크(&#10003;) 표시가 생깁니다.
              루버강판을 적용할 <strong>외벽 위치</strong>를 모두 표시하세요.
            </span>
          </div>

          <div className="canvas-container">
            <CanvasMarker
              ref={canvasRef}
              imageUrl={data.previewUrl}
              onMarkersChange={onMarkersChange}
            />
          </div>

          <div className="canvas-toolbar">
            {hasMarkers && (
              <span className="marker-badge">
                &#10003; {data.markers.length}개 위치 선택됨
              </span>
            )}
            <button className="btn btn-secondary" onClick={undoLast} disabled={!hasMarkers}>
              &#8617; 마지막 취소
            </button>
            <button className="btn btn-danger" onClick={clearAll} disabled={!hasMarkers}>
              전체 초기화
            </button>
            <button
              className="btn btn-secondary"
              style={{ marginLeft: 'auto' }}
              onClick={removeImage}
            >
              이미지 변경
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
          <div className="spinner" style={{ margin: '0 auto 12px' }} />
          PDF를 이미지로 변환 중...
        </div>
      )}

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>&#8592; 이전</button>
        <button
          className="btn btn-primary btn-lg"
          disabled={!canProceed}
          onClick={onNext}
        >
          다음 단계 &#8594;
        </button>
      </div>
    </div>
  )
}
