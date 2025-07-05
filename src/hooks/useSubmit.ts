import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { type CreateEmailOptions } from 'resend'
import {
	codeLength,
	copyCount,
	guessCopyFromOtherTabCount,
	leaveWindowCount,
	leaveWindowTimes,
	leaveWindowTotalTime,
	pasteCount,
	startTime,
	state,
	typeCount,
	typeDeleteCount,
	typeEnterCount,
	typeSpaceCount
} from '../logic/state'
import { useDateFormat, useNow } from '@vueuse/core'
import { analyzeSession, flagsMap, isUserQualified } from '../utils/analyzeSession'

export function useSubmit() {
	const message = useMessage()
	const isLoading = ref(false)
	const ccEmails = (import.meta.env.VITE_APP_CC_EMAILS || '')
		.split(',')
		.map((email: string) => email.trim())
		.filter((email: string) => email.length > 0)

	const submit = async (titleTime: string, username: string) => {
		const title = `${titleTime} - 面试题 - [${username}]`
		const now = useNow()
		const submitTime = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss')
		const time = Math.floor((new Date().getTime() - new Date(startTime.value).getTime()) / 60000)

		const sessionMetrics = {
			startTime: startTime.value,
			endTime: submitTime.value,
			codeLength: codeLength.value,
			typeCount: typeCount.value,
			typeSpaceCount: typeSpaceCount.value,
			typeEnterCount: typeEnterCount.value,
			typeDeleteCount: typeDeleteCount.value,
			pasteCount: pasteCount.value,
			copyCount: copyCount.value,
			guessCopyFromOtherTabCount: guessCopyFromOtherTabCount.value,
			leaveWindowCount: leaveWindowCount.value,
			leaveWindowTotalTime: leaveWindowTotalTime.value
		}
		const analyzeResult = analyzeSession(sessionMetrics)

		const isQualified = isUserQualified(sessionMetrics)

		const warnFlags =
			analyzeResult.flags.length > 0
				? analyzeResult.flags
						.map((item) => flagsMap[item])
						.filter(Boolean)
						.join(', ')
				: '无'
		const html = [
			`<p>面试者姓名: ${username}</p>`,
			`<p>开始时间: ${startTime.value}</p>`,
			`<p>提交时间: ${submitTime.value}</p>`,
			`<p>用时: ${time}分钟</p>`,
			`<p>代码长度: ${codeLength.value}</p>`,
			`<details>`,
			`  <summary>键入次数: ${typeCount.value}</summary>`,
			`  <ul>${[
				`<li>空格键: ${typeSpaceCount.value}次</li>`,
				`<li>回车键: ${typeEnterCount.value}次</li>`,
				`<li>删除键: ${typeDeleteCount.value}次</li>`
			].join('\n')}</ul>`,
			`</details>`,
			`<p>代码长度: ${codeLength.value}</p>`,
			`</details>`,
			`<p>离开窗口次数: ${leaveWindowCount.value}</p>`,
			`<details>`,
			`  <summary>离开窗口时长: ${leaveWindowTotalTime.value}分钟</summary>`,
			`  <p><ol>${leaveWindowTimes.value.map((item) => `<li>${item}</li>`).join('\n')}</ol></p>`,
			`</details>`,
			`<p>复制次数: ${copyCount.value}</p>`,
			`<p>粘贴次数: ${pasteCount.value}</p>`,
			`<p>猜测从其他标签页复制的次数: ${guessCopyFromOtherTabCount.value}</p>`,
			`<p>分析结果(仅参考): ${analyzeResult.isNormal ? '正常' : '异常'}</p>`,
			`<p>风险评分: ${analyzeResult.riskScore} (0 – 100)</p>`,
			`<p>触发的告警: ${warnFlags}</p>`,
			`<p>用户是否合格: ${isQualified ? '是' : '否'}</p>`,
			`<hr />`,
			`<p>在线预览链接: <a href="${window.location.href + state.value}">Playground</a></p>`
		].join('\n')

		try {
			isLoading.value = true
			const response = await fetch('/.netlify/functions/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					from: 'InterviewPlayground <abcliudada@gmail.com>',
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
			message.error('提交失败！请重试或联系面试官。')
			console.error('Error sending email:', error)
		}
	}

	return {
		isLoading,
		submit
	}
}
