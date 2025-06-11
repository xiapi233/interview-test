import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { type CreateEmailOptions } from 'resend'

export function useSubmit() {
	const message = useMessage()
	const isLoading = ref(false)
	const ccEmails = (import.meta.env.VITE_APP_CC_EMAILS || '')
		.split(',')
		.map((email: string) => email.trim())
		.filter((email: string) => email.length > 0)

	const submit = async (title: string, html: string) => {
		try {
			isLoading.value = true
			const response = await fetch('/.netlify/functions/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					from: 'InterviewPlayground <onboarding@resend.dev>',
					to: import.meta.env.VITE_APP_TO_EMAILS,
					cc: ccEmails,
					subject: title,
					html: html
				} as CreateEmailOptions)
			})

			const result = await response.json()
			isLoading.value = false
			message.success('提交成功！')
			console.log('Email sent:', result)
		} catch (error) {
			console.error('Error sending email:', error)
		}
	}

	return {
		isLoading,
		submit
	}
}
