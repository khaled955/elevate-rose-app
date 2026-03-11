export const AUTHENTICATED_NOTIFICATIONS = {
    GET_ALL_READ:"/notifications/mark-read",
    DELETE_ALL:"/notifications/clear-all",
    DELETE_CURRENT:(notId:string)=>`/notifications/${notId}`,

}