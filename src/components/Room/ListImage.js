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
import RoomFormDetails from "./FormDetails";
import ImageUploader from "react-images-upload";
import Form from "react-bootstrap/Form";
import {FormikProvider, useFormik} from "formik";
import notification from "../../helpers/Notification";

class RoomListImage extends React.Component {

    constructor(props) {
        super(props);
        this.props.resetFormData();
        this.state = {
            localImageFile: [],
            localImageData: [],
        };
    }

    componentDidMount() {
        this.props.getListRoomType();
        this.props.getListRoomFacility();
        this.props.getById(this.props.match.params.id);
    }

    renderList(listData) {
        if (listData === undefined) return;

        return listData.map((row, index) => {
            const key = "room_image_" + index;
            return (
                <tr key={key}>
                    <td style={{textAlign: 'center'}}>
                        <img style={{width: '200px'}} src={row.thumbnail} />
                    </td>
                    <td className="text-nowrap text-center">
                        <span className="action-link ml-1">
                            <Link to={'#'} onClick={event => {this.handelDeleteImage(row)}} className="btn btn-sm btn-danger">
                                <i className="fa fa-trash"> </i>
                            </Link>
                        </span>
                    </td>
                </tr>
            );
        });
    }

    onDrop = (pictureSelected, pictureDataURLs)  => {
        this.handleImageSelected(pictureSelected, pictureDataURLs);
    };
    handleImageSelected = (pictureSelected, pictureDataURLs)  => {
        if (pictureSelected.length > 0) {
            this.setState({
                localImageFile: [pictureSelected[pictureSelected.length - 1]],
                localImageData: [pictureDataURLs[pictureDataURLs.length - 1]]
            });
        } else {
            this.setState({
                localImageFile: [],
                localImageData: []
            });
        }
    };

    onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.state.localImageFile[0]) {
            notification.error('Vui lòng chọn hình');
            return false;
        }

        const data = [];

        //add image
        this.props.addImage({
            data: {
                id: this.props.match.params.id,
                galleries: this.props.formData.galleries ? this.props.formData.galleries : []
            },
            image: this.state.localImageFile[0]
        });
    };

    handelDeleteImage(row) {
        this.props.deleteImage({
            needDelete: row.imagesOrigin,
            id: this.props.match.params.id,
            galleries: this.props.formData.galleries ? this.props.formData.galleries : []
        });
    }

    render() {
        const messages = this.props.languageSwitcher.languageMessages;
        const { props } = this;

        return (
            <React.Fragment>
                <div className="box">
                    {/*<div className="box-header with-border">*/}
                        {/*<div className="float-md-right mt-2 mt-md-0">*/}
                            {/*<Link to={PagesUrl.PAGE_ROOM_LIST}>*/}
                                {/*<button type="button"*/}
                                        {/*className="btn btn-primary btn-sm ml-1">{messages['layout.button.back']}</button>*/}
                            {/*</Link>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <RoomFormDetails isDetail={true}/>
                    <div className="box-body">
                        <div className="datatable_container">
                            <div className="row m-0 my-2">
                                <h3>Thêm hình cho sản phẩm</h3>
                                    <Form onSubmit={this.onSubmit.bind(this)} id="form-upload-image">
                                        <Form.Group>
                                            <ImageUploader
                                                singleImage={true}
                                                withIcon={true}
                                                buttonText={'Chọn hình'}
                                                onChange={this.onDrop}
                                                imgExtension={['.jpg', '.png', '.gif']}
                                                maxFileSize={5242880}
                                                withPreview={true}
                                            />
                                            <button type="submit" className="btn btn-info">{messages['layout.button.upload']}</button>
                                        </Form.Group>
                                    </Form>
                            </div>

                            <div className="row m-0 my-2">
                                <div className="col-sm-12 p-0">
                                    <Table bordered hover responsive size="sm" className="table-custom mb-0">
                                        <thead>
                                        <tr>
                                            <th>Hình</th>
                                            <th style={{ width: '100px' }} rowSpan={2}>{messages['layout.column.action']}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderList(this.props.formData.galleries_show)}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default withRouter(connect(mapStateToProps, actions)(RoomListImage));
