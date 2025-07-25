# 📦 Inventory Management System – Frontend

This is the **Frontend** of the Inventory Management System, developed using **React.js**. It communicates with the **Spring Boot** backend via **Axios** to perform CRUD operations on inventory items, categories, suppliers, and more.

> ✅ This project is part of a full-stack Inventory Management System.  
> 🌐 Backend Repository: [Link to Backend Repo](https://github.com/kaws26/InventoryManagement-Backend) 

---

## 🚀 Features

- 🔐 Secure login and logout for admin/user
- 📄 Dashboard with inventory statistics
- 📋 Add, edit, delete inventory items
- 🧾 Manage product categories and suppliers
- 📦 Stock level tracking
- 🔍 Search and filter functionality
- 📊 Simple analytics and summaries
- 📥 Axios-based API integration
- 🧑‍💼 Role-based UI 
- 💡 Responsive and clean UI

---

## 🛠️ Tech Stack

| Tech             | Description                                |
|------------------|--------------------------------------------|
| React.js         | Frontend library for building UI           |
| Axios            | For HTTP communication with backend APIs   |
| React Router     | Routing between pages                      |


---

## 📁 Folder Structure

```bash
inventoryManagementSystem-Frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route-based page components
│   ├── service/          # Axios API calls (e.g., ApiService.js)
│   ├── App.js            # Main app and routing logic
│   ├── index.js          # Entry point
│   └── ...               # Other configs and helpers
├── .env                 # Environment variables (optional)
├── package.json         # Project metadata and dependencies
└── README.md            # This file
````

---

## 🔗 API Integration

All API calls are handled through **Axios** via a centralized service (e.g., `ApiService.js`):

```javascript
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Spring Boot base URL

export default function ApiService() {
  return {
    getProducts: () => axios.get(`${BASE_URL}/products`),
    addProduct: (product) => axios.post(`${BASE_URL}/products`, product),
    updateProduct: (id, product) => axios.put(`${BASE_URL}/products/${id}`, product),
    deleteProduct: (id) => axios.delete(`${BASE_URL}/products/${id}`),
    // Add more methods as needed
  };
}
```

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/InventoryManagement-Frontend.git
cd InventoryManagement-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## ⚙️ Environment Configuration

You can set the API base URL in `.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

And use it in your service file:

```js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
```

---

## 📸 Video Demo 

[*Working Video Demo*](https://drive.google.com/file/d/1vyRnnaiDdb_a0A1aeWWDKlFr-xwbrKGD/view?usp=sharing)

---

## 🧑‍💻 Author

**Kawaljeet Singh**
B.Tech IT, USICT

> Passionate about building full-stack applications using modern web technologies.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---


