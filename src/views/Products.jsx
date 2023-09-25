import React, { useState } from "react";
import { useMutation } from "react-query";
import userService from "../services/userServices";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { deleteTokens } from "../storageProvider";
import * as Yup from "yup";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupedit, setShowPopupEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [PreviewImage, setPreviewImage] = useState(null);

  const [editingProductType, setEditingProductType] = useState(null); // State to store the product type being edited
  const [productTypes, setProductTypes] = useState([]);

  React.useEffect(() => {
    handleFetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    name: "",
    description: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product Type Name is required"),
    description: Yup.string().required("Product Description is required"),
    // image: Yup.mixed().required("Product image is required"),
  });
  const navigate = useNavigate();

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPreviewImage(null);
  };

  const openPopupEdit = () => {
    setShowPopupEdit(true);
  };

  const closePopupEdit = () => {
    setShowPopupEdit(false);
    setPreviewImage(null);
  };

  const { mutate: GetTheData } = useMutation(userService.getAllProducts, {
    onSuccess: (responseData) => {
      setProductTypes(responseData.data.productTypes);
    },
    onError: (error) => {
      console.log(error.response.data.message);
      if (error.response.data.message === 'Unauthenticated.'){
        deleteTokens();
      }
    },
  });
  const { mutate: RemoveProduct } = useMutation(userService.deleteProduct, {
    onSuccess: (responseData) => {
      GetTheData();
    },
  });
  const { mutate: addtheproduct } = useMutation(userService.addProduct, {
    onSuccess: (responseData) => {
      handleFetchData();
      closePopup();
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const { mutate: Edittheproduct } = useMutation(userService.updateProduct, {
    onSuccess: (responseData) => {
      handleFetchData();
      closePopupEdit();
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const { mutate: logout } = useMutation(userService.logout, {
    onSuccess: (responseData) => {
      deleteTokens();
      navigate("/login");
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const filteredProductTypes = productTypes.filter((productType) =>
    productType.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Store the selected image file
    }
    setSelectedImage(file);
  };

  const handleFetchData = () => {
    GetTheData();
  };

  const editProduct = (productId) => {
    const productToEdit = productTypes.find(
      (productType) => productType.id === productId
    );
    const updatedObj = {
      id: productToEdit.id,
      name: productToEdit.name,
      description: productToEdit.description,
      image: null,
      imageUrl: productToEdit.image_url,
    };

    setEditingProductType(updatedObj);
    openPopupEdit(); // Open the popup
  };

  const removeProduct = (productId) => {
    RemoveProduct(productId);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { name, description } = values;
    const formData = new FormData();
    formData.append("name", name); // Append the value of name, not the string "name"
    formData.append("description", description); // Append the value of description, not the string "description"
    formData.append("image", selectedImage); // Append the value of image, not the string "image"
    resetForm();
    addtheproduct(formData);
  };

  const handleEdit = async (values) => {
    const { name, description, id } = values;
    const formDataEdit = new FormData();
    formDataEdit.append("id", id);
    formDataEdit.append("name", name); // Append the value of name, not the string "name"
    formDataEdit.append("description", description); // Append the value of description, not the string "description"
    formDataEdit.append("image", selectedImage); // Append the value of image, not the string "image"

    Edittheproduct(formDataEdit);
  };

  const handleProductTypeClick = (productId, productName) => {
    navigate(`/product/${productId}/items`, { state: productName });
  };

  return (
    <div className="body">
      <div className="logout">
        <button onClick={logout} className="logout-button">
          <i className="fa fa-outdent" aria-hidden="true"> Logout</i>
        </button>
      </div>
      <h1>Product Types</h1>
      <div className="button-container">
        <button className="prod-button" onClick={openPopup}>
          Add New Product Type
        </button>
      </div>
  
      <Formik
       
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2>Add a Product Type</h2>
                <label htmlFor="name">Product Type Name:</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error" />

                <label htmlFor="description">Product Description:</label>
                <Field as="textarea" id="description" name="description" />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />

                <label htmlFor="image" style={{ cursor: "pointer" , border:"1px solid lightgray", padding:'10px' }}>
                  Add Image <i className="fa fa-camera-retro fa-1x"></i>
                </label>
                <Field
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    handleImageChange(event); // Pass setFieldValue
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-danger"
                />

                <div className="image-preview">
                  <img
                    width="100%"
                    type="image"
                    alt=""
                    src={PreviewImage ? PreviewImage : null}
                  />
                </div>

                <div className="add-cancel">
                  <button className="cancel" onClick={closePopup}>
                    Cancel
                  </button>
                  <button type="submit">Add Product Type</button>
                </div>
              </div>
            </div>
          )}
        </Form>
      </Formik>
      <Formik
        enableReinitialize={true}
        initialValues={editingProductType}
        validationSchema={validationSchema}
        onSubmit={handleEdit}
      >
        {(formikProps) => (
          <Form>
            {showPopupedit && (
              <div className="popup">
                <div className="popup-content">
                  <h2>Add a Product Type</h2>
                  <label htmlFor="name">Product Type Name:</label>
                  <Field
                    type="hidden"
                    id="id"
                    name="id"
                  />
                  <Field
                    type="text"
                    id="name"
                    name="name"
                  />
                  <ErrorMessage name="name" component="div" className="error" />

                  <label htmlFor="description">Product Description:</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error"
                  />

                  <label htmlFor="image" style={{ cursor: "pointer" }}>
                    Edit your Image <i className="fa fa-camera-retro fa-1x"></i>
                  </label>
                  <Field
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(event) => {
                      handleImageChange(event); // Pass setFieldValue
                    }}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-danger"
                  />

                  {PreviewImage ? (
                    <div className="image-preview">
                      <img
                        width="100%"
                        src={PreviewImage}
                        alt="Uploaded Preview"
                      />
                    </div>
                  ) : (
                    <div className="image-preview">
                      <img
                        width="100%"
                        src={`${"http://localhost:8000"}${
                          editingProductType.imageUrl
                        }`}
                        alt="Uploaded Preview"
                      />
                    </div>
                  )}

                  <div className="add-cancel">
                    <button className="cancel" onClick={closePopupEdit}>
                      Cancel
                    </button>
                    <button type="submit">Edit Product Type</button>
                  </div>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
      <input
        type="text"
        placeholder="Search by product type name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Type Name</th>
            <th>Description</th>
            <th>Count</th>
            <th>Image</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductTypes.map((productType) => (
            <tr key={productType.id} style={{ cursor: "pointer" }}>
              <td
                onClick={() =>
                  handleProductTypeClick(productType.id, productType.name)
                }
              >
                {productType.id}
              </td>
              <td
                onClick={() =>
                  handleProductTypeClick(productType.id, productType.name)
                }
              >
                {productType.name}
              </td>
              <td
                onClick={() =>
                  handleProductTypeClick(productType.id, productType.name)
                }
              >
                {productType.description}
              </td>
              <td
                onClick={() =>
                  handleProductTypeClick(productType.id, productType.name)
                }
              >
                {productType.count}
              </td>
              <td onClick={() =>
                  handleProductTypeClick(productType.id, productType.name)
                }>
                <img
                  src={`${"http://localhost:8000"}${productType.image_url}`}
                  alt={productType.name}
                  className="product-image"
                />
              </td>
              <td className="tools">
                <div
                  className="edit"
                  onClick={() => editProduct(productType.id)}
                >
                  <i className="fas fa-edit"></i> Edit
                </div>
                <div
                  className="remove"
                  style={{ marginTop: "10px" }}
                  onClick={() => removeProduct(productType.id)}
                >
                  <i className="fas fa-trash-alt"></i> Remove
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
