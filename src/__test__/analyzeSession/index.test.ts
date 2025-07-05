import { describe, test, expect } from 'vitest'
import { analyzeSession, isUserQualified } from '../../utils/analyzeSession'
import json from './test_ai_code_sessions.json'

describe('analyzeSession', () => {
	json.testCases.forEach((session, index) => {
		test(`会话: ${index}`, () => {
			const result = analyzeSession(session)
			console.log(`====${index}====\n`, session.isAiGenerated, '\n', session, '\n', result)
			expect(result.isNormal).toMatchSnapshot()
		})
	})
})

describe('isUserQualified', () => {
	json.testCases.forEach((session) => {
		test(`会话: ${session}`, () => {
			const result = isUserQualified(session)
			console.log(result)
			expect(result).toMatchSnapshot()
		})
	})
})
