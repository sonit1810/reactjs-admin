import React from 'react';
import {Breadcrumb} from "react-bootstrap";
import * as PageUrls from "../../configs/PagesUrl";
import SpinnerComponent from "../../components/Common/Spinner";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import actions from "../../redux/category/action";
import CategoryEdit from "../../components/Category/Edit";

class ScreensCategoryEdit extends React.Component {
    render() {
        const messages = this.props.languageSwitcher.languageMessages;
        const { props } = this;

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <Breadcrumb>
                        <Breadcrumb.Item href={PageUrls.PAGE_CATEGORY_LIST}>
                            {messages['category.title']}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {messages['category.edit.title']}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </section>
                <section className="content">
                    <CategoryEdit />
                </section>
                <SpinnerComponent show={props.isLoading}> </SpinnerComponent>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(ScreensCategoryEdit));