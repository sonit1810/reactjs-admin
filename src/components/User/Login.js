import React from 'react';

class UserLogin extends React.Component {
    render() {
        return (
            <form action="" method="post">
                <div className="form-group has-feedback">
                    <input type="text" className="form-control" placeholder="ユーザー名" />
                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                </div>
                <div className="form-group has-feedback">
                    <input type="password" className="form-control" placeholder="パスワード" />
                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>
                <div className="row">
                    <div className="col-xs-7"></div>
                    <div className="col-xs-5">
                        <button type="submit" className="btn btn-primary btn-block btn-flat">サイン・イン</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default UserLogin;