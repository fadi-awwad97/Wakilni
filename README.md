# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

# ProductItems.js Documentation

## Introduction

`ProductItems.js` is a React component file designed for managing and displaying items associated with a product. It offers various functionalities such as item addition, editing, deletion, marking items as sold, and even barcode scanning for streamlined item entry. This documentation provides an overview of its key features and instructions on how to utilize them effectively.

## Key Functionalities

1. **Displaying Product Items**
   - This component exhibits a list of product items linked to a particular product.

2. **Adding New Items**
   - Users can conveniently add new product items by clicking the "Add New Item" button.
   - For efficiency, users have the option to add multiple items simultaneously by specifying the total number of items and their respective serial numbers.

3. **Editing Items**
   - The component enables users to edit existing product items by selecting the "Edit" button next to the desired item.
   - A popup dialog box facilitates the modification of an item's serial number.

4. **Deleting Items**
   - Items can be removed from the list by clicking the "Remove" button associated with each item.

5. **Marking Items as Sold**
   - Users can indicate that an item has been sold by toggling the checkbox located in the "SOLD" column.

6. **Barcode Scanning**
   - Users have the option to initiate barcode scanning by clicking the "Start barcode Scan" button.
   - Barcode scanning functionality is implemented using the `react-qr-reader` library.
   - Scanned barcodes are promptly displayed in the "Serial Number" field.

7. **Searching Items**
   - The component provides a search feature that allows users to filter items by serial number using the search input field.

## External Libraries and Dependencies

- **react-qr-reader**: This library is utilized to facilitate barcode scanning functionality.
- **formik**: Formik is employed for handling form inputs and performing validations.
- **Yup**: Yup is chosen for the definition and validation of form schemas.
- **react-router-dom**: This library is responsible for routing within the React application.
- **react-query**: React Query plays a vital role in managing asynchronous data fetching and mutations.

## Usage

To integrate the `ProductItems` component into your React application:

1. Ensure that the component is properly imported into your project.

```javascript
import ProductItems from "./ProductItems";

formik: Formik is used for handling form inputs and validations.
Yup: Yup is used for defining and validating form schemas.
react-router-dom: This library is used for routing within the React application.
react-query: React Query is used for managing asynchronous data fetching and mutations.
