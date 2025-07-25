import axios from "axios";
import CryptoJS from "crypto-js";


export default function ApiService() {
    const BASE_URL = "http://localhost:8080/api";
    const ENCRYPTION_KEY = "Kawaljeet-react-project";

    // Encrypt
    const encrypt = (data) => {
        return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
    };

    // Decrypt
    const decrypt = (cipherText) => {
        const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    //save token with encryption
    const saveToken = (token) => {
        const encryptedToken = encrypt(token);
        localStorage.setItem("token", encryptedToken);
    }

    //Retrieve the token
    const getToken = () => {
        const encryptedToken = localStorage.getItem("token");
        if (!encryptedToken) return null;
        return decrypt(encryptedToken);
    }

    //save role with encryption
    const saveRole = (role) => {
        const encryptedRole = encrypt(role);
        localStorage.setItem("role", encryptedRole);
    }

    //get role with encryption
    const getRole = () => {
        const encryptedRole = localStorage.getItem("role");
        if (!encryptedRole) return null;
        return decrypt(encryptedRole);
    }

    const clearAuth = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    const getHeader = () => {
        const token = getToken();
        return {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

    //AUTH and User api

    const register = async (registerData) => {
        const response = await axios.post(`${BASE_URL}/auth/register`, registerData);
        return response.data;
    }

    const login = async (loginData) => {
        const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
        return response.data;
    }

    const getAllUsers = async () => {
        const response = await axios.get(`${BASE_URL}/user/get-all-users`, {
            headers: getHeader()
        });
        return response.data
    }

    const getLoggedInUserInfo = async () => {
        const response = await axios.get(`${BASE_URL}/user/current`, {
            headers: getHeader()
        })
        return response.data;
    }

    const getUserById = async (userId) => {
        const response = await axios.get(`${BASE_URL}/user/${userId}`, {
            headers: getHeader()
        })
        return response.data;
    }

    const updateUser = async (userId, userData) => {
        const response = await axios.put(`${BASE_URL}/user/update/${userId}`, userData, {
            headers: getHeader()
        })
        return response.data;
    }

    const deleteUser = async (userId) => {
        const response = await axios.delete(`${BASE_URL}/user/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data;
    }

    //product endpoints

    const addProduct=async (formData)=>{
        const response=await axios.post(`${BASE_URL}/products/add`,formData,{
            headers:{
                ...getHeader(),
                "Content-Type":"multipart/form-data"
            }
        });
        return response.data;
    }

    const updateProduct=async (formData)=>{
        const response=await axios.put(`${BASE_URL}/products/update`,formData,{
            headers:{
                ...getHeader(),
                "Content-Type":"multipart/form-data"
            }
        });
        return response.data;
    }

    const getAllProducts=async ()=>{
        const response=await axios.get(`${BASE_URL}/products/all`,{
            headers:getHeader()
        })
        return response.data;
    }

    const getProductById=async (productId)=>{
        const response = await axios.get(`${BASE_URL}/products/${productId}`,{
            headers:getHeader()
        })
        return response.data;
    }

    const deleteProduct=async (productId)=>{
        const response=await axios.delete(`${BASE_URL}/products/delete/${productId}`,{
            headers:getHeader()
        })
        return response.data;
    }

    const searchProduct=async (searchValue)=>{
        const response=await axios.get(`${BASE_URL}/products/search`,{
            headers:getHeader(),
            params:{searchValue}
        });
        return response.data;
    }

    //Category Endpoints

    //create category
    const createCategory=async (category)=>{
        const response = await axios.post(`${BASE_URL}/category/create`,category,{
            headers:getHeader()
        });
        return response.data;
    }

    //get all categories
    const getAllCategory=async ()=>{
        const response=await axios.get(`${BASE_URL}/category/all`,{
            headers:getHeader()
        });
        return response.data;
    }
    //get categories by id
    const getCategoryById=async (categoryId)=>{
        const response=await axios.get(`${BASE_URL}/category/${categoryId}`,{
            headers:getHeader()
        });
        return response.data;
    }

    const updateCategory=async (categoryId,updatedData)=>{
        const response=await axios.put(`${BASE_URL}/category/update/${categoryId}`,updatedData,{
            headers:getHeader()
        });
        return response.data;
    }

    const deleteCategory=async (categoryId)=>{
        const response=await axios.delete(`${BASE_URL}/category/delete/${categoryId}`,{
            headers:getHeader()
        });
        return response.data;
    }

    //Supplier Endpoints

    const addSupplier=async (supplierData)=>{
        const response = await axios.post(`${BASE_URL}/supplier/add`,supplierData,{
            headers:getHeader()
        });
        return response.data;
    }

    const getAllSuppliers=async ()=>{
        const response=await axios.get(`${BASE_URL}/supplier/all`,{
            headers:getHeader()
        });
        return response.data;
    }

    const getSupplierById=async (supplierId)=>{
        const response = await axios.get(`${BASE_URL}/supplier/${supplierId}`,{
            headers:getHeader()
        });
        return response.data;
    }

    const updateSupplier=async (supplierId,supplierData)=>{
        const response=await axios.put(`${BASE_URL}/supplier/update/${supplierId}`,supplierData,{
            headers:getHeader()
        });
        return response.data;
    }

    const deleteSupplier=async (supplierId)=>{
        const response=await axios.delete(`${BASE_URL}/supplier/delete/${supplierId}`,{
            headers:getHeader()
        });
        return response.data;
    }

    //Transactions Endpoint

    const purchaseProduct=async (body)=>{
        const response=await axios.post(`${BASE_URL}/transactions/purchase`,body,{
            headers:getHeader()
        })
        return response.data;
    }

    const sellProduct=async (body)=>{
        const response=await axios.post(`${BASE_URL}/transactions/sell`,body,{
            headers:getHeader()
        });
        return response.data;
    }

    const returnToSupplier=async (body)=>{
        const response=await axios.post(`${BASE_URL}/transactions/return`,body,{
            headers:getHeader()
        });
        return response.data;
    }

    const getAllTransactions=async (filter)=>{
        const response=await axios.get(`${BASE_URL}/transactions/all`,{
            headers:getHeader(),
            params:{filter}
        });
        return response.data;
    }

    const getTransactionById=async (transactId)=>{
        const response=await axios.get(`${BASE_URL}/transactions/${transactId}`,{
            headers:getHeader()
        });
        return response.data;
    }

    const getTransactionByMonthAndYear=async (month,year)=>{
        const response=await axios.get(`${BASE_URL}/transactions/by-month-year`,{
            headers:getHeader(),
            params:{
                month:month,
                year:year
            }
        });
        return response.data;
    }

    const updateTransactionStatus=async (transactId,status)=>{
        const response=await axios.put(`${BASE_URL}/transactions/${transactId}`,status,{
            headers:getHeader()
        });
        return response.data;
    }

    //AUTHENTICATION checker

    const logout=()=>{
        clearAuth();
    }

    const isAuthenticated=()=>{
        const token=getToken();
        return !!token;
    }

    const isAdmin=()=>{
        const role=getRole();
        return role==="ADMIN";
    }

    return {
    encrypt,
    decrypt,
    saveToken,
    getToken,
    saveRole,
    getRole,
    clearAuth,
    getHeader,
    register,
    login,
    getAllUsers,
    getLoggedInUserInfo,
    getUserById,
    updateUser,
    deleteUser,
    addProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    searchProduct,
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    addSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    purchaseProduct,
    sellProduct,
    returnToSupplier,
    getAllTransactions,
    getTransactionById,
    getTransactionByMonthAndYear,
    updateTransactionStatus,
    logout,
    isAuthenticated,
    isAdmin
};

}
