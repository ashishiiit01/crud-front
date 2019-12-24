import React from 'react';
import { Button } from "react-bootstrap";
class NameList extends React.Component {
    render() {
        const users = this.props.users;
        const listItems = users.map((user, index) =>
            <tr  key={user._id} >
                <td onClick={() => this.props.clickUser(user)}>
                  {index}
                </td>
                <td onClick={() => this.props.clickUser(user)}>
                  {user.name}
                </td>
                <td >
                    <Button variant="danger" onClick={() => this.props.deleteUser(user)}>Delete </Button>
                </td>
                <td >
                    <Button variant="info" onClick={()=>this.props.userEdit(user)}>Edit </Button>
                </td>
            </tr>
        );
        return (listItems);
    }
}
export default NameList;