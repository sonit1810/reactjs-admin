import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useFormik } from 'formik';
import Form from "react-bootstrap/Form";
import {PAGE_CATEGORY_LIST} from "../../configs/PagesUrl";
import SpinnerComponent from "../Common/Spinner";

const CategoryForm = (props) => {
        const lang = props.languageSwitcher.languageMessages;
        const { listGroup, formData } = props;

        let initialValues = {
            id: formData.id,
            code: formData.code,
            name_en: formData.name.en,
            name_vi: formData.name.vi,
            name_jp_kanji: formData.name.jp.kanji,
            name_jp_romaji: formData.name.jp.romaji,
            description_en: formData.description.en,
            description_vi: formData.description.vi,
            description_jp_kanji: formData.description.jp.kanji,
            description_jp_romaji: formData.description.jp.romaji,
            group_id: formData.group_id,
        };
        //convert null value to empty, else formik will not work
        Object.keys(initialValues).forEach(key => {
            if (initialValues[key] === undefined || initialValues[key] === null) {
                initialValues[key] = '';
            }
        });

        let formik = useFormik({
            initialValues: initialValues,
            enableReinitialize: true,
            onSubmit: values => {
                props.submitHandler(values);
            },
        });

        return (
            <div className="box box-primary">
                <SpinnerComponent show={props.isCallingApi}> </SpinnerComponent>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="box-body">
                        <Tabs defaultActiveKey="general">
                            <Tab eventKey="general" title="General">
                                <Form.Group>
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control
                                        id="code"
                                        name="code"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.code}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Group</Form.Label>
                                    <Form.Control as="select"
                                                  id="group_id"
                                                  name="group_id"
                                                  onChange={formik.handleChange}
                                                  value={formik.values.group_id}>
                                        <option value="0">{lang['common.select.default']}</option>
                                        {listGroup.map(d => (
                                            <option key={d.id} value={d.id}>{d.name.vi} - {d.name.en} - {d.name.jp.kanji} - {d.name.jp.romaji}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="home" title="Tên">
                                <Form.Group>
                                    <Form.Label>Vi</Form.Label>
                                    <Form.Control
                                        id="name_vi"
                                        name="name_vi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_vi}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>En</Form.Label>
                                    <Form.Control
                                        id="name_en"
                                        name="name_en"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_en}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Jp Kanji</Form.Label>
                                    <Form.Control
                                        id="name_jp_kanji"
                                        name="name_jp_kanji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_jp_kanji}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Jp Romaji</Form.Label>
                                    <Form.Control
                                        id="name_jp_romaji"
                                        name="name_jp_romaji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_jp_romaji}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="description" title="Mô tả chi tiết">
                                <Form.Group>
                                    <Form.Label>Vi</Form.Label>
                                    <Form.Control
                                        id="description_vi"
                                        name="description_vi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.description_vi}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>En</Form.Label>
                                    <Form.Control
                                        id="description_en"
                                        name="description_en"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.description_en}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Jp Kanji</Form.Label>
                                    <Form.Control
                                        id="description_jp_kanji"
                                        name="description_jp_kanji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.description_jp_kanji}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Jp Romaji</Form.Label>
                                    <Form.Control
                                        id="description_jp_romaji"
                                        name="description_jp_romaji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.description_jp_romaji}
                                    />
                                </Form.Group>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="box-footer text-center">
                        <button type="submit" className="btn btn-info">{lang['layout.button.save']}</button>
                        <button type="button" className="btn btn-secondary" onClick={(event) => {props.history.push(PAGE_CATEGORY_LIST)} }>{lang['layout.button.cancel']}</button>
                    </div>
                </Form>
            </div>
        );
};
const mapStateToProps = (state) => ({
    ...state.categoryReducer,
    ...state.layoutReducer,
    ...state
});
export default withRouter(connect(mapStateToProps, {})(CategoryForm));