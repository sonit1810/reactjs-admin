import React from 'react';
import { connect } from "react-redux";
import RoomFacilityList from '../../components/RoomFacility/List';
import actions from "../../redux/auth/action";
import { withRouter } from 'react-router-dom';

class ScreensRoomFacilityList extends React.Component {
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
                        {messages['roomfacility.title']}
                    </h1>
                </section>
                <section className="content">
                    <div className="row m-0">
                        <div className="col-12 p-0">
                            <RoomFacilityList />
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

export default withRouter(connect(mapStateToProps,actions)(ScreensRoomFacilityList));
