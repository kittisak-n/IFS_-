import Vue from "vue";
import VueRouter from "vue-router";
import PMS_login from "../views/login.vue";
import PMS_Home from "../views/Home.vue";

//PMS_manage
import permission_manage from "../views/PMS/permission_manage.vue";
import addposition from "../views/PMS/addposition.vue";
import adduser from "../views/PMS/adduser.vue";
import personal_data from "../views/PMS/personal_data.vue";

//MDS_exchequer
import MDS_exchequer from "../views/MDS/MDS_exchequer/MDS_exchequer.vue";
import MDS_exchequer_adjust_material from "../views/MDS/MDS_exchequer/MDS_exchequer_adjust_material.vue";

import MDS_import from "../views/MDS/MDS_import/MDS_import.vue";
import MDS_import_form from "../views/MDS/MDS_import/MDS_import_form.vue";
import MDS_export from "../views/MDS/MDS_export/MDS_export.vue";
import MDS_report from "../views/MDS/MDS_report/MDS_report.vue";
import MDS_disbursement from "../views/MDS/MDS_disbursement/MDS_disbursement.vue";
import MDS_disbursement_form from "../views/MDS/MDS_disbursement/MDS_disbursement_form.vue";
import MDS_setting from "../views/MDS/MDS_setting/MDS_setting.vue";
//WLS
import Calculation_criteria from "../views/WLS/Calculation_criteria/Calculation_criteria.vue";
import Detail_criteria from "../views/WLS/Calculation_criteria/Detail_criteria.vue";
import Add_criteria from "../views/WLS/Calculation_criteria/Add_criteria.vue";
import SummaryWorkload from "../views/WLS/Calculation_criteria/SummaryWorkload.vue";
import Show_course from "../views/WLS/Show_course/ShowCourse.vue";
// import Show_course from "../views/WLS/Show_course/test_upload.vue"; //test
import InsertCourse from "../views/WLS/Show_course/Insert_Course_form.vue";
import Calculation_workload from "../views/WLS/Calculation_criteria/Calculation_workload.vue";
import Inspect_workload from "../views/WLS/Calculation_criteria/Inspect_workload.vue";
import calculation_subworkload from "../views/WLS/Calculation_criteria/calculation_subworkload.vue";
import Conclude_workload from "../views/WLS/Calculation_criteria/Conclude_workload.vue";
Vue.use(VueRouter);

