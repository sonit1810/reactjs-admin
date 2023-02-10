import React from 'react';
import { connect } from "react-redux";
import GalleryList from '../../components/Gallery/List';
import actions from "../../redux/auth/action";
import { withRouter } from 'react-router-dom';

class ScreensGalleryList extends React.Component {
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
                        {messages['gallery.title']}
                    </h1>
                </section>
                <section className="content">
                    <div className="row m-0">
                        <div className="col-12 p-0">
                            <GalleryList />
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

export default withRouter(connect(mapStateToProps,actions)(ScreensGalleryList));