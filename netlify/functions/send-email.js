import nodemailer from 'nodemailer'

export async function handler(req) {
	if (req.httpMethod !== 'POST' || !req.body) {
		return {
			statusCode: 400,
			body: JSON.stringify('invalid request'),
			headers: { 'Access-Control-Allow-Origin': '*' }
		}
	}

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'abcliudada@gmail.com', // 你的 Gmail 地址
			pass: 'srdq ptwr higc ttuf' // 刚刚生成的 App Password
		}
	})

	try {
		const response = await transporter.sendMail(JSON.parse(req.body))

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
