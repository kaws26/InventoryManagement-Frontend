import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import ApiService from '../service/ApiService';
import Layout from '../component/Layout';


const api = ApiService();
export default function AddEditSupplierPage() {
    const { supplierId } = useParams("");
    const [name, setName] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (supplierId) {
            setIsEditing(true);
            const fetchSupplier = async () => {
                try {
                    const supplierData = await api.getSupplierById(supplierId);
                    if (supplierData.status === 200) {
                        setName(supplierData.supplier.name);
                        setContactInfo(supplierData.supplier.contactInfo);
                        setAddress(supplierData.supplier.address);
                    }
                } catch (error) {
                    showMessage(
                        error.response?.data?.message ||
                        "Error Getting a SUpplier by Id: " + error
                    );
                }
            };
            fetchSupplier();
        }
    }, [supplierId]);

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("");
        }, 4000);
    };


    //handle form submission for both add and edit supplier
    const handleSubmit = async (e) => {
        e.preventDefault();
        const supplierData = { name, contactInfo, address };

        try {
            if (isEditing) {
                await api.updateSupplier(supplierId, supplierData);
                showMessage("Supplier updated successfully.");
                navigate("/supplier");
            } else {
                await api.addSupplier(supplierData);
                showMessage("supplier added successfully!");
                navigate("/supplier");
            }
        } catch (error) {
            showMessage(
                error.response?.data?.message ||
                "Error Getting a Supplier by Id: " + error
            );
        }
    }
    return (
        <Layout>
      {message && <div className="message">{message}</div>}
      <div className="supplier-form-page">
        <h1>{isEditing ? "Edit Supplier" : "Add Supplier"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Supplier Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
            />
          </div>

          <div className="form-group">
            <label>Contact Info</label>
            <input
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
              type="text"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              type="text"
            />
          </div>
          <button type="submit">
            {isEditing ? "Edit Supplier" : "Add Supplier"}
          </button>
        </form>
      </div>
    </Layout>
    );
}
