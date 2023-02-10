import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useFormik } from 'formik';
import Form from "react-bootstrap/Form";
import {PAGE_GROUP_LIST, PAGE_ROOM_TYPE_LIST} from "../../configs/PagesUrl";
import SpinnerComponent from "../Common/Spinner";

const GroupFormDetails = (props) => {
        const lang = props.languageSwitcher.languageMessages;
        const { formData } = props;

        let initialValues = {
            id: formData.id,
            name_en: formData.name.en,
            name_vi: formData.name.vi,
            name_jp_kanji: formData.name.jp.kanji,
            name_jp_romaji: formData.name.jp.romaji,
            name_kr: formData.name.kr,
            description_en: formData.description.en,
            description_vi: formData.description.vi,
            description_jp_kanji: formData.description.jp.kanji,
            description_jp_romaji: formData.description.jp.romaji,
            description_kr: formData.description.kr,
            sort_order: formData.sort_order,
            hot: formData.hot
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
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Tên">
                                <Form.Group>
                                    <Form.Label>Vi</Form.Label>
                                    <Form.Control disabled
                                        id="name_vi"
                                        name="name_vi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_vi}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>En</Form.Label>
                                    <Form.Control disabled
                                        id="name_en"
                                        name="name_en"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_en}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Hiển thị bên trái</Form.Label>
                                    <Form.Check disabled
                                        id="status"
                                        name="status"
                                        type="checkbox"
                                        checked={parseInt(formik.values.hot) === 1}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                formik.setFieldValue('hot', 1);
                                            } else {
                                                formik.setFieldValue('hot', 0);
                                            }
                                        }}
                                        value={formik.values.hot}
                                    />
                                </Form.Group>
                                <Form.Group className="hide">
                                    <Form.Label>Jp Kanji</Form.Label>
                                    <Form.Control disabled
                                        id="name_jp_kanji"
                                        name="name_jp_kanji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_jp_kanji}
                                    />
                                </Form.Group>
                                <Form.Group className="hide">
                                    <Form.Label>Jp Romaji</Form.Label>
                                    <Form.Control disabled
                                        id="name_jp_romaji"
                                        name="name_jp_romaji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_jp_romaji}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="sort_order" title="Số thứ tự sắp xếp">
                                <Form.Group>
                                    <Form.Label>Vi</Form.Label>
                                    <Form.Control disabled
                                        id="sort_order"
                                        name="sort_order"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.sort_order}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="description" title="Mô tả chi tiết">
                                <Form.Group>
                                    <Form.Label>Vi</Form.Label>
                                    <Form.Control disabled
                                        id="description_vi"
                                        name="description_vi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.description_vi}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>En</Form.Label>
                                    <Form.Control disabled
                                        id="description_en"
                                        name="description_en"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.description_en}
                                    />
                                </Form.Group>
                                <Form.Group className="hide">
                                    <Form.Label>Jp Kanji</Form.Label>
                                    <Form.Control disabled
                                        id="description_jp_kanji"
                                        name="description_jp_kanji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.description_jp_kanji}
                                    />
                                </Form.Group>
                                <Form.Group className="hide">
                                    <Form.Label>Jp Romaji</Form.Label>
                                    <Form.Control disabled
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
                        <button type="submit" className="btn btn-info">{lang['layout.button.delete']}</button>
                        <button type="button" className="btn btn-secondary" onClick={(event) => {props.history.push(PAGE_ROOM_TYPE_LIST)} }>{lang['layout.button.cancel']}</button>
                    </div>
                </Form>
            </div>
        );
};
const mapStateToProps = (state) => ({
    ...state.roomTypeReducer,
    ...state.layoutReducer,
    ...state
});
export default withRouter(connect(mapStateToProps, {})(GroupFormDetails));
