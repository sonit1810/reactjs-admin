import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import actions from "../../redux/auth/action";
import siteConfig from "../../configs/siteConfig";
import moment from "moment";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const messages = this.props.languageSwitcher.languageMessages;

        return (
            <footer className="main-footer">
               <div className="pull-right hidden-xs">
                   <b> {messages['layout.footer.version']} </b>
                   {siteConfig.version}
               </div>
               <strong>
                   <a href="tel: 0908229022">S3</a> @
                   <span className="hidden-xs"> 2020 </span>
                   CMS Tool
               </strong>
            </footer>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.layoutReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(Footer));
