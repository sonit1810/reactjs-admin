import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/roomType/action";
import { withRouter } from 'react-router-dom';
import GroupFormDetails from './FormDetails';

class RoomTypeDelete extends React.Component {
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
            <GroupFormDetails
                submitHandler={this.onSubmit}
            />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roomTypeReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(RoomTypeDelete));
