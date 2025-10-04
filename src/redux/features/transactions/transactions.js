import { baseApi } from "../../baseApi/baseApi";

const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransactions: builder.query({
            query: ({ page = 1, limit = 5 }) => ({
                url: `/admin/transactions?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Transactions"],
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `/admin/transactions/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Transactions"],
        }),
    }),
})

export const { useGetAllTransactionsQuery, useDeleteTransactionMutation } = transactionApi