"use client";

export default function PixelWalkScene() {
  return (
    <section className="pixel-scene" aria-label="蜡笔小新牵着小白走过草坪的像素动画">
      <div className="pixel-sun" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="pixel-cloud cloud-one" aria-hidden="true"><i /><i /><i /></div>
      <div className="pixel-cloud cloud-two" aria-hidden="true"><i /><i /><i /></div>
      <div className="pixel-skyline" aria-hidden="true">
        {[42,68,52,88,61,110,76,48,94,57,81,66,104,53,74,92].map((height, index) => <i key={index} style={{ height }} />)}
      </div>
      <div className="pixel-grass-back" aria-hidden="true" />
      <div className="pixel-grass" aria-hidden="true" />

      <div className="pixel-walkers" aria-hidden="true">
        <svg viewBox="0 0 240 120" shapeRendering="crispEdges">
          <g className="pixel-boy">
            <path fill="#16130f" d="M35 16h34v7h10v13H30V23h5Z" />
            <path fill="#f0bd8e" d="M31 33h46v28H67v8H39v-8h-8Z" />
            <rect fill="#16130f" x="39" y="35" width="14" height="5" />
            <rect fill="#16130f" x="59" y="34" width="14" height="5" />
            <rect fill="#16130f" x="46" y="43" width="4" height="5" />
            <rect fill="#16130f" x="66" y="42" width="4" height="5" />
            <rect fill="#d86b53" x="46" y="55" width="19" height="4" />
            <path fill="#e64b39" d="M35 67h39l8 29H29Z" />
            <path className="pixel-arm arm-left" fill="#f0bd8e" d="M29 69h8v25h-8Z" />
            <path className="pixel-arm arm-right" fill="#f0bd8e" d="M73 69h8v20h8v7H76Z" />
            <path fill="#f4d348" d="M34 94h39v13H34Z" />
            <g className="pixel-leg leg-left"><rect fill="#f0bd8e" x="38" y="105" width="9" height="11"/><rect fill="#222" x="32" y="115" width="17" height="5"/></g>
            <g className="pixel-leg leg-right"><rect fill="#f0bd8e" x="61" y="105" width="9" height="11"/><rect fill="#222" x="60" y="115" width="18" height="5"/></g>
          </g>

          <path className="pixel-leash" d="M87 91 151 83" />

          <g className="pixel-dog">
            <path fill="#f8f5ed" stroke="#28231f" strokeWidth="3" d="M151 75h43l11 12v20h-10v10h-9v-10h-27v10h-9v-12h-9V88Z" />
            <path fill="#f8f5ed" stroke="#28231f" strokeWidth="3" d="M190 62h26l11 10v23h-33l-9-10V70Z" />
            <path fill="#28231f" d="M190 63h10v17h-8Z" />
            <rect fill="#28231f" x="211" y="72" width="5" height="5" />
            <rect fill="#28231f" x="221" y="82" width="7" height="5" />
            <path className="pixel-tail" fill="none" stroke="#28231f" strokeWidth="4" d="M151 83c-15-5-16-18-7-23 6-4 12 1 7 7" />
            <g className="dog-leg dog-leg-one"><rect fill="#f8f5ed" stroke="#28231f" strokeWidth="2" x="158" y="101" width="9" height="17" /></g>
            <g className="dog-leg dog-leg-two"><rect fill="#f8f5ed" stroke="#28231f" strokeWidth="2" x="187" y="101" width="9" height="17" /></g>
          </g>
        </svg>
      </div>
      <div className="pixel-caption"><span>MY WORLD · WALKING DAY</span><span>KEEP MOVING →</span></div>
    </section>
  );
}
