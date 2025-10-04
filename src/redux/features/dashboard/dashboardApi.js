import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatus: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    getIncomeRatio: builder.query({
      query: (year) => ({
        url: `/admin/revenue`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetDashboardStatusQuery, useGetIncomeRatioQuery } =
  dashboardApi;
