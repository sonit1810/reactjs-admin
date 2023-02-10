import React from 'react';
import * as PagesUrl from '../../configs/PagesUrl';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import actions from '../../redux/room/action';
import {withRouter} from 'react-router-dom';
import Paginator from "../../common/Paginator";
import Filter from "./Popup/Filter";
import {Table} from 'react-bootstrap';
import { toVND } from "../../helpers/Ultis";
import SpinnerComponent from "../Common/Spinner";
import siteConfig from "../../configs/siteConfig";

class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopupFilter: false,
            searchText: ''
        };
        this.onChangePageNumber = this.handlePaging.bind(this);
        this.onChangeItemPerPage = this.handleItemPerPage.bind(this);
        this.onApplyFilter = this.handleFilter.bind(this);
        this.onTypingSearch = this.onTypingSearch.bind(this);
    }

    togglePopupFilter() {
        this.setState({
            showPopupFilter: !this.state.showPopupFilter
        });
    }

    componentDidMount() {
        this.props.getList({
            ...this.props.filter
        });
    }

    async handlePaging(pageNumber) {
        //update filter first, so paging number can changed
        await this.props.updateFilter({
            ...this.props.filter,
            page: pageNumber,
            searchText: ''
        });
        await this.getList();
    }

    async handleItemPerPage(itemPerPage) {
        //update filter first, so paging number can changed
        //change item per page must reset page to 1
        await this.props.updateFilter({
            ...this.props.filter,
            per_page: itemPerPage,
            page: 1,
            searchText: ''
        });
        await this.getList();
    }

    async handleFilter(params) {
        this.setState({showPopupFilter: false}, async () => {
            //update filter first, so paging number can changed
            //change item per page must reset page to 1
            await this.props.updateFilter({
                ...this.props.filter,
                ...params,
                page: 1,
                searchText: ''
            });
            await this.getList();
        });
    }

    getList() {
        this.props.getList(this.props.filter);
    }

    renderList(listData) {
        if (listData === undefined || listData.items === undefined) return;

        return listData.items.map((row) => {
            return (
                <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                        <a href={siteConfig.siteRoot + 'san-pham/' + row.id} target="_blank" >
                        {row.name.en}
                        </a>
                    </td>
                    <td>
                        <a href={siteConfig.siteRoot + 'san-pham/' + row.id} target="_blank" >
                        {row.name.vi}
                        </a>
                    </td>
                    {/*<td>{row.name.jp.kanji}</td>*/}
                    {/*<td>{row.name.jp.romaji}</td>*/}
                    {/*<td>{row.name.kr}</td>*/}
                    {/*<td dangerouslySetInnerHTML={{__html: row.description.en}}></td>*/}
                    {/*<td dangerouslySetInnerHTML={{__html: row.description.vi}}></td>*/}
                    {/*<td dangerouslySetInnerHTML={{__html: row.description.jp.kanji}}></td>*/}
                    {/*<td dangerouslySetInnerHTML={{__html: row.description.jp.romaji}}></td>*/}
                    {/*<td dangerouslySetInnerHTML={{__html: row.description.kr}}></td>*/}
                    {/*<td>{row.price_text.en}</td>*/}
                    {/*<td>{row.price_text.vi}</td>*/}
                    {/*<td>{row.price_text.jp.kanji}</td>*/}
                    {/*<td>{row.price_text.jp.romaji}</td>*/}
                    {/*<td>{row.price_text.kr}</td>*/}
                    <td className="align-right">{toVND(row.price)}</td>
                    <td className="align-center">{parseInt(row.status) === 1 ? <i className="fa fa-check" /> : ''}</td>
                    <td className="align-center" >
                        {row.galleries ? row.galleries.length : 0}
                    </td>
                    <td style={{width: '200px', textAlign: 'center'}}>
                        <a href={row.images.source} target="_blank"><img style={{width: '100%'}} alt={row.code} src={row.images.thumbnail} /></a>
                    </td>
                    <td className="text-nowrap text-center">
                        <span className="action-link">
                            <Link to={PagesUrl.PAGE_ROOM_DETAIL + '/' + row.id} className="btn btn-sm btn-info">
                                <i className="fa fa-eye"> </i>
                            </Link>
                        </span>
                        <span className="action-link ml-1">
                            <Link to={PagesUrl.PAGE_ROOM_EDIT + '/' + row.id} className="btn btn-sm btn-success">
                                <i className="fa fa-pencil"> </i>
                            </Link>
                        </span>
                        <span className="action-link ml-1">
                            <Link to={PagesUrl.PAGE_ROOM_LIST_IMAGE + '/' + row.id} className="btn btn-sm btn-success">
                                <i className="fa fa-image"> </i>
                            </Link>
                        </span>
                        <span className="action-link ml-1">
                            <Link to={PagesUrl.PAGE_ROOM_DELETE + '/' + row.id} className="btn btn-sm btn-danger">
                                <i className="fa fa-trash"> </i>
                            </Link>
                        </span>
                    </td>
                </tr>
            );
        });
    }

    async sort(column, sort) {
        await this.props.updateFilter({
            ...this.props.filter,
            sort: sort,
            sort_by_column: column,
            page: 1
        });
        await this.getList();
    }

    renderTitle(title, column) {
        if (column.toLowerCase() === this.props.filter.sort_by_column.toLowerCase()) {
            if (this.props.filter.sort.toLowerCase() === 'asc') {
                return <a href="#" onClick={() => this.sort(column, 'desc')}><i className="fa fa-arrow-up" /> {title}</a>;
            } else {
                return <a href="#" onClick={() => this.sort(column, 'asc')} ><i className="fa fa-arrow-down" /> {title}</a>;
            }
        } else {
            return <a href="" onClick={() => this.sort(column, 'desc')} >{title}</a>;
        }
    }

    onTypingSearch(e) {
        const text = e.target.value;
        this.setState({searchText: text});
        const newFilter = {
            ...this.props.roomReducer.filter,
            searchText: text,
        };
        this.props.updateFilter(newFilter);
        this.props.getListFE(newFilter);
    }

    render() {
        const messages = this.props.languageSwitcher.languageMessages;
        const { props } = this;

        return (
            <React.Fragment>
                <div className="box">
                    <div className="box-header with-border">
                        <div className="float-md-right mt-2 mt-md-0">
                            <button type="button" className="btn btn-secondary btn-sm ml-1"
                                    >Import
                            </button>
                            <Link to={PagesUrl.PAGE_ROOM_ADD}>
                                <button type="button"
                                        className="btn btn-primary btn-sm ml-1">{messages['layout.button.register']}</button>
                            </Link>
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="datatable_container">
                            <Paginator
                                total={this.props.listData.total}
                                itemPerPage={this.props.filter.per_page}
                                currentPage={this.props.filter.page}
                                onChangePageNumber={this.onChangePageNumber}
                                onChangeItemPerPage={this.onChangeItemPerPage}
                                onTogglePopupFilter={this.togglePopupFilter.bind(this)}
                                filterData={this.props.filter}
                                onTypingSearch={this.onTypingSearch}
                            />
                            <div className="row m-0 my-2">
                                <div className="col-sm-12 p-0">
                                    <Table bordered hover responsive size="sm" className="table-custom mb-0">
                                        <thead>
                                        <tr>
                                            <th>{this.renderTitle('Id', 'id')}</th>
                                            <th colSpan={2}>
                                                {this.renderTitle('Tên', 'name')}
                                            </th>
                                            {/*<th colSpan={2}>Mô tả chi tiết</th>*/}
                                            {/*<th colSpan={5}>Price Text</th>*/}
                                            <th>{this.renderTitle('Giá', 'price')}</th>
                                            <th>{this.renderTitle('Hiện', 'status')}</th>
                                            <th>Số hình kèm theo</th>
                                            <th>Hình đại diện</th>
                                            <th style={{ width: '100px' }} rowSpan={2}>{messages['layout.column.action']}</th>
                                        </tr>
                                        <tr>
                                            <th> </th>
                                            <th>En</th>
                                            <th>Vi</th>
                                            {/*<th>Jp - Kanji</th>*/}
                                            {/*<th>Jp - Romanji</th>*/}
                                            {/*<th>Kr</th>*/}
                                            {/*<th>En</th>*/}
                                            {/*<th>Vi</th>*/}
                                            {/*<th>Jp - Kanji</th>*/}
                                            {/*<th>Jp - Romanji</th>*/}
                                            {/*<th>Kr</th>*/}
                                            {/*<th>En</th>*/}
                                            {/*<th>Vi</th>*/}
                                            {/*<th>Jp - Kanji</th>*/}
                                            {/*<th>Jp - Romanji</th>*/}
                                            {/*<th>Kr</th>*/}
                                            <th> </th>
                                            <th> </th>
                                            <th> </th>
                                            <th> </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderList(this.props.listData)}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className="block-paging-bottom">
                                <Paginator
                                    total={this.props.listData.total}
                                    itemPerPage={this.props.filter.per_page}
                                    currentPage={this.props.filter.page}
                                    onChangePageNumber={this.onChangePageNumber}
                                    onChangeItemPerPage={this.onChangeItemPerPage}
                                    filterData={this.props.filter}
                                    onTypingSearch={this.onTypingSearch}
                                />
                            </div>
                        </div>
                    </div>
                    {this.state.showPopupFilter ?
                        <Filter
                            show={this.state.showPopupFilter}
                            closePopup={this.togglePopupFilter.bind(this)}
                            onApplyFilter={this.onApplyFilter}
                        />
                        : null
                    }
                </div>
                <SpinnerComponent show={props.isCallingApi}> </SpinnerComponent>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roomReducer,
    ...state.layoutReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(RoomList));
