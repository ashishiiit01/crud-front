import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Jumbotron, Table, ButtonToolbar, Button, Form, Modal } from "react-bootstrap";
import NameList from "./nameList";


class User extends React.Component {
    state = {
        user: [],
        userDetail: {},
        name: '',
        email: '',
        phone: '',
        dept: '',
        modal: false,
        editUser: {}
    }


    componentDidMount() {
        this.UserList();
    }

    async UserList() {
        let user = await axios.get(`https://crud-back.herokuapp.com/user`)
        this.setState({ 'user': user.data })
        this.setState({ 'userDetail': user.data[0] })
    }


    async handleClose(value) {
        this.setState({ modal: false })

        if (value === 'close') {
            return
        } else {
            let data = {
                "name": this.state.name,
                "email": this.state.email,
                "phone": this.state.phone,
                "department": this.state.dept
            }

            let emailExits = 0;
            let index;
            for (let i = 0; i < this.state.user.length; i++) {
                if (this.state.editUser._id === this.state.user[i]._id) {
                    index = i
                    break;
                }
            }
           
            for (let i = 0; i < this.state.user.length; i++) {
                if ((this.state.user[i].email === this.state.email) && i != index) {
                    emailExits = 1;
                    break;
                }
            }
            if (emailExits) {
                alert("email already exits")
                console.log(this.state.user)
                return
            } else {
                alert("email not exits")

                let user = await axios.put(`https://crud-back.herokuapp.com/user/${this.state.editUser._id}`, data)
                if (user.data._id) {
                    this.setState({ name: '' })
                    this.setState({ email: '' })
                    this.setState({ phone: '' })
                    this.setState({ dept: '' })
                    window.location.reload();
                }

            }

        }
    }

    userEdit(user) {
        this.setState({ modal: true })
        this.setState({ 'editUser': user })
        this.setState({ 'name': user.name })
        this.setState({ 'email': user.email })
        this.setState({ 'phone': user.phone })
        this.setState({ 'dept': user.department })

    }

    render() {
        const show = this.state.modal;
        var clickUser = (user) => {
            console.log("clickUser function called")
            this.setState({ 'userDetail': user })
        }
        let list;
        if (this.state.user.length) {
            list =
                <Jumbotron>
                  <Row>Name : {this.state.userDetail.name}</Row>
                  <Row>Email : {this.state.userDetail.email} </Row>
                  <Row>Phone : {this.state.userDetail.phone}</Row>
                  <Row>Dept : {this.state.userDetail.department}</Row>
                </Jumbotron>
        } else {
            list = <p>No data found</p>
        }
        var deleteUser = async (user) => {
            let res = await axios.delete(`https://crud-back.herokuapp.com/user${user._id}`)
            if (res.status == 200) {
                let index = this.state.user.indexOf(user)
                let res1 = this.state.user.splice(index, 1)
                this.setState({ user: this.state.user })
            }
        }


        var mySubmitHandler = async (event) => {
            event.preventDefault();
            if (this.state.name != '' && this.state.email != '' && this.state.phone != '' && this.state.dept != '') {
                let data = {
                    "name": this.state.name,
                    "email": this.state.email,
                    "phone": this.state.phone,
                    "department": this.state.dept
                }
                let flag = 0;
                for (let i = 0; i < this.state.user.length; i++) {
                    if (this.state.user[i].email === this.state.email) {
                        flag = 1;
                        break;
                    }
                }

                if (flag) {
                    alert("email already exits");
                } else {
                    let user = await axios.post(`https://crud-back.herokuapp.com/user`, data)
                    if (user.data._id) {
                        var joined = this.state.user.concat(user.data);

                    }
                }
            } else {
                alert("Please fill all the fields");
            }
        }



        var myChangeHandler = (event) => {
            let nam = event.target.name;
            let val = event.target.value;
            console.log("nam0", nam, "val", val)
            this.setState({
                [nam]: val
            });

        }


        var renderElement;
        renderElement = (
            <Container>
        <Row>
          <Col md={4}>
            <Row>
              <Col sm={12}>
                <h3>User List</h3>
              </Col>
              <Col sm={12}>
              </Col>
            </Row>
            <br />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Users</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <NameList users={this.state.user} clickUser={clickUser} deleteUser={deleteUser} userEdit={(user) => this.userEdit(user)} />
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
            <Row>
              <Col sm={12}>
                <h3>User Data</h3>
              </Col>
              <Col sm={12}>
              </Col>
            </Row>
            <br />
            {list}
          </Col>
          <Col md={4}>
            <Row>
              <Col sm={12}>
                <h3>Add User</h3>
              </Col>
              <Col sm={12}>
              </Col>
            </Row>
            <br />
            <form onSubmit={mySubmitHandler}>
              Name: &nbsp;
      <input
                type='text'
                name='name'
                onChange={myChangeHandler}
              />
              <br />
              <br />Email: &nbsp;
      <input
                type='email'
                name='email'
                onChange={myChangeHandler}
              />
              <br />
              <br />Phone: &nbsp;
      <input
                type='text'
                name='phone'
                onChange={myChangeHandler}
              />
              <br />
              <br />Dept: &nbsp;
      <input
                type='text'
                name='dept'
                onChange={myChangeHandler}
              />
              <br />
              <br />
              <button class="btn btn-success" type='submit'>Submit</button>
            </form>
            <span id="editModal" style={{ "display": "none" }} data-toggle="modal" data-target="#exampleModal"></span>
          </Col>
        </Row>
        <Modal show={show} onHide={() => this.handleClose('close')}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
               
            <Form.Control type="text" name='name' onChange={myChangeHandler} value={this.state.name }/>
            <br/>
            <Form.Control type="email" name='email' onChange={myChangeHandler} value={this.state.email}/>
            <br/>
            <Form.Control type="text" name='phone' onChange={myChangeHandler} value={this.state.phone}/>
            <br/>
            <Form.Control type="text" name='dept' onChange={myChangeHandler} value={this.state.dept}/>
            <br/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose('close')}>
              Close
          </Button>
            <Button variant="primary" onClick={() => this.handleClose('save')}>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal> </Container>
        )
        return renderElement;
    }
}
export default User;