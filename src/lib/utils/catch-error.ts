export default async function catchError<T>(
  callback: () => Promise<APIResponse<T>>
): Promise<[APIResponse<T> | null, string | null]> {
  try {
    const payload = await callback();

    if ("error" in payload) throw new Error(payload.error);

    return [payload, null];
  } catch (error) {
    return [null, (error as Error).message];
  }
}
