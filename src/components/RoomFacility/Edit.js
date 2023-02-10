import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/roomFacility/action";
import { withRouter } from 'react-router-dom';
import VariantForm from './Form';
import notification from "../../helpers/Notification";

class RoomFacilityEdit extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetFormData();
    }

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
                kr: values.name_kr,
            },
            description: {
                vi: values.description_vi,
                en: values.description_en,
                jp: {
                    kanji: values.description_jp_kanji,
                    romaji: values.description_jp_romaji
                },
                kr: values.description_kr,
            }
        };
        //add variant
        this.props.edit({
            data: data
        });
    };

    validate(values) {

        if (values.id === '') {
            notification.error('Record does not exist');
            return false;
        }

        let errors = [];
        if (values.name_vi === '' && values.name_en === '' && values.name_jp_kanji === '' && values.name_jp_romaji === '') {
            errors.push('Vui lòng nhập Tên');
        }

        if (errors.length > 0) {
            notification.error(errors);
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.props.getById(this.props.match.params.variantId);
    }

    render() {

        return (
            <VariantForm
                submitHandler={this.onSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roomFacilityReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(RoomFacilityEdit));
