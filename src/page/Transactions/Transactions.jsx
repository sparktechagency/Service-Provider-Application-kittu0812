import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

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

    // Optional: search functionality (not required to paginate)
    const filtered = sampleTransactions.filter(txn =>
        txn.userName.toLowerCase().includes(search.toLowerCase()) ||
        txn.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / pageSize);
    const paginatedData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="lg:p-6 py-4  bg-white rounded-lg ">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
                <h2 className="text-3xl font-semibold">Transactions</h2>

                {/* Search */}
                <div className="flex gap-3 flex-wrap items-center">
                    <div className="flex items-center border border-yellow-500 rounded-full px-3 py-2 w-full md:w-[260px] bg-white">
                        <FaSearch className="text-yellow-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
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
                            <th className="py-5 font-semibold px-4">Service Provider</th>
                            <th className="py-5 font-semibold px-4">Service Category</th>
                            <th className="py-5 font-semibold px-4">Service Sub-Category</th>
                            <th className="py-5 font-semibold px-4">Date & Time</th>
                            <th className="py-5 font-semibold px-4">Amount</th>
                            <th className="py-5 font-semibold px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((txn, index) => (
                            <tr
                                key={txn.id}
                                className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                            >
                                <td className="py-4 px-4">{(currentPage - 1) * pageSize + index + 1}</td>
                                <td className="py-4 px-4">{txn.userName}</td>
                                <td className="py-4 px-4">{txn.email}</td>
                                <td className="py-4 px-4">{txn.provider}</td>
                                <td className="py-4 px-4">{txn.category}</td>
                                <td className="py-4 px-4">{txn.subCategory}</td>
                                <td className="py-4 px-4">{txn.dateTime}</td>
                                <td className="py-4 px-4 font-medium text-green-700">{txn.amount}</td>
                                <td className="py-4 px-4">
                                    <button className="text-red-600 hover:underline">
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
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
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
