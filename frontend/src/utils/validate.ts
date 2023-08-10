export const validateHttpStatusOrThrow = (
	status: number,
	mustBe: number,
	message: string
): void => {
	if (status === mustBe) {
		throw new Error(message);
	}
};
