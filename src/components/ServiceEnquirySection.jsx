import { useState } from 'react'
import { Shield, Phone, Mail, MapPin, CheckCircle, Clock, Send } from 'lucide-react'
import { submitLead } from '../utils/strapi'

export default function ServiceEnquirySection({ serviceName }) {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		company: '',
		city: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitMessage, setSubmitMessage] = useState('')
	const [submitError, setSubmitError] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		setIsSubmitting(true)
		setSubmitError('')
		setSubmitMessage('')
		const createdAt = new Date().toISOString()
		const leadMessage = [
			'Source: ServiceEnquirySection',
			`Submitted At: ${createdAt}`,
			`Service: ${serviceName}`,
			`Company: ${formData.company.trim() || 'Not provided'}`,
			`City: ${formData.city.trim() || 'Not specified'}`,
			`Details: ${formData.message.trim() || 'No additional details'}`,
		].join('\n')

		try {
			await submitLead({
				name: formData.name.trim(),
				email: formData.email.trim(),
				phone: formData.phone.trim(),
				subject: `${serviceName} enquiry`,
				message: leadMessage,
			})

			setFormData({
				name: '',
				phone: '',
				email: '',
				company: '',
				city: '',
				message: '',
			})
			setSubmitMessage(`Your ${serviceName.toLowerCase()} enquiry has been sent. Our team will contact you soon.`)
		} catch (error) {
			setSubmitError(error?.message || `Unable to submit ${serviceName.toLowerCase()} enquiry.`)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section id="enquiry" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
			<div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#2563EB]/5 blur-3xl" />
			<div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center animate-fade-in">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-4 py-2">
						<Shield className="h-4 w-4 text-[#F97316]" />
						<span className="text-sm font-bold text-[#F97316]">GET STARTED NOW</span>
					</div>
					<h2 className="mb-4 text-4xl font-bold text-[#0F172A] lg:text-5xl">
						Need {serviceName} Service?
						<span className="block text-[#2563EB]">Tell Us Your Requirement</span>
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-[#64748B]">Fill this form and our team will call you within 2 hours.</p>
				</div>

				<div className="grid gap-12 lg:grid-cols-3">
					<div className="animate-fade-in-up lg:col-span-2">
						<form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl">
							<div className="grid gap-6 sm:grid-cols-2">
								<div>
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Your Name *</label>
									<input type="text" required placeholder="Enter your full name" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
								</div>
								<div>
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Phone Number *</label>
									<input type="tel" required placeholder="Enter your phone number" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} />
								</div>
								<div>
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Email Address *</label>
									<input type="email" required placeholder="Enter your email" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
								</div>
								<div>
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Company / Organization</label>
									<input type="text" placeholder="Enter company name" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.company} onChange={(event) => setFormData({ ...formData, company: event.target.value })} />
								</div>
								<div className="sm:col-span-2">
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Service</label>
									<input type="text" readOnly value={serviceName} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[#475569] outline-none" />
								</div>
								<div className="sm:col-span-2">
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">City / Location *</label>
									<input type="text" required placeholder="Enter your city or location" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.city} onChange={(event) => setFormData({ ...formData, city: event.target.value })} />
								</div>
								<div className="sm:col-span-2">
									<label className="mb-2 block text-sm font-bold text-[#0F172A]">Additional Details</label>
									<textarea rows={4} placeholder="Tell us more about your requirements..." className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} />
								</div>
							</div>

							<button type="submit" disabled={isSubmitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#F97316]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#EA580C] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70">
								{isSubmitting ? 'Sending...' : 'Send Enquiry'}
								<Send className={`h-5 w-5 ${isSubmitting ? 'animate-plane-send' : ''}`} />
							</button>
							{submitMessage && <p className="mt-3 text-sm font-medium text-green-600">{submitMessage}</p>}
							{submitError && <p className="mt-3 text-sm font-medium text-red-600">{submitError}</p>}
						</form>
					</div>

					<div className="space-y-6 animate-fade-in-right">
						<div className="rounded-3xl bg-[#0F172A] p-8 text-white">
							<h3 className="mb-6 text-xl font-bold">Quick Contact</h3>

							<div className="space-y-6">
								<a href="tel:+919876543210" className="group flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] transition-colors group-hover:bg-[#F97316]">
										<Phone className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm text-white/70">Call Us</p>
										<p className="text-lg font-bold">+91 98765 43210</p>
									</div>
								</a>

								<a href="mailto:info@tsplgroup.com" className="group flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] transition-colors group-hover:bg-[#F97316]">
										<Mail className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm text-white/70">Email Us</p>
										<p className="font-bold">info@tsplgroup.com</p>
									</div>
								</a>

								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]">
										<MapPin className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm text-white/70">Head Office</p>
										<p className="font-bold">Pune, Maharashtra</p>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl">
							<h3 className="mb-4 text-lg font-bold text-[#0F172A]">When You Enquire</h3>
							<div className="space-y-3">
								{['Free consultation call', 'Customized solution', 'Transparent quotation', 'Dedicated follow-up'].map((item) => (
									<div key={item} className="flex items-center gap-3">
										<CheckCircle className="h-5 w-5 text-[#2563EB]" />
										<span className="text-[#64748B]">{item}</span>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-3xl bg-[#2563EB] p-6 text-white">
							<div className="flex items-center gap-4">
								<div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
									<Clock className="h-7 w-7" />
								</div>
								<div>
									<p className="text-white/80">Response Time</p>
									<p className="text-2xl font-bold">Within 2 Hours</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
