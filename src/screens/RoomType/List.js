import React from 'react';
import { connect } from "react-redux";
import RoomTypeList from '../../components/RoomType/List';
import actions from "../../redux/auth/action";
import { withRouter } from 'react-router-dom';

class ScreensRoomTypeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const messages = this.props.languageSwitcher.languageMessages;

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        {messages['roomtype.title']}
                    </h1>
                </section>
                <section className="content">
                    <div className="row m-0">
                        <div className="col-12 p-0">
                            <RoomTypeList />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

export default withRouter(connect(mapStateToProps,actions)(ScreensRoomTypeList));
