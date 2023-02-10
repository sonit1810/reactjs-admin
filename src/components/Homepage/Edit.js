import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/homepage/action";
import { withRouter } from 'react-router-dom';
import HomepageForm from './Form';
import notification from "../../helpers/Notification";

class HomepageEdit extends React.Component {
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
            short_description: values.short_description,
            description: values.description,
            image: values.image,
            category_id: 2,//values.category_id,
            image_origin: values.image_origin
        };
        //update
        if (this.state.localImageFile.length > 0) {
            this.props.edit({
                data: data,
                image: this.state.localImageFile[0]
            });
        } else {
            this.props.edit({
                data: data,
            });
        }
    };

    validate(values) {

        if (values.id === '') {
            notification.error('Record does not exist');
            return false;
        }

        let errors = [];
        if (values.title === '') {
            errors.push('Title is required');
        }

        if (errors.length > 0) {
            notification.error(errors);
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.props.getListGroup();
        this.props.getById(this.props.match.params.pageId);
    }

    render() {

        let buttonStyle = {};
        if (this.state.localImageData.length > 0) {
            buttonStyle = {display: 'none'};
        }

        return (
            <HomepageForm
                submitHandler={this.onSubmit}
                handleUploadImage={this.handleUploadImage}
                handleImageSelected={this.handleImageSelected}
                buttonStyle={buttonStyle}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.homepageReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(HomepageEdit));