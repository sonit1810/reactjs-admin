import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useFormik } from 'formik';
import Form from "react-bootstrap/Form";
import {PAGE_USER_LIST} from "../../configs/PagesUrl";
import SpinnerComponent from "../Common/Spinner";

const UserForm = (props) => {
        const lang = props.languageSwitcher.languageMessages;
        const { roleList, formData } = props;

        let initialValues = {
            id: formData.id,
            name: formData.name,
            email: formData.email,
            password: formData.password !== undefined ? formData.password : '',
            roles: formData.roles[0]
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
                            <Tab eventKey="home" title="General">
                                <Form.Group>
                                    <Form.Label>Tên</Form.Label>
                                    <Form.Control
                                        id="name"
                                        name="name"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="description" title="Roles">
                                <Form.Group>
                                    <Form.Label>Roles</Form.Label>
                                    <Form.Control as="select"
                                                  id="roles"
                                                  name="roles"
                                                  onChange={formik.handleChange}
                                                  value={formik.values.roles}>
                                        <option value="0">{lang['common.select.default']}</option>
                                        { roleList.map(d => (
                                            <option key={d.id} value={d.name}>{d.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="box-footer text-center">
                        <button type="submit" className="btn btn-info">{lang['layout.button.save']}</button>
                        <button type="button" className="btn btn-secondary" onClick={(event) => {props.history.push(PAGE_USER_LIST)} }>{lang['layout.button.cancel']}</button>
                    </div>
                </Form>
            </div>
        );
};
const mapStateToProps = (state) => ({
    ...state.userReducer,
    ...state.layoutReducer,
    ...state
});
export default withRouter(connect(mapStateToProps, {})(UserForm));
