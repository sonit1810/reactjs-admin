import React from 'react';
import {connect} from "react-redux";
import actions from "../../redux/category/action";
import { withRouter } from 'react-router-dom';
import CategoryForm from './Form';
import notification from "../../helpers/Notification";

class CategoryAdd extends React.Component {
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
            code: values.code,
            name: {
                vi: values.name_vi,
                en: values.name_en,
                jp: {
                    kanji: values.name_jp_kanji,
                    romaji: values.name_jp_romaji
                }
            },
            description: {
                vi: values.description_vi,
                en: values.description_en,
                jp: {
                    kanji: values.description_jp_kanji,
                    romaji: values.description_jp_romaji
                }
            },
            group_id: values.group_id
        };
        //add category
        this.props.add({
            data: data
        });
    };

    validate(values) {

        let errors = [];

        if (values.code === '') {
            errors.push('Code is required');
        }

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
        this.props.getListGroup();
    }

    render() {
        return (
            <CategoryForm
                submitHandler={this.onSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.categoryReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(CategoryAdd));