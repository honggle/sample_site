import { useRef, useState } from 'react'

export default function Step2LouverImage({ image, onChange, onNext, onBack }) {
  const inputRef        = useRef(null)
  const replaceInputRef = useRef(null)
  const [drag, setDrag] = useState(false)

  function handleFile(file) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }
    if (image?.previewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(image.previewUrl)
    }
    const url = URL.createObjectURL(file)
    onChange({ file, previewUrl: url })
  }

  function onDrop(e) {
    e.preventDefault()
    setDrag(false)
    handleFile(e.dataTransfer.files[0])
  }

  function onRemove(e) {
    e.preventDefault()
    e.stopPropagation()
    if (image?.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(image.previewUrl)
    onChange(null)
    if (inputRef.current)        inputRef.current.value = ''
    if (replaceInputRef.current) replaceInputRef.current.value = ''
  }

  return (
    <div className="card">
      <div className="card-title">2단계 - 루버강판 샘플 이미지</div>
      <div className="card-sub">
        시공할 루버강판의 실물 샘플 사진을 업로드하면 AI가 색감, 질감을
        분석해 더 정확한 결과를 생성합니다.
        <br />
        <em style={{ color: 'var(--primary)' }}>선택 사항 - 건너뛸 수 있습니다.</em>
      </div>

      {!image ? (
        <div
          className={`dropzone ${drag ? 'dragover' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
          onDragLeave={(e) => { e.preventDefault(); setDrag(false) }}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => { handleFile(e.target.files[0]); e.target.value = '' }}
          />
          <div className="dz-icon">&#128247;</div>
          <div className="dz-title">루버강판 샘플 이미지 업로드</div>
          <div className="dz-sub">클릭하거나 파일을 드래그하세요 · JPG, PNG</div>
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          <div style={{ position: 'relative', display: 'block', width: 'fit-content', maxWidth: '100%' }}>
            <img
              src={image.previewUrl}
              alt="루버강판 샘플"
              style={{
                display:      'block',
                maxWidth:     '100%',
                maxHeight:    '260px',
                borderRadius: 'var(--radius)',
                border:       '1px solid var(--border)',
              }}
            />
            <button
              onClick={onRemove}
              style={{
                position:       'absolute',
                top:            6,
                right:          6,
                width:          28,
                height:         28,
                borderRadius:   '50%',
                background:     'rgba(0,0,0,0.55)',
                color:          '#fff',
                border:         'none',
                cursor:         'pointer',
                fontSize:       '0.85rem',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                lineHeight:     1,
              }}
              title="이미지 제거"
            >
              &#x2715;
            </button>
          </div>

          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              &#10003; 샘플 이미지 업로드됨
            </span>
            <label
              style={{
                fontSize:       '0.8rem',
                color:          'var(--primary)',
                cursor:         'pointer',
                textDecoration: 'underline',
              }}
            >
              이미지 교체
              <input
                ref={replaceInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => { handleFile(e.target.files[0]); e.target.value = '' }}
              />
            </label>
          </div>
        </div>
      )}

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>&#8592; 이전</button>
        <button className="btn btn-secondary" onClick={onNext}>건너뛰기</button>
        <button className="btn btn-primary btn-lg" onClick={onNext}>다음 단계 &#8594;</button>
      </div>
    </div>
  )
}