const routes = [{
        path: "/home",
        name: "Home",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "หน้าแรก" },
        children: [{
            path: "",
            component: PMS_Home,
        }, ],
    },
    {
        path: "/personal_data",
        name: "personal_data",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "ข้อมูลส่วนตัว" },
        children: [{
            path: "",
            component: personal_data,
        }, ],
    },
    {
        path: "/login",
        name: "login",
        meta: { breadCrumb: "เข้าสู่ระบบ" },
        component: {
            render(c) {
                return c("router-view");
            },
        },
        children: [{
            path: "",
            component: PMS_login,
        }, ],
    },
    {
        path: "/addposition",
        name: "addposition",
        meta: { breadCrumb: "เพิ่มตำแหน่งการเข้าถึง" },
        component: {
            render(c) {
                return c("router-view");
            },
        },
        children: [{
            path: "",
            component: addposition,
        }, ],
    },
    {
        path: "/permission_manage",
        name: "permission_manage",
        meta: { breadCrumb: "จัดการสิทธิ์การใช้งาน" },
        component: {
            render(c) {
                return c("router-view");
            },
        },
        children: [{
                path: "",
                component: permission_manage,
            },
            {
                path: "adduser",
                meta: { breadCrumb: "เพิ่มผู้ใช้งาน" },
                component: {
                    render(c) {
                        return c("router-view");
                    },
                },
                children: [{
                    path: "",
                    component: adduser,
                }, ],
            },
        ],
    },

    // หลักเกณฑ์การคำนวณ
    {
        path: "/Calculation_criteria",
        name: "Calculation_criteria",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "หลักเกณฑ์กำหนดภาระงานสอน" },
        children: [{
                path: "",
                component: Calculation_criteria,
            },
            {
                path: "Add_criteria",
                name: "Add_criteria",
                meta: { breadCrumb: "ตั้งค่าอัตราการจ่ายค่าตอบแทนภาระงานสอน" },
                component: {
                    render(c) {
                        return c("router-view");
                    },
                },
                children: [{
                    path: "",
                    component: Add_criteria,
                }, ],
            },
            {
                path: "Detail_criteria",
                name: "Detail_criteria",
                meta: { breadCrumb: "แสดงรายละเอียดหลักเกณฑ์การกำหนดภาระงานสอน" },
                component: {
                    render(c) {
                        return c("router-view");
                    },
                },
                children: [{
                    path: "",
                    component: Detail_criteria,
                }, ],
            },
        ],
    },

    // ตรวจสอบภาระงาน
    {
        path: "/Inspect_workload",
        name: "Inspect_workload",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "ตรวจสอบภาระงาน" },
        children: [{
            path: "",
            component: Inspect_workload,
        }, ],
    },

    //สรุปภาระงานเพื่อจ่ายค่าตอบแทนอาจารย์ประจำ
    {
        path: "/SummaryWorkload",
        name: "SummaryWorkload",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "สรุปภาระงานเพื่อการจ่ายค่าตอบแทน" },
        children: [{
            path: "",
            component: SummaryWorkload,
        }, ],
    },
    //Show_course ฮาย
    {
        path: "/Show_course",
        name: "Show_course",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "แสดงรายวิชา" },
        children: [{
                path: "",
                component: Show_course,
            },
            {
                meta: { breadCrumb: "เพิ่มรายวิชา" },
                path: "InsertCourse",
                component: InsertCourse,
            },
        ],
    },

    //คำนวณภาระงาน Calculation_workload
    {
        path: "/Calculation_workload",
        name: "Calculation_workload",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "คำนวณภาระงาน" },
        children: [{
            path: "",
            component: Calculation_workload,
        }, ],
    },
    {
        path: "/Calculation_subworkload",
        name: "Calculation_subworkload",
        meta: { breadCrumb: "คำนวณภาระงาน" },
        component: calculation_subworkload,
    },
    {
        path: "/Conclude_workload",
        name: "Conclude_workload",
        meta: { breadCrumb: "สรุปรายละเอียดคำนวณภาระงาน" },
        component: Conclude_workload,
    },

    {
        path: "/MDS_exchequer",
        name: "MDS_exchequer",
        meta: { breadCrumb: "รายการวัสดุในคลัง" },
        component: {
            render(c) {
                return c("router-view");
            },
        },
        children: [{
                path: "",
                component: MDS_exchequer,
            },
            {
                path: "MDS_exchequer_adjust_material",
                name: "MDS_exchequer_adjust_material",
                meta: { breadCrumb: "ปรับยอดรายการวัสดุ" },
                component: {
                    render(c) {
                        return c("router-view");
                    },
                },
                children: [{
                    path: "",
                    component: MDS_exchequer_adjust_material,
                }, ],
            },
        ],
    },
    {
        path: "/MDS_disbursement",
        name: "MDS_disbursement",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "เบิกวัสดุ" },
        children: [{
                path: "",
                component: MDS_disbursement,
            },
            {
                path: "MDS_disbursement_form",
                component: {
                    render(c) {
                        return c("router-view");
                    },
                },
                meta: { breadCrumb: "แบบฟอร์มเบิกวัสดุ" },
                children: [{
                    path: "",
                    component: MDS_disbursement_form,
                }, ],
            },
        ],
    },
    {
        path: "/MDS_export",
        name: "MDS_export",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "รายการเบิกจ่ายวัสดุ" },
        children: [{
            path: "",
            component: MDS_export,
        }, ],
    },
    {
        path: "/MDS_setting",
        name: "MDS_setting",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "รายการเบิกจ่ายวัสดุ" },
        children: [{
            path: "",
            component: MDS_setting,
        }, ],
    },
    {
        path: "/MDS_report",
        name: "MDS_report",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "รายงานผลการเบิกจ่ายวัสดุ" },
        children: [{
            path: "",
            component: MDS_report,
        }, ],
    },
    {
        path: "/MDS_import",
        name: "MDS_import",
        component: {
            render(c) {
                return c("router-view");
            },
        },
        meta: { breadCrumb: "รายการนำเข้าวัสดุ" },
        children: [{
                path: "",
                component: MDS_import,
            },
            {
                path: "MDS_import_form",
                name: "MDS_import_form",
                component: {
                    render(c) {
                        return c("router-view");
                    },
                },
                meta: { breadCrumb: "ฟอร์มนำข้าวัสดุ" },
                children: [{
                    path: "",
                    component: MDS_import_form,
                }, ],
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;