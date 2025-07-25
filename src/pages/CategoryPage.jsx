import React, { useEffect, useState } from 'react'
import ApiService from '../service/ApiService';
import Layout from '../component/Layout';

const api = ApiService();
export default function CategoryPage() {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    
    //fetch the categories from our backend
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await api.getAllCategory();
                if (response.status === 200) {
                    setCategories(response.Categories);
                }
            } catch (error) {
                showMessage(
                    error.response?.data?.message || "Error Loggin in a User: " + error
                );
            }
        };
        getCategories();
    }, []);

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("");
        }, 4000);

    };

    //add category
    const addCategory = async () => {
        if (!categoryName) {
            showMessage("Category cannot be empty");
            return;
        }
        try {
            await api.createCategory({ name: categoryName });
            showMessage("Category sucessfully added");
            setCategoryName(""); //clear input
            window.location.reload(); //relode page
        } catch (error) {
            showMessage(
                error.response?.data?.message || "Error Loggin in a User: " + error
            );
        }
    };

    //Edit Category
    const editCategory=async ()=>{
        try{
            await api.updateCategory(editingCategoryId,{
                name:categoryName,
            });
            showMessage("Category successfully updated. ");
            setIsEditing(false);
            setCategoryName("");
            window.location.reload();
        }catch (error) {
            showMessage(
                error.response?.data?.message || "Error Loggin in a User: " + error
            );
        }
    }

    //populate the edit category
    const handleEditCategory=(category)=>{
        setIsEditing(true);
        setEditingCategoryId(category.id);
        setCategoryName(category.name);
    };

    //delete Category
    const handleDeleteCategory=async (categoryId)=>{
        if(window.confirm("Are you sure you want to delete this category?")){
            try{
                await api.deleteCategory(categoryId);
                showMessage("Category deleted successfully!");
                window.location.reload();

            }catch (error) {
        showMessage(
          error.response?.data?.message || "Error Deleting in a Category: " + error
        );
        }
    }
    };
    

    return (
        <Layout>
      {message && <div className="message">{message}</div>}
      <div className="category-page">
        <div className="category-header">
          <h1>Categories</h1>
          <div className="add-cat">
            <input
              value={categoryName}
              type="text"
              placeholder="Category Name"
              onChange={(e) => setCategoryName(e.target.value)}
            />

            {!isEditing ? (
              <button onClick={addCategory}>Add Category</button>
            ) : (
              <button onClick={editCategory}>Edit Cateogry</button>
            )}
          </div>
        </div>

        {categories && (
          <ul className="category-list">
            {categories.map((category) => (
              <li className="category-item" key={category.id}>
                <span>{category.name}</span>

                <div className="category-actions">
                  <button onClick={() => handleEditCategory(category)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCategory(category.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
    )
}
