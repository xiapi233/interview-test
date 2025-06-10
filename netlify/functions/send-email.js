import { Resend } from 'resend'

export async function handler(req) {
	if (req.httpMethod !== 'POST' || !req.body) {
		return {
			statusCode: 400,
			body: JSON.stringify('invalid request'),
      headers: { 'Access-Control-Allow-Origin': '*' }
		}
	}

	const resend = new Resend('re_KrDWt8wr_EGbcp12QM5qa5mFi5PAaTXx7')

	try {
		const response = await resend.emails.send(JSON.parse(req.body))

		return {
			body: JSON.stringify({ message: 'Email sent successfully', response }),
			statusCode: 200,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
		}
	} catch (error) {
		return {
			body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
			statusCode: 500,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
		}
	}
}
