import React, { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const PARTICLE_COUNT = 9000

function ParticleFace({ isMobile }) {
  const ref    = useRef()
  const { camera } = useThree()
  const mouse  = useRef(new THREE.Vector2(9999, 9999))

  const gltf = useGLTF('/head.glb')

  useEffect(() => {
    if (ref.current) ref.current.rotation.y = Math.PI * 0.35
    const fn = (e) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  const [buffGeo, origPos, vels] = useMemo(() => {
    let srcGeo = null
    gltf.scene.traverse(obj => {
      if (obj.isMesh && !srcGeo) srcGeo = obj.geometry
    })
    if (!srcGeo) return [null, null, null]

    srcGeo.computeBoundingBox()
    const box = srcGeo.boundingBox
    const cx  = (box.min.x + box.max.x) / 2
    const cy  = (box.min.y + box.max.y) / 2
    const cz  = (box.min.z + box.max.z) / 2
    const sizeY = box.max.y - box.min.y
    const SCALE = 4.0 / sizeY

    const rawPos = srcGeo.attributes.position
    const total  = rawPos.count
    const sampled = new Float32Array(PARTICLE_COUNT * 3)
    const colors  = new Float32Array(PARTICLE_COUNT * 3)

    let minZ = Infinity, maxZ = -Infinity
    for (let i = 0; i < total; i++) {
      const z = (rawPos.getZ(i) - cz) * SCALE
      if (z < minZ) minZ = z
      if (z > maxZ) maxZ = z
    }
    const zRange = maxZ - minZ

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = Math.floor(Math.random() * total)
      const x = (rawPos.getX(idx) - cx) * SCALE
      const y = (rawPos.getY(idx) - cy) * SCALE
      const z = (rawPos.getZ(idx) - cz) * SCALE
      sampled[i * 3]     = x
      sampled[i * 3 + 1] = y
      sampled[i * 3 + 2] = z
      
      const tX = (x / (SCALE * 0.8)) * 0.5 + 0.5 
      const br = Math.min(1.0, Math.max(0.12, 0.25 + ((z - minZ) / zRange) * 0.80))
      
      colors[i * 3]     = br * (0.68 * tX)
      colors[i * 3 + 1] = br * (0.95 * (1 - tX))
      colors[i * 3 + 2] = br * 1.0
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(sampled, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    return [geo, new Float32Array(sampled), new Float32Array(PARTICLE_COUNT * 3)]
  }, [gltf])

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [])

  const raycaster  = useMemo(() => new THREE.Raycaster(), [])
  const plane      = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const mw         = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (!ref.current || !buffGeo) return
    ref.current.rotation.y += delta * 0.20

    raycaster.setFromCamera(mouse.current, camera)
    raycaster.ray.intersectPlane(plane, mw)
    const lm  = ref.current.worldToLocal(mw.clone())
    const arr = buffGeo.attributes.position.array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const dx = lm.x - arr[i3], dy = lm.y - arr[i3 + 1]
      const d  = Math.sqrt(dx * dx + dy * dy)

      if (d < 2.0 && d > 0.001) {
        const p = (2.0 - d) / 2.0
        vels[i3]     -= (dx / d) * p * 2.2 * delta * 60
        vels[i3 + 1] -= (dy / d) * p * 2.2 * delta * 60
        vels[i3 + 2] -= p * 0.7 * delta * 60
      }
      vels[i3]     += (origPos[i3]     - arr[i3])     * 0.10
      vels[i3 + 1] += (origPos[i3 + 1] - arr[i3 + 1]) * 0.10
      vels[i3 + 2] += (origPos[i3 + 2] - arr[i3 + 2]) * 0.10
      vels[i3]     *= 0.87; vels[i3 + 1] *= 0.87; vels[i3 + 2] *= 0.87
      arr[i3]     += vels[i3]
      arr[i3 + 1] += vels[i3 + 1]
      arr[i3 + 2] += vels[i3 + 2]
    }
    buffGeo.attributes.position.needsUpdate = true
  })

  if (!buffGeo) return null
  return <points ref={ref} geometry={buffGeo} material={material} position={isMobile ? [0, 0.5, 0] : [0, 0, 0]} />
}

function FallbackSphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#00f2ff" wireframe />
    </mesh>
  )
}

export default function ThreeScene() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      zIndex: 0, background: '#050505',
      pointerEvents: 'none',
    }}>
      <Canvas camera={{ position: [0, 0, isMobile ? 10 : 7], fov: 40 }}>
        <Suspense fallback={<FallbackSphere />}>
          <ParticleFace isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/head.glb')
