import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/roomFacility/action";
import { withRouter } from 'react-router-dom';
import VariantFormDetails from './FormDetails';

class RoomFacilityDelete extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

    onSubmit = values => {
        this.props.delete(values.id);
    };

    componentDidMount() {
        this.props.getById(this.props.match.params.variantId);
    }

    render() {

        const lang = this.props.languageSwitcher.languageMessages;

        return (
            <React.Fragment>
            <p>{lang['message.confirmDelete']}</p>
            <VariantFormDetails
                submitHandler={this.onSubmit}
            />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roomFacilityReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(RoomFacilityDelete));
