import React from 'react';
import { connect } from "react-redux";
import actions from "../../redux/page/action";
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from "react-bootstrap";
import SpinnerComponent from "../../components/Common/Spinner";
import * as PageUrls from '../../configs/PagesUrl';
import PageAdd from '../../components/Page/Add';

class ScreensPageAdd extends React.Component {
    render() {
        const messages = this.props.languageSwitcher.languageMessages;
        const { props } = this;

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <Breadcrumb>
                        <Breadcrumb.Item href={PageUrls.PAGE_MASTER_PAGE_LIST}>
                            {messages['page.title']}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {messages['page.add.title']}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </section>
                <section className="content">
                    <PageAdd />
                </section>
                <SpinnerComponent show={props.isLoading}> </SpinnerComponent>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(ScreensPageAdd));