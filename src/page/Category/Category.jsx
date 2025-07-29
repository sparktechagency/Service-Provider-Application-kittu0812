import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { IoAdd } from 'react-icons/io5';

const initialCategories = [
    {
        id: 1,
        title: 'Indoor',
        subCategoryCount: 7,
        image: 'https://img.icons8.com/?size=512&id=364&format=png',
    },
    {
        id: 2,
        title: 'Outdoor',
        subCategoryCount: 5,
        image: 'https://img.icons8.com/?size=512&id=364&format=png',
    },
];

const Category = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [search, setSearch] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        subCategoryCount: '',
        image: '',
    });

    const openEditModal = (category) => {
        setEditingCategory(category);
        setFormData({
            title: category.title,
            subCategoryCount: category.subCategoryCount.toString(),
            image: category.image,
        });
    };

    const openAddModal = () => {
        setShowAddModal(true);
        setFormData({
            title: '',
            subCategoryCount: '',
            image: '',
        });
    };

    const closeModal = () => {
        setEditingCategory(null);
        setShowAddModal(false);
        setFormData({ title: '', subCategoryCount: '', image: '' });
    };

    const handleSave = () => {
        if (!formData.title || !formData.subCategoryCount || !formData.image) {
            alert('Please fill all fields');
            return;
        }

        if (editingCategory) {
            // Edit mode
            setCategories((prev) =>
                prev.map((cat) =>
                    cat.id === editingCategory.id
                        ? {
                            ...cat,
                            title: formData.title,
                            subCategoryCount: parseInt(formData.subCategoryCount),
                            image: formData.image,
                        }
                        : cat
                )
            );
        } else {
            // Add mode
            const newCategory = {
                id: categories.length + 1,
                title: formData.title,
                subCategoryCount: parseInt(formData.subCategoryCount),
                image: formData.image,
            };
            setCategories([...categories, newCategory]);
        }

        closeModal();
    };

    const filteredCategories = categories.filter((cat) =>
        cat.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="lg:p-6 py-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
                <h2 className="text-3xl font-semibold">Category Management</h2>

                {/* Search and Add */}
                <div className="flex gap-3 flex-wrap items-center">
                    <div className="flex items-center border border-yellow-500 rounded-full px-3 py-2 w-full md:w-[260px] bg-white">
                        <FaSearch className="text-yellow-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-none flex-1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={openAddModal}
                        className="bg-[#d4c707] text-base text-white px-8 py-3 rounded-full flex items-center gap-1 hover:bg-[#d4c707] transition duration-300"
                    >
                        <IoAdd className='text-3xl' />  Add Category
                    </button>
                </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-6">
                {filteredCategories.map((category) => (
                    <div
                        key={category.id}
                        className="relative min-h-48 flex flex-col justify-center border border-[#fff000] bg-white rounded-lg shadow hover:shadow-md transition duration-300 overflow-hidden"
                    >
                        {/* Edit Icon */}
                        <button
                            onClick={() => openEditModal(category)}
                            className="absolute top-3 right-3 z-10 bg-white border border-gray-300 hover:border-gray-500 p-1 rounded-full shadow-sm"
                            title="Edit Category"
                        >
                            <FiEdit2 className="text-gray-700 w-4 h-4" />
                        </button>

                        <div className="p-4 flex flex-col items-center">
                            <div className="w-12 h-12 border border-[#fff000] rounded-full mb-4 flex items-center justify-center overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-8 h-8 object-cover"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {category.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {category.subCategoryCount} Sub-Categories
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit/Add Modal */}
            {(editingCategory || showAddModal) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">
                            {editingCategory ? 'Edit Category' : 'Add Category'}
                        </h3>

                        {/* Image Upload Field */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Category Icon Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full border border-[#fff010] rounded px-3 py-2"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData({ ...formData, image: reader.result });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            {formData.image && (
                                <div className="mt-2">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-16 h-16 object-cover border border-[#fff010] rounded"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Title Field */}
                        <label className="block mb-2 text-sm font-medium">Category Title</label>
                        <input
                            type="text"
                            className="w-full border border-[#fff010] rounded px-3 py-2 mb-4"
                            value={formData.title}
                            placeholder='Enter Category Title'
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />

                        {/* Sub-category Count Field */}
                        <label className="block mb-2 text-sm font-medium">
                            Sub Category
                        </label>
                        <input
                            type="number"
                            className="w-full border border-[#fff010] rounded px-3 py-2 mb-4"
                            value={formData.subCategoryCount}
                            placeholder='Enter Sub Category Count'
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    subCategoryCount: e.target.value,
                                })
                            }
                        />

                        {/* Action Buttons */}
                        <div className=" gap-3">
                            <button
                                onClick={handleSave}
                                className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                                {editingCategory ? 'Save Changes' : 'Add Category'}
                            </button>
                            <div className='flex justify-end'>
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 mt-2 border border-gray-400 rounded text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
