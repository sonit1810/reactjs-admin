import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/roomType/action";
import { withRouter } from 'react-router-dom';
import RoomTypeForm from './Form';
import notification from "../../helpers/Notification";

class RoomTypeAdd extends React.Component {
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
            sort_order: values.sort_order,
            hot: values.hot,
            sub_types: values.sub_types,
        };
        //add group
        this.props.add({
            data: data
        });
    };

    validate(values) {

        let errors = [];
        if (values.name_vi === '' && values.name_en === '' && values.name_jp_kanji === '' && values.name_jp_romaji === '' && values.name_kr === '') {
            errors.push('Vui lòng nhập tên');
        }

        if (errors.length > 0) {
            notification.error(errors);
            return false;
        }
        return true;
    }

    componentDidMount() {

    }

    render() {
        return (
            <RoomTypeForm
                submitHandler={this.onSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roomTypeReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(RoomTypeAdd));
