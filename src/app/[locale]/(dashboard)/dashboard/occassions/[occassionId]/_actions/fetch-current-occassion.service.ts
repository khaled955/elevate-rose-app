export async function fetchCurrentOccassionService(occassionId: string) {
  const resp = await fetch(`/api/occassion/${occassionId}`);
  const payload = await resp.json();
  return payload;
}
