import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {FieldArray, FormikProvider, useFormik} from 'formik';
import Form from "react-bootstrap/Form";
import {PAGE_ROOM_LIST, PAGE_SERVICE_LIST} from "../../configs/PagesUrl";
import SpinnerComponent from "../Common/Spinner";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import editorConfig from "../../services/CKEditorUploadAdapter";

const RoomFormDetails = (props) => {
    const lang = props.languageSwitcher.languageMessages;
    const { formData, isDetail, listRoomFacility, listRoomType } = props;

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
        room_type_id: formData.room_type_id,
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
            <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <div className="box-body">
                    <Tabs defaultActiveKey="general">
                        <Tab eventKey="general" title="Thông tin cơ bản">
                            <Form.Group>
                                <Form.Label>Danh mục</Form.Label>
                                <Form.Control as="select" disabled
                                              id="room_type_id"
                                              name="room_type_id"
                                              onChange={formik.handleChange}
                                              value={formik.values.room_type_id}>
                                    <option value="0">{lang['common.select.default']}</option>
                                    {listRoomType !== undefined && listRoomType.map(d => (
                                    <option key={d.id} value={d.id}>{d.name.vi} | {d.name.en}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Giá</Form.Label>
                                <Form.Control disabled
                                    id="price"
                                    name="price"
                                    type="number"
                                    onChange={formik.handleChange}
                                    value={formik.values.price}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Hiển thị</Form.Label>
                                <Form.Check disabled
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
                        {/*<Tab eventKey="priceText" title="Price Text">*/}
                            {/*<Form.Group>*/}
                                {/*<Form.Label>Vi</Form.Label>*/}
                                {/*<Form.Control disabled*/}
                                    {/*id="price_text_vi"*/}
                                    {/*name="price_text_vi"*/}
                                    {/*type="text"*/}
                                    {/*onChange={formik.handleChange}*/}
                                    {/*value={formik.values.price_text_vi}*/}
                                {/*/>*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group>*/}
                                {/*<Form.Label>En</Form.Label>*/}
                                {/*<Form.Control disabled*/}
                                    {/*id="price_text_en"*/}
                                    {/*name="price_text_en"*/}
                                    {/*type="text"*/}
                                    {/*onChange={formik.handleChange}*/}
                                    {/*value={formik.values.price_text_en}*/}
                                {/*/>*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group>*/}
                                {/*<Form.Label>Jp Kanji</Form.Label>*/}
                                {/*<Form.Control disabled*/}
                                    {/*id="price_text_jp_kanji"*/}
                                    {/*name="price_text_jp_kanji"*/}
                                    {/*type="text"*/}
                                    {/*onChange={formik.handleChange}*/}
                                    {/*value={formik.values.price_text_jp_kanji}*/}
                                {/*/>*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group>*/}
                                {/*<Form.Label>Jp Romaji</Form.Label>*/}
                                {/*<Form.Control disabled*/}
                                    {/*id="price_text_jp_romaji"*/}
                                    {/*name="price_text_jp_romaji"*/}
                                    {/*type="text"*/}
                                    {/*onChange={formik.handleChange}*/}
                                    {/*value={formik.values.price_text_jp_romaji}*/}
                                {/*/>*/}
                            {/*</Form.Group>*/}
                            {/*<Form.Group>*/}
                                {/*<Form.Label>Kr</Form.Label>*/}
                                {/*<Form.Control disabled*/}
                                    {/*id="price_text_kr"*/}
                                    {/*name="price_text_kr"*/}
                                    {/*type="text"*/}
                                    {/*onChange={formik.handleChange}*/}
                                    {/*value={formik.values.price_text_kr}*/}
                                {/*/>*/}
                            {/*</Form.Group>*/}
                        {/*</Tab>*/}
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
                            <Form.Group className="hide">
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
                        <Tab eventKey="description_vi" title="Mô tả chi tiết Vi">
                            <Form.Group>
                                <CKEditor disabled
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
                        <Tab eventKey="description_en" title="Mô tả chi tiết En">
                            <Form.Group>
                                <CKEditor disabled
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
                                {/*<CKEditor disabled*/}
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
                                {/*<CKEditor disabled*/}
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
                                {/*<CKEditor disabled*/}
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
                                                    {/*disabled={true}*/}
                                                    {/*className="margin-right-5px"*/}
                                                    {/*value={facility.id}*/}
                                                    {/*label={facility.name.vi + '-' + facility.name.en}*/}
                                                    {/*checked={formik.values.facilities.includes(facility.id)}*/}
                                                    {/*onChange={e => {*/}

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
                            { formData.id !== '' ? (
                                    <Form.Group>
                                        <Form.Label>Hình đang sử dụng</Form.Label>
                                        <Form.Text>
                                            <img src={formData.images.thumbnail} alt="Current Image" />
                                        </Form.Text>
                                    </Form.Group>)
                                : ''}
                        </Tab>
                    </Tabs>
                </div>
                <div className="box-footer text-center">
                    {isDetail === undefined ?
                        <React.Fragment>
                        <button type="submit" className="btn btn-info">{lang['layout.button.delete']}</button>
                        <button type="button" className="btn btn-secondary" onClick={(event) => {props.history.push(PAGE_ROOM_LIST)} }>{lang['layout.button.cancel']}</button>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        <button type="button" className="btn btn-secondary" onClick={(event) => {props.history.push(PAGE_ROOM_LIST)} }>{lang['layout.button.back']}</button>
                        </React.Fragment>
                    }
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
export default withRouter(connect(mapStateToProps, {})(RoomFormDetails));
