import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/user/action";
import { withRouter } from 'react-router-dom';
import UserForm from './Form';
import notification from "../../helpers/Notification";

class UserEdit extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

    onSubmit = values => {
        if (!this.validate(values)) {
            return;
        }

        const data = {
            id: values.id,
            name: values.name,
            email: values.email,
            password: values.password,
            roles: values.roles,
        };
        //update user
        this.props.edit({
            data: data
        });
    };

    validate(values) {

        if (values.id === '') {
            notification.error('Record does not exist');
            return false;
        }

        let errors = [];
        if (values.name === '') {
            errors.push('Name is required');
        }
        if (values.email === '') {
            errors.push('Email is required');
        }
        if (values.roles === '') {
            errors.push('Role is required');
        }

        if (errors.length > 0) {
            notification.error(errors);
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.props.getById(this.props.match.params.userId);
        this.props.getRoleList();
    }

    render() {
        return (
            <UserForm
                submitHandler={this.onSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.userReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(UserEdit));
