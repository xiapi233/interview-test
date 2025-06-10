export function useSubmit() {
	const submit = async (name: string, html: string) => {
		try {
			const response = await fetch('/.netlify/functions/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					from: 'onboarding@resend.dev',
					to: 'abcliudada@gmail.com',
					subject: `面试题-[${name}]`,
					html: html
				})
			})

			const result = await response.json()
			console.log('Email sent:', result)
		} catch (error) {
			console.error('Error sending email:', error)
		}
	}

	return {
		submit
	}
}
