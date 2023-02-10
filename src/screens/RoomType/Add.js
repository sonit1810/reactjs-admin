import React from 'react';
import { connect } from "react-redux";
import actions from "../../redux/roomType/action";
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from "react-bootstrap";
import SpinnerComponent from "../../components/Common/Spinner";
import * as PageUrls from '../../configs/PagesUrl';
import RoomTypeAdd from '../../components/RoomType/Add';

class ScreensRoomTypeAdd extends React.Component {
    render() {
        const messages = this.props.languageSwitcher.languageMessages;
        const { props } = this;

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <Breadcrumb>
                        <Breadcrumb.Item href={PageUrls.PAGE_GROUP_LIST}>
                            {messages['roomtype.title']}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {messages['roomtype.add.title']}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </section>
                <section className="content">
                    <RoomTypeAdd />
                </section>
                <SpinnerComponent show={props.isLoading}> </SpinnerComponent>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(ScreensRoomTypeAdd));
