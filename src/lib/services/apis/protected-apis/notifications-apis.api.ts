export const NOTIFICATIONS = {
  GET_LIMITED: (pageNumber: number, limit: number) =>
    `/notifications/user?page=${pageNumber}&limit=${limit}`,
  GET_LIMITED_BY_ADMIN: (pageNumber: number, limit: number) =>
    `/notifications/admin?page=${pageNumber}&limit=${limit}`,
  MARK_SINGLE_NOTIFICATION_AS_READ: `/notifications/mark-read`,
  DELETE_SINGLE_NOTIFICATION: (notificationId: string) =>
    `/notifications/${notificationId}`,
  MARK_ALL_NOTIFICATIONS_AS_READ: `/notifications/mark-all-read`,
  DELETE_ALL_NOTIFICATIONS: `/notifications/clear-all`,
};
