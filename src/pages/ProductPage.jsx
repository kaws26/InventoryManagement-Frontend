import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import ApiService from "../service/ApiService";
import Layout from "../component/Layout"
import PaginationComponent from "../component/PaginationComponent"


const api = ApiService();
export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    

    //pagination setup
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productData = await api.getAllProducts();
                if (productData.status === 200) {
                    setTotalPages(Math.ceil(productData.products.length / itemsPerPage));

                    setProducts(
                        productData.products.slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                        )
                    );
                }
            } catch (error) {
                showMessage(
                    error.response?.data?.message || "Error Getting Products: " + error
                );
            }
        };
        getProducts();
    }, [ currentPage]);

    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this Product?")) {
            try {
                await api.deleteProduct(productId);
                showMessage("Product sucessfully Deleted");
                window.location.reload(); //relode page
            } catch (error) {
                showMessage(
                    error.response?.data?.message ||
                    "Error Deleting in a product: " + error
                );
            }
        }
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("");
        }, 4000);
    };
    return (
        <Layout>
            {message && <div className="message">{message}</div>}

            <div className="product-page">
                <div className="product-header">
                    <h1>Products</h1>
                    <button
                        className="add-product-btn"
                        onClick={() => navigate("/add-product")}
                    >
                        Add Product
                    </button>
                </div>

                {products && (
                    <div className="product-list">
                        {products.map((product) => (
                            <div key={product.id} className="product-item">
                                <img
                                    className="product-image"
                                    src={`http://localhost:8080${product.imageUrl}`}
                                    alt={product.name}
                                    
                                />

                                <div className="product-info">
                                    <h3 className="name">{product.name}</h3>
                                    <p className="sku">Sku: {product.sku}</p>
                                    <p className="price">Price: {product.price}</p>
                                    <p className="quantity">Quantity: {product.stockQuantity}</p>
                                </div>

                                <div className="product-actions">
                                    <button className="edit-btn" onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </Layout>
    );
}
