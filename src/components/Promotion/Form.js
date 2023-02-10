import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useFormik} from 'formik';
import Form from "react-bootstrap/Form";
import ImageUploader from 'react-images-upload';
import {PAGE_PROMOTION_LIST} from "../../configs/PagesUrl";
import SpinnerComponent from "../Common/Spinner";
import Button from "react-bootstrap/Button";
import {Field, FormikProvider} from "formik";
import InputGroup from "react-bootstrap/InputGroup";
import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import editorConfig from "../../services/CKEditorUploadAdapter";
import moment from "moment";
import siteConfig from "../../configs/siteConfig";
import {DatePicker} from "antd";
import {SingleDatePicker, DateRangePicker} from 'react-dates';
import DatePickerWithFormik from "../../common/DatePickerWithFormmik";
import CKFinder from '@ckeditor/ckeditor5-build-decoupled-document';


const PromotionForm = (props) => {
    const lang = props.languageSwitcher.languageMessages;
    const {buttonStyle, formData, listRoom} = props;

    let startDate = null;
    if (formData.start_date != null && formData.start_date !== '') {
        startDate = moment(formData.start_date).format(siteConfig.dateTimeFormat);
        startDate = moment(startDate);
    }

    let endDate = null;
    if (formData.end_date != null && formData.end_date !== '') {
        endDate = moment(formData.end_date).format(siteConfig.dateTimeFormat);
        endDate = moment(endDate);
    }


    let initialValues = {
        id: formData.id,
        name_en: formData.name.en,
        name_vi: formData.name.vi,
        name_jp_kanji: formData.name.jp.kanji,
        name_jp_romaji: formData.name.jp.romaji,
        name_kr: formData.name.kr,
        short_description_en: formData.short_description.en,
        short_description_vi: formData.short_description.vi,
        short_description_jp_kanji: formData.short_description.jp.kanji,
        short_description_jp_romaji: formData.short_description.jp.romaji,
        short_description_kr: formData.short_description.kr,
        description_en: formData.description.en,
        description_vi: formData.description.vi,
        description_jp_kanji: formData.description.jp.kanji,
        description_jp_romaji: formData.description.jp.romaji,
        description_kr: formData.description.kr,
        start_date: startDate,
        end_date: endDate,
        status: formData.status,
        image: formData.image,
        image_origin: formData.image_origin,
        room_id: formData.room_id
    };

    //convert null value to empty, else formik will not work
    Object.keys(initialValues).forEach(key => {
        if (initialValues[key] === undefined || (key !== 'start_date' && key !== 'end_date' && initialValues[key] === null)) {
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

    const onDrop = (pictureSelected, pictureDataURLs) => {
        props.handleImageSelected(pictureSelected, pictureDataURLs);
    };

    const uploadButtonLabel = (formData.id !== undefined && formData.id !== '') ?
        'Choose new image to replace current one' : 'Choose image';

    return (
        <div className="box box-primary">
            <SpinnerComponent show={props.isCallingApi}> </SpinnerComponent>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="box-body">
                        <Tabs defaultActiveKey="general">
                            <Tab eventKey="general" title="General">
                                <Form.Group>
                                    <Form.Label>Room</Form.Label>
                                    <Form.Control as="select"
                                                  id="room_id"
                                                  name="room_id"
                                                  onChange={formik.handleChange}
                                                  value={formik.values.room_id}>
                                        <option value="0">{lang['common.select.default']}</option>
                                        {listRoom.map(d => (
                                            <option key={d.id} value={d.id}>{d.name.vi} | {d.name.en} | {d.name.jp.kanji} | {d.name.jp.romaji} | {d.name.kr} </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Field
                                        component={DatePickerWithFormik}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Group>
                                        <Form.Check inline label="Active" type="radio" name="status"
                                                    checked={parseInt(formik.values.status) === 1}
                                                    onChange={formik.handleChange}
                                                    value="1"/>
                                        <Form.Check inline label="Inactive" type="radio" name="status"
                                                    checked={parseInt(formik.values.status) === 0}
                                                    onChange={formik.handleChange}
                                                    value="0" />
                                    </Form.Group>
                                </Form.Group>
                                {formData.id !== '' ? (
                                        <Form.Group>
                                            <Form.Label>Current Image</Form.Label>
                                            <Form.Text>
                                                <img style={{width:'400px'}} src={formData.image} alt="Current Image"/>
                                            </Form.Text>
                                        </Form.Group>)
                                    : ''}
                                <Form.Group>
                                    <Form.Label> Image *</Form.Label>
                                    <ImageUploader
                                        singleImage={true}
                                        withIcon={true}
                                        buttonText={uploadButtonLabel}
                                        onChange={onDrop}
                                        imgExtension={['.jpg', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        buttonStyles={buttonStyle}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="home" title="Title">
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
                                <Form.Group>
                                    <Form.Label>Kr</Form.Label>
                                    <Form.Control
                                        id="name_kr"
                                        name="name_kr"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_kr}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="short_desc" title="Short Description">
                                <Form.Group>
                                    <Form.Label>Vi</Form.Label>
                                    <Form.Control
                                        id=" short_description_vi"
                                        name="short_description_vi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.short_description_vi}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>En</Form.Label>
                                    <Form.Control
                                        id="short_description_en"
                                        name="short_description_en"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.short_description_en}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Jp Kanji</Form.Label>
                                    <Form.Control
                                        id="short_description_jp_kanji"
                                        name="short_description_jp_kanji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.short_description_jp_kanji}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Jp Romaji</Form.Label>
                                    <Form.Control
                                        id="short_description_jp_romaji"
                                        name="short_description_jp_romaji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.short_description_jp_romaji}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Kr</Form.Label>
                                    <Form.Control
                                        id=" short_description_kr"
                                        name="short_description_kr"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.short_description_kr}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="description_vi" title="Description Vi">
                                <Form.Group>
                                    <CKEditor
                                        editor={DecoupledEditor}
                                        config={editorConfig}
                                        data={formik.values.description_vi}
                                        onChange={(event, editor) => {
                                            formik.setFieldValue('description_vi', editor.getData());
                                        }}
                                        onInit={editor => {
                                            editor.ui.getEditableElement().parentElement.insertBefore(
                                                editor.ui.view.toolbar.element,
                                                editor.ui.getEditableElement()
                                            );
                                        }}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="description_en" title="Description En">
                                <Form.Group>
                                    <CKEditor
                                        editor={DecoupledEditor}
                                        config={editorConfig}
                                        data={formik.values.description_en}
                                        onChange={(event, editor) => {
                                            formik.setFieldValue('description_en', editor.getData());
                                        }}
                                        onInit={editor => {
                                            editor.ui.getEditableElement().parentElement.insertBefore(
                                                editor.ui.view.toolbar.element,
                                                editor.ui.getEditableElement()
                                            );
                                        }}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="description_jp_kanji" title="Description Jp Kanji">
                                <Form.Group>
                                    <CKEditor
                                        editor={DecoupledEditor}
                                        config={editorConfig}
                                        data={formik.values.description_jp_kanji}
                                        onChange={(event, editor) => {
                                            formik.setFieldValue('description_jp_kanji', editor.getData());
                                        }}
                                        onInit={editor => {
                                            editor.ui.getEditableElement().parentElement.insertBefore(
                                                editor.ui.view.toolbar.element,
                                                editor.ui.getEditableElement()
                                            );
                                        }}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="description_jp_romanji" title="Description Jp Romanji">
                                <Form.Group>
                                    <CKEditor
                                        editor={DecoupledEditor}
                                        config={editorConfig}
                                        data={formik.values.description_jp_romaji}
                                        onChange={(event, editor) => {
                                            formik.setFieldValue('description_jp_romaji', editor.getData());
                                        }}
                                        onInit={editor => {
                                            editor.ui.getEditableElement().parentElement.insertBefore(
                                                editor.ui.view.toolbar.element,
                                                editor.ui.getEditableElement()
                                            );
                                        }}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="description_kr" title="Description kr">
                                <Form.Group>
                                    <CKEditor
                                        editor={DecoupledEditor}
                                        config={editorConfig}
                                        data={formik.values.description_kr}
                                        onChange={(event, editor) => {
                                            formik.setFieldValue('description_kr', editor.getData());
                                        }}
                                        onInit={editor => {
                                            editor.ui.getEditableElement().parentElement.insertBefore(
                                                editor.ui.view.toolbar.element,
                                                editor.ui.getEditableElement()
                                            );
                                        }}
                                    />
                                </Form.Group>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="box-footer text-center">
                        <button type="submit" className="btn btn-info">{lang['layout.button.save']}</button>
                        <button type="button" className="btn btn-secondary" onClick={(event) => {
                            props.history.push(PAGE_PROMOTION_LIST)
                        }}>{lang['layout.button.cancel']}</button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};
const mapStateToProps = (state) => ({
    ...state.promotionReducer,
    ...state.layoutReducer,
    ...state
});
export default withRouter(connect(mapStateToProps, {})(PromotionForm));
