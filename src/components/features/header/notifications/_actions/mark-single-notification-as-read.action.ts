"use server";

import { JSON_HEADER } from "@/lib/constants/json-header.constant";
import { NOTIFICATIONS } from "@/lib/services/apis/protected-apis/notifications-apis.api";
import { getToken } from "@/lib/utils/manage-token";

export async function markSingleNotificationsAsReadAction(
  notificationId: string
) {
  // get token
  const token = await getToken();
  // Guard
  if (!token?.accessToken) {
    return Response.json(
      { message: "No Access Token Available ,Login First", code: 401 },
      { status: 401 }
    );
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${NOTIFICATIONS.MARK_SINGLE_NOTIFICATION_AS_READ}`,

    {
      method: "POST",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({ notificationIds: [notificationId] }),
    }
  );

  const payload = await resp.json();

  return payload;
}
