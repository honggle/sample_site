import { useRef, useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react'

/**
 * CanvasMarker
 * - imageUrl 이미지를 캔버스에 렌더링
 * - 클릭 시 번호 있는 ✓ 체크 마크 추가
 * - ref.getExport() → { markers: [{x,y}], dataUrl: string }
 */
const CanvasMarker = forwardRef(function CanvasMarker({ imageUrl, onMarkersChange }, ref) {
  const canvasRef  = useRef(null)
  const imageRef   = useRef(null)       // HTMLImageElement 캐시
  const [markers, setMarkers] = useState([])

  // 부모에서 호출 가능한 메서드 노출
  useImperativeHandle(ref, () => ({
    getExport() {
      return {
        markers,
        dataUrl: canvasRef.current?.toDataURL('image/png') ?? null,
      }
    },
    clearMarkers() {
      setMarkers([])
    },
    undoLast() {
      setMarkers(prev => prev.slice(0, -1))
    },
  }), [markers])

  // 이미지 로드
  useEffect(() => {
    if (!imageUrl) return
    const img = new Image()
    img.onload = () => {
      imageRef.current = img
      const canvas = canvasRef.current
      if (!canvas) return
      // 이미지 원본 해상도로 캔버스 설정
      canvas.width  = img.naturalWidth
      canvas.height = img.naturalHeight
      redraw(img, [])
      setMarkers([])
    }
    img.src = imageUrl
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl])

  // 마커 변경 시 재렌더
  useEffect(() => {
    if (imageRef.current) redraw(imageRef.current, markers)
    onMarkersChange?.(markers)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers])

  const redraw = useCallback((img, mkrs) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
    mkrs.forEach((m, i) => {
      drawCheck(ctx, m.x * canvas.width, m.y * canvas.height, i + 1, canvas.width)
    })
  }, [])

  function drawCheck(ctx, cx, cy, num, canvasW) {
    const s = Math.max(24, canvasW * 0.055)   // 크기: 캔버스 너비의 5.5%
    ctx.save()
    ctx.translate(cx, cy)

    // 반투명 배경
    ctx.beginPath()
    ctx.arc(0, 0, s * 0.72, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0,0,0,0.52)'
    ctx.fill()

    // 체크 마크 (✓)
    ctx.strokeStyle = '#00e5bb'
    ctx.lineWidth   = s * 0.19
    ctx.lineCap     = 'round'
    ctx.lineJoin    = 'round'
    ctx.beginPath()
    ctx.moveTo(-s * 0.30,  s * 0.02)
    ctx.lineTo(-s * 0.04,  s * 0.30)
    ctx.lineTo( s * 0.34, -s * 0.26)
    ctx.stroke()

    // 외곽 원
    ctx.beginPath()
    ctx.arc(0, 0, s * 0.72, 0, Math.PI * 2)
    ctx.strokeStyle = '#00e5bb'
    ctx.lineWidth   = s * 0.10
    ctx.stroke()

    // 순번 숫자
    ctx.fillStyle    = '#00e5bb'
    ctx.font         = `bold ${Math.round(s * 0.40)}px sans-serif`
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(String(num), s * 0.84, -s * 0.56)

    ctx.restore()
  }

  function handleClick(e) {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect   = canvas.getBoundingClientRect()
    const scaleX = canvas.width  / rect.width
    const scaleY = canvas.height / rect.height
    const nx     = ((e.clientX - rect.left)  * scaleX) / canvas.width
    const ny     = ((e.clientY - rect.top)   * scaleY) / canvas.height
    setMarkers(prev => [...prev, { x: nx, y: ny }])
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      style={{
        cursor:      'crosshair',
        maxWidth:    '100%',
        maxHeight:   '460px',
        borderRadius:'var(--radius)',
        border:      '1px solid var(--border)',
        display:     'block',
      }}
    />
  )
})

export default CanvasMarker
