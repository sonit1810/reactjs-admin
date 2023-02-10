import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useFormik} from 'formik';
import Form from "react-bootstrap/Form";
import {PAGE_GROUP_LIST, PAGE_GALLERY_LIST, PAGE_MASTER_PAGE_LIST} from "../../configs/PagesUrl";
import SpinnerComponent from "../Common/Spinner";
import ImageUploader from "react-images-upload";

const GalleryFormDetails = (props) => {
    const lang = props.languageSwitcher.languageMessages;
    const { listGroup, formData } = props;

    let initialValues = {
        id: formData.id,
        short_description: formData.short_description,
        description: formData.description,
        image: formData.image,
        image_origin: formData.image_origin
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
            <div className="box box-primary">
                <SpinnerComponent show={props.isCallingApi}> </SpinnerComponent>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="box-body">
                        <Form.Group>
                            <Form.Label>Title *</Form.Label>
                            <Form.Control disabled
                                id="title"
                                name="title"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control disabled
                                          id="short_description"
                                          name="short_description"
                                          type="text"
                                          onChange={formik.handleChange}
                                          value={formik.values.short_description}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mô tả chi tiết</Form.Label>
                            <Form.Control disabled
                                id="description"
                                name="description"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </Form.Group>
                        {formData.id !== '' ? (
                                <Form.Group>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Text>
                                        <img style={{width:'400px'}} src={formData.image} alt="Current Image"/>
                                    </Form.Text>
                                </Form.Group>)
                            : ''}
                    </div>
                    <div className="box-footer text-center">
                        <button type="submit" className="btn btn-info">{lang['layout.button.delete']}</button>
                        <button type="button" className="btn btn-secondary" onClick={(event) => {
                            props.history.push(PAGE_GALLERY_LIST)
                        }}>{lang['layout.button.cancel']}</button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    ...state.galleryReducer,
    ...state.layoutReducer,
    ...state
});
export default withRouter(connect(mapStateToProps, {})(GalleryFormDetails));