import React, { useState, useEffect } from "react";
import userService from "../services/userServices";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useLocation } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import * as Yup from "yup";

function ProductItems() {
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editItem, setEditItem] = useState(null); // Store the item being edited
  const { productId } = useParams();
  const [initialValues, setInitialValues] = useState([]);
  const [totalItems, setTotalItems] = useState(1);
  const [ serialNumber,setSerialNumber] = useState("");
  const [scanning, setScanning] = useState(false); 
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const receivedData = location.state;

  const validationSchema = Yup.object().shape({
    serial_number: Yup.string().required("Serial Number is required"),
  });

  useEffect(() => {
    handleFetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialMultipleValues = {
    serialNumbers: Array(totalItems).fill(""),
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setEditItem(null);
  };

  //to use the popup dynamically
  const handleEditButtonClick = (item) => {
    setEditItem(item); 
    editItems(item.id);
    setShowPopup(true);
  };


  // calling the apis from user service file for all mutations
  const { mutate: GetTheItems } = useMutation(userService.getItems, {
    onSuccess: (responseData) => {
      setItems(responseData.data.productItems);
    },
  });
  const { mutate: additem } = useMutation(userService.addItem, {
    onSuccess: () => {
      handleFetchData();
      closePopup();
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });
  const { mutate: updateItem } = useMutation(userService.updateItem, {
    onSuccess: () => {
      handleFetchData();
      closePopup();
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const { mutate: deleteItem } = useMutation(userService.deleteItem, {
    onSuccess: () => {
      handleFetchData();
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });
  const { mutate: updateSold } = useMutation(userService.updateSoldStatus, {
    onSuccess: () => {
      handleFetchData();
    },
  });

  //adding product id to the items before calling the functions that calls the APIS 
  const handleSubmit = async (values, { resetForm }) => {
    const valuesWithId = {
      ...values,
      id: productId,
    };
    if (editItem) {
      valuesWithId.itemId = editItem.id; 
      updateItem(valuesWithId);
    } else {
      additem(valuesWithId);
    }
    resetForm();
    closePopup();
  };

  //checkbox on click set sold
  const handleSoldCheckboxChange = async (itemId) => {
    try {
      await updateSold(itemId);
      handleFetchData();
    } catch (error) {
      console.error("Error updating sold status:", error);
    }
  };

  //fetching items data
  const handleFetchData = () => {
    GetTheItems(productId);
  };

  //for adding multiple items
  const handleTotalItemsChange = (e) => {
    const newTotal = parseInt(e.target.value, 10) || 1;
    setTotalItems(newTotal);
  };

  const handleDeleteButtonClick = (id) => {
    deleteItem(id);
  };

 //scanner
  const handleScan = (data) => {
    if (data) {
      setSerialNumber(data);
      // handleSubmit(data);
      setScanning(false); 
    }
  };
  const handleError = (err) => {
    console.error(err);
    setScanning(false); 
  };
  const startScanning = () => {
    setSerialNumber("");
    setScanning(true); 
  };


  const editItems = (itemId) => {
    const ItemToEdit = items.find((productType) => productType.id === itemId);
    const updatedObj = {
      serial_number: ItemToEdit.serial_number,
    };
    setInitialValues(updatedObj);
    openPopup();
  };
  const addNewItem = () => {
    setInitialValues({ serial_number: "" });
    openPopup();
  };

  const filteredProductTypes = items.filter((productItem) =>
  productItem.serial_number.toLowerCase().includes(searchQuery.toLowerCase())
);
  return (
    <div>
      <h2>Items for {receivedData} </h2>
      <div className="button-container">
        <button className="prod-button" onClick={addNewItem}>
          Add New Item 
        </button>
        <button className="prod-button" onClick={startScanning}>
          Start barcode Scan
        </button>
        <div>{serialNumber}</div>
      </div>
      <div style={{ paddingTop: "0%" }}>
        {scanning && (
          <div>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "50% !important", paddingTop: "0%" }}
            />{" "}
            <div className="close-qr">
            
            <button className="prod-button" onClick={() => setScanning(false)}>Close QR Scanner</button>
            </div>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <h2>{editItem ? "Edit" : "Add"} Product Item</h2>
                <label htmlFor="serial_number">Serial Number</label>
                <Field type="text" id="serial_number" name="serial_number" />
                <ErrorMessage
                  name="serial_number"
                  component="div"
                  className="error"
                />
                <div className="add-cancel">
                  <button className="cancel" onClick={closePopup}>
                    Cancel
                  </button>
                  <button type="submit">
                    {editItem ? "Update" : "Add"} Product Type
                  </button>
                </div>
              </Form>
            </Formik>
            {editItem ? null : (
              <Formik
                enableReinitialize={true}
                initialValues={initialMultipleValues}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div>
                    <h2>Add Multiple Items</h2>
                    <label htmlFor="totalItems">Total Number of Items:</label>
                    <Field
                      type="number"
                      id="totalItems"
                      name="totalItems"
                      min="1"
                      value={totalItems}
                      onChange={handleTotalItemsChange}
                    />
                  </div>

                  <div className="serial-number-inputs">
                    {Array.from({ length: totalItems }).map((_, index) => (
                      <div key={index}>
                        <label htmlFor={`serialNumbers.${index}`}>
                          Serial Number {index + 1}:
                        </label>
                        <Field
                          type="text"
                          name={`serial_number[${index}]`}
                          placeholder={`Serial Number ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="add-cancel">
                    <button
                      className="cancel"
                      type="button"
                      onClick={closePopup}
                    >
                      Cancel
                    </button>
                    <button type="submit">Add Multiple Items</button>
                  </div>
                </Form>
              </Formik>
            )}
          </div>
        </div>
      )}
        <input
        type="text"
        placeholder="Search by serial number"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Serial Number</th>
            <th>Tools</th>
            <th>SOLD</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductTypes.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.serial_number}</td>

              <td className="tools">
                <div
                  className="edit"
                  onClick={() => handleEditButtonClick(item)}
                >
                  <i className="fas fa-edit"></i> Edit
                </div>
                <div
                  className="remove"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleDeleteButtonClick(item.id)}
                >
                  <i className="fas fa-trash-alt"></i> Remove
                </div>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={item.sold}
                  onChange={() => handleSoldCheckboxChange(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductItems;
