export interface SessionMetrics {
	startTime: string // ISO 字符串
	endTime: string
	codeLength: number // 字符数或行数，任选
	typeCount: number // 总击键
	typeSpaceCount: number
	typeEnterCount: number
	typeDeleteCount: number
	pasteCount: number
	copyCount: number
	guessCopyFromOtherTabCount: number
	leaveWindowCount: number
	leaveWindowTotalTime: number // 秒
}

export interface AnalysisResult {
	isNormal: boolean // true = 基本正常；false = 高度可疑
	riskScore: number // 0 – 100
	flags: string[] // 触发的告警
}

export function analyzeSession(m: SessionMetrics): AnalysisResult {
	const start = new Date(m.startTime).getTime()
	const end = new Date(m.endTime).getTime()
	const durationMin = Math.max((end - start) / 60000, 1)

	// === 关键衍生指标 ===
	const typingSpeed = m.typeCount / durationMin // 击键 / 分钟
	const leaveRate = m.leaveWindowTotalTime / (durationMin * 60) // 窗口外停留占比
	const pasteRatio = m.pasteCount / Math.max(m.pasteCount + m.typeCount, 1)
	const externalPasteRatio = m.guessCopyFromOtherTabCount / Math.max(m.pasteCount, 1)

	// === 打分 ===
	let risk = 0
	const flags: string[] = []

	/* ① 粘贴异常 */
	if (pasteRatio > 0.3) {
		// 粘贴占比过高
		risk += 30
		flags.push('paste-heavy')
	}
	if (externalPasteRatio > 0.5 && m.guessCopyFromOtherTabCount > 3) {
		risk += 20
		flags.push('external-paste')
	}

	/* ② 离开窗口异常 */
	if (leaveRate > 0.15) {
		// 15 % 以上时间不在窗口
		risk += 20
		flags.push('left-window-often')
	}

	/* ③ 打字速度异常 */
	if (typingSpeed < 10 && m.codeLength > 200) {
		// 几乎没打字却写出长代码
		risk += 20
		flags.push('low-typing-speed')
	}
	if (typingSpeed > 200) {
		// 过快，疑似粘贴狂敲
		risk += 10
		flags.push('very-high-typing-speed')
	}

	/* ④ 大代码 + 极短用时 */
	if (m.codeLength > 1000 && durationMin < 15) {
		risk += 20
		flags.push('large-code-short-time')
	}

	risk = Math.min(100, risk)

	return {
		isNormal: risk < 40, // <40 认为“正常编写”，≥40 标记为“可疑”
		riskScore: risk,
		flags
	}
}

export const flagsMap: Record<string, string> = {
	'paste-heavy': '粘贴占比过高',
	'external-paste': '从其他标签页粘贴',
	'left-window-often': '频繁离开窗口',
	'low-typing-speed': '打字速度过慢',
	'very-high-typing-speed': '打字速度过快',
	'large-code-short-time': '大代码短时间'
}

export function isUserQualified(session: SessionMetrics): boolean {
	const start = new Date(session.startTime).getTime()
	const end = new Date(session.endTime).getTime()
	const durationMin = Math.max((end - start) / 60000, 1)
	const { typeCount, codeLength, pasteCount } = session

	const typingSpeed = typeCount / durationMin
	const pasteRatio = pasteCount / Math.max(pasteCount + typeCount, 1)

	if (durationMin < 3) return false // 时间太短
	if (typeCount < 100) return false // 总击键太少
	if (typingSpeed < 20) return false // 击键过慢
	if (pasteRatio > 0.7 && codeLength > 300) return false // 粘贴远高于输入

	return true
}
