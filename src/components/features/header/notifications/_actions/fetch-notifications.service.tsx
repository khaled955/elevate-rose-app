export async function fetchNotificationsService(
  pageNumber: number,
  limit: number,
) {
  const params = new URLSearchParams({
    page: pageNumber.toString(),
    limit: limit.toString(),
  });
  const resp = await fetch(`/api/notifications?${params}`);

  const payload = await resp.json();

  return payload;
}
