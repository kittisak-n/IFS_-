<template>
  <div id="SummaryWorkload">
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card
          size="small"
          title="ตารางแสดงรายละเอียดการจ่ายค่าตอบแทนของคณาจารย์ประจำคณะวิทยาการสารสนเทศ"
        >
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="24" style="text-align: center">
              <h1>
                สรุปภาระงานเพื่อการจ่ายค่าตอบแทนของคณาจารย์ประจำคณะวิทยาการสารสนเทศ
              </h1>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="8" style="text-align: end">
              <span style="font-size: 18px">ปีการศึกษา </span>
              <a-select
                @change="get_summary_by_year()"
                v-model="year"
                style="width: 35%; font-size: 15px"
              >
                <a-select-option :value="0" selected>
                  แสดงทั้งหมด
                </a-select-option>
                <a-select-option :value="new Date().getFullYear() + 543">
                  {{ new Date().getFullYear() + 543 }}
                </a-select-option>
                <a-select-option :value="new Date().getFullYear() + 542">
                  {{ new Date().getFullYear() + 542 }}
                </a-select-option>
                <a-select-option :value="new Date().getFullYear() + 541">
                  {{ new Date().getFullYear() + 541 }}
                </a-select-option>
                <a-select-option :value="new Date().getFullYear() + 540">
                  {{ new Date().getFullYear() + 540 }}
                </a-select-option>
                <a-select-option :value="new Date().getFullYear() + 539">
                  {{ new Date().getFullYear() + 539 }}
                </a-select-option>
              </a-select>
            </a-col>

            <a-col :span="8" style="text-align: start">
              <span style="font-size: 18px"> ภาคเรียนที่ </span>

              <a-select
                v-model="semester"
                style="width: 100px; font-size: 15px"
              >
                <a-select-option :value="1"> 1 </a-select-option>
                <a-select-option :value="2"> 2 </a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-table
                :columns="columns"
                :data-source="summary_data"
                :pagination="false"
                bordered
                size="small"
              >
                <span slot="key" slot-scope="text">
                  <div style="text-align: center">
                    {{ text }}
                  </div>
                </span>

                <span slot="person_name" slot-scope="text">
                  <div style="text-align: center">
                    {{ text }}
                  </div>
                </span>

                <span slot="position_name" slot-scope="text">
                  <div :style="{ textAlign: 'start' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="summary_total" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>

                <span slot="summary_total_around" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>

                <span slot="summary_total_extra" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>

                <span slot="action" slot-scope="text, record">
                  <div :style="{ textAlign: 'center' }">
                    <template slot="title">
                      <span>แสดงรายละเอียด</span>
                    </template>

                    <a-button type="primary" icon="search"> </a-button>

                    <template slot="title">
                      <span>ส่งออกไฟล์ PDF</span>
                    </template>
                    <a-button
                      type="danger"
                      icon="file-pdf"
                      :style="{ marginRight: '3%' }"
                      @click="exportPDF(record.summary_id)"
                    />

                    <template slot="title">
                      <span>ส่งออกไฟล์ EXCEL</span>
                    </template>
                    <a-button
                      type="success"
                      icon="file-excel"
                      :style="{ marginRight: '3%' }"
                    />

                    <router-link
                      :to="{
                        path:
                          '/Calculation_workload?person_id=' + record.person_id,
                      }"
                    >
                      <a-button type="primary" :style="{ marginRight: '3%' }"
                        >คำนวณ</a-button
                      ></router-link
                    >
                  </div>
                </span>
              </a-table>
            </a-col>
          </a-row>
          <br />
          <a-row>
            <a-col :span="15">
              <p :style="{ marginTop: '0.3em' }">1-10 จาก 10 รายการ</p>
            </a-col>
            <a-col :span="9" :style="{ textAlign: 'Right' }">
              แสดงทีละ
              <a-select
                default-value="10"
                :style="{ width: '60px', marginRight: '1%' }"
              >
                <a-select-option value="10"> 10 </a-select-option>
                <a-select-option value="25"> 25 </a-select-option>
                <a-select-option value="50"> 50 </a-select-option>
                <a-select-option value="100"> 100 </a-select-option>
              </a-select>

              <a-pagination
                :style="{ display: 'inline' }"
                v-model="current"
                :total="total"
                :page-size="10"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const axios = require("axios");

import pdfMake from "pdfmake";
import pdfFonts from "@/assets/fontsPDF/THSarabunPsk-fonts.js"; // 1. import custom fontss

export default {
  name: "SummaryWorkload",
  components: {},
  data() {
    return {
      month: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
      summary_data: [],
      export_data: [],
      receipt_data: [],
      semester: 1,
      year: 0, // 2020,

      columns: [
        {
          title: "ลำดับ",
          dataIndex: "key",
          key: "key",
          width: "5%",
          scopedSlots: { customRender: "key" },
        },
        {
          title: "ชื่อ-สกุล",
          dataIndex: "person_name",
          key: "person_name",
          width: "15%",
          scopedSlots: { customRender: "person_name" },
        },

        {
          title: "ตำแหน่ง",
          dataIndex: "position_name",
          key: "position_name",
          width: "15%",
          scopedSlots: { customRender: "position_name" },
        },

        {
          title: "ภาระงานสอน",
          dataIndex: "summary_total",
          key: "summary_total",
          width: "5%",
          scopedSlots: { customRender: "summary_total" },
        },
        {
          title: "หักภาระงานขั้นต่ำ",
          dataIndex: "summary_total_around", //Less minimum workload
          key: "summary_total_around",
          width: "5%",
          scopedSlots: { customRender: "summary_total_around" },
        },
        {
          title: "หักภาระงาน Extraworkload",
          dataIndex: "summary_total_extra", // Less minimum workload Extraworkload
          key: "summary_total_extra",
          width: "5%",
          scopedSlots: { customRender: "summary_total_extra" },
        },
        {
          title: "ภาระงานที่เบิกได้",
          dataIndex: "summary_bonus", //Payable workload
          key: "summary_bonus",
          width: "5%",
          scopedSlots: { customRender: "summary_bonus" },
        },
        {
          title: "ดำเนินการ",
          dataIndex: "action",
          key: "action",
          width: "5%",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  methods: {
    get_summary_by_year() {
      const self = this;
   
      if (this.year == 0) {
        this.get_summary();
      } else {
        axios
          .post(this.$store.state.url + "/summaryRouters/get_summary_by_year", {
            summary_year: self.year,
          })
          .then((res) => {
            self.summary_data = [];
            res.data.results.forEach(function (element, index) {
              self.summary_data.push({
                key: index + 1,
                summary_id: element.summary_id,
                summary_total: element.summary_total,
                summary_total_calculate: element.summary_total_calculate,
                summary_total_around: element.summary_total_around,
                summary_total_extra: element.summary_total_extra,
                summary_bonus: element.summary_bonus,
                summary_salary: element.summary_salary,
                summary_lesson: element.summary_lesson,
                summary_create_by: element.summary_create_by,
                summary_create_date: element.summary_create_date,

                schedule_per_credit: element.schedule_per_credit,
                schedule_start_date: element.schedule_start_date,
                schedule_name: element.schedule_name,
                schedule_id: element.schedule_id,
                summary_year: element.summary_year,
                person_name: element.person_name,
                position_name: element.position_name,
                person_address: element.person_address,
                provinces_name: element.provinces_name,
                amphures_name: element.amphures_name,
                districts_name: element.districts_name,
                zip_code: element.zip_code,
              });
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    getdateThai_summary_data() {
      const self = this;

      self.summary_data.forEach((data, index) => {
        let summary_create_date_thai = new Date(data.summary_create_date)
          .toISOString()
          .split("T")[0];
        summary_create_date_thai = `${summary_create_date_thai.split("-")[2]} ${
          self.month[parseInt(summary_create_date_thai.split("-")[1])]
        } ${parseInt(summary_create_date_thai.split("-")[0]) + 543}`;

        let schedule_start_date_thai = new Date(data.schedule_start_date)
          .toISOString()
          .split("T")[0];
        schedule_start_date_thai = ` ${
          parseInt(schedule_start_date_thai.split("-")[0]) + 543
        }`;

        self.summary_data[index].summary_create_date = summary_create_date_thai;
        self.summary_data[index].schedule_start_date = schedule_start_date_thai;
      });
    },
    genDate() {
      const self = this;

      self.receipt_data.forEach((data, index) => {
        let summary_detail_date_thai = new Date(data.summary_detail_date)
          .toISOString()
          .split("T")[0];
        summary_detail_date_thai = `${
          self.month[parseInt(summary_detail_date_thai.split("-")[1])]
        } ${parseInt(summary_detail_date_thai.split("-")[0]) + 543}`;
        let summary_detail_create_date = new Date(
          data.summary_detail_create_date
        )
          .toISOString()
          .split("T")[0];
        summary_detail_create_date = `${
          summary_detail_create_date.split("-")[2]
        } ${self.month[parseInt(summary_detail_create_date.split("-")[1])]} ${
          parseInt(summary_detail_create_date.split("-")[0]) + 543
        }`;

        self.receipt_data[index].summary_detail_date = summary_detail_date_thai;
        self.receipt_data[
          index
        ].summary_detail_create_date = summary_detail_create_date;
      });
    },
    get_summary() {
      const self = this;
      axios
        .post(this.$store.state.url + "/summaryRouters/get_summary")
        .then((res) => {
          self.summary_data = [];
          res.data.results.forEach(function (element, index) {
            self.summary_data.push({
              key: index + 1,
              summary_id: element.summary_id,
              summary_total: element.summary_total,
              summary_total_calculate: element.summary_total_calculate,
              summary_total_around: element.summary_total_around,
              summary_total_extra: element.summary_total_extra,
              summary_bonus: element.summary_bonus,
              summary_salary: element.summary_salary,
              summary_lesson: element.summary_lesson,
              summary_create_by: element.summary_create_by,
              summary_create_date: element.summary_create_date,

              schedule_per_credit: element.schedule_per_credit,
              schedule_start_date: element.schedule_start_date,
              schedule_name: element.schedule_name,
              schedule_id: element.schedule_id,
              summary_year: element.summary_year,
              person_name: element.person_name,
              position_name: element.position_name,
              person_address: element.person_address,
              provinces_name: element.provinces_name,
              amphures_name: element.amphures_name,
              districts_name: element.districts_name,
              zip_code: element.zip_code,
            });
          });

          this.getdateThai_summary_data();
          console.log(self.summary_data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    exportPDF(summary_id) {
      const self = this;
      // get data to export_data
      self.summary_data.forEach((data) => {
        if (summary_id == data.summary_id) {
          self.export_data = data;
        }
      });

      console.log(self.export_data);

      axios
        .post(
          this.$store.state.url +
            "/summaryRouters/get_summary_detail_by_summary_id",
          { summary_id: summary_id }
        )
        .then((res) => {
          self.receipt_data = res.data.results;
          console.log(self.receipt_data);
          this.genDate();
        })
        .catch((err) => {
          console.error(err);
        });

      pdfMake.vfs = pdfFonts.pdfMake.vfs; // 2. set vfs pdf font
      pdfMake.fonts = {
        THSarabunPsk: {
          normal: "THSarabun.ttf",
          bold: "THSarabun-Bold.ttf",
          italics: "THSarabu-Italic.ttf",
          bolditalics: "THSarabun-Bold-Italic.ttf",
        },
      };

      const Receipt = {
        pageSize: "A4",

        info: {
          title: "บ.๑๔",
          author: "666",
          subject: "Receipt",
          keywords: "Receipt",
        },

        content: [
          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              // headerRows: 1,
              // widths: [505],
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                250,
                20,
                150,
              ],
              widths: [355, 80, 50],
              headerRows: 1,

              body: [
                [
                  {
                    border: [true, true, false, false],
                    // if you specify width, image will scale proportionally
                    text:
                      "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/buu_logo_thai.jpg",
                    width: 150,
                    opacity: 0.5,

                    style: "images",
                    alignment: "center",
                    colSpan: 2,
                  },
                  {},
                  {
                    border: [false, true, true, false],
                    text: "(บ.๑๔)",
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 6, 10, 0],
                  },
                ],
                [
                  {
                    border: [true, false, true, false],
                    text: "ใบสำคัญรับเงิน",
                    style: "header",
                    colSpan: 3,
                    alignment: "center",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [5, 5, 5, 15],
                    text:
                      "วันที่ ............................................................",
                    colSpan: 3,
                    alignment: "right",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [20, 5, 5, 0],
                    text: "ข้าพเจ้าชื่อ  " + self.export_data.person_name,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text:
                      self.export_data.person_address +
                      " ตำบล " +
                      self.export_data.districts_name +
                      " อำเภอ " +
                      self.export_data.amphures_name +
                      " จังหวัด " +
                      self.export_data.provinces_name +
                      " " +
                      self.export_data.zip_code,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text: "ได้รับเงินจากมหาวิทยาลัยบูรพา ดังรายการต่อไปนี้",
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],

                [
                  {
                    text: "รายการ",
                    style: "tableHeader",
                    rowSpan: 2,
                    alignment: "center",
                  },
                  {
                    text: "จำนวนเงิน",
                    colSpan: 2,
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {},
                ],
                [
                  {},
                  { text: "บาท", style: "tableHeader", alignment: "center" },
                  { text: "สตางค์", style: "tableHeader", alignment: "center" },
                ],
                [
                  {
                    text:
                      "ค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ปีการศึกษา " +
                      self.export_data.summary_year +
                      "\n" +
                      "งวด 1 ( " +
                      self.receipt_data[0].summary_detail_date +
                      " )",
                  },
                  {
                    text: self.receipt_data[0].summary_detail_seq,
                    alignment: "center",
                  },
                  { text: "-", alignment: "center" },
                ],
                [
                  { text: "รวมเงิน", alignment: "right", style: "tableHeader" },
                  {
                    text: self.receipt_data[0].summary_detail_seq,
                    alignment: "center",
                    style: "tableHeader",
                  },
                  { text: "-", alignment: "center", style: "tableHeader" },
                ],
                [
                  {
                    alignment: "center",
                    margin: [15, 15],
                    colSpan: 3,
                    text:
                      "จำนวนเงิน (ตัวอักษร)   .....................................................................................\n\n\n(ลงชื่อ) ...................................................................(ผู้รับเงิน)\n\n\n  (ลงชื่อ) ...................................................................(ผู้จ่ายเงิน)",
                  },
                  {},
                  {},
                ],
              ],
            },
          },
          {
            margin: [0, 50, 0, 0],
            columns: [
              {
                text: "หมายเหตุ",
                decoration: "underline",
                width: 160,
                margin: [110, 0, 0, 0],
              },
              {
                text:
                  "การใช้ใบสำคัญรับเงินเป็นไปตามระเบียบมหาวิทยาลัยบูรพาว่าด้วยการจ่ายเงินและวิธีการจ่ายเงิน",
                alignment: "left",

                width: 300,
              },
              {},
            ],
            pageBreak: "after",
          },
          // หน้าใหม่ 1
          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              // headerRows: 1,
              // widths: [505],
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                250,
                20,
                150,
              ],
              widths: [355, 80, 50],
              headerRows: 1,

              body: [
                [
                  {
                    border: [true, true, false, false],
                    // if you specify width, image will scale proportionally
                    text:
                      "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/buu_logo_thai.jpg",
                    width: 150,
                    opacity: 0.5,

                    style: "images",
                    alignment: "center",
                    colSpan: 2,
                  },
                  {},
                  {
                    border: [false, true, true, false],
                    text: "(บ.๑๔)",
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 6, 10, 0],
                  },
                ],
                [
                  {
                    border: [true, false, true, false],
                    text: "ใบสำคัญรับเงิน",
                    style: "header",
                    colSpan: 3,
                    alignment: "center",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [5, 5, 5, 15],
                    text:
                      "วันที่ ............................................................",
                    colSpan: 3,
                    alignment: "right",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [20, 5, 5, 0],
                    text: "ข้าพเจ้าชื่อ  " + self.export_data.person_name,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text:
                      self.export_data.person_address +
                      " ตำบล " +
                      self.export_data.districts_name +
                      " อำเภอ " +
                      self.export_data.amphures_name +
                      " จังหวัด " +
                      self.export_data.provinces_name +
                      " " +
                      self.export_data.zip_code,

                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text: "ได้รับเงินจากมหาวิทยาลัยบูรพา ดังรายการต่อไปนี้",
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],

                [
                  {
                    text: "รายการ",
                    style: "tableHeader",
                    rowSpan: 2,
                    alignment: "center",
                  },
                  {
                    text: "จำนวนเงิน",
                    colSpan: 2,
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {},
                ],
                [
                  {},
                  { text: "บาท", style: "tableHeader", alignment: "center" },
                  { text: "สตางค์", style: "tableHeader", alignment: "center" },
                ],
                [
                  {
                    text:
                      "ค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ปีการศึกษา " +
                      self.export_data.summary_year +
                      "\n" +
                      "งวด 2 ( " +
                      self.receipt_data[1].summary_detail_date +
                      " )",
                  },
                  {
                    text: self.receipt_data[1].summary_detail_seq,
                    alignment: "center",
                  },
                  { text: "-", alignment: "center" },
                ],
                [
                  { text: "รวมเงิน", alignment: "right", style: "tableHeader" },
                  {
                    text: self.receipt_data[1].summary_detail_seq,
                    alignment: "center",
                    style: "tableHeader",
                  },
                  { text: "-", alignment: "center", style: "tableHeader" },
                ],
                [
                  {
                    alignment: "center",
                    margin: [15, 15],
                    colSpan: 3,
                    text:
                      "จำนวนเงิน (ตัวอักษร)   .....................................................................................\n\n\n(ลงชื่อ) ...................................................................(ผู้รับเงิน)\n\n\n  (ลงชื่อ) ...................................................................(ผู้จ่ายเงิน)",
                  },
                  {},
                  {},
                ],
              ],
            },
          },
          {
            margin: [0, 50, 0, 0],
            columns: [
              {
                text: "หมายเหตุ",
                decoration: "underline",
                width: 160,
                margin: [110, 0, 0, 0],
              },
              {
                text:
                  "การใช้ใบสำคัญรับเงินเป็นไปตามระเบียบมหาวิทยาลัยบูรพาว่าด้วยการจ่ายเงินและวิธีการจ่ายเงิน",
                alignment: "left",

                width: 300,
              },
              {},
            ],
            pageBreak: "after",
          },
          // หน้าใหม่ 2

          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              // headerRows: 1,
              // widths: [505],
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                250,
                20,
                150,
              ],
              widths: [355, 80, 50],
              headerRows: 1,

              body: [
                [
                  {
                    border: [true, true, false, false],
                    // if you specify width, image will scale proportionally
                    text:
                      "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/buu_logo_thai.jpg",
                    width: 150,
                    opacity: 0.5,

                    style: "images",
                    alignment: "center",
                    colSpan: 2,
                  },
                  {},
                  {
                    border: [false, true, true, false],
                    text: "(บ.๑๔)",
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 6, 10, 0],
                  },
                ],
                [
                  {
                    border: [true, false, true, false],
                    text: "ใบสำคัญรับเงิน",
                    style: "header",
                    colSpan: 3,
                    alignment: "center",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [5, 5, 5, 15],
                    text:
                      "วันที่ ............................................................",
                    colSpan: 3,
                    alignment: "right",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [20, 5, 5, 0],
                    text: "ข้าพเจ้าชื่อ  " + self.export_data.person_name,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text:
                      self.export_data.person_address +
                      " ตำบล " +
                      self.export_data.districts_name +
                      " อำเภอ " +
                      self.export_data.amphures_name +
                      " จังหวัด " +
                      self.export_data.provinces_name +
                      " " +
                      self.export_data.zip_code,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text: "ได้รับเงินจากมหาวิทยาลัยบูรพา ดังรายการต่อไปนี้",
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],

                [
                  {
                    text: "รายการ",
                    style: "tableHeader",
                    rowSpan: 2,
                    alignment: "center",
                  },
                  {
                    text: "จำนวนเงิน",
                    colSpan: 2,
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {},
                ],
                [
                  {},
                  { text: "บาท", style: "tableHeader", alignment: "center" },
                  { text: "สตางค์", style: "tableHeader", alignment: "center" },
                ],
                [
                  {
                    text:
                      "ค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ปีการศึกษา " +
                      self.export_data.summary_year +
                      "\n" +
                      "งวด 3 ( " +
                      self.receipt_data[2].summary_detail_date +
                      " )",
                  },
                  {
                    text: self.receipt_data[2].summary_detail_seq,
                    alignment: "center",
                  },
                  { text: "-", alignment: "center" },
                ],
                [
                  { text: "รวมเงิน", alignment: "right", style: "tableHeader" },
                  {
                    text: self.receipt_data[2].summary_detail_seq,
                    alignment: "center",
                    style: "tableHeader",
                  },
                  { text: "-", alignment: "center", style: "tableHeader" },
                ],
                [
                  {
                    alignment: "center",
                    margin: [15, 15],
                    colSpan: 3,
                    text:
                      "จำนวนเงิน (ตัวอักษร)   .....................................................................................\n\n\n(ลงชื่อ) ...................................................................(ผู้รับเงิน)\n\n\n  (ลงชื่อ) ...................................................................(ผู้จ่ายเงิน)",
                  },
                  {},
                  {},
                ],
              ],
            },
          },
          {
            margin: [0, 50, 0, 0],
            columns: [
              {
                text: "หมายเหตุ",
                decoration: "underline",
                width: 160,
                margin: [110, 0, 0, 0],
              },
              {
                text:
                  "การใช้ใบสำคัญรับเงินเป็นไปตามระเบียบมหาวิทยาลัยบูรพาว่าด้วยการจ่ายเงินและวิธีการจ่ายเงิน",
                alignment: "left",

                width: 300,
              },
              {},
            ],
            pageBreak: "after",
          },
          // หน้าใหม่ 3
          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              // headerRows: 1,
              // widths: [505],
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                250,
                20,
                150,
              ],
              widths: [355, 80, 50],
              headerRows: 1,

              body: [
                [
                  {
                    border: [true, true, false, false],
                    // if you specify width, image will scale proportionally
                    text:
                      "https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/buu_logo_thai.jpg",
                    width: 150,
                    opacity: 0.5,

                    style: "images",
                    alignment: "center",
                    colSpan: 2,
                  },
                  {},
                  {
                    border: [false, true, true, false],
                    text: "(บ.๑๔)",
                    style: "tableHeader",
                    alignment: "right",
                    margin: [0, 6, 10, 0],
                  },
                ],
                [
                  {
                    border: [true, false, true, false],
                    text: "ใบสำคัญรับเงิน",
                    style: "header",
                    colSpan: 3,
                    alignment: "center",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [5, 5, 5, 15],
                    text:
                      "วันที่ ............................................................",
                    colSpan: 3,
                    alignment: "right",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [20, 5, 5, 0],
                    text: "ข้าพเจ้าชื่อ  " + self.export_data.person_name,
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text:
                      self.export_data.person_address +
                      " ตำบล " +
                      self.export_data.districts_name +
                      " อำเภอ " +
                      self.export_data.amphures_name +
                      " จังหวัด " +
                      self.export_data.provinces_name +
                      " " +
                      self.export_data.zip_code,

                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],
                [
                  {
                    border: [true, false, true, false],
                    margin: [0, 0, 0, 5],
                    text: "ได้รับเงินจากมหาวิทยาลัยบูรพา ดังรายการต่อไปนี้",
                    colSpan: 3,
                    alignment: "left",
                  },
                  {},
                  {},
                ],

                [
                  {
                    text: "รายการ",
                    style: "tableHeader",
                    rowSpan: 2,
                    alignment: "center",
                  },
                  {
                    text: "จำนวนเงิน",
                    colSpan: 2,
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {},
                ],
                [
                  {},
                  { text: "บาท", style: "tableHeader", alignment: "center" },
                  { text: "สตางค์", style: "tableHeader", alignment: "center" },
                ],
                [
                  {
                    text:
                      "ค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ปีการศึกษา " +
                      self.export_data.summary_year +
                      "\n" +
                      "งวด 4 ( " +
                      self.receipt_data[3].summary_detail_date +
                      " )",
                  },
                  {
                    text: self.receipt_data[3].summary_detail_seq,
                    alignment: "center",
                  },
                  { text: "-", alignment: "center" },
                ],
                [
                  { text: "รวมเงิน", alignment: "right", style: "tableHeader" },
                  {
                    text: self.receipt_data[3].summary_detail_seq,
                    alignment: "center",
                    style: "tableHeader",
                  },
                  { text: "-", alignment: "center", style: "tableHeader" },
                ],
                [
                  {
                    alignment: "center",
                    margin: [15, 15],
                    colSpan: 3,
                    text:
                      "จำนวนเงิน (ตัวอักษร)   .....................................................................................\n\n\n(ลงชื่อ) ...................................................................(ผู้รับเงิน)\n\n\n  (ลงชื่อ) ...................................................................(ผู้จ่ายเงิน)",
                  },
                  {},
                  {},
                ],
              ],
            },
          },
          {
            margin: [0, 50, 0, 0],
            columns: [
              {
                text: "หมายเหตุ",
                decoration: "underline",
                width: 160,
                margin: [110, 0, 0, 0],
              },
              {
                text:
                  "การใช้ใบสำคัญรับเงินเป็นไปตามระเบียบมหาวิทยาลัยบูรพาว่าด้วยการจ่ายเงินและวิธีการจ่ายเงิน",
                alignment: "left",

                width: 300,
              },
              {},
            ],
            pageBreak: "after",
          },
          // หน้าใหม่ 4
          {
            columns: [
              {
                text: "รูป",
                margin: [20, 0, 0, 0],
                width: 160,
              },
              {
                text: "บันทึกข้อความ",
                style: "header",
                alignment: "left",
                margin: [50, 0, 0, 0],
              },
            ],
          },
          {
            margin: [0, 50, 0, 0],
            columns: [
              {
                text: "ส่วนงาน",
                style: "bold",
                width: 50,
              },
              {
                text: "คณะวิทยาการสารสนเทศ สำนักงานคณบดี โทร 3060",
                alignment: "left",
                margin: [10, 0, 0, 0],
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                text: "ที่",
                style: "bold",
                width: 50,
              },
              {
                text: "อว 8113.1/",
                alignment: "left",
                margin: [10, 0, 0, 0],
                width: 305,
              },
              {
                text: "วันที่",
                style: "bold",
                width: 50,
              },
              {
                text: self.export_data.summary_create_date,
                alignment: "left",
                margin: [8, 0, 0, 0],
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                text: "เรื่อง",
                style: "bold",
                width: 50,
              },
              {
                text:
                  "ขออนุมัติเบิกค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ประจำภาคต้น ปีการศึกษา " +
                  self.export_data.summary_year,
                alignment: "left",
                margin: [10, 0, 0, 0],
              },
            ],
          },
          {
            margin: [0, 20, 0, 0],
            columns: [
              {
                text: "เรียน",
                style: "bold",
                width: 50,
              },
              {
                text: "คณบดีคณะวิทยาการสารสนเทศ",
                alignment: "left",
                margin: [10, 0, 0, 0],
              },
            ],
          },

          {
            margin: [0, 35, 0, 0],
            text:
              "ตามที่ " +
              self.export_data.person_name +
              "    ส่งภาระงานเพื่อประกอบการเบิกจ่ายค่าตอบแทนสอนเกินเกณฑ์\n ประจำภาคต้น ปีการศึกษา " +
              self.export_data.summary_year +
              " นั้น ดังนั้นเพื่อให้การเบิกจ่ายค่าตอบแทนสอนเกินเกณฑ์เป็นไปด้วยความเรียบร้อยงานการเงินคณะวิทยาการสารสนเทศ \nจึงเรียนมาเพื่อขออนุมัติเบิกค่าตอบแทนสอนเกินเกณฑ์ภาระงาน ประจำภาคต้น ปีการศึกษา " +
              self.export_data.summary_year +
              " งวดที่ 4 (เดือน " +
              self.receipt_data[3].summary_detail_date +
              ") ตามประกาศคณะวิทยาการสารสนเทศ เรื่อง " +
              self.export_data.schedule_name +
              "\n พ.ศ. " +
              self.export_data.schedule_start_date +
              " และที่แก้ไขเพิ่มเติม รายละเอียดดังนี้",
            alignment: "left",
          },
          {
            margin: [0, 25, 0, 0],
            table: {
              heights: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
              ],
              widths: [30, 200, 55, 60, 65, 62],
              body: [
                [
                  {
                    text: "ลำดับ",
                    style: "tableHeader",
                  },
                  {
                    text: "ชื่อ-สกุล",
                    style: "tableHeader",
                  },
                  {
                    text: "จำนวนที่เบิกได้\n(หน่วยกิต)",
                    style: "tableHeader",
                  },
                  {
                    text: "อัตรา/\n(หน่วยกิต)",
                    style: "tableHeader",
                  },
                  {
                    text: "รวมเป็นเงิน\n15 สัปดาห์",
                    style: "tableHeader",
                  },
                  {
                    text: "จำนวนเงิกที่เบิกแบ่งจ่าย4งวด\n(งวด4)",
                    style: "tableHeader",
                  },
                ],
                [
                  { text: "1", alignment: "center" },
                  { text: self.export_data.person_name },
                  { text: self.export_data.summary_bonus, style: "number" },
                  {
                    text: self.export_data.schedule_per_credit,
                    style: "number",
                  },
                  { text: self.export_data.summary_salary, style: "number" },
                  { text: self.export_data.summary_lesson, style: "number" },
                ],
                [
                  {
                    colSpan: 2,
                    text: "รวมเป็นเงิน",
                    style: "tableHeader",
                    alignment: "right",
                  },
                  {},

                  {
                    text: self.export_data.summary_bonus,
                    style: ["tableHeader", "number"],
                  },
                  {
                    text: self.export_data.schedule_per_credit,
                    style: ["tableHeader", "number"],
                  },
                  {
                    text: self.export_data.summary_salary,
                    style: ["tableHeader", "number"],
                  },
                  {
                    text: self.export_data.summary_lesson,
                    style: ["tableHeader", "number"],
                  },
                ],
              ],
            },
          },
          {
            margin: [0, 35, 0, 0],
            alignment: "center",
            text:
              "จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ โดยเบิกจากเงินรายได้ แผนงานจัดการจัดศึกษาอุดมศึกษา งานจัดการศึกษาระดับปริญญาตรีด้านวิทยาศาสตร์และเทคโนโลยี ",
          },
          {
            margin: [0, 5, 0, 0],
            text:
              "งบดำเนินงาน หมวดค่าตอบแทนใช้สอยและวัสดุ เป็นเงิน " +
              self.export_data.summary_lesson +
              " บาท",
          },
          {
            margin: [0, 70, 70, 0],
            text:
              "................................................................",
            alignment: "right",
          },
          {
            margin: [0, 5, 90, 0],
            alignment: "right",
            text: "(นางสาวหรรษา รอดเงิน)",
          },
          {
            margin: [0, 5, 90, 0],
            alignment: "right",
            text: "นักวิชาการเงินและบัญชี",
          },
          {
            margin: [65, 70, 0, 0],
            text: "อนุมัติ",
            alignment: "left",
          },
          {
            margin: [25, 40, 0, 0],
            text:
              "..............................................................",
            alignment: "left",
          },
          {
            margin: [28, 5, 0, 0],
            text: "(ผู้ช่วยศาสตราจารย์กฤษณะ ชินสาร)",
            alignment: "left",
          },
          {
            margin: [30, 5, 0, 0],
            text: "คณบดีคณะวิทยาการสารสนเทศ",
            alignment: "left",
          },
          {
            pageOrientation: "landscape",
            pageBreak: "before",
            alignment: "center",
            text:
              "สรุปภาระงานสอนเพื่อการจ่ายค่าตอบแทนของคณาจารย์ประจำคณะวิทยาการสารสนเทศ\nภาคต้น ปีการศึกษา " +
              self.export_data.summary_year,
          },
          {
            alignment: "left",
            text: "ชื่อ - สกุล " + self.export_data.person_name,
          },
          {
            style: "bold",
            text:
              ".................................................................................................................................................................................................................................................................................................................................................................................",
          },
          {
            margin: [0, 10, 0, 0],
            table: {
              widths: [
                100,
                25,
                100,
                40,
                30,
                30,
                60,
                30,
                30,
                30,
                30,
                30,
                30,
                30,
                30,
                // 15 col
              ],
              headerRows: 3,
              // keepWithHeaderRows: 1,
              body: [
                [
                  {
                    text: "หมวดวิชา / รหัสวิชา",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 3,
                  },

                  {
                    text: "หน่วยกิต",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 3,
                  },
                  {
                    text: "วัน-เวลา",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 3,
                  },
                  {
                    text: "กลุ่ม",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 3,
                  },
                  {
                    text: "จำนวนหน่วยกิต",
                    style: "headersmall",
                    alignment: "center",
                    colSpan: 2,
                  },
                  {},
                  {
                    text: "จำนวนนิสิตที่ลงทะเบียน\nเรียนในรายวิชา",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 3,
                  },
                  {
                    text: "จำนวนกลุ่มที่สอน",
                    style: "headersmall",
                    alignment: "center",
                    colSpan: 2,
                  },
                  {},
                  {
                    text: "ภาระงาน",
                    style: "headersmall",
                    alignment: "center",
                    colSpan: 3,
                  },
                  {},
                  {},
                  {
                    text: "ภาระงานรวม(นก)",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 3,
                  },
                  {
                    text: "สัดส่วน\nภาระงาน\nที่สอน\n(สัปดาห์)",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 3,
                  },
                  {
                    text: "ภาระงาน\nรวมที่ได้\nตามสัดส่วน\nการสอน(นก)",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 3,
                  },
                ],
                // row 2
                [
                  {},
                  {},
                  {},
                  {},
                  {
                    text: "บรรยาย",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 2,
                  },
                  {
                    text: "lab",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 2,
                  },
                  {},
                  {
                    text: "บรรยาย",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 2,
                  },
                  {
                    text: "lab",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 2,
                  },
                  {
                    text: "ภาระงานพื้นฐาน",
                    style: "headersmall",
                    alignment: "center",
                    rowSpan: 2,
                  },
                  {
                    text: "ภาระงานตรวจงาน",
                    style: "headersmall",
                    alignment: "center",
                    colSpan: 2,
                  },

                  {
                    text: "ภาระงาน",
                    style: "headersmall",
                    alignment: "center",
                  },
                  {},
                  {
                    text: "สัดส่วนภาระงานที่สอน(สัปดาห์)",
                    style: "headersmall",
                    alignment: "center",
                  },
                  {
                    text: "ภาระงานรวมที่ได้ตามสัดส่วนการสอน(นก)",
                    style: "headersmall",
                    alignment: "center",
                  },
                ],
                // ROw3
                [
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {
                    text: "ชั่วโมง\nบรรยาย",
                    style: "headersmall",
                    alignment: "center",
                  },
                  {
                    text: "ชั่วโมง \nlab",
                    style: "headersmall",
                    alignment: "center",
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: "รายวิชาของคณะ(ระดับปริญญาตรี)",
                    style: "headersmall",
                    alignment: "left",
                    colSpan: 15,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: "Lecture + lab 3 ชั่วโมง",
                    style: "headersmall",
                    alignment: "left",
                    colSpan: 15,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: "88814259",
                    style: "fontsmall",
                    alignment: "center",
                  },
                  { text: "1(0-3-6)", style: "fontsmall", alignment: "center" },
                  {
                    text: "Lab WE 17:00-19:50 IF-3C04",
                    style: "fontsmall",
                    alignment: "center",
                  },
                  { text: "3+4", style: "fontsmall", alignment: "center" },
                  { text: "-", style: "fontsmall", alignment: "center" },
                  { text: "1", style: "fontsmall", alignment: "center" },
                  { text: "31", style: "fontsmall", alignment: "center" },
                  { text: "-", style: "fontsmall", alignment: "center" },
                  { text: "1", style: "fontsmall", alignment: "center" },
                  { text: "1.25", style: "fontsmall", alignment: "center" },
                  { text: "0", style: "fontsmall", alignment: "center" },
                  { text: "0.02", style: "fontsmall", alignment: "center" },
                  { text: "1.27", style: "fontsmall", alignment: "center" },
                  { text: "1.5", style: "fontsmall", alignment: "center" },
                  { text: "1.27", style: "fontsmall", alignment: "center" },
                ],
                [
                  {
                    border: [false, true, true, false],
                    text: "รวมภาระงานสอน",
                    style: "headersmall",
                    alignment: "left",
                    colSpan: 12,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  { text: "13.71", style: "headersmall", alignment: "center" },
                  {},
                  { text: "13.71", style: "headersmall", alignment: "center" },
                ],
                [
                  {
                    border: [false, false, true, false],
                    text: "รวมภาระงานสอน(ปัดเศษ) ข้อ 8",
                    style: "headersmall",
                    alignment: "left",
                    colSpan: 12,
                  },
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  {},
                  { text: "13.50", style: "headersmall", alignment: "center" },
                  {},
                  { text: "13.50", style: "headersmall", alignment: "center" },
                ],
              ],
            },
          },
          {
            pageBreak: "before",
            text: "สรุปภาระงาน",
            bold: true,
            alignment: "left",
            decoration: "underline",
          },
          {
            margin: [0, 15, 0, 0],
            text: "ตามประกาศคณะวิทยาการสารสนเทศ ที่ 0045/2563",
            bold: true,
            alignment: "left",
          },
          {
            margin: [0, 15, 0, 0],
            text:
              "เรื่อง " +
              self.export_data.schedule_name +
              " พ.ศ. " +
              self.export_data.summary_year,
            bold: true,
            alignment: "left",
          },
          {
            margin: [0, 15, 0, 0],
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: 50,
                text: "1)",
                alignment: "right",
              },
              {
                margin: [10, 0, 0, 0],
                width: 250,
                text: "รวมภาระงานสอบ(ปัดเศษ) ข้อ 8",
                alignment: "left",
              },
              {
                width: 100,
                text: self.export_data.summary_total_calculate,
                alignment: "center",
              },
              {
                width: 100,
                text: "หน่วยกิต",
                alignment: "left",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: 50,
                text: "2)",
                alignment: "right",
              },
              {
                margin: [10, 0, 0, 0],
                width: 250,
                text: "หัก ภาระงานขั้นต่ำ",
                alignment: "left",
              },
              {
                width: 100,
                text: self.export_data.summary_total_around,
                alignment: "center",
                decoration: "underline",
              },
              {
                width: 100,
                text: "หน่วยกิต",
                alignment: "left",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: 50,
                text: "3)",
                alignment: "right",
              },
              {
                margin: [10, 0, 0, 0],
                width: 250,
                text: "หัก ภาระงาน Extra workload",
                alignment: "left",
              },
              {
                width: 100,
                text: self.export_data.summary_total_extra,
                alignment: "center",
                decoration: "underline",
              },
              {
                width: 100,
                text: "หน่วยกิต",
                alignment: "left",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                // auto-sized columns have their widths based on their content
                width: 50,
                text: "4)",
                alignment: "right",
              },
              {
                margin: [10, 0, 0, 0],
                width: 250,
                text: "รวมภาระงานที่สามารถเบิกค่าตอบแทน",
                alignment: "left",
              },
              {
                width: 100,
                text: self.export_data.summary_bonus,
                alignment: "center",
                decoration: "underline",
              },
              {
                width: 100,
                text: "หน่วยกิต",
                alignment: "left",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                width: 50,
                text: "",
              },
              {
                width: 250,
                text:
                  "ค่าสอน หน่วยกิตละ " +
                  self.export_data.summary_total_extra +
                  "บาท จำนวน 15 สัปดาห์ เป็นเงิน  ",
              },
              {
                width: 100,
                text: self.export_data.summary_salary + "  บาท",
                alignment: "center",
              },
              {
                width: 100,
                text: "แบ่งจ่ายเป็น 4 งวด ",
                alignment: "left",
              },
              {
                text: self.export_data.summary_lesson + " บาท",
                alignment: "center",
              },
            ],
          },
          {
            margin: [0, 10, 0, 0],
            columns: [
              {
                width: 50,
                text: "",
              },
              {
                text:
                  "ข้าพเจ้าขอรับรองว่าได้ตรวจสอบข้อมูลข้างต้นแล้วและขอรับรองว่าข้อมูลดังกล่าวเป็นจริง",
              },
            ],
          },
          {
            margin: [0, 25, 100, 0],
            alignment: "right",
            text:
              "ลงชื่อ   ....................................................................................",
          },
          {
            margin: [0, 5, 130, 0],
            alignment: "right",
            text: "(        " + self.export_data.person_name + "        )",
          },
          {
            margin: [0, 25, 100, 0],
            alignment: "right",
            text:
              "ลงชื่อ   ....................................................................................",
          },
          {
            margin: [0, 5, 135, 0],
            alignment: "right",
            text: "(       นางสาวหรรษา รอดเงิน       )",
          },
          {
            margin: [0, 25, 100, 0],
            alignment: "right",
            text:
              "ลงชื่อ   ....................................................................................",
          },
          {
            margin: [0, 5, 125, 0],
            alignment: "right",
            text: "(       อาจารย์เบญจภรณ์ จันทรกองกุล       )",
          },
          {
            margin: [360, 5, 0, 0],
            alignment: "center",
            text: "รองคณบดี\nผู้รับรอง",
          },
          {
            alignment: "left",
            margin: [45, 10, 0, 0],
            text: "อนุมัติ",
          },
          {
            margin: [0, 20, 0, 0],
            alignment: "left",
            text:
              "...............................................................",
          },
          {
            margin: [0, 5, 0, 0],
            alignment: "left",
            text: "(ผู้ช่วยศาสตราจารย์กฤษณะ ชินสาร)",
          },
          {
            margin: [10, 5, 0, 0],
            alignment: "left",
            text: "คณบดีคณะวิทยาการสารสนเทศ",
          },
        ],

        styles: {
          fontsmall: {
            fontSize: 8,
            color: "black",
            alignment: "center",
          },
          headersmall: {
            bold: true,
            fontSize: 8,
            color: "black",
            alignment: "center",
          },
          number: {
            alignment: "right",
          },
          images: {
            margin: [25, 30, 25, 25],
          },
          tab: {
            margin: [15, 0, 0, 0],
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "black",
            alignment: "center",
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
          header: {
            fontSize: 20,
            bold: true,
          },
          bold: {
            bold: true,
          },
          anotherStyle: {
            italics: true,
            alignment: "right",
          },
        },

        defaultStyle: {
          font: "THSarabunPsk",
        },
      };

      pdfMake.createPdf(Receipt).open({});
    },
  },
  created() {
    this.get_summary();
  },
};
</script>

<style scoped></style>
