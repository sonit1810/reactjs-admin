import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/user/action";
import { withRouter } from 'react-router-dom';
import UserFormDetails from './FormDetails';

class UserDelete extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

    onSubmit = values => {
        this.props.delete(values.id);
    };

    componentDidMount() {
        this.props.getById(this.props.match.params.userId);
        this.props.getRoleList();
    }

    render() {

        const lang = this.props.languageSwitcher.languageMessages;

        return (
            <React.Fragment>
                <p>{lang['message.confirmDelete']}</p>
                <UserFormDetails
                    submitHandler={this.onSubmit}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.userReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(UserDelete));
