import React from 'react';

class DashboardServeInfo extends React.Component {
    render() {
        return (
            <div className="box">
                <div className="box-header">
                    <h3 className="box-title">サービサ情報</h3>
                </div>
                <div className="box-body table-responsive service-info no-padding">
                    <div className="col-sm-12">
                        <p className="label-title">サービサ名</p>
                        <p className="label-desc">サービサA</p>
                    </div>
                    <div className="col-sm-12">
                        <p className="label-title">サービス名</p>
                        <p className="label-desc">サービスA</p>
                    </div>
                    <div className="col-sm-12">
                        <p className="label-title">権限</p>
                        <p className="label-desc">サービサー管理</p>
                    </div>
                    <div className="col-sm-12">
                        <p className="label-title">メールアドレス1</p>
                        <p className="label-desc">smccloud@cool-revo.co.jp</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardServeInfo;