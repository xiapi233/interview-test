import { Resend } from 'resend'

// const resend = new Resend('re_KrDWt8wr_EGbcp12QM5qa5mFi5PAaTXx7')

export function useSubmit() {
	const submit = () => {

		const resend = new Resend('re_KrDWt8wr_EGbcp12QM5qa5mFi5PAaTXx7')

		resend.emails.send({
			from: 'onboarding@resend.dev',
			to: 'abcliudada@gmail.com',
			subject: 'Hello World',
			html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
		})
	}
  
  return {
		submit
  }
}
