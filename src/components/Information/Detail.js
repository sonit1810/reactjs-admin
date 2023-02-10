import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/information/action";
import { withRouter } from 'react-router-dom';
import InformationFormDetails from './FormDetails';

class InformationDetails extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

    componentDidMount() {
        this.props.getById(this.props.match.params.id);
    }

    render() {

        const lang = this.props.languageSwitcher.languageMessages;

        return (
            <React.Fragment>
                <InformationFormDetails
                    submitHandler={this.onSubmit}
                    isDetail={true}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roomReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(InformationDetails));
