export async function fetchUserDataService() {
  const resp = await fetch(`/api/dashboard/profile`, {
    cache: "no-store",
  });

  const payload = resp.json();
  return payload;
}
