import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/promotion/action";
import { withRouter } from 'react-router-dom';
import PromotionForm from './Form';
import notification from "../../helpers/Notification";
import PageForm from "../Page/Form";

class PromotionAdd extends React.Component {
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
            short_description: {
                vi: values.short_description_vi,
                en: values.short_description_en,
                jp: {
                    kanji: values.short_description_jp_kanji,
                    romaji: values.short_description_jp_romaji
                },
                kr: values.short_description_kr
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
            start_date: values.start_date,
            end_date: values.end_date,
            status: values.status,
            image: values.image,
            image_origin: values.image_origin,
            room_id: values.room_id,
        };
        //add promotion
        this.props.add({
            data: data,
            image: this.state.localImageFile[0]
        });
    };

    validate(values) {

        let errors = [];
        // if (values.room_id === '' || values.room_id === 0) {
        //     errors.push('Room is required');
        // }
        // if (values.start_date === '' || values.start_date === null) {
        //     errors.push('Start date is required');
        // }
        if (this.state.localImageFile.length === 0) {
            errors.push('Image is required');
        }
        if (values.name_vi === '' || values.name_en === '' || values.name_jp_kanji === '' || values.name_jp_romaji === '' || values.name_kr === '') {
            errors.push('All title are required');
        }
        if (values.short_description_vi === '' || values.short_description_en === ''
            && values.short_description_jp_kanji === '' || values.short_description_jp_romaji === '' || values.short_description_kr === '') {
            errors.push('All short description are required');
        }

        if (errors.length > 0) {
            notification.error(errors);
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.props.getListRoom();
    }

    render() {

        let buttonStyle = {};
        if (this.state.localImageData.length > 0) {
            buttonStyle = {display: 'none'};
        }

        return (
            <PromotionForm
                submitHandler={this.onSubmit}
                handleUploadImage={this.handleUploadImage}
                handleImageSelected={this.handleImageSelected}
                buttonStyle={buttonStyle}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.promotionReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(PromotionAdd));
