import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { useDeleteTransactionMutation, useGetAllTransactionsQuery } from '../../redux/features/transactions/transactions';
import moment from 'moment';
import { toast, Toaster } from 'sonner';

const sampleTransactions = [
    {
        id: 1,
        userName: 'John Doe',
        email: 'john@example.com',
        provider: 'Zoomify Services',
        category: 'Cleaning',
        subCategory: 'Home Deep Clean',
        dateTime: '2025-07-29 10:30 AM',
        amount: '$120.00',
    },
    {
        id: 2,
        userName: 'Jane Smith',
        email: 'jane.smith@example.com',
        provider: 'QuickFix Pro',
        category: 'Plumbing',
        subCategory: 'Leak Repair',
        dateTime: '2025-07-28 3:15 PM',
        amount: '$80.50',
    },
    {
        id: 3,
        userName: 'Mike Ross',
        email: 'mike.ross@example.com',
        provider: 'ElectroCare',
        category: 'Electrical',
        subCategory: 'Wiring',
        dateTime: '2025-07-27 1:00 PM',
        amount: '$150.00',
    },
    // Add more items if needed to test pagination
];

const Transactions = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const { data } = useGetAllTransactionsQuery({ currentPage, pageSize });
    const fullData = data?.data;
    console.log(data?.totalPages);

    // Optional: search functionality (not required to paginate)
    const filtered = fullData?.filter(txn =>
        txn?.customer?.email?.toLowerCase().includes(search.toLowerCase()) ||
        txn?.totalAmount.toString().includes(search) // Convert totalAmount to string
    );

    // const totalPages = Math.ceil(filtered?.length / pageSize);
    const paginatedData = filtered?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const [deleteTransition] = useDeleteTransactionMutation();

    const handleDelete = async (id) => {
        try {
            const res = await deleteTransition(id);
            console.log(res);
            if (res?.data) {
                toast.success(res?.data?.message || 'Transaction deleted successfully');
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.message || 'Failed to delete transaction');
        }
        // Handle delete logic here
    };

    return (
        <div className="lg:p-6 py-4  bg-white rounded-lg ">
            <Toaster />
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
                <h2 className="text-3xl font-semibold">Transactions</h2>

                {/* Search */}
                <div className="flex gap-3 flex-wrap items-center">
                    <div className="flex items-center border border-yellow-500 rounded-full px-3 py-2 w-full md:w-[260px] bg-white">
                        <FaSearch className="text-yellow-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Search by email or Amount"
                            className="outline-none flex-1"
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1); // Reset page on search
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className="min-w-[900px] w-full text-sm rounded-lg text-left border  border-gray-200">
                    <thead className="border-b hover:bg-gray-50">
                        <tr>
                            <th className="py-5 font-semibold px-4">#</th>
                            <th className="py-5 font-semibold px-4">User Name</th>
                            <th className="py-5 font-semibold px-4">E-Mail</th>
                            <th className="py-5 font-semibold px-4">Date of Transaction</th>
                            <th className="py-5 font-semibold px-4">Tax</th>
                            <th className="py-5 font-semibold px-4">Order Status</th>
                            <th className="py-5 font-semibold px-4">Payment Status</th>
                            <th className="py-5 font-semibold px-4">Amount</th>
                            <th className="py-5 font-semibold px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.map((txn, index) => (
                            <tr
                                key={txn.id}
                                className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                            >
                                <td className="py-4 px-4">{(currentPage - 1) * pageSize + index + 1}</td>
                                <td className="py-4 px-4">{txn?.customer?.firstName + " " + txn?.customer?.lastName}</td>
                                <td className="py-4 px-4">{txn.customer?.email}</td>
                                <td className="py-4 px-4">{moment(txn.createdAt).format('YYYY-MM-DD HH:mm A')}</td>
                                <td className="py-4 px-4">{txn.tax}$</td>
                                <td className="py-4 px-4">{txn.orderStatus}</td>
                                <td className="py-4 px-4">{txn.paymentStatus}</td>
                                <td className="py-4 px-4 font-medium text-green-700">{txn.totalAmount}$</td>
                                <td className="py-4 px-4">
                                    <button onClick={() => handleDelete(txn._id)} className="text-red-600 hover:underline">
                                        <MdDeleteOutline className="text-3xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-end items-center space-x-3">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-sm">
                    Page {currentPage} of {data?.totalPages}
                </span>
                <button
                    disabled={currentPage === data?.totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Transactions;
