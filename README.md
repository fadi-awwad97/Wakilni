# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
ProductItems.js Documentation
Introduction
ProductItems.js is a React component file that handles the display and management of items related to a product. It allows users to view, add, edit, delete, and mark items as sold. Additionally, it supports barcode scanning for adding items. This documentation provides an overview of the key functionalities and how to use them.

Key Functionalities
1. Displaying Product Items
The component displays a list of product items associated with a specific product.
2. Adding New Items
Users can add new product items by clicking the "Add New Item" button.
For convenience, users can also add multiple items at once by specifying the total number of items and their serial numbers.
3. Editing Items
Users can edit existing product items by clicking the "Edit" button next to an item.
A popup allows users to modify the serial number of the item.
4. Deleting Items
Users can delete items by clicking the "Remove" button next to an item.
5. Marking Items as Sold
Users can mark items as sold by toggling the checkbox in the "SOLD" column.
6. Barcode Scanning
Users can initiate barcode scanning by clicking the "Start barcode Scan" button.
The component uses the react-qr-reader library to scan barcodes.
Scanned barcodes are displayed in the "Serial Number" field.
7. Searching Items
Users can search for items by serial number using the search input field.
External Libraries and Dependencies
react-qr-reader: This library is used for barcode scanning functionality.
formik: Formik is used for handling form inputs and validations.
Yup: Yup is used for defining and validating form schemas.
react-router-dom: This library is used for routing within the React application.
react-query: React Query is used for managing asynchronous data fetching and mutations.
