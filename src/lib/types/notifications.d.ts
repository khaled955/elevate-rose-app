export type Notification = {
  type: string;
  priority: string;
  isRead: boolean;
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Notifications = {
  notifications: Notification[];
};

export type MarkNotificationAsReadResponse = {
  message: string;
  modifiedCount: number;
  unreadCount: number;
};

export type DeleteNotificationResponse = {
  message: string;
  deletedCount: number;
  unreadCount?: number;
};
