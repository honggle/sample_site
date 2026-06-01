import { useState, useRef } from 'react'
import { API_BASE } from '../constants.js'

export default function AskTest() {
  const [image1, setImage1]   = useState(null)   // { file, url }
  const [image2, setImage2]   = useState(null)
  const [prompt, setPrompt]   = useState('')
  const [imgGuidance, setImgGuidance] = useState(1.5)
  const [txtGuidance, setTxtGuidance] = useState(7.5)
  const [steps, setSteps]     = useState(30)
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)   // { result_image, elapsed, device, mode, prompt, image2_color }
  const [error, setError]     = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const timerRef              = useRef(null)
  const input1Ref             = useRef(null)
  const input2Ref             = useRef(null)

  function handleFile(file, setter) {
    if (!file || !file.type.startsWith('image/')) return
    setter({ file, url: URL.createObjectURL(file) })
  }

  function clear1() { if (image1?.url) URL.revokeObjectURL(image1.url); setImage1(null) }
  function clear2() { if (image2?.url) URL.revokeObjectURL(image2.url); setImage2(null) }

  async function handleSubmit() {
    if (!image1) { alert('사진 1은 필수입니다.'); return }
    if (!prompt.trim()) { alert('프롬프트를 입력하세요.'); return }

    setLoading(true)
    setResult(null)
    setError(null)
    setElapsed(0)

    timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000)

    try {
      const fd = new FormData()
      fd.append('image1', image1.file)
      fd.append('prompt', prompt.trim())
      fd.append('image_guidance', imgGuidance)
      fd.append('text_guidance', txtGuidance)
      fd.append('steps', steps)
      if (image2?.file) fd.append('image2', image2.file)

      const res  = await fetch(`${API_BASE}/ask`, { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail ?? '서버 오류')
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      clearInterval(timerRef.current)
      setLoading(false)
    }
  }

  function download() {
    if (!result) return
    const a = document.createElement('a')
    a.href = result.result_image
    a.download = `ask_result_${Date.now()}.jpg`
    a.click()
  }

  const sliderStyle = { width: '100%', accentColor: 'var(--primary)' }

  return (
    <div className="card">
      <div className="card-title">AI 직접 테스트</div>
      <div className="card-sub">
        사진과 프롬프트를 직접 입력해서 AI 결과를 확인합니다.
        사진 2는 선택사항으로, 참고 이미지의 색상이 프롬프트에 자동 반영됩니다.
      </div>

      {/* 이미지 업로드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {/* 사진 1 */}
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 6 }}>
            사진 1 <span style={{ color: 'var(--danger)' }}>*필수</span>
          </div>
          {!image1 ? (
            <div
              className="dropzone"
              style={{ padding: '24px 12px', minHeight: 120 }}
              onClick={() => input1Ref.current?.click()}
            >
              <input ref={input1Ref} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => { handleFile(e.target.files[0], setImage1); e.target.value = '' }} />
              <div className="dz-icon" style={{ fontSize: '1.8rem' }}>&#128247;</div>
              <div className="dz-title" style={{ fontSize: '0.85rem' }}>클릭하여 업로드</div>
            </div>
          ) : (
            <div style={{ position: 'relative', width: 'fit-content', maxWidth: '100%' }}>
              <img src={image1.url} alt="사진1"
                style={{ display: 'block', maxWidth: '100%', maxHeight: 180,
                  borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
              <button onClick={clear1}
                style={{ position: 'absolute', top: 6, right: 6, width: 26, height: 26,
                  borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: '#fff',
                  border: 'none', cursor: 'pointer', fontSize: '0.8rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                &#x2715;
              </button>
            </div>
          )}
        </div>

        {/* 사진 2 */}
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 6 }}>
            사진 2 <span style={{ opacity: 0.5 }}>선택 (참고 이미지)</span>
          </div>
          {!image2 ? (
            <div
              className="dropzone"
              style={{ padding: '24px 12px', minHeight: 120 }}
              onClick={() => input2Ref.current?.click()}
            >
              <input ref={input2Ref} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => { handleFile(e.target.files[0], setImage2); e.target.value = '' }} />
              <div className="dz-icon" style={{ fontSize: '1.8rem' }}>&#128444;</div>
              <div className="dz-title" style={{ fontSize: '0.85rem' }}>클릭하여 업로드</div>
              <div className="dz-sub">색상/질감 참고용</div>
            </div>
          ) : (
            <div style={{ position: 'relative', width: 'fit-content', maxWidth: '100%' }}>
              <img src={image2.url} alt="사진2"
                style={{ display: 'block', maxWidth: '100%', maxHeight: 180,
                  borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
              <button onClick={clear2}
                style={{ position: 'absolute', top: 6, right: 6, width: 26, height: 26,
                  borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: '#fff',
                  border: 'none', cursor: 'pointer', fontSize: '0.8rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                &#x2715;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 프롬프트 */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
          프롬프트 <span style={{ color: 'var(--danger)' }}>*필수</span>
          <span style={{ marginLeft: 8, opacity: 0.6 }}>(영문 권장)</span>
        </label>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="예: Install dark gray horizontal louver steel panels on the exterior wall of this building. Keep the rest exactly the same."
          rows={3}
          style={{
            width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)',
            borderRadius: 8, color: 'var(--text)', padding: '10px 14px',
            fontSize: '0.85rem', fontFamily: 'inherit', resize: 'vertical',
            outline: 'none', lineHeight: 1.6,
          }}
          onFocus={e => e.target.style.borderColor = 'var(--primary)'}
          onBlur={e  => e.target.style.borderColor = 'var(--border)'}
        />
        <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            'Install dark gray horizontal louver steel panels on the exterior wall. Keep the rest exactly the same.',
            'Apply zinc silver metal cladding panels to the marked building facade. Photorealistic.',
            'Replace the building wall with horizontal wooden louver panels. Same viewpoint.',
          ].map((t, i) => (
            <button key={i} onClick={() => setPrompt(t)}
              style={{ fontSize: '0.72rem', background: 'var(--surface2)', border: '1px solid var(--border)',
                color: 'var(--text-muted)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
              예시 {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 파라미터 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24,
        background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
            원본 유지 강도: <strong style={{ color: 'var(--primary)' }}>{imgGuidance}</strong>
          </label>
          <input type="range" min="1" max="3" step="0.1" value={imgGuidance}
            onChange={e => setImgGuidance(parseFloat(e.target.value))} style={sliderStyle} />
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>높을수록 원본 유지</div>
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
            프롬프트 반영: <strong style={{ color: 'var(--primary)' }}>{txtGuidance}</strong>
          </label>
          <input type="range" min="1" max="15" step="0.5" value={txtGuidance}
            onChange={e => setTxtGuidance(parseFloat(e.target.value))} style={sliderStyle} />
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>높을수록 지시 강하게</div>
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
            스텝 수: <strong style={{ color: 'var(--primary)' }}>{steps}</strong>
          </label>
          <input type="range" min="10" max="50" step="5" value={steps}
            onChange={e => setSteps(parseInt(e.target.value))} style={sliderStyle} />
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>높을수록 품질↑ 속도↓</div>
        </div>
      </div>

      {/* 버튼 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={loading}>
          {loading ? '생성 중...' : 'AI 생성'}
        </button>
        {loading && (
          <>
            <div className="spinner" style={{ width: 22, height: 22, borderWidth: 3 }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{elapsed}초 경과</span>
          </>
        )}
      </div>

      {/* 에러 */}
      {error && (
        <div className="alert alert-warn" style={{ marginBottom: 16 }}>
          <span>&#9888;</span>
          <div><strong>오류:</strong> {error}</div>
        </div>
      )}

      {/* 결과 */}
      {result && (
        <div>
          {/* 메타 정보 */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              ['소요시간', `${result.elapsed}초`],
              ['디바이스', result.device?.toUpperCase()],
              ['모드', result.mode],
              result.image2_color && ['사진2 색상', `RGB(${result.image2_color.join(',')})`],
            ].filter(Boolean).map(([k, v]) => (
              <div key={k} style={{ background: 'var(--surface2)', border: '1px solid var(--border)',
                borderRadius: 6, padding: '8px 14px', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <br /><strong>{v}</strong>
              </div>
            ))}
          </div>

          {/* 원본 / 결과 비교 */}
          <div className="result-compare">
            <div className="result-img-wrap">
              <div className="result-img-label">원본 (사진 1)</div>
              <img className="result-img" src={image1?.url} alt="원본" />
            </div>
            <div className="result-img-wrap">
              <div className="result-img-label">AI 결과</div>
              <img className="result-img" src={result.result_image} alt="AI 결과" />
            </div>
          </div>

          {/* 사용된 프롬프트 */}
          <details style={{ marginTop: 14 }}>
            <summary style={{ fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              전송된 프롬프트 보기
            </summary>
            <div style={{ marginTop: 8, padding: '10px 14px', background: 'var(--surface2)',
              borderRadius: 6, fontSize: '0.75rem', color: 'var(--text-muted)',
              lineHeight: 1.7, wordBreak: 'break-all' }}>
              {result.prompt}
            </div>
          </details>

          {/* 다운로드 */}
          <div style={{ marginTop: 14 }}>
            <button className="btn btn-primary" onClick={download}>
              &#8595; 결과 다운로드
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
