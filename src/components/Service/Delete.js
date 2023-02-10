import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/service/action";
import { withRouter } from 'react-router-dom';
import ServiceFormDetails from './FormDetails';

class ServiceDelete extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

    onSubmit = values => {
        this.props.delete(values.id);
    };

    componentDidMount() {
        this.props.getById(this.props.match.params.id);
    }

    render() {

        const lang = this.props.languageSwitcher.languageMessages;

        return (
            <React.Fragment>
            <p>{lang['message.confirmDelete']}</p>
            <ServiceFormDetails
                submitHandler={this.onSubmit}
            />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roomReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(ServiceDelete));
