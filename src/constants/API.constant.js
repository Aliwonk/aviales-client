const URL_SERVER = "http://localhost:3000/api";
const API_SERVER = Object.freeze({
    DOCUMENTS: {
        FIRE: {
            FIRE_CARD: {
                CREATE: `${URL_SERVER}/documents/fire/card`,
                GET_ALL: `${URL_SERVER}/documents/fire/card/all`,
                GET_ONE: `${URL_SERVER}/documents/fire/card`,
                WORKER: {
                    CREATE: `${URL_SERVER}/documents/fire/card/worker`,
                    GET_ALL: `${URL_SERVER}/documents/fire/card/worker/all`,
                    GET_ONE: `${URL_SERVER}/documents/fire/card/worker`
                },
                NOTE: {
                    GET_ALL: `${URL_SERVER}/documents/fire/card/note/all`,
                    GET_ONE: `${URL_SERVER}/documents/fire/card/note`
                },
                DEFECT_SHEET: {
                    GET_ALL: `${URL_SERVER}/documents/fire/card/defect-sheet/all`,
                },
                MANAGER: {
                    SET: `${URL_SERVER}/documents/fire/card/manager`,
                }
            },
            MANAGER_REPORT: {
                GET_ALL: `${URL_SERVER}/documents/fire/manager-report/all`,
                GET_ONE: ``
            },
            FILES: {
                GET_IMAGE: `${URL_SERVER}/documents/fire/files`,
            }
        },
        WAREHAOUSE: {}
    },
    USERS: {
        CREATE: `${URL_SERVER}/users/create`,
        GET_ALL: `${URL_SERVER}/users`,
        GET_ONE: `${URL_SERVER}/users/one`,
        POST: {
            CREATE: `${URL_SERVER}/users/post`,
            GET_OPTIONS: `${URL_SERVER}/users/post/options`,
            GET_ONE: `${URL_SERVER}/users/post`,
        },
        PERSONAL_DATA: {
            CREATE: `${URL_SERVER}/users/personal-data`,
            GET_ONE: `${URL_SERVER}/users/personal-data`
        },
    },
    AUTH: {
        USER: {
            LOGIN: `${URL_SERVER}/auth/login`,
            INIT_AUTH: `${URL_SERVER}/auth/init`,
            REFRESH_ONE: `${URL_SERVER}/auth/refresh`,
            REFRESH_ALL: `${URL_SERVER}/auth/refresh/all`,
            GET_ONE: `${URL_SERVER}/auth`,
        },
        ADMIN: {
            LOGIN: `${URL_SERVER}/admin`
        },
        ROLE: {
            CREATE: `${URL_SERVER}/auth/role`,
        }
    }
});

export default API_SERVER;