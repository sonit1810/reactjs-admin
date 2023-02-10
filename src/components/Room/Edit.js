import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/room/action";
import { withRouter } from 'react-router-dom';
import RoomForm from './Form';
import notification from "../../helpers/Notification";

class RoomEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localImageFile: [],
            localImageData: [],
        };
        this.props.resetFormData();
    }

    handleUploadImage = async event => {
        console.log('upload product image');
        console.log(event.target.files[0]);
        // notification.info('Uploading...');
        // let formData = {
        //     image: event.target.files[0]
        // };
        // await this.props.uploadImage(formData);
    };

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
            code: '',
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
            price: values.price === '' ? 0 : values.price,
            room_type_id: values.room_type_id,
            images: {
                source: values.images_source,
                thumbnail: values.images_thumbnail,
            },
            images_origin: {
                source: values.images_origin_source,
                thumbnail: values.images_origin_thumbnail
            },
            facilities: values.facilities,
            price_text: {
                vi: values.price_text_vi,
                en: values.price_text_en,
                jp: {
                    kanji: values.price_text_jp_kanji,
                    romaji: values.price_text_jp_romaji
                },
                kr: values.price_text_kr
            },
            status: values.status,
        };
        //update product
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

    validate = values => {

        if (values.id === '') {
            notification.error('Record does not exist');
            return false;
        }

        let errors = [];
        if (values.room_type_id === '' || values.room_type_id === 0) {
            errors.push('Vui lòng chọn danh mục');
        }
        if (values.name_vi === '' && values.name_en === '' && values.name_jp_kanji === '' && values.name_jp_romaji === '' && values.name_kr === '') {
            errors.push('Vui lòng nhập tên');
        }

        if (errors.length > 0) {
            notification.error(errors);
            return false;
        }
        return true;
    };

    componentDidMount() {
        this.props.getById(this.props.match.params.id);
        this.props.getListRoomType();
        this.props.getListRoomFacility();
    }

    render() {

        let buttonStyle = {};
        if (this.state.localImageData.length > 0) {
            buttonStyle = {display: 'none'};
        }

        return (
            <RoomForm
                submitHandler={this.onSubmit}
                handleUploadImage={this.handleUploadImage}
                handleImageSelected={this.handleImageSelected}
                buttonStyle={buttonStyle}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roomReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(RoomEdit));
