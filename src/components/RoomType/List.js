import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import actions from '../../redux/roomType/action';
import {withRouter} from 'react-router-dom';
import Paginator from "../../common/Paginator";
import Filter from "./Popup/Filter";
import {Table} from 'react-bootstrap';
import {PAGE_ROOM_TYPE_ADD, PAGE_ROOM_TYPE_DELETE, PAGE_ROOM_TYPE_EDIT} from "../../configs/PagesUrl";
import siteConfig from "../../configs/siteConfig";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    color: 'fe7401',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 500
});

class RoomTypeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopupFilter: false,
            sortMode: false,
            sortList: []
        };
        this.onChangePageNumber = this.handlePaging.bind(this);
        this.onChangeItemPerPage = this.handleItemPerPage.bind(this);
        this.onApplyFilter = this.handleFilter.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
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
            page: pageNumber
        });
        await this.getList();
    }

    async handleItemPerPage(itemPerPage) {
        //update filter first, so paging number can changed
        //change item per page must reset page to 1
        await this.props.updateFilter({
            ...this.props.filter,
            per_page: itemPerPage,
            page: 1
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
                page: 1
            });
            await this.getList();
        });
    }

    getList() {
        this.props.getList(this.props.filter);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.props.listData.items,
            result.source.index,
            result.destination.index
        );

        this.props.listData.items = items;
        this.props.updateSortList(items);
    }

    renderList(listData) {
        if (listData === undefined || listData.items === undefined) return;

        return listData.items.map((row) => {
            return (
                <tr key={row.id}>
                    <td>
                        <a href={siteConfig.siteRoot + 'danh-muc/' + row.id} target="_blank">
                        {row.name.en}
                        </a>
                    </td>
                    <td>
                        <a href={siteConfig.siteRoot + 'danh-muc/' + row.id} target="_blank">
                        {row.name.vi}
                        </a>
                    </td>
                    <td className="align-center">{parseInt(row.hot) === 1 ? <i className="fa fa-check" /> : ''}</td>
                    {/*<td>{row.name.jp.kanji}</td>*/}
                    {/*<td>{row.name.jp.romaji}</td>*/}
                    {/*<td>{row.name.kr}</td>*/}
                    {/*<td>{row.description.en}</td>*/}
                    {/*<td>{row.description.vi}</td>*/}
                    {/*<td>{row.description.jp.kanji}</td>*/}
                    {/*<td>{row.description.jp.romaji}</td>*/}
                    {/*<td>{row.description.kr}</td>*/}
                    <td>{row.sort_order}</td>
                    <td className="text-nowrap text-center">
                        <span className="action-link ml-1">
                            <Link to={PAGE_ROOM_TYPE_EDIT + '/' + row.id} className="btn btn-sm btn-success">
                                <i className="fa fa-pencil"> </i>
                            </Link>
                        </span>
                        <span className="action-link ml-1">
                            <Link to={PAGE_ROOM_TYPE_DELETE+ '/' + row.id} className="btn btn-sm btn-danger">
                                <i className="fa fa-trash"> </i>
                            </Link>
                        </span>
                    </td>
                </tr>
            );
        });
    }

    switchToSortMode(mode) {
        this.setState({ sortMode : mode}, () => {
            this.props.updateFilter({
                ...this.props.filter,
                page: 1,
                per_page: this.state.sortMode ? 1000 : siteConfig.defaultItemPerPage
            });
            this.getList();
        });
    };

    render() {
        const messages = this.props.languageSwitcher.languageMessages;
        const { sortMode } = this.state;
        let hide = {};
        if (sortMode) {
            hide = {
                display: 'none'
            };
        }

        return (


            <div className="box">
                <div className="box-header with-border">
                    <h3 className="box-title">{messages['group.list.title']}</h3>
                    <div className="float-md-right mt-2 mt-md-0">
                        {!sortMode ?
                            <button type="button" className="btn btn-success btn-sm ml-1"
                                    onClick={() => this.switchToSortMode(true)}
                            >Chuyển qua chế độ sắp xếp thứ tự
                            </button>
                            :
                            <button type="button" className="btn btn-info btn-sm ml-1"
                                    onClick={() => this.switchToSortMode(false)}
                            >Chuyển qua danh sách
                            </button>
                        }
                        <Link to={PAGE_ROOM_TYPE_ADD}>
                            <button type="button"
                                    className="btn btn-primary btn-sm ml-1">{messages['layout.button.register']}</button>
                        </Link>
                    </div>
                </div>
                { !sortMode ?
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
                        />
                        <div className="row m-0 my-2">
                            <div className="col-sm-12 p-0">
                                <Table bordered hover responsive size="sm"
                                       className="table-custom mb-0">
                                    <thead>
                                    <tr>
                                        <th colSpan={2}>Tên</th>
                                        {/*<th colSpan={2}>Mô tả chi tiết</th>*/}
                                        <th>Hiện bên trái</th>
                                        <th>Số thứ tự (nhỏ -> lớn)</th>
                                        <th style={{width: '100px'}} rowSpan={2}>{messages['layout.column.action']}</th>
                                    </tr>
                                    <tr>
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
                                        <th></th>
                                        <th></th>

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
                            />
                        </div>
                    </div>
                </div>
                    :
                <div className="box-body">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    {this.props.listData.items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    {item.name.vi}
                                                </div>

                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div> }

                {this.state.showPopupFilter ?
                    <Filter
                        show={this.state.showPopupFilter}
                        closePopup={this.togglePopupFilter.bind(this)}
                        onApplyFilter={this.onApplyFilter}
                    />
                    : null
                }
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roomTypeReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(RoomTypeList));
