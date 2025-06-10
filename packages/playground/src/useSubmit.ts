// import { Resend } from 'resend'

// const resend = new Resend('re_KrDWt8wr_EGbcp12QM5qa5mFi5PAaTXx7')

export function useSubmit() {
	const submit = async () => {
		// const resend = new Resend('re_KrDWt8wr_EGbcp12QM5qa5mFi5PAaTXx7')

		// resend.emails.send({
		//   headers:{

		//   },
		// 	from: 'onboarding@resend.dev',
		// 	to: 'abcliudada@gmail.com',
		// 	subject: 'Hello World',
		// 	html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
		// })
		// 前端代码
		// async function sendEmail(emailData: any) {
		try {
			const response = await fetch('/.netlify/functions/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					from: 'onboarding@resend.dev',
					to: 'abcliudada@gmail.com',
					subject: 'Hello World',
					html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
				})
			})

			const result = await response.json()
			console.log('Email sent:', result)
		} catch (error) {
			console.error('Error sending email:', error)
		}
		// }
	}

	return {
		submit
	}
}
