import './App.css';
import { Col, Container, Row, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function App() {

  let [formData, setFormData] = useState({
    uname: '',
    uemail: '',
    uphone: '',
    umessage: '',
    index: '',
  });

  let [userData, setUserData] = useState([]);

  let getValue = (event) => {
    let oldData = { ...formData };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    let currentUserData = {
      uname: formData.uname,
      uphone: formData.uphone,
      uemail: formData.uemail,
      umessage: formData.umessage,
    };

    if (formData.index === '') {
      // Adding new entry
      let checkFilter = userData.filter(
        (v) => v.uemail === formData.uemail || v.uphone === formData.uphone
      );

      if (checkFilter.length === 1) {
        toast.warn('Enter a unique email and phone number');
      } else {
        let oldUserData = [...userData, currentUserData];
        setUserData(oldUserData);
        resetForm();
      }
    } else {
      // Updating existing entry
      let updatedUserData = [...userData];
      updatedUserData[formData.index] = currentUserData;
      setUserData(updatedUserData);
      resetForm();
      toast.success('Data updated successfully');
    }
  };

  let deleteRow = (indexNumber) => {
    let filterDataDelete = userData.filter((v, i) => i !== indexNumber);
    setUserData(filterDataDelete);
    toast.error('Data deleted');
  };

  let editRow = (indexNumber) => {
    toast.warn('You want to update the row with index ' + indexNumber);
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
    <Container fluid>
      <ToastContainer />
      <Container>
        <Row>
          <Col className="text-center py-4">
            <h1>Enquiry Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            
            <Form onSubmit={handleSubmit}>
              <div className="pb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  onChange={getValue}
                  value={formData.uname}
                  name="uname"
                  className="form-control"
                />
              </div>

              <div className="pb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  onChange={getValue}
                  value={formData.uemail}
                  name="uemail"
                  className="form-control"
                />
              </div>

              <div className="pb-3">
                <label className="form-label">Phone</label>
                <input
                  type="number"
                  onChange={getValue}
                  value={formData.uphone}
                  name="uphone"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  type="text"
                  onChange={getValue}
                  value={formData.umessage}
                  name="umessage"
                  className="form-control"
                  rows={3}
                />
              </div>

              <button className="btn btn-primary">
                {formData.index !== '' ? 'Update' : 'Save'}
              </button>
            </Form>
          </Col>
          <Col lg={7}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length >= 1 ? (
                  userData.map((obj, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{obj.uname}</td>
                        <td>{obj.uemail}</td>
                        <td>{obj.uphone}</td>
                        <td>{obj.umessage}</td>
                        <td>
                          <button
                            className="btn btn-danger me-2"
                            onClick={() => deleteRow(index)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={() => editRow(index)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
