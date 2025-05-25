import { deleteCookie, getCookie } from "@/utils/cookie.util";
import Docs from "@/views/admin/docs/Docs.vue";
import ListUsers from "@/views/admin/users/ListUsers.vue";
import Warehouse from "@/views/admin/warehouse/Warehouse.vue";
import FireCardList from "@/views/administrator/FireCardList.vue";
import ManagerReport from "@/views/administrator/ManagerReport.vue";
import { markRaw, reactive, shallowRef } from "vue";

export const authStore = reactive({
    isAuth: getCookie("user_tkn") ? true : false,
    role: getCookie("user_role"),
    token: getCookie("user_tkn"),
    isAdmin: getCookie("admin"),
    changeToken(token, role) {
        this.isAuth = true;
        this.token = token;
        this.role = role;
    },
    exit() {
        this.isAuth = false;
        this.token = null;
        this.role = null;
        deleteCookie("user_tkn");
        deleteCookie("admin");
        deleteCookie("user_role");
        window.location.reload();
    }
});

export const modalStore = reactive({
    isActive: false,
    component: null,
    isForm: false,
    data: {
        form: {
            caption: "",
            currentPage: 1,
            inputs: [
                {
                    page: 1,
                    name: "name",
                    label: {
                        text: "",
                        placeholder: "",
                    },
                    input: {
                        type: "text",
                        placeholder: "",
                    }
                }
            ],
            buttons: [],
            action: null
        }
    },
    setData(data) {
        this.data = data;
    },
    close() {
        this.isActive = false;
        if (this.component) {
            this.component = null;
        }

        if (this.data) {
            this.data = null;
        }
    },
    open(component = null) {
        this.isActive = true;
        if (this.component) this.component = null;
        if (component) {
            this.component = shallowRef(component);
        }
    }
});

export const componentStore = reactive({
    currentPath: [],
    currentComponent: {
        name: "",
        component: null,
    },
    showBtnPrev: false,
    addPath(name, component) {
        for (let i = 0; i < this.currentPath.length; i++) {
            if (this.currentPath[i].name === name) {
                this.currentPath.splice(i, 1);
                break;
            }
        }
        this.currentPath.push({
            name: name,
            component: shallowRef(component),
        });
    },
    goToPath(index) {
        if (this.currentPath[index].component == this.currentComponent.component) return;
        this.currentPath.splice(index + 1, this.currentPath.length - index);
        this.changeCurrentComponent(this.currentPath[index].name, this.currentPath[index].component);
        if (this.currentPath.length > 1) {
            this.showBtnPrev = true;
        } else {
            this.showBtnPrev = false;
        }
    },
    goToPrevPath() {
        if (this.currentPath.length > 1) {
            this.currentPath.splice(this.currentPath.length - 1, 1);
            this.changeCurrentComponent(this.currentPath[this.currentPath.length - 1].name, this.currentPath[this.currentPath.length - 1].component);
        }
        if (this.currentPath.length === 1) {
            this.showBtnPrev = false;
        }

    },
    changeCurrentComponent(name, component, isMain = false) {
        if (!isMain) {
            this.addPath(name, component);
            this.showBtnPrev = true;
        } else {
            this.currentPath = [
                {
                    name: name,
                    component: shallowRef(component),
                }
            ]
        }


        if (this.currentComponent.name === name) {
            this.currentComponent.component = null;
            this.currentComponent.name = null;
        } else {
            this.currentComponent.name = name;
            this.currentComponent.component = markRaw(component);
        }
    },
});

