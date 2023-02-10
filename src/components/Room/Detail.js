import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/room/action";
import { withRouter } from 'react-router-dom';
import RoomFormDetails from './FormDetails';
import SpinnerComponent from "../Common/Spinner";

class RoomDetails extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

    componentDidMount() {
        this.props.getListRoomType();
        this.props.getListRoomFacility();
        this.props.getById(this.props.match.params.id);
    }

    render() {

        const lang = this.props.languageSwitcher.languageMessages;

        return (
            <React.Fragment>
                <RoomFormDetails
                    submitHandler={this.onSubmit}
                    isDetail={true}
                />
                <SpinnerComponent show={this.props.layoutReducer.isCallingApi}> </SpinnerComponent>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roomReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(RoomDetails));
