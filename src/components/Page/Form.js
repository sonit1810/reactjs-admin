import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useFormik} from 'formik';
import Form from "react-bootstrap/Form";
import ImageUploader from 'react-images-upload';
import {PAGE_MASTER_PAGE_LIST} from "../../configs/PagesUrl";
import SpinnerComponent from "../Common/Spinner";

const PageForm = (props) => {
    const lang = props.languageSwitcher.languageMessages;
    const {buttonStyle, listGroup, formData} = props;

    let initialValues = {
        id: formData.id,
        title: formData.title,
        layout: formData.layout,
        type: formData.type,
        description: formData.description,
        max_item: formData.max_item,
        sample_image: formData.sample_image,
        group_id: formData.group_id,
        sample_image_origin: formData.sample_image_origin
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

    const onDrop = (pictureSelected, pictureDataURLs) => {
        props.handleImageSelected(pictureSelected, pictureDataURLs);
    };

    const uploadButtonLabel = (formData.id !== undefined && formData.id !== '') ?
        'Choose new image to replace current one' : 'Choose image';

    return (
        <div className="box box-primary">
            <SpinnerComponent show={props.isCallingApi}> </SpinnerComponent>
            <Form onSubmit={formik.handleSubmit}>
                <div className="box-body">
                    <Form.Group>
                        <Form.Label>Title *</Form.Label>
                        <Form.Control
                            id="title"
                            name="title"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mô tả chi tiết</Form.Label>
                        <Form.Control
                            id="description"
                            name="description"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Layout Type *</Form.Label>
                        <Form.Control
                            id="layout"
                            name="layout"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.layout}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sub Type</Form.Label>
                        <Form.Control
                            id="type"
                            name="type"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.type}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max Item *</Form.Label>
                        <Form.Control
                            id="max_item"
                            name="max_item"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.max_item}
                        />
                    </Form.Group>
                    {formData.id !== '' ? (
                            <Form.Group>
                                <Form.Label>Current Sample Image</Form.Label>
                                <Form.Text>
                                    <img style={{width:'400px'}} src={formData.sample_image} alt="Current Image"/>
                                </Form.Text>
                            </Form.Group>)
                        : ''}
                    <Form.Group>
                        <Form.Label>Sample Image *</Form.Label>
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
                    <Form.Group>
                        <Form.Label>Group</Form.Label>
                        <Form.Control as="select"
                                      id="group_id"
                                      name="group_id"
                                      onChange={formik.handleChange}
                                      value={formik.values.group_id}>
                            <option value="0">{lang['common.select.default']}</option>
                            {listGroup.map(d => (
                                <option key={d.id}
                                        value={d.id}>{d.name.vi} - {d.name.en} - {d.name.jp.kanji} - {d.name.jp.romaji}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className="box-footer text-center">
                    <button type="submit" className="btn btn-info">{lang['layout.button.save']}</button>
                    <button type="button" className="btn btn-secondary" onClick={(event) => {
                        props.history.push(PAGE_MASTER_PAGE_LIST)
                    }}>{lang['layout.button.cancel']}</button>
                </div>
            </Form>
        </div>
    );
};
const mapStateToProps = (state) => ({
    ...state.pageReducer,
    ...state.layoutReducer,
    ...state
});
export default withRouter(connect(mapStateToProps, {})(PageForm));