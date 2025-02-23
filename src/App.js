import './App.css';
import { Col, Container, Row, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaEdit, FaMoon, FaSun } from 'react-icons/fa';

function App() {
  let [formData, setFormData] = useState({
    uname: '',
    uemail: '',
    uphone: '',
    umessage: '',
    index: '',
  });

  let [userData, setUserData] = useState([]);
  let [darkMode, setDarkMode] = useState(false);

  let toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  let getValue = (event) => {
    let oldData = { ...formData };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    let currentUserData = { ...formData };
    delete currentUserData.index;

    if (formData.index === '') {
      let checkFilter = userData.filter(
        (v) => v.uemail === formData.uemail || v.uphone === formData.uphone
      );

      if (checkFilter.length === 1) {
        toast.warn('Enter a unique email and phone number');
      } else {
        setUserData([...userData, currentUserData]);
        resetForm();
        toast.success('Data saved successfully');
      }
    } else {
      let updatedUserData = [...userData];
      updatedUserData[formData.index] = currentUserData;
      setUserData(updatedUserData);
      resetForm();
      toast.success('Data updated successfully');
    }
  };

  let deleteRow = (indexNumber) => {
    let filterDataDelete = userData.filter((_, i) => i !== indexNumber);
    setUserData(filterDataDelete);
    toast.error('Data deleted');
  };

  let editRow = (indexNumber) => {
    toast.warn('You want to update the row with index ' + (indexNumber+1));
    let editData = { ...userData[indexNumber], index: indexNumber };
    setFormData(editData);
  };

  let resetForm = () => {
    setFormData({
      uname: '',
      uemail: '',
      uphone: '',
      umessage: '',
      index: '',
    });
  };

  return (
    <Container fluid className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
      <ToastContainer />
      <Container>
        <Row>
          <Col className="text-center py-4">
            <h1>Enquiry Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5} sm={12} className="mb-3">
            <Form onSubmit={handleSubmit} className="p-3 border rounded shadow">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={getValue} value={formData.uname} name="uname" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={getValue} value={formData.uemail} name="uemail" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" onChange={getValue} value={formData.uphone} name="uphone" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={getValue} value={formData.umessage} name="umessage" />
              </Form.Group>

              <button className="btn btn-primary w-100">
                {formData.index !== '' ? 'Update' : 'Save'}
              </button>
            </Form>
          </Col>
          <Col lg={7} sm={12}>
            <Table responsive striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length > 0 ? (
                  userData.map((obj, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{obj.uname}</td>
                      <td>{obj.uemail}</td>
                      <td>{obj.uphone}</td>
                      <td>{obj.umessage}</td>
                      <td>
                        <button className="btn btn-danger me-2" onClick={() => deleteRow(index)}>
                          <FaTrash /> Delete
                        </button>
                        <button className="btn btn-warning text-white" onClick={() => editRow(index)}>
                          <FaEdit /> Update
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <button 
        className="btn btn-secondary position-fixed bottom-0 end-0 m-3 rounded-circle p-3" 
        onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </Container>
  );
}

export default App;
