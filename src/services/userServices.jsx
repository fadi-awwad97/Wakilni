
import GuestInstance from '../lib/GuestRequest';
import AuthInstance from '../lib/AuthRequest';
import FormDatainstance from '../lib/FormDatainstance';

const signup = ({ username, email, password }) => {
  try {
    return GuestInstance().post('/signup', {
      username,
      email,
      password,
    });
  } catch (error) {
    console.log('error', error);
  }
};


const login = ({ email, password }) => {
  try {
    return GuestInstance().post('/login', {
      email,
      password,
    });
  } catch (error) {
    console.log('error', error);
  }
};

const logout = () => {
  try {
    return AuthInstance().post('/logout');
  } catch (error) {
    console.log('error', error);
  }
};

const getAllProducts = () => {

  try {
   
    return FormDatainstance().get('/products' );
    
  } catch (error) {
    console.log('error', error);
  }
};

const addProduct = ( formData ) => {

  try {

    return FormDatainstance().post('/products/create',  formData );
    
  } catch (error) {
    console.log('error', error);
  }
};

const updateProduct = (formDataEdit) => {

  try {

    return FormDatainstance().post('/update-product/'+formDataEdit.get('id'),formDataEdit );

  } catch (error) {
    console.log('error', error);
  }
};

const deleteProduct = (id) => {

  try {

    return AuthInstance().delete('/delete-product/'+id );

  } catch (error) {
    console.log('error', error);
  }
};

const updateSoldStatus = (id) => {

  try {
  
    return FormDatainstance().post('/sold-item/'+id);

  } catch (error) {
    console.log('error', error);
  }
};

const getItems = (product_id) => {

  try {
 
    return AuthInstance().get('/items/'+product_id );
    
  } catch (error) {
    console.log('error', error);
  }
};
const addItem = ( value ) => {

  try {
    return AuthInstance().post('/add-item/'+value.id,  value );
    
  } catch (error) {
    console.log('error', error);
  }
};
const updateItem = ( value ) => {

  try {
    return AuthInstance().post('/update-item/'+value.id,  value );
    
  } catch (error) {
    console.log('error', error);
  }
};

const deleteItem = ( id ) => {

  try {
    return AuthInstance().delete('/delete-item/'+ id );
    
  } catch (error) {
    console.log('error', error);
  }
};


 // eslint-disable-next-line
  export default {
    signup,
    login,
    addProduct,
    getAllProducts,
    getItems,
    updateProduct,
    deleteProduct,
    updateSoldStatus,
    addItem,
    updateItem,
    deleteItem,
    logout
  };
  
