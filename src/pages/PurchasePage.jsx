import React, { useEffect, useState } from 'react'
import ApiService from '../service/ApiService';
import Layout from "../component/Layout";

const api = ApiService();

export default function PurchasePage() {

    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [productId, setProductId] = useState("");
    const [supplierId, setSuppplierId] = useState("");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [quantity, setQuantity] = useState("");
    const [message, setMessage] = useState("");

    

    useEffect(() => {
        const fetchProductAndSupplier = async () => {
            try {
                const productData = await api.getAllProducts();
                const supplierData = await api.getAllSuppliers();
                setProducts(productData.products || []);
                setSuppliers(supplierData.suppliers || []);
            } catch (error) {
                showMessage(
                    error.response?.data?.message || "Error Getting Products: " + error
                );
            }
        };
        fetchProductAndSupplier();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productId || !supplierId || !quantity) {
            showMessage("Please fill in all required fields");
            return;
        }

        const body = {
            productId,
            quantity: parseInt(quantity),
            supplierId,
            description,
            note
        };
        console.log(body);

        try {
            const response = await api.purchaseProduct(body);
            showMessage(response.message);
            resetForm();

        } catch (error) {
            showMessage(
                error.response?.data?.message || "Error Purchasing Products: " + error
            );
        }
    };

    const resetForm = () => {
        setProductId("");
        setSuppplierId("");
        setDescription("");
        setQuantity("");
        setNote("");
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
            <div className="purchase-form-page">
                <h1>Receive Inventory</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Select product</label>

                        <select
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            required
                        >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Select Supplier</label>

                        <select
                            value={supplierId}
                            onChange={(e) => setSuppplierId(e.target.value)}
                            required
                        >
                            <option value="">Select a supplier</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Note</label>
                        <input
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Purchase Product</button>
                </form>
            </div>
        </Layout>
    )
}
