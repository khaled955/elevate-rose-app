const INVALID_ID_ERROR_PARTS = [
  '"id" must only contain hexadecimal characters',
  '"id" length must be 24 characters long',
  "Cast to ObjectId failed for value",
];

export function isInvalidIdError(message?: string): boolean {
  if (!message) return false;
  return INVALID_ID_ERROR_PARTS.some((part) => message.includes(part));
}
