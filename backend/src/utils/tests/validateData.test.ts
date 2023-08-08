import { describe, expect, test } from 'vitest';
import { isEmailValid } from '../validateData';

describe('Validate Data utils', () => {
	describe('isValidEmail', () => {
		test('should return true if email is valid', () => {
			const emails = [
				'daniel.25@gmail.com',
				'mysite@ourearth.com',
				'my.ownsite@ourearth.org',
				'mysite@you.me.net',
				'123456789testio@epam2.com',
				'test-io@epam.com',
				'test@io-eam.com',
			];
			emails.forEach((email) => {
				const isValid = isEmailValid(email);
				expect(isValid).toBe(true);
			});
		});
		test('should return false if email is invalid', () => {
			const emails = [
				'mysite.ourearth.com',
				'mysite@.com.my',
				'@you.me.net',
				'mysite123@gmail.b',
				'mysite@.org.org',
				'.mysite@mysite.org',
				'mysite()*@gmail.com',
				'mysite..1234@yahoo.com',
			];

			emails.forEach((email) => {
				const isValid = isEmailValid(email);
				expect(isValid).toBe(false);
			});
		});
		test('should return false if email is empty', () => {
			const email = '';
			const isValid = isEmailValid(email);
			expect(isValid).toBe(false);
		});
	});
});
