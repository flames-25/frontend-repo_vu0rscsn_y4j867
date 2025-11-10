import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronRight, Gauge, ShieldCheck, Smartphone, Car, Zap } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const dark = 'bg-[#1D2430]'
const lightBg = 'bg-[#F5F7FA]'

const Section = ({ children, className = '' }) => (
  <section className={`w-full ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
)

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
)

export default function CarInspectionLanding() {
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [car, setCar] = useState('')
  const [plan, setPlan] = useState('Standard')
  const backend = import.meta.env.VITE_BACKEND_URL

  const submitLead = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch(`${backend}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ car_reference: car, phone, plan })
      })
      const data = await res.json()
      if (res.ok) {
        alert('Thanks! We\'ll contact you shortly.')
        setCar(''); setPhone('')
      } else {
        alert(data.detail || 'Something went wrong')
      }
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${lightBg} text-[#0B1220]`}>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[620px] overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/dRBdpY8aSqcdPO2y/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-[#0B1220]/60 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="text-white max-w-3xl">
            <FadeIn>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF7F]"></span>
                From Doubt to Decision
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight font-[Manrope]">
                Don&apos;t Buy Someone Else&apos;s Problems.
                <br className="hidden sm:block" />
                Order a Full Pre-Purchase Car Inspection.
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-2xl">
                Our expert will identify hidden defects, accident damage, and legal risks on-site. Get a complete report and confidence in your choice.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#pricing" className="inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold text-[#0B1220] bg-[#00FF7F] hover:brightness-95 transition will-change-transform">
                  Calculate Inspection Cost
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
                <form onSubmit={submitLead} className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="tel" required placeholder="Your phone" className="col-span-2 sm:col-span-2 bg-white/90 text-[#0B1220] placeholder-white/60 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FF7F]" />
                  <button disabled={loading} className="col-span-1 rounded-md px-4 py-3 font-semibold text-[#0B1220] bg-[#00FF7F] hover:brightness-95 transition">{loading? 'Sending...' : 'Get a free consultation'}</button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section>
        <FadeIn>
          <div className="py-16 sm:py-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-[Manrope] text-[#0B1220] mb-10">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {title: 'You Submit a Request', desc: 'Tell us the car and location. We handle the logistics.', icon: Smartphone},
                {title: 'We Travel to the Car', desc: 'Certified expert arrives on-site with pro diagnostics.', icon: Car},
                {title: 'You Get the Full Picture', desc: 'Receive a clear, visual report with go/no-go guidance.', icon: ShieldCheck},
              ].map((s) => (
                <motion.div whileHover={{ y: -4 }} key={s.title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <s.icon className="h-8 w-8 text-[#1D2430]" />
                  <h3 className="mt-4 font-semibold text-xl">{s.title}</h3>
                  <p className="mt-2 text-[#334155]">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Report */}
      <section className={`${dark} text-white`}>
        <Section>
          <FadeIn>
            <div className="py-16 sm:py-20">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="text-[#00FF7F] uppercase tracking-widest text-xs font-semibold">Your Key Tool</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold font-[Manrope]">Clarity in Every Detail</h2>
                  <p className="mt-4 text-white/80">This premium report turns uncertainty into action. Clean visuals, clear scores, and direct recommendations help you negotiate or walk away with confidence.</p>
                  <ul className="mt-6 space-y-3">
                    {[
                      'Body Condition gauge and damage map',
                      'Engine, transmission and electronics health',
                      'Legal history and VIN checks',
                      'Actionable checklist with priorities'
                    ].map(item => (
                      <li key={item} className="flex items-start gap-3"><Check className="h-5 w-5 text-[#00FF7F] mt-0.5" /><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                    <div className="rounded-xl bg-white p-4 shadow-lg">
                      <div className="aspect-[3/2] rounded-lg bg-[#0B1220] text-white p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-white/70">Inspection Report</div>
                          <Gauge className="h-5 w-5" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg bg-white/5 p-4">
                            <div className="text-sm text-white/70">Body Condition</div>
                            <div className="mt-2 text-3xl font-bold">95%</div>
                          </div>
                          <div className="rounded-lg bg-white/5 p-4">
                            <div className="text-sm text-white/70">Electronics</div>
                            <div className="mt-2 text-3xl font-bold">92%</div>
                          </div>
                          <div className="rounded-lg bg-white/5 p-4 col-span-2">
                            <div className="text-sm text-white/70">Checklist</div>
                            <ul className="mt-2 space-y-1 text-sm">
                              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#00FF7F]" /> OBD-II scan: No critical codes</li>
                              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#00FF7F]" /> Paint depth consistent</li>
                              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#00FF7F]" /> VIN clean / no liens</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Section>
      </section>

      {/* What we inspect */}
      <Section>
        <FadeIn>
          <div className="py-16 sm:py-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-[Manrope] text-[#0B1220] mb-10">What We Inspect</h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative">
                <div className="aspect-[3/2] rounded-2xl bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center">
                  <div className="w-4/5 h-2/3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 relative">
                    {[
                      {label: 'Body', top: '10%', left: '50%', points: ['Paint depth', 'Panels alignment', 'Rust check']},
                      {label: 'Engine & Transmission', top: '45%', left: '50%', points: ['OBD-II codes', 'Fluids', 'Test drive']},
                      {label: 'Electronics', top: '30%', left: '70%', points: ['Sensors', 'Battery health', 'Lighting']},
                      {label: 'Legal History', top: '65%', left: '30%', points: ['VIN check', 'Title status', 'Stolen record']},
                    ].map((z) => (
                      <div key={z.label} className="group absolute" style={{ top: z.top, left: z.left, transform: 'translate(-50%, -50%)' }}>
                        <div className="h-3 w-3 rounded-full bg-[#00FF7F] ring-2 ring-white shadow"></div>
                        <div className="opacity-0 group-hover:opacity-100 transition bg-white text-[#0B1220] rounded-md shadow-lg ring-1 ring-black/5 p-3 text-sm w-56 mt-2">
                          <div className="font-semibold">{z.label}</div>
                          <ul className="mt-1 list-disc list-inside text-[#334155]">
                            {z.points.map(p => <li key={p}>{p}</li>)}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  {title:'Body', desc:'Paint depth, structural integrity, accidental repairs.'},
                  {title:'Engine & Transmission', desc:'Diagnostic scan, leaks, wear, and road test impressions.'},
                  {title:'Electronics', desc:'Battery, sensors, control modules, and functional checks.'},
                  {title:'Legal History', desc:'VIN, ownership, liens, stolen record, recall status.'},
                ].map(item => (
                  <div key={item.title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                    <h3 className="font-semibold text-xl">{item.title}</h3>
                    <p className="mt-2 text-[#334155]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Pricing */}
      <Section className="pb-4">
        <FadeIn>
          <div id="pricing" className="py-16 sm:py-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-[Manrope] text-[#0B1220] mb-10">Transparent Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {name:'Basic', price:'$99', features:['On-site visual check','OBD-II scan','Photo summary']},
                {name:'Standard', price:'$169', featured:true, features:['Full 120-point inspection','Road test','Premium PDF report']},
                {name:'Premium', price:'$249', features:['All Standard features','Paint depth map','Negotiation assistance']},
              ].map(card => (
                <motion.div whileHover={{ y: -6 }} key={card.name} className={`rounded-2xl p-6 ring-1 ring-black/5 bg-white shadow-sm relative ${card.featured? 'outline outline-2 outline-[#00FF7F]':''}`}>
                  {card.featured && (<span className="absolute -top-3 right-4 text-xs bg-[#00FF7F] text-[#0B1220] font-semibold px-2 py-1 rounded">Recommended</span>)}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{card.name}</h3>
                    <Zap className="h-5 w-5 text-[#1D2430]" />
                  </div>
                  <div className="mt-4 text-4xl font-extrabold">{card.price}</div>
                  <ul className="mt-4 space-y-2 text-[#334155]">
                    {card.features.map(f => (
                      <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#00FF7F]" /> {f}</li>
                    ))}
                  </ul>
                  <button onClick={()=>setPlan(card.name)} className="mt-6 w-full rounded-md px-4 py-3 font-semibold text-[#0B1220] bg-[#00FF7F] hover:brightness-95 transition">Choose Plan</button>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Testimonials */}
      <section className={`${dark} text-white`}>
        <Section>
          <FadeIn>
            <div className="py-16 sm:py-20">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-[Manrope] mb-10">Real Stories, Real Savings.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {title:'Skoda Octavia / Saved $1,200', quote:'Hidden front-end repair revealed. Negotiated the price down and walked away from a risky deal.'},
                  {title:'BMW 3-Series / Saved $2,450', quote:'Transmission codes and repaint detected. Client opted for a cleaner example.'},
                  {title:'Toyota Camry / Saved $800', quote:'Minor issues only. Proceeded with confidence and peace of mind.'},
                ].map((t) => (
                  <motion.div whileHover={{ y: -4 }} key={t.title} className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10">
                    <div className="h-10 w-10 rounded-full bg-white/10 mb-4" />
                    <div className="font-semibold">{t.title}</div>
                    <p className="mt-2 text-white/80">“{t.quote}”</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Section>
      </section>

      {/* Final form */}
      <Section>
        <FadeIn>
          <div className="py-16 sm:py-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-[Manrope] text-[#0B1220]">Ready to Make a Confident Choice?</h2>
                <p className="mt-4 text-[#334155]">Share the car link or model and your phone number. We’ll reach out with a free consultation.</p>
              </div>
              <form onSubmit={submitLead} className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-black/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input value={car} onChange={(e)=>setCar(e.target.value)} required placeholder="Car Ad Link or Model" className="bg-slate-50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FF7F]" />
                  <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="tel" required placeholder="Your Phone Number" className="bg-slate-50 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00FF7F]" />
                </div>
                <div className="mt-3 text-sm text-[#334155]">Selected plan: <span className="font-semibold">{plan}</span></div>
                <button disabled={loading} className="mt-4 w-full rounded-md px-4 py-3 font-semibold text-[#0B1220] bg-[#00FF7F] hover:brightness-95 transition">{loading? 'Submitting...' : 'Get My Free Consultation'}</button>
              </form>
            </div>
          </div>
        </FadeIn>
      </Section>

      <footer className="py-8 text-center text-sm text-[#334155]">© {new Date().getFullYear()} Precision Auto Inspection — Clarity • Confidence • Control</footer>
    </div>
  )
}
