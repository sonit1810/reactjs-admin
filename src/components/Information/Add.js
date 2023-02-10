import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/information/action";
import { withRouter } from 'react-router-dom';
import InformationForm from './Form';
import notification from "../../helpers/Notification";

class InformationAdd extends React.Component {
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
            name: {
                vi: values.name_vi,
                en: values.name_en,
                jp: {
                    kanji: values.name_jp_kanji,
                    romaji: values.name_jp_romaji
                },
                kr: values.name_kr
            },
            description: {
                vi: values.description_vi,
                en: values.description_en,
                jp: {
                    kanji: values.description_jp_kanji,
                    romaji: values.description_jp_romaji
                },
                kr: values.description_kr
            },
            images: {
                source: values.images_source,
                thumbnail: values.images_thumbnail,
            },
            images_origin: {
                source: values.images_origin_source,
                thumbnail: values.images_origin_thumbnail
            },
        };
        //add product
        this.props.add({
            data: data,
            image: this.state.localImageFile[0]
        });
    };

    validate(values) {
        console.log(values);

        let errors = [];
        if (values.name_vi === '' || values.name_en === '' || values.name_jp_kanji === '' || values.name_jp_romaji === '' || values.name_kr === '') {
            errors.push('All Name is required');
        }
        // if (this.state.localImageFile.length === 0) {
        //     errors.push('Image is required');
        // }

        if (errors.length > 0) {
            notification.error(errors);
            return false;
        }
        return true;
    }

    componentDidMount() {
        
    }

    render() {

        let buttonStyle = {};
        if (this.state.localImageData.length > 0) {
            buttonStyle = {display: 'none'};
        }

        return (
            <InformationForm
                submitHandler={this.onSubmit}
                handleUploadImage={this.handleUploadImage}
                handleImageSelected={this.handleImageSelected}
                buttonStyle={buttonStyle}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.informationReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(InformationAdd));
