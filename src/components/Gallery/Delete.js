import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/gallery/action";
import { withRouter } from 'react-router-dom';
import GalleryFormDetails from './FormDetails';

class GalleryDelete extends React.Component {
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
            <GalleryFormDetails
                submitHandler={this.onSubmit}
            />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.galleryReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(GalleryDelete));