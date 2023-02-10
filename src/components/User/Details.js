import React from 'react';

class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            userPost: {}
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="box-body">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead></thead>
                                <tbody>
                                <tr>
                                    <td width="160">ID</td>
                                    <td>{this.state.id}</td>
                                </tr>
                                <tr>
                                    <td>利用者名</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>利用者グループ</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>DRMオプション</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>サービス開始日</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>サービス停止</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>退会予定月末</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>停止区分</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>備考欄</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>更新日時</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-sm-offset-1 col-sm-5">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead></thead>
                                <tbody>
                                <tr>
                                    <td width="160">顧客コード</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>契約コード</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>販売区分</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>支払区分</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>担当者氏名</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>メールアドレス</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>電話番号</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>録画データ量制限</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <div className="col-sm-12">
                            <button type="button" className="btn btn-success">編集</button>
                            <button type="button" className="btn btn-danger">削除</button>
                            <button type="button" className="btn btn-primary">オプション</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDetails;