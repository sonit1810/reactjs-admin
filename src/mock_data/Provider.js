import * as services from '../services/Index';
import notification from "../helpers/Notification";

class MockDataProvider {
    getData(path, payload) {
        switch (path) {
            case services.UserService.Urls.LIST: {
                return {
                    status: true,
                    data: this.getDataOfPage(require('../mock_data/User/list'), payload)
                };
            }
            case services.MemberGroupService.Urls.LIST: {
                return {
                    status: true,
                    data: this.getDataOfPage(require('../mock_data/MemberGroup/list'), payload)
                };
            }
            case services.MemberGroupService.Urls.SHOW: {
                return {
                    status: true,
                    data: this.getDataById(require('../mock_data/MemberGroup/list'), payload)
                };
            }
            case services.MemberGroupService.Urls.ADD: {
                return {
                    status: true,
                    message: "Membergroup created successfully",
                    data: { id: 1 }
                };
            }
            case services.MemberGroupService.Urls.EDIT: {
                return {
                    status: true,
                    message: "Membergroup edited successfully",
                    data: { id: payload.id }
                };
            }
            case services.MemberGroupService.Urls.DELETE: {
                return {
                    status: true,
                    message: "Membergroup deleted successfully",
                    data: {}
                };
            }
            case services.UserService.Urls.LOGIN: {
                return {
                    status: true,
                    data: require('../mock_data/User/auth'),
                    message: 'Login success'
                };
            }

            default:
                notification.error('Missing define mock data for action ' + path);
                break;
        }
    }

    getDataOfPage(mockData, payload) {
        var tempSearch = '';
        if (payload.search !== null && payload.search !== '') {
            tempSearch = [...mockData].filter((row) => {
                if (payload.search !== null && payload.search !== '')
                    return row.createdDate.toLowerCase().match(payload.search);
            });
        } else {
            tempSearch = [...mockData];
        }

        const temp = tempSearch;

        const offset = (payload.page - 1) * payload.per_page;
        const segment = offset + payload.per_page;
        return {
            items: temp.slice(offset, segment),
            actualPage: payload.page,
            total: temp.length
        };
    }

    getDataById(mockData, id) {
        const item = mockData.filter((row) => {
            return parseInt(row.id) === parseInt(id);
        });
        return item[0];
    }
}

export default new MockDataProvider();