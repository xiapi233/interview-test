// netlify/functions/send-email.js
import { Resend } from 'resend'

export async function handler(req, res) {
	if (req.method !== 'POST') {
		return {
			statusCode: 200,
			body: '{"message": "This endpoint only accepts POST requests"}'
		}
	}

	const resend = new Resend('re_KrDWt8wr_EGbcp12QM5qa5mFi5PAaTXx7')

	try {
		const { to, subject, html } = JSON.parse(req.body)

		console.log('Sending email:', req.body)
		const response = await resend.emails.send({
			from: 'no-reply@yourdomain.com', // 使用你在 Resend 验证的域名
			to: to,
			subject: subject,
			html: html
		})

		return {
			body: JSON.stringify({ message: 'Email sent successfully', response }),
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' }
		}
	} catch (error) {
		return {
			body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
			statusCode: 500,
			headers: { 'Content-Type': 'application/json' }
		}
	}
}
