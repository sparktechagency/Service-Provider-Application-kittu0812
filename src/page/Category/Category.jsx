import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { useCreateCategoryMutation, useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";

const Category = () => {
    // Declare hooks at the top level - Unconditionally
    const { data, isLoading } = useGetAllCategoriesQuery();
    const [categories, setCategories] = useState([]); // Default empty array
    const [search, setSearch] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        image: null, // Store the image file directly
        subcategories: [{ name: '', image: null }], // Store subcategory images as file objects
    });

    const [createCategory] = useCreateCategoryMutation();

    // Fetch categories once data is available
    useEffect(() => {
        if (data) {
            setCategories(data); // Only set categories if data is present
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // API mutation for adding categories

    // Open/Edit modal logic
    const openEditModal = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            image: category.image, // This can be a URL or a file object depending on your setup
            subcategories: category.subcategories || [{ name: '', image: null }],
        });
    };

    const openAddModal = () => {
        setShowAddModal(true);
        setFormData({
            name: '',
            image: null,
            subcategories: [{ name: '', image: null }],
        });
    };

    const closeModal = () => {
        setEditingCategory(null);
        setShowAddModal(false);
        setFormData({ name: '', image: null, subcategories: [{ name: '', image: null }] });
    };



    // Save the category (add/edit)
    const handleSave = async () => {
        if (editingCategory) {
            // Edit mode
            setCategories((prev) =>
                prev.map((cat) =>
                    cat.id === editingCategory.id
                        ? {
                            ...cat,
                            name: formData.name,
                            categoryImage: formData.image, // Store the file object for category image
                            subcategories: formData.subcategories,
                        }
                        : cat
                )
            );
        } else {
            // Add mode
            const newCategory = {
                name: formData.name,
                categoryImage: formData.image, // Store the file object for category image
                subcategories: formData.subcategories,
            };

            const formData2 = new FormData();
            formData2.append('name', newCategory.name);
            if (newCategory.categoryImage) {
                formData2.append('categoryImage', newCategory.categoryImage);
            }
            newCategory.subcategories.forEach((subcat, index) => {
                formData2.append(`subcategories[${index}][name]`, subcat.name);
                if (subcat.image) {
                    formData2.append(`subcategories[${index}][image]`, subcat.image);
                }
            });

            // setCategories([...categories, newCategory]);
            try {
                console.log(newCategory);
                const res = await createCategory(formData2).unwrap();
                console.log('Category added successfully:', res);
                if (res) {
                    closeModal();
                }
            } catch (error) {
                console.error('Error adding category:', error);
            }
        }

    };

    const filteredCategories = categories?.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubcategoryChange = (index, key, value) => {
        const updatedSubcategories = [...formData.subcategories];
        updatedSubcategories[index] = { ...updatedSubcategories[index], [key]: value };
        setFormData({ ...formData, subcategories: updatedSubcategories });
    };

    const handleAddSubcategory = () => {
        setFormData({
            ...formData,
            subcategories: [
                ...formData.subcategories,
                { name: '', image: null }, // Add a new subcategory with an empty file object for image
            ],
        });
    };

    // Handle category image upload
    const handleCategoryImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file }); // Set the file directly to formData
        }
    };

    // Handle subcategory image upload
    const handleSubcategoryImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const updatedSubcategories = [...formData.subcategories];
            updatedSubcategories[index].image = file; // Set the file directly for subcategory image
            setFormData({ ...formData, subcategories: updatedSubcategories });
        }
    };

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
                        <IoAdd className="text-3xl" /> Add Category
                    </button>
                </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-6">
                {filteredCategories?.map((category) => (
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
                                    src={category.image} // Assuming it's a URL or file
                                    alt={category.name}
                                    className="w-8 h-8 object-cover"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-600">
                                {category.subcategories.length} Sub-Categories
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit/Add Modal */}
            {(editingCategory || showAddModal) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-md p-6 max-h-full overflow-y-auto w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">
                            {editingCategory ? 'Edit Category' : 'Add Category'}
                        </h3>

                        {/* Category Title */}
                        <label className="block mb-2 text-sm font-medium">Category Title</label>
                        <input
                            type="text"
                            className="w-full border border-[#fff010] rounded px-3 py-2 mb-4"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />

                        {/* Category Image */}
                        <label className="block mb-2 text-sm font-medium">Category Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-[#fff010] rounded px-3 py-2"
                            onChange={handleCategoryImageChange} // Using the file handler
                        />
                        {formData.image && (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(formData.image)} // Preview the selected image
                                    alt="Preview"
                                    className="w-16 h-16 object-cover border border-[#fff010] rounded"
                                />
                            </div>
                        )}

                        {/* Subcategories */}
                        <h4 className="font-medium mb-2">Subcategories</h4>
                        {formData.subcategories?.map((sub, index) => (
                            <div key={index} className="flex gap-3 mb-4">
                                <input
                                    type="text"
                                    placeholder="Subcategory Name"
                                    value={sub.name}
                                    onChange={(e) =>
                                        handleSubcategoryChange(index, 'name', e.target.value)
                                    }
                                    className="w-full border border-[#fff010] rounded px-3 py-2"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleSubcategoryImageChange(index, e)} // Using the file handler for subcategory
                                    className="w-full border border-[#fff010] rounded px-3 py-2"
                                />
                            </div>
                        ))}
                        <button
                            onClick={handleAddSubcategory}
                            className="text-blue-500 text-sm mb-4"
                        >
                            Add Subcategory
                        </button>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            {editingCategory ? 'Save Changes' : 'Add Category'}
                        </button>
                        <div className='flex justify-end'>
                            <button
                                onClick={closeModal}
                                className=" mt-2 px-4 py-2 border border-red-400 rounded text-red-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
