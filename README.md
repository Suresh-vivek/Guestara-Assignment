# Menu Management Backend

This is a Node.js backend server for managing a menu system, including categories, subcategories, and items. The server is built using Express.js and MongoDB, with Mongoose as the ODM (Object Data Modeling) library.

## Features

- Create, retrieve, update, and search categories, subcategories, and items.
- Search for items by name.

## Requirements

- **Node.js** (v14 or above)
- **npm** (v6 or above)
- **MongoDB** (v4.0 or above)

## Project Structure

```plaintext
menu_management/
│
├── src/
│   ├── config/         # Configuration files (e.g., database connection)
│   ├── controllers/    # Controllers for handling API logic
│   ├── models/         # Mongoose schemas and models
│   ├── routes/         # Route definitions
│
├── .env                # Environment variables
├── server.js           # Main application file
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Suresh-vivek/Guestara-Assignment.git
cd Guestara_Assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Server

```bash
npm run start
```

## API Endpoints

### Category

- **POST** `/api/categories` - Create a new category
- **GET** `/api/categories` - Get all categories
- **GET** `/api/categories/:idOrName` - Get a category by ID or name
- **PUT** `/api/categories/:id` - Edit a category

### Subcategory

- **POST** `/api/subcategories` - Create a new subcategory
- **GET** `/api/subcategories` - Get all subcategories
- **GET** `/api/subcategories/:idOrName` - Get a subcategory by ID or name
- **GET** `/api/subcategories/category/:categoryId` - Get all subcategories under a specific category
- **PUT** `/api/subcategories/:id` - Edit a subcategory

### Item

- **POST** `/api/items` - Create a new item
- **GET** `/api/items` - Get all items
- **GET** `/api/items/:idOrName` - Get an item by ID or name
- **GET** `/api/items/subcategory/:subcategoryId` - Get all items under a specific subcategory
- **GET** `/api/items/search` - Search for items by name
- **PUT** `/api/items/:id` - Edit an item
