import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/page/action";
import { withRouter } from 'react-router-dom';
import PageForm from './Form';
import notification from "../../helpers/Notification";

class PageAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localImageFile: [],
            localImageData: [],
        };
        this.props.resetFormData();
    }

    handleImageSelected = (pictureSelected, pictureDataURLs)  => {
        if (pictureSelected.length > 0) {
            this.setState({
                localImageFile: [pictureSelected[pictureSelected.length - 1]],
                localImageData: [pictureDataURLs[pictureDataURLs.length - 1]]
            });
        } else {
            this.setState({
                localImageFile: [],
                localImageData: []
            });
        }
    };

    onSubmit = values => {
        if (!this.validate(values)) {
            return;
        }

        const data = {
            id: values.id,
            title: values.title,
            description: values.description,
            layout: values.layout,
            type: values.type,
            max_item: values.max_item,
            sample_image: values.sample_image,
            group_id: values.group_id
        };
        //add
        this.props.add({
            data: data,
            image: this.state.localImageFile[0]
        });
    };

    validate(values) {

        let errors = [];
        if (values.title === '') {
            errors.push('Title is required');
        }
        if (values.layout === '') {
            errors.push('Layout type is required');
        }
        if (values.max_item === '' || values.max_item <= 0) {
            errors.push('Max item is required');
        }
        if (this.state.localImageFile.length === 0) {
            errors.push('Image is required');
        }

        if (errors.length > 0) {
            notification.error(errors);
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.props.getListGroup();
    }

    render() {

        let buttonStyle = {};
        if (this.state.localImageData.length > 0) {
            buttonStyle = {display: 'none'};
        }

        return (
            <PageForm
                submitHandler={this.onSubmit}
                handleUploadImage={this.handleUploadImage}
                handleImageSelected={this.handleImageSelected}
                buttonStyle={buttonStyle}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.pageReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(PageAdd));