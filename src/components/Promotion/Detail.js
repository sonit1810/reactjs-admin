import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/promotion/action";
import { withRouter } from 'react-router-dom';
import PromotionFormDetails from './FormDetails';

class PromotionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

    componentDidMount() {
        this.props.getListRoom();
        this.props.getById(this.props.match.params.promotionId);
    }

    render() {

        const lang = this.props.languageSwitcher.languageMessages;

        return (
            <React.Fragment>
                <PromotionFormDetails
                    submitHandler={this.onSubmit}
                    isDetail={true}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.promotionReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(PromotionDetail));