export const bodyStore = reactive({
    currentComponent: {
        name: "",
        component: null,
    },
    currentData: null,
    history: [],
    changecurrentData(props) {
        this.currentData = props;
    },
    addToHistory(name, component) {
        for (let i = 0; i < this.history.length; i++) {
            if (this.history[i].name === name) {
                this.history.splice(i, 1);
                break;
            }
        }
        this.history.push({
            name: name,
            component: shallowRef(component),
        });
    },
    changeCurrentComponent(name, component) {
        if (this.currentComponent.name === name) {
            this.currentComponent.component = null;
            this.currentComponent.name = null;
        } else {
            this.currentComponent.name = name;
            this.currentComponent.component = markRaw(component);
            this.addToHistory(this.currentComponent.name, this.currentComponent.component);
        }
    },
});


function changeActive() {
    this.isActive = !this.isActive;
    leftBarStore.BUTTONS_MENU[this.category].forEach((item) => {
        if (item.name !== this.name) {
            item.isActive = false;
            item.clickedClass = null;
        }
    });

    if (leftBarStore.BUTTONS_MENU[this.category].length == 1) {
        leftBarStore.allDeactive = !this.isActive;
    } else {
        leftBarStore.allDeactive = leftBarStore.BUTTONS_MENU[this.category].every((item) => item.isActive == false);
    }
    this.clickedClass = this.isActive ? "btn-clicked" : null;
}

export const leftBarStore = reactive({
    allDeactive: true,
    BUTTONS_MENU: {
        "СУПЕР_АДМИНИСТРАТОР": [
            {
                name: "Пользователи",
                category: "СУПЕР_АДМИНИСТРАТОР",
                isActive: false,
                icon: "src/assets/icons/users.png",
                clickedClass: null,
                component: shallowRef(ListUsers),
                changeActive
            },
            {
                name: "Документы",
                category: "СУПЕР_АДМИНИСТРАТОР",
                isActive: false,
                icon: "src/assets/icons/docs.png",
                component: shallowRef(Docs),
                clickedClass: null,
                changeActive
            },
            {
                name: "Склад",
                category: "СУПЕР_АДМИНИСТРАТОР",
                isActive: false,
                icon: "src/assets/icons/warehouse.png",
                component: shallowRef(Warehouse),
                clickedClass: null,
                changeActive
            },
        ],
        "РУКОВОДИТЕЛЬ": [
            {
                name: "Сотрудники",
                category: "РУКОВОДИТЕЛЬ",
                isActive: false,
                icon: "src/assets/icons/users.png",
                clickedClass: null,
                component: shallowRef(ListUsers),
                changeActive
            },
            {
                name: "Документы",
                category: "РУКОВОДИТЕЛЬ",
                isActive: false,
                icon: "src/assets/icons/docs.png",
                clickedClass: null,
                component: shallowRef(Docs),
                changeActive
            },
            {
                name: "Склад",
                category: "РУКОВОДИТЕЛЬ",
                isActive: false,
                icon: "src/assets/icons/warehouse.png",
                clickedClass: null,
                component: shallowRef(Warehouse),
                changeActive
            },
        ],
        "АДМИНИСТРАТОР": [
            {
                name: "Пожар",
                category: "АДМИНИСТРАТОР",
                isActive: false,
                icon: "src/assets/icons/fire.png",
                clickedClass: null,
                component: shallowRef(FireCardList),
                changeActive
            },
        ],
        "ИНСТРУКТОР": [
            {
                name: "Докладная записка",
                category: "ИНСТРУКТОР",
                isActive: false,
                icon: "src/assets/icons/docs.png",
                clickedClass: null,
                component: shallowRef(ManagerReport),
                changeActive
            },
            {
                name: "Работники",
                category: "ИНСТРУКТОР",
                isActive: false,
                icon: "src/assets/icons/users.png",
                clickedClass: null,
                component: shallowRef(ListUsers),
                changeActive
            },
            {
                name: "Дефектная ведомость",
                category: "ИНСТРУКТОР",
                isActive: false,
                icon: "src/assets/icons/docs.png",
                clickedClass: null,
                component: shallowRef(Docs),
                changeActive
            }
        ],
        "СОТРУДНИК": {

        }
    }
})
