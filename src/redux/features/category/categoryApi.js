import { baseApi } from "../../baseApi/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    getAllCategories: builder.query({
      query: () => ({
        url: "/services/categories",
        method: "GET",
      }),
      providesTags: ["Categories"]
    }),
    createCategory: builder.mutation({
      query: ({ data }) => ({
        url: `/admin/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"]
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/admin/category/${id}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
      transformResponse: (response) => response?.data?.attributes,
    }),
    updateCategory: builder.mutation({
      query: ({ data }) => ({
        url: `/categories/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        console.log(id)
        return {
          url: `/categories/delete/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Categories"]
    }),

  }),
});

export const {
  useGetAllCategoriesQuery, 
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoryApi;
