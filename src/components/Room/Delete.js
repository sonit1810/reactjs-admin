import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/room/action";
import { withRouter } from 'react-router-dom';
import RoomFormDetails from './FormDetails';
import SpinnerComponent from "../Common/Spinner";

class RoomDelete extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

    onSubmit = values => {
        this.props.delete(values.id);
    };

    componentDidMount() {
        this.props.getListRoomType();
        this.props.getListRoomFacility();
        this.props.getById(this.props.match.params.id);

    }

    render() {

        const lang = this.props.languageSwitcher.languageMessages;

        return (
            <React.Fragment>
            <p>{lang['message.confirmDelete']}</p>
            <RoomFormDetails
                submitHandler={this.onSubmit}
            />
            <SpinnerComponent show={this.props.layoutReducer.isCallingApi}> </SpinnerComponent>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.serviceReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(RoomDelete));
