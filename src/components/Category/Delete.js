import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/category/action";
import { withRouter } from 'react-router-dom';
import CategoryFormDetails from './FormDetails';

class CategoryDelete extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

    onSubmit = values => {
        this.props.delete(values.id);
    };

    componentDidMount() {
        this.props.getListGroup();
        this.props.getById(this.props.match.params.categoryId);
    }

    render() {

        const lang = this.props.languageSwitcher.languageMessages;

        return (
            <React.Fragment>
            <p>{lang['message.confirmDelete']}</p>
            <CategoryFormDetails
                submitHandler={this.onSubmit}
            />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.categoryReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(CategoryDelete));