import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/page/action";
import { withRouter } from 'react-router-dom';
import PageFormDetails from './FormDetails';

class PageDelete extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

    onSubmit = values => {
        console.log(values);
        this.props.delete({id: values.id, image: values.sample_image_origin});
    };

    componentDidMount() {
        this.props.getById(this.props.match.params.pageId);
        this.props.getListGroup();
    }

    render() {

        const lang = this.props.languageSwitcher.languageMessages;

        return (
            <React.Fragment>
            <p>{lang['message.confirmDelete']}</p>
            <PageFormDetails
                submitHandler={this.onSubmit}
            />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.pageReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(PageDelete));