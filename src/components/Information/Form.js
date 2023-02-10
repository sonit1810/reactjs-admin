import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useFormik} from 'formik';
import Form from "react-bootstrap/Form";
import ImageUploader from 'react-images-upload';
import {PAGE_INFORMATION_LIST} from "../../configs/PagesUrl";
import SpinnerComponent from "../Common/Spinner";
import Button from "react-bootstrap/Button";
import {Field, FieldArray, FormikProvider} from "formik";
import InputGroup from "react-bootstrap/InputGroup";
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import editorConfig from "../../services/CKEditorUploadAdapter";
import moment from "moment";
import siteConfig from "../../configs/siteConfig";
import {DatePicker} from "antd";
import {SingleDatePicker, DateRangePicker} from 'react-dates';
import DatePickerWithFormik from "../../common/DatePickerWithFormmik";


const InformationForm = (props) => {
    const lang = props.languageSwitcher.languageMessages;
    const {listRoomType, buttonStyle, listRoomFacility, formData} = props;

    console.log(listRoomType);

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
        images_source: formData.images && formData.images.source ? formData.images.source : '',
        images_thumbnail: formData.images ? formData.images.thumbnail : '',
        images_origin_source: formData.images_origin && formData.images_origin.source ? formData.images_origin.source : '',
        images_origin_thumbnail: formData.images_origin ? formData.images_origin.thumbnail : '',
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

    const onDrop = (pictureSelected, pictureDataURLs)  => {
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
                                <Form.Group className="hide">>
                                    <Form.Label>Jp Romaji</Form.Label>
                                    <Form.Control disabled
                                        id="name_jp_romaji"
                                        name="name_jp_romaji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_jp_romaji}
                                    />
                                </Form.Group>
                                <Form.Group className="hide">>
                                    <Form.Label>Kr</Form.Label>
                                    <Form.Control disabled
                                        id="name_kr"
                                        name="name_kr"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_kr}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="description_vi" title="Tiếng việt">
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
                            <Tab eventKey="description_en" title="Tiếng Anh">
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
                            {/*<Tab eventKey="description_jp_kanji" title="Description Jp Kanji">*/}
                                {/*<Form.Group>*/}
                                    {/*<CKEditor*/}
                                        {/*editor={DecoupledEditor}*/}
                                        {/*config={editorConfig}*/}
                                        {/*data={formik.values.description_jp_kanji}*/}
                                        {/*onChange={(event, editor) => {*/}
                                            {/*formik.setFieldValue('description_jp_kanji', editor.getData());*/}
                                        {/*}}*/}
                                        {/*onInit={editor => {*/}
                                            {/*editor.ui.getEditableElement().parentElement.insertBefore(*/}
                                                {/*editor.ui.view.toolbar.element,*/}
                                                {/*editor.ui.getEditableElement()*/}
                                            {/*);*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                {/*</Form.Group>*/}
                            {/*</Tab>*/}
                            {/*<Tab eventKey="description_jp_romanji" title="Description Jp Romanji">*/}
                                {/*<Form.Group>*/}
                                    {/*<CKEditor*/}
                                        {/*editor={DecoupledEditor}*/}
                                        {/*config={editorConfig}*/}
                                        {/*data={formik.values.description_jp_romaji}*/}
                                        {/*onChange={(event, editor) => {*/}
                                            {/*formik.setFieldValue('description_jp_romaji', editor.getData());*/}
                                        {/*}}*/}
                                        {/*onInit={editor => {*/}
                                            {/*editor.ui.getEditableElement().parentElement.insertBefore(*/}
                                                {/*editor.ui.view.toolbar.element,*/}
                                                {/*editor.ui.getEditableElement()*/}
                                            {/*);*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                {/*</Form.Group>*/}
                            {/*</Tab>*/}
                            {/*<Tab eventKey="description_kr" title="Description Kr">*/}
                                {/*<Form.Group>*/}
                                    {/*<CKEditor*/}
                                        {/*editor={DecoupledEditor}*/}
                                        {/*config={editorConfig}*/}
                                        {/*data={formik.values.description_kr}*/}
                                        {/*onChange={(event, editor) => {*/}
                                            {/*formik.setFieldValue('description_kr', editor.getData());*/}
                                        {/*}}*/}
                                        {/*onInit={editor => {*/}
                                            {/*editor.ui.getEditableElement().parentElement.insertBefore(*/}
                                                {/*editor.ui.view.toolbar.element,*/}
                                                {/*editor.ui.getEditableElement()*/}
                                            {/*);*/}
                                        {/*}}*/}
                                    {/*/>*/}
                                {/*</Form.Group>*/}
                            {/*</Tab>*/}
                            {/*<Tab eventKey="image" title="Image">*/}
                                {/*{ formData.id !== '' ? (*/}
                                        {/*<Form.Group>*/}
                                            {/*<Form.Label>Current Image</Form.Label>*/}
                                            {/*<Form.Text>*/}
                                                {/*<img src={formData.images.thumbnail} alt="Current Image" />*/}
                                            {/*</Form.Text>*/}
                                        {/*</Form.Group>)*/}
                                    {/*: ''}*/}
                                {/*<Form.Group>*/}
                                    {/*<ImageUploader*/}
                                        {/*singleImage={true}*/}
                                        {/*withIcon={true}*/}
                                        {/*buttonText={uploadButtonLabel}*/}
                                        {/*onChange={onDrop}*/}
                                        {/*imgExtension={['.jpg', '.png', '.gif']}*/}
                                        {/*maxFileSize={5242880}*/}
                                        {/*withPreview={true}*/}
                                        {/*buttonStyles={buttonStyle}*/}
                                    {/*/>*/}
                                {/*</Form.Group>*/}
                            {/*</Tab>*/}
                        </Tabs>
                    </div>
                    <div className="box-footer text-center">
                        <button type="submit" className="btn btn-info">{lang['layout.button.save']}</button>
                        <button type="button" className="btn btn-secondary" onClick={(event) => {props.history.push(PAGE_INFORMATION_LIST)} }>{lang['layout.button.cancel']}</button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};
const mapStateToProps = (state) => ({
    ...state.informationReducer,
    ...state.layoutReducer,
    ...state
});
export default withRouter(connect(mapStateToProps, {})(InformationForm));
