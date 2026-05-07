import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function LeadForm({
  isOpen,
  onClose,
}: Props) {

  const [loading, setLoading] =
    useState(false)
    const [submitted, setSubmitted] =
  useState(false)

  const [formData, setFormData] =
    useState({
      name: '',
      phone: '',
      email: '',
      city: '',
      projectType: '',
      automationType: '',
      siteStatus: '',
      message: '',
    })
const whatsappLink =
  'https://wa.me/919422481711?text=Hi%20NeoNest,%20I%20have%20submitted%20a%20smart-home%20consultation%20request.'

  if (!isOpen) return null
if (submitted) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-5">

      <div className="w-full max-w-lg bg-[#121214] border border-white/10 rounded-3xl p-10 text-center animate-fade-in">

        <div className="w-20 h-20 rounded-full bg-[#00E6C8]/10 border border-[#00E6C8]/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-[#00E6C8]">
            ✓
          </span>
        </div>

        <p className="text-[#00E6C8] text-sm tracking-[0.2em] mb-3">
          CONSULTATION REQUEST RECEIVED
        </p>

        <h2 className="text-3xl font-semibold text-white mb-5 leading-tight">
          Thank you for your interest in NeoNest.
        </h2>

        <p className="text-white/65 leading-relaxed mb-8">
          One of our smart-home specialists will connect with you shortly to discuss your project requirements.
        </p>

        <div className="flex flex-col gap-4">

          <a
            href={whatsappLink}
            target="_blank"
            className="w-full bg-[#00E6C8] text-black rounded-2xl py-4 font-semibold hover:opacity-90 transition-all"
          >
            Continue on WhatsApp
          </a>

          <button
            onClick={() => {
              setSubmitted(false)
              onClose()
            }}
            className="text-white/50 hover:text-white transition-all"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  )
}
  const siteOptions =
    formData.automationType ===
      'Wireless Automation'
      ? [
          'Under Construction',
          'Under Interior',
          'Ready for Setup',
        ]
      : [
          'Under Construction',
          'Under Interior',
        ]

  const showRecommendation =
    formData.automationType ===
      'Wired Automation' &&
    formData.siteStatus ===
      'Ready for Setup'
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setLoading(true)

    try {

      await fetch(
        'https://script.google.com/macros/s/AKfycbxKX_GhZMAhbGHrWVG9VklutlhrfXQkEJQs_sX6xh5X0b2yTzCM-oWU31tdh1TWCwEzSg/exec',
        {
          method: 'POST',
          body: JSON.stringify(formData),
        }
      )

      setSubmitted(true)

      

    } catch (error) {

      alert(
        'Something went wrong.'
      )
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-5">

      <div className="w-full max-w-2xl bg-[#121214] border border-white/10 rounded-3xl p-8 max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between mb-8">

          <div>
            <p className="text-[#00E6C8] text-sm mb-2">
              FREE CONSULTATION
            </p>

            <h2 className="text-3xl font-semibold text-white">
              Plan Your Smart Home
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            required
            placeholder="Full Name"
            className="w-full bg-[#1A1A1D] border border-white/10 rounded-2xl px-5 py-4 text-white"
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <input
            type="tel"
            required
            placeholder="Phone Number"
            className="w-full bg-[#1A1A1D] border border-white/10 rounded-2xl px-5 py-4 text-white"
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />

          <input
            type="email"
            required
            placeholder="Email Address"
            className="w-full bg-[#1A1A1D] border border-white/10 rounded-2xl px-5 py-4 text-white"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="City"
            className="w-full bg-[#1A1A1D] border border-white/10 rounded-2xl px-5 py-4 text-white"
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value,
              })
            }
          />

          <select
            required
            className="w-full bg-[#1A1A1D] border border-white/10 rounded-2xl px-5 py-4 text-white"
            onChange={(e) =>
              setFormData({
                ...formData,
                projectType: e.target.value,
              })
            }
          >
            <option value="">
              Select Project Type
            </option>

            <option>
              Villa
            </option>

            <option>
              Bungalow
            </option>

            <option>
              Apartment
            </option>

            <option>
              Demo Center
            </option>

            <option>
              Office
            </option>

            <option>
              Commercial Space
            </option>
          </select>

          <select
            required
            className="w-full bg-[#1A1A1D] border border-white/10 rounded-2xl px-5 py-4 text-white"
            onChange={(e) =>
              setFormData({
                ...formData,
                automationType:
                  e.target.value,
                siteStatus: '',
              })
            }
          >
            <option value="">
              Select Automation Type
            </option>

            <option>
              Wired Automation
            </option>

            <option>
              Wireless Automation
            </option>

            <option>
              Hybrid Automation
            </option>
          </select>

          {formData.automationType && (
            <select
              required
              className="w-full bg-[#1A1A1D] border border-white/10 rounded-2xl px-5 py-4 text-white"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  siteStatus:
                    e.target.value,
                })
              }
            >
              <option value="">
                Present Site Status
              </option>

              {siteOptions.map(
                (option) => (
                  <option key={option}>
                    {option}
                  </option>
                )
              )}
            </select>
          )}

          {showRecommendation && (
            <div className="bg-[#00E6C8]/10 border border-[#00E6C8]/20 rounded-2xl p-4 text-sm text-[#B6FFF4]">
              Wireless automation is generally recommended for ready homes to avoid major rewiring and wall modifications.
            </div>
          )}

          <textarea
            rows={5}
            placeholder="Tell us about your project"
            className="w-full bg-[#1A1A1D] border border-white/10 rounded-2xl px-5 py-4 text-white"
            onChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value,
              })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00E6C8] text-black rounded-2xl py-4 font-semibold hover:opacity-90 transition-all"
          >
            {loading
              ? 'Submitting...'
              : 'Book Free Consultation'}
          </button>

        </form>
      </div>
    </div>
  )
}