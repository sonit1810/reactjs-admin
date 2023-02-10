import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useFormik} from 'formik';
import Form from "react-bootstrap/Form";
import ImageUploader from 'react-images-upload';
import {PAGE_ROOM_LIST} from "../../configs/PagesUrl";
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


const RoomForm = (props) => {
    const lang = props.languageSwitcher.languageMessages;
    const {listRoomType, buttonStyle, listRoomFacility, formData} = props;

    let initialValues = {
        id: formData.id,
        code: formData.code,
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
        price: formData.price,
        room_type_id: parseInt(formData.room_type_id) !== 0 ? formData.room_type_id : props.filter.room_type_id,
        images_source: formData.images.source,
        images_thumbnail: formData.images.thumbnail,
        images_origin_source: formData.images_origin.source,
        images_origin_thumbnail: formData.images_origin.thumbnail,
        facilities: formData.facilities,
        price_text_en: formData.price_text.en,
        price_text_vi: formData.price_text.vi,
        price_text_jp_kanji: formData.price_text.jp.kanji,
        price_text_jp_romaji: formData.price_text.jp.romaji,
        price_text_kr: formData.price_text.kr,
        status: formData.status,
    };
    console.log(initialValues.room_type_id);
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

    const onDrop = (pictureSelected, pictureDataURLs) => {
        props.handleImageSelected(pictureSelected, pictureDataURLs);
    };

    const uploadButtonLabel = (formData.id !== undefined && formData.id !== '') ?
        'Chọn hình mới thay thế hình đang có' : 'Chọn hình cần upload';

    return (
        <div className="box box-primary">
            <SpinnerComponent show={props.isCallingApi}> </SpinnerComponent>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="box-body">
                        <Tabs defaultActiveKey="general">
                            <Tab eventKey="general" title="Thông tin cơ bản">
                                <Form.Group>
                                    <Form.Label>Danh mục</Form.Label>
                                    <Form.Control as="select"
                                                  id="room_type_id"
                                                  name="room_type_id"
                                                  onChange={formik.handleChange}
                                                  value={formik.values.room_type_id}>
                                        <option value="0">{lang['common.select.default']}</option>
                                        {listRoomType.map(d => (
                                            <option key={d.id}
                                                    value={d.id}>{d.name.vi} | {d.name.en} </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tên</Form.Label>
                                    <Form.Control
                                        id="name_vi"
                                        name="name_vi"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_vi}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Giá</Form.Label>
                                    <Form.Control
                                        id="price"
                                        name="price"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Hiển thị</Form.Label>
                                    <Form.Check
                                        id="status"
                                        name="status"
                                        type="checkbox"
                                        checked={parseInt(formik.values.status) === 1}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                formik.setFieldValue('status', 1);
                                            } else {
                                                formik.setFieldValue('status', 0);
                                            }
                                        }}
                                        value={formik.values.status}
                                    />
                                </Form.Group>
                            </Tab>
                            {/*<Tab eventKey="priceText" title="Price Text" hide>*/}
                                {/*<Form.Group>*/}
                                    {/*<Form.Label>Vi</Form.Label>*/}
                                    {/*<Form.Control*/}
                                        {/*id="price_text_vi"*/}
                                        {/*name="price_text_vi"*/}
                                        {/*type="text"*/}
                                        {/*onChange={formik.handleChange}*/}
                                        {/*value={formik.values.price_text_vi}*/}
                                    {/*/>*/}
                                {/*</Form.Group>*/}
                                {/*<Form.Group>*/}
                                    {/*<Form.Label>En</Form.Label>*/}
                                    {/*<Form.Control*/}
                                        {/*id="price_text_en"*/}
                                        {/*name="price_text_en"*/}
                                        {/*type="text"*/}
                                        {/*onChange={formik.handleChange}*/}
                                        {/*value={formik.values.price_text_en}*/}
                                    {/*/>*/}
                                {/*</Form.Group>*/}
                                {/*<Form.Group className="">*/}
                                    {/*<Form.Label>Jp Kanji</Form.Label>*/}
                                    {/*<Form.Control*/}
                                        {/*id="price_text_jp_kanji"*/}
                                        {/*name="price_text_jp_kanji"*/}
                                        {/*type="text"*/}
                                        {/*onChange={formik.handleChange}*/}
                                        {/*value={formik.values.price_text_jp_kanji}*/}
                                    {/*/>*/}
                                {/*</Form.Group>*/}
                                {/*<Form.Group className="hide">*/}
                                    {/*<Form.Label>Jp Romaji</Form.Label>*/}
                                    {/*<Form.Control*/}
                                        {/*id="price_text_jp_romaji"*/}
                                        {/*name="price_text_jp_romaji"*/}
                                        {/*type="text"*/}
                                        {/*onChange={formik.handleChange}*/}
                                        {/*value={formik.values.price_text_jp_romaji}*/}
                                    {/*/>*/}
                                {/*</Form.Group>*/}
                                {/*<Form.Group className="hide">*/}
                                    {/*<Form.Label>Kr</Form.Label>*/}
                                    {/*<Form.Control*/}
                                        {/*id="price_text_kr"*/}
                                        {/*name="price_text_kr"*/}
                                        {/*type="text"*/}
                                        {/*onChange={formik.handleChange}*/}
                                        {/*value={formik.values.price_text_kr}*/}
                                    {/*/>*/}
                                {/*</Form.Group>*/}
                            {/*</Tab>*/}
                            <Tab eventKey="description_vi" title="Mô tả chi tiết Vi">
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
                            <Tab eventKey="home" title="Tên En">
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
                                <Form.Group className="hide">
                                    <Form.Label>Jp Kanji</Form.Label>
                                    <Form.Control
                                        id="name_jp_kanji"
                                        name="name_jp_kanji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_jp_kanji}
                                    />
                                </Form.Group>
                                <Form.Group className="hide">
                                    <Form.Label>Jp Romaji</Form.Label>
                                    <Form.Control
                                        id="name_jp_romaji"
                                        name="name_jp_romaji"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name_jp_romaji}
                                    />
                                </Form.Group>
                                <Form.Group className="hide">
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
                            <Tab eventKey="description_en" title="Mô tả chi tiết En">
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
                            {/*<Tab eventKey="facilities" title="Facilities">*/}
                                {/*<FieldArray*/}
                                    {/*name="facilities"*/}
                                    {/*render={arrayHelpers => (*/}
                                        {/*<div>*/}
                                            {/*{listRoomFacility.length > 0 ? (*/}
                                                {/*listRoomFacility.map((facility, index) => (*/}
                                                    {/*<Form.Group controlId={facility.id} key={facility.id}>*/}
                                                        {/*<Form.Check*/}
                                                            {/*key={`facilities.[${facility.id}].id`}*/}
                                                            {/*name={`facilities.[${facility.id}].id`}*/}
                                                            {/*className="margin-right-5px"*/}
                                                            {/*value={facility.id}*/}
                                                            {/*label={facility.name.vi + '-' + facility.name.en}*/}
                                                            {/*type="checkbox"*/}
                                                            {/*checked={formik.values.facilities.includes(facility.id)}*/}
                                                            {/*onChange={e => {*/}
                                                                {/*if (e.target.checked) arrayHelpers.push(facility.id);*/}
                                                                {/*else {*/}
                                                                    {/*const idx = formik.values.facilities.indexOf(facility.id);*/}
                                                                    {/*arrayHelpers.remove(idx);*/}
                                                                {/*}*/}
                                                            {/*}}>*/}
                                                        {/*</Form.Check>*/}
                                                    {/*</Form.Group>*/}
                                                {/*))*/}
                                            {/*) : ''}*/}
                                        {/*</div>*/}
                                    {/*)}*/}
                                {/*/>*/}
                            {/*</Tab>*/}
                            <Tab eventKey="image" title="Hình đại diện">
                                {formData.id !== '' ? (
                                        <Form.Group>
                                            <Form.Label>Hình đang có</Form.Label>
                                            <Form.Text>
                                                <img src={formData.images.thumbnail} alt="Current Image"/>
                                            </Form.Text>
                                        </Form.Group>)
                                    : ''}
                                <Form.Group>
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
                        </Tabs>
                    </div>
                    <div className="box-footer text-center">
                        <button type="submit" className="btn btn-info">{lang['layout.button.save']}</button>
                        <button type="button" className="btn btn-secondary" onClick={(event) => {
                            props.history.push(PAGE_ROOM_LIST)
                        }}>{lang['layout.button.cancel']}</button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};
const mapStateToProps = (state) => ({
    ...state.roomReducer,
    ...state.layoutReducer,
    ...state
});
export default withRouter(connect(mapStateToProps, {})(RoomForm));
