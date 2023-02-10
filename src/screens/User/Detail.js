import React from 'react';
import UserDetails from '../../components/User/Details';

class ScreensUserDetails extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        利用者管理asdfasdf
                    </h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">利用者詳細</h3>
                                </div>
                                <UserDetails id={this.props.match.params.userId} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ScreensUserDetails;