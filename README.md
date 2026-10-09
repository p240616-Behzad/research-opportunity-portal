# 🎓 University Research Opportunity Portal

A full-stack web application where faculty members can post, view, update, and manage research opportunities in one place.

**GitHub Repository:** https://github.com/p240616-Behzad/research-opportunity-portal

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express.js |
| Database | MySQL / MariaDB |
| Frontend | HTML, CSS, Vanilla JavaScript |

---

## 📦 Prerequisites

Install these before setup:
- **Node.js** v18+ — https://nodejs.org
- **MySQL** v8+ or **MariaDB** v10+ — https://dev.mysql.com/downloads
- **Git** — https://git-scm.com

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/p240616-Behzad/research-opportunity-portal.git
cd research-opportunity-portal
```

### 2. Setup the Database

Open a terminal and run:

```bash
mysql -u root -p < database/schema.sql
```

This creates the `research_portal` database and the `opportunities` table.

### 3. Configure Backend Environment

Create a file named `.env` inside the `backend/` folder:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=research_portal
```

Replace `your_mysql_password` with your actual MySQL/MariaDB password.

### 4. Install Backend Dependencies

```bash
cd backend
npm install
```

### 5. Run the Backend Server

```bash
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 Server running on http://localhost:5000
```

### 6. Run the Frontend

**Option A — Using Live Server (VSCode extension):**
- Right-click `frontend/index.html` → **Open with Live Server**

**Option B — Just open the file:**
- Double-click `frontend/index.html` in your file explorer

The frontend will be available at `http://127.0.0.1:5500/frontend/index.html`.

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api/opportunities`

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| `POST` | `/` | Create a new opportunity | 201, 400, 500 |
| `GET` | `/` | Retrieve all opportunities | 200, 500 |
| `GET` | `/:id` | Retrieve one opportunity by ID | 200, 404, 500 |
| `PUT` | `/:id` | Update an opportunity | 200, 400, 404, 500 |
| `DELETE` | `/:id` | Delete an opportunity | 200, 404, 500 |

### Example Request Body (POST / PUT)

```json
{
  "title": "AI in Healthcare",
  "description": "Research on ML models for disease detection",
  "research_area": "Artificial Intelligence",
  "required_skills": "Python, TensorFlow",
  "available_positions": 2,
  "application_deadline": "2025-12-31",
  "status": "Open"
}
```

---

## 🧪 Testing with Postman

1. Import `postman_collection.json` into Postman
2. Make sure the backend is running (`npm run dev`)
3. Run each request in the collection
4. The collection includes tests for:
   - Creating 3 opportunities
   - Retrieving all / one
   - Updating an opportunity
   - Changing status Open → Closed
   - Deleting an opportunity
   - Getting a deleted opportunity (404 test)
   - Sending invalid data (400 test)

---

## 📁 Project Structure

```
research-opportunity-portal/
├── backend/
│   ├── config/db.js
│   ├── controllers/opportunityController.js
│   ├── middleware/errorHandler.js
│   ├── models/opportunityModel.js
│   ├── routes/opportunities.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── database/
│   └── schema.sql
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── postman_collection.json
├── .gitignore
└── README.md
```

---

## 👤 Author

**Behzad Tariq** — 24P-0616

---

## 📄 License

This project was built for an academic assignment.