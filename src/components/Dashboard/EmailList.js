import React, { Component} from 'react';
import {Link} from 'react-router-dom';

class DashboardEmailList extends Component {
    state = {};

    componentDidMount() {
    }

    render() {
        return (
            <div className="box">
                <div className="box-header">
                    <h3 className="box-title">検知・アラートメール送信済み一覧</h3>
                </div>
                <div className="box-body table-responsive no-padding">
                    <div id="datatable_container" className="dataTables_wrapper">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="dataTables_length">
                                    <label>
                                        <select name="datatable_length" className="form-control input-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                        &nbsp;件表示
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                                    <ul className="pagination">
                                        <li className="paginate_button active">
                                            <Link to="#" aria-controls="example1" data-dt-idx="1" tabIndex="0">1</Link>
                                        </li>
                                        <li className="paginate_button ">
                                            <Link to="#" aria-controls="example1" data-dt-idx="2" tabIndex="0">2</Link>
                                        </li>
                                        <li className="paginate_button ">
                                            <Link to="#" aria-controls="example1" data-dt-idx="3" tabIndex="0">3</Link>
                                        </li>
                                        <li className="paginate_button ">
                                            <Link to="#" aria-controls="example1" data-dt-idx="4" tabIndex="0">4</Link>
                                        </li>
                                        <li className="paginate_button ">
                                            <Link to="#" aria-controls="example1" data-dt-idx="5" tabIndex="0">5</Link>
                                        </li>
                                        <li className="paginate_button ">
                                            <Link to="#" aria-controls="example1" data-dt-idx="6" tabIndex="0">6</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row padb-10">
                            <div className="col-sm-12">
                                <div className="box-body table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>送信年月日</th>
                                            <th>会員・発生拠点</th>
                                            <th>アラート対象</th>
                                            <th>アラート種別</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td colSpan="2" className="text-center">検出された異常監視項目はありません。</td>
                                            <td colSpan="2"></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="dataTables_length">
                                    <label>
                                        <select name="datatable_length" className="form-control input-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                        &nbsp;件表示
                                    </label>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                                    <ul className="pagination">
                                        <li className="paginate_button active">
                                            <Link to="#" aria-controls="example1" data-dt-idx="1" tabIndex="0">1</Link>
                                        </li>
                                        <li className="paginate_button ">
                                            <Link to="#" aria-controls="example1" data-dt-idx="2" tabIndex="0">2</Link>
                                        </li>
                                        <li className="paginate_button ">
                                            <Link to="#" aria-controls="example1" data-dt-idx="3" tabIndex="0">3</Link>
                                        </li>
                                        <li className="paginate_button ">
                                            <Link to="#" aria-controls="example1" data-dt-idx="4" tabIndex="0">4</Link>
                                        </li>
                                        <li className="paginate_button ">
                                            <Link to="#" aria-controls="example1" data-dt-idx="5" tabIndex="0">5</Link>
                                        </li>
                                        <li className="paginate_button ">
                                            <Link to="#" aria-controls="example1" data-dt-idx="6" tabIndex="0">6</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default DashboardEmailList;
