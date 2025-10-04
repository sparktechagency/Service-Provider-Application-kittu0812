import { baseApi } from "../../baseApi/baseApi";

const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotification: builder.query({
            query: () => ({
                url: "/notifications/me",
                method: "GET",
                providesTags: ["Notification"],
            }),
        }),
    }),
})

export const { useGetAllNotificationQuery } = notificationApi
