const siteConfig = {
    apiRoot : 'https://vitinhducvy.com/api/v1/',
    // apiRoot : 'http://35.185.166.37:2000/api/v1/',
    // apiRoot : 'http://localhost:7001/api/v1/',
    siteRoot : 'https://vitinhducvy.com/',
    apiTimeout: 90000,
    title: 'Vi tính Đức Vy - CMS',
    fakeData: false,
    version: '1.0',
    defaultItemPerPage: 30,
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    monthFormat: 'YYYY-MM',
    language: {
        default: 'vietnam',
        options: [
            {
                languageId: "vietnam",
                locale: "vi",
                text: "Tieng Viet",
            },
            {
                languageId: "english",
                locale: "en",
                text: "English",
            }
        ]
    },
};

export default siteConfig;
