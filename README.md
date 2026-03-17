# 🍱 CanteenHub – College Canteen Pre-Order System

CanteenHub is a **full-stack MERN (MongoDB, Express.js, React.js, Node.js)** web application designed to reduce long queues in college canteens.

Students can **pre-order meals online**, and canteen staff can **manage orders efficiently in real time**. The system improves convenience for students and streamlines food preparation for the canteen.
<img width="1880" height="910" alt="image" src="https://github.com/user-attachments/assets/e97304d9-311b-416b-8302-81b7f69a0429" />

---

## 🚀 Key Features

### 👨‍🎓 Student Features
<img width="1886" height="916" alt="image" src="https://github.com/user-attachments/assets/87128dcf-958d-470c-b70f-8386c24188b3" />

* Browse available **canteen menu items**
* **Search and filter** food items by category
* Add items to **cart/tray**
* **Place food orders online**
* **Track order status in real-time**
* Responsive and modern user interface
<img width="1883" height="903" alt="image" src="https://github.com/user-attachments/assets/62a4c75c-99c1-4475-a191-5886c6d13265" />
<img width="1882" height="907" alt="image" src="https://github.com/user-attachments/assets/3eda83de-0a70-44e9-8ca9-db0010be8e85" />


### 👨‍🍳 Admin / Canteen Staff Features

* **Admin dashboard** to manage orders
* Update order status (Preparing → Ready → Completed)
* **Menu management** (Add / Update / Delete items)
* **Real-time order updates**

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* CSS
* Lucide React Icons
* Socket.io Client

### Backend

* Node.js
* Express.js
* Socket.io

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* Bcrypt.js

### Tools

* Git & GitHub
* Postman (API Testing)

---

## 📂 Project Structure

```
canteenhub
│
├── backend
│   ├── config          # Database configuration
│   ├── controllers     # Business logic
│   ├── models          # MongoDB schemas
│   ├── routes          # API routes
│   ├── seed.js         # Dummy data generator
│   └── server.js       # Backend entry point
│
├── frontend
│   ├── src
│   │   ├── components  # Reusable UI components
│   │   ├── context     # Global state management
│   │   ├── pages       # Application pages
│   │   └── styles      # CSS styles
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/yourusername/canteenhub.git
```

### 2️⃣ Navigate to project folder

```
cd canteenhub
```

---

### 3️⃣ Setup Backend

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

```
npm run dev
```

---

### 4️⃣ Setup Frontend

Open another terminal:

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

Backend will run on:

```
http://localhost:5000
```

---

## 🌱 Seed Menu Data (Optional)

To populate sample food items:

```
cd backend
node seed.js
```

---

## 📸 Screenshots

(Add screenshots of your application here for better GitHub presentation)

Example:

```
/screenshots/homepage.png
/screenshots/menu.png
/screenshots/admin-dashboard.png
```

---

## 🎯 Benefits of the System

* Reduces long queues in college canteens
* Saves time for students
* Helps staff manage orders efficiently
* Provides a smooth digital ordering experience

---

## 🔮 Future Improvements

* Online payment integration (UPI / Razorpay)
* Push notifications for order updates
* Mobile application version
* QR code pickup system
* Analytics dashboard for canteen sales

---

## 👨‍💻 Author

**Maajid Hassan**
Computer Science Engineering Student
Full-Stack Web Developer

---

⭐ If you like this project, consider giving it a **star on GitHub!**
