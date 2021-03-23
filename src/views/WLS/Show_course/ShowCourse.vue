<template>
  <div id="content">
    <!-- Start panel -->
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="20" style="margin: 0.2em 0px">
              <a-card-meta title="รายชื่อวิชาทั้งหมดที่เปิดสอน">
                <a-icon
                  slot="avatar"
                  type="folder-open"
                  :style="{
                    fontSize: '150%',
                  }"
                />
              </a-card-meta>
            </a-col>
            <a-col :span="4" :style="{ textAlign: 'right' }">
              <a-tooltip>
                <template slot="title"> เพิ่มรายวิชา </template>
                <a-button
                  v-if="this.user_position == 1"
                  type="success"
                  icon="plus"
                  :style="{ marginRight: '3%' }"
                  @click="showModal"
                >
                  เพิ่มรายวิชา
                </a-button>
              </a-tooltip>
              <!-- <a-tooltip placement="top">
                <template slot="title">
                  <span>ส่งออกไฟล์ PDF</span>
                </template>
                <a-button
                  type="danger"
                  icon="file-pdf"
                  :style="{ marginRight: '3%' }"
                  @click="exportPDF()"
                />
              </a-tooltip> -->
              <!--
              <a-tooltip placement="top">
                <template slot="title">
                  <span>ส่งออกไฟล์ EXCEL</span>
                </template>
                <a-button
                  type="success"
                  icon="file-excel"
                  :style="{ marginRight: '3%' }"
                />
              </a-tooltip> -->
            </a-col>
          </a-row>
          <hr style="width: 100%" />
          <a-row :gutter="[8, 8]" type="flex" justify="end">
            <a-col :span="5" style="text-align: end">
              <a-input-search
                placeholder="ค้นหารหัสวิชา หรือ ชื่อวิชา"
                style="width: 100%"
              />
            </a-col>
          </a-row>
          <!-- End panel -->

          <!-- Table -->
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-table
                :columns="course_columns"
                :data-source="course_record"
                :pagination="false"
                size="small"
           
                bordered

                
              >
                <span slot="Action" slot-scope="record">
                  <a-tooltip>
                    <template slot="title"> ดูรายละเอียดรายวิชา </template>
                    <a-button
                      type="primary"
                      @click="get_course_detail(record.course_id)"
                      ><a-icon type="search" />
                    </a-button>
                  </a-tooltip>
                </span>
              </a-table>
            </a-col>
          </a-row>
          <!-- End Table -->
          <br />
          <a-row>
            <a-col :span="15">
              <p :style="{ margin: '0.3em 0.5%' }">1-10 จาก 10 รายการ</p>
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
              <a-pagination :style="{ display: 'inline' }" :page-size="10" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <!-- Start Modal Insert-->
    <div id="modal">
      <a-modal
        title="เพิ่มรายวิชา"
        :visible="modal_insert"
        :confirm-loading="confirmLoading"
      >
        <template slot="footer">
          <a-tooltip>
            <template slot="title"> ยกเลิก </template>
            <a-button key="back" @click="handleCancel"> ยกเลิก </a-button>
          </a-tooltip>
          <a-tooltip>
            <template slot="title"> บันทึกข้อมูล </template>
            <a-button
              key="submit"
              type="success"
              v-if="import_status"
              @click="handleSubmit"
            >
              บันทึก
            </a-button>
          </a-tooltip>
        </template>
        <a-row :gutter="[10, 50]">
          <a-col :span="24" :style="{ textAlign: 'center' }">
            <!-- <router-link :to="{ path: '/Show_course/InsertCourse' }"> -->
            <a-tooltip>
              <template slot="title"
                >ตัวอย่าง Format ที่ใช้ในการ Import</template
              >
              <a-button type="primary" style="width: 80%" @click="onExport">
                ตัวอย่าง Format ที่ใช้ในการ Import
              </a-button>
            </a-tooltip>
            <!-- <button @click="onExport">
              ตัวอย่าง Format ที่ใช้ในการ Import
            </button> -->
            <!-- </router-link> -->
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :offset="2">
            <span style="color: red">*</span
            ><span> หมายเหตุ : ประเภทรายวิชา 0 = ในคณะ 1 = ศึกษาทั่วไป</span
            ><br />
          </a-col>
          <a-col :span="24" :offset="6">
            <span> ผู้สอน = Username ของอาจารย์ผู้สอน</span><br />
          </a-col>
        </a-row>
        <br />
        <hr />
        <br />
        <a-row :gutter="[10, 10]">
          <a-col :span="6" :style="{ textAlign: 'end' }">
            <p style="margin-top: 5px">ภาคเรียนที่ :</p>
          </a-col>
          <a-col :span="3">
            <a-select v-model="select_course_term" style="width: 100%">
              <a-select-option value="1"> 1 </a-select-option>
              <a-select-option value="2"> 2 </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="6" :style="{ textAlign: 'end' }">
            <p style="margin-top: 5px">ปีการศึกษา :</p>
          </a-col>
          <a-col :span="6">
            <a-select
              default-value=""
              style="width: 100%"
              v-model="select_course_year"
            >
              <a-select-option value=""> โปรดเลือก </a-select-option>
              <a-select-option v-for="item in course_years" :key="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row :gutter="[10, 10]">
          <a-col :span="24" :style="{ textAlign: 'center' }">
            <input
              type="file"
              name="import_csv_file"
              id="import_csv_file"
              ref="import_csv_file"
              accept=".xlsx"
              @change="importExcel"
              hidden
            />
            <a-button
              style="width: 80%"
              icon="upload"
              type="file"
              @click="upload_file_click"
            >
              Upload file Excel
            </a-button>
          </a-col>
        </a-row>
        <a-row :gutter="[10, 10]">
          <a-col :span="24" :style="{ textAlign: 'center' }">
            <p>{{ import_filename }}</p>
          </a-col>
        </a-row>
      </a-modal>
      <!-- End Modal Insert -->

      <!-- Start Modal Detail -->
      <a-modal
        v-model="modal_detail"
        title="รายละเอียดวิชา"
        on-ok="handleOk"
        width="900px"
      >
        <template slot="footer">
          <a-button key="back" @click="handleCanceldetail"> ยกเลิก </a-button>
        </template>
        <a-table
          :columns="course_detail_columns"
          :data-source="course_detail_data"
              size="small"
        >
          <span slot="expandedRowRender" slot-scope="record">
            <a-row
              :gutter="[8, 8]"
              v-for="(item, index) in record.section_date"
              :key="index"
            >
              <a-col :span="6">
                ห้องเรียน : {{ item.section_detail_room }}
              </a-col>
              <a-col :span="4">
                วันที่เรียน : {{ item.section_detail_day }}
              </a-col>
              <a-col :span="5">
                เวลาเรียน : {{ item.section_detail_start_time }} -
                {{ item.section_detail_end_time }}
              </a-col>
              <a-col :span="7">
                อาจารย์ : {{ item.prefix }}{{ item.name }} {{ item.lastname }}
              </a-col>
              <a-col :span="1">
                <a-tooltip>
                  <template slot="title"> แก้ไขรายละเอียดรายวิชา </template>
                  <a-button
                    type="warning"
                    @click="EditDetail(item.section_detail_id)"
                    ><a-icon type="edit"
                  /></a-button>
                </a-tooltip>
              </a-col>
            </a-row>
          </span>
          <!-- <span slot="Action" slot-scope="record">
            <a-button
              type="danger"
              @click="showDeleteConfirm(record.section_id)"
              ><a-icon type="close" />
            </a-button>
          </span> -->
        </a-table>
      </a-modal>
      <!-- End Modal Detail -->

      <!-- Modal Edit Detail -->
      <a-modal v-model="modal_edit_detail" title="Title" on-ok="handleOk">
        <template slot="footer">
          <a-tooltip>
            <template slot="title"> ยกเลิก </template>
            <a-button @click="colse_edit_edtail()"> ยกเลิก </a-button>
          </a-tooltip>
          <a-tooltip>
            <template slot="title"> บันทึกข้อมูล </template>
            <a-button
              type="success"
              @click="edit_section_detail()"
              v-if="data_section_detail_edit_room != ''"
            >
              บันทึก
            </a-button>
          </a-tooltip>
        </template>
        <a-row :gutter="[8, 8]">
          <a-col :span="6" :style="{ textAlign: 'end', marginTop: '3px' }"
            >วันสอน :
          </a-col>
          <a-col :span="6">
            <a-select
              style="width: 100%"
              default-value=""
              v-model="data_section_detail_edit_date"
            >
              <a-select-option value="MON"> MON </a-select-option>
              <a-select-option value="TUE"> TUE </a-select-option>
              <a-select-option value="WED"> WED </a-select-option>
              <a-select-option value="THU"> THU </a-select-option>
              <a-select-option value="FRI"> FRI </a-select-option>
              <a-select-option value="SAT"> SAT </a-select-option>
              <a-select-option value="SUN"> SUN </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="6" :style="{ textAlign: 'end', marginTop: '3px' }"
            >ห้องเรียน :
          </a-col>
          <a-col :span="6"
            ><a-input v-model="data_section_detail_edit_room"
          /></a-col>
        </a-row>
        <a-row :gutter="[8, 8]">
          <a-col :span="6" :style="{ textAlign: 'end', marginTop: '3px' }"
            >เวลาเริ่มเรียน :
          </a-col>
          <a-col :span="6"
            ><a-input v-model="data_section_detail_edit_start_time" type="time"
          /></a-col>
          <a-col :span="6" :style="{ textAlign: 'end', marginTop: '3px' }"
            >เวลาเลิกเรียน :
          </a-col>
          <a-col :span="6"
            ><a-input v-model="data_section_detail_edit_end_time" type="time"
          /></a-col>
        </a-row>
      </a-modal>
      <!-- End Modal Edit Detail -->
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx";
import Axios from "axios";
import pdfMake from "pdfmake";
import pdfFonts from "@/assets/fontsPDF/THSarabunPsk-fonts.js"; // 1. import custom fonts

export default {
  data() {
    return {
      data_store: [],
      self: this,
      user_position: 0,

      modal_edit_detail: false,
      modal_detail: false,
      modal_insert: false,
      confirmLoading: false,

      select_course_year: "", //Select Import file
      select_course_term: 1, //Select Import file

      import_filename: "",
      import_status: false,
      data_course_import: [],

      course_years: [],
      course_detail_record: [],
      course_record: [],
      course_columns: [
        {
          title: "รหัสวิชา",
          dataIndex: "course_code",
          key: "course_code",
          width: "5%",
          scopedSlots: {
            customRender: "course_code",
          },
          type: "flex",
          align: "center",
        },
        {
          title: "หลักสูตร (ปี พ.ศ.)",
          dataIndex: "course_year",
          key: "course_year",
          width: "5%",
          scopedSlots: {
            customRender: "course_year",
          },
          type: "flex",
          align: "center",
        },
        {
          title: "ชื่อวิชา",
          dataIndex: "course_name",
          key: "course_name",
          width: "10%",
          scopedSlots: {
            customRender: "course_name",
          },
        },
        {
          title: "หน่วยกิต",
          dataIndex: "course_credit",
          key: "course_credit",
          width: "5%",
          scopedSlots: {
            customRender: "course_credit",
          },
          type: "flex",
          align: "center",
        },
        {
          title: "ดำเนินการ",
          width: "5%",
          scopedSlots: { customRender: "Action" },
          align: "center",
        },
      ],
      course_detail_columns: [
        {
          title: "กลุ่ม",
          dataIndex: "section_number",
          key: "section_number",
          width: "20%",
          scopedSlots: {
            customRender: "section_number",
          },
          type: "flex",
          align: "center",
        },
        {
          title: "ภาคเรียน",
          dataIndex: "section_term",
          key: "section_term",
          width: "20%",
          scopedSlots: {
            customRender: "section_term",
          },
          type: "flex",
          align: "center",
        },
        {
          title: "ปีการศึกษา",
          dataIndex: "section_year",
          key: "section_year",
          width: "20%",
          scopedSlots: {
            customRender: "section_year",
          },
          type: "flex",
          align: "center",
        },
        {
          title: "รายละเอียดกลุ่ม",
          dataIndex: "section_name",
          key: "section_name",
          width: "20%",
          scopedSlots: {
            customRender: "section_name",
          },
          type: "flex",
          align: "center",
        },
        {
          title: "จำนวนนักศึกษา",
          dataIndex: "section_student",
          key: "section_student",
          width: "20%",
          scopedSlots: {
            customRender: "section_student",
          },
          type: "flex",
          align: "center",
        },
      ],
      course_detail_data: [],

      course_detail_id: 0,
      data_section_detail_edit_id: 0,
      data_section_detail_edit_date: "",
      data_section_detail_edit_start_time: "",
      data_section_detail_edit_end_time: "",
      data_section_detail_edit_room: "",
      // ข้อมูล JSON ทีต้องการ Export
      json: [
        {
          รหัสวิชา: "88510059",
          ปีหลักสูตร: "2559",
          ชื่อวิชา: "Logical Thinking and Problem Solving for Innovation",
          หน่วยกิต: "2",
          หน่วยกิตบรรยาย: "1",
          หน่วยกิตปฏิบัติ: "2",
          หน่วยกิตเรียนรู้ด้วยตัวเอง: "3",
          ประเภทรายวิชา: "0",
          กลุ่ม: "1",
          จำนวนที่ลงทะเบียน: "92",
          รายละเอียดกลุ่มเรียน: "รหัส 63 วิศวกรรมซอฟแวร์",
          วัน: "TUE",
          เวลาเริ่มเรียน: "17:00",
          เวลาเลิกเรียน: "17:50",
          ห้อง: "ARR-เรียนออนไลน์",
          ผู้สอน: "adminIFs@buu.ac.th",
        },
        {
          รหัสวิชา: "",
          ปีหลักสูตร: "",
          ชื่อวิชา: "",
          หน่วยกิต: "",
          หน่วยกิตบรรยาย: "",
          หน่วยกิตปฏิบัติ: "",
          หน่วยกิตเรียนรู้ด้วยตัวเอง: "",
          ประเภทรายวิชา: "",
          กลุ่ม: "",
          จำนวนที่ลงทะเบียน: "",
          รายละเอียดกลุ่มเรียน: "",
          วัน: "WED",
          เวลาเริ่มเรียน: "17:00",
          เวลาเลิกเรียน: "17:50",
          ห้อง: "ARR-เรียนออนไลน์",
          ผู้สอน: "adminIFs@buu.ac.th",
        },
        {
          รหัสวิชา: "88510059",
          ปีหลักสูตร: "2559",
          ชื่อวิชา: "Logical Thinking and Problem Solving for Innovation",
          หน่วยกิต: "2",
          หน่วยกิตบรรยาย: "1",
          หน่วยกิตปฏิบัติ: "2",
          หน่วยกิตเรียนรู้ด้วยตัวเอง: "3",
          ประเภทรายวิชา: "0",
          กลุ่ม: "2",
          จำนวนที่ลงทะเบียน: "74",
          รายละเอียดกลุ่มเรียน: "รหัส 63 วิศวกรรมซอฟแวร์",
          วัน: "TUE",
          เวลาเริ่มเรียน: "17:00",
          เวลาเลิกเรียน: "17:50",
          ห้อง: "ARR-เรียนออนไลน์",
          ผู้สอน: "adminIFs@buu.ac.th",
        },
        {
          รหัสวิชา: "88510059",
          ปีหลักสูตร: "2559",
          ชื่อวิชา: "Logical Thinking and Problem Solving for Innovation",
          หน่วยกิต: "2",
          หน่วยกิตบรรยาย: "1",
          หน่วยกิตปฏิบัติ: "2",
          หน่วยกิตเรียนรู้ด้วยตัวเอง: "3",
          ประเภทรายวิชา: "0",
          กลุ่ม: "3",
          จำนวนที่ลงทะเบียน: "13",
          รายละเอียดกลุ่มเรียน: "รหัส 63 บัญชี",
          วัน: "TUE",
          เวลาเริ่มเรียน: "17:00",
          เวลาเลิกเรียน: "17:50",
          ห้อง: "ARR-เรียนออนไลน์",
          ผู้สอน: "adminIFs@buu.ac.th",
        },
        {
          รหัสวิชา: "88510159",
          ปีหลักสูตร: "2559",
          ชื่อวิชา: "Moving Forward in a Digital Society with ICT",
          หน่วยกิต: "3",
          หน่วยกิตบรรยาย: "2",
          หน่วยกิตปฏิบัติ: "2",
          หน่วยกิตเรียนรู้ด้วยตัวเอง: "5",
          ประเภทรายวิชา: "0",
          กลุ่ม: "23",
          จำนวนที่ลงทะเบียน: "80",
          รายละเอียดกลุ่มเรียน: "รหัส 62 บริหารท้องถิ่น เลือกกลุ่ม 21 - 24",
          วัน: "FRI",
          เวลาเริ่มเรียน: "17:00",
          เวลาเลิกเรียน: "17:50",
          ห้อง: "ARR-เรียนออนไลน์",
          ผู้สอน: "adminIFs@buu.ac.th",
        },
      ],
    };
  },
  methods: {
    onExport() {
      var wscols = [
        { wch: 10 },
        { wch: 10 },
        { wch: 40 },
        { wch: 8 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 10 },
        { wch: 20 },
        { wch: 25 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 35 },
      ];
      const dataWS = xlsx.utils.json_to_sheet(this.json);
      dataWS["!cols"] = wscols;
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, dataWS);
      xlsx.writeFile(wb, "Format_Import.xlsx");
    },
    colse_edit_edtail() {
      this.modal_edit_detail = false;
    },
    showDeleteConfirm(id) {
      let self = this;
      this.$confirm({
        title: "ต้องการลบกลุ่มเรียนที่ " + id + " ใช่หรือไม่ ?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          // console.log("OK");
          self.RemoveSection(id);
        },
        onCancel() {
          // console.log("Cancel");
        },
      });
    },
    showModal() {
      this.modal_insert = true;
    },
    handleCanceldetail() {
      this.modal_detail = false;
    },
    handleCancel() {
      // console.log("Clicked cancel button");

      this.modal_insert = false;

      this.import_status = false;
      this.import_filename = "";
      this.$refs.import_csv_file.value = null;
    },
    handleSubmit() {
      var self = this;
      if (self.select_course_year == "" || self.select_course_term == "") {
        this.$warning({
          title: "โปรดเลือกปีการศึกษา",
        });
      } else {
        this.Insert_course();
        this.modal_insert = false;
        this.import_status = false;
        this.import_filename = "";
        this.$refs.import_csv_file.value = null;
        self.select_course_year = "";

        location.reload();
      }
    },
    upload_file_click() {
      // console.log(123);
      this.$refs.import_csv_file.click();
    },
    Years_course() {
      var j = 0;
      for (var i = 10; i > -1; i--) {
        if (i == 10) {
          this.course_years.push(new Date().getFullYear() + 543);
        } else {
          this.course_years.push(new Date().getFullYear() - j + 543);
        }
        j++;
      }
      // console.log(this.course_years);
    },
    importExcel(e) {
      const self = this;
      const files = e.target.files;
      // console.log(files);
      // console.log(files[0].name);

      if (!files.length) {
        return;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return alert(
          "The upload format is incorrect. Please upload xls or xlsx format"
        );
      }
      const fileReader = new FileReader();
      self.data_course_import = [];
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const XLSX = xlsx;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0]; // Take the first sheet，wb.SheetNames[0] :Take the name of the first sheet in the sheets
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // Generate JSON table content，wb.Sheets[Sheet名]    Get the data of the first sheet
          // console.log(ws);
          // Edit data
          var course_code = []; //จัดข้อมูล
          ws.forEach(function (ele, index) {
            let findindex = course_code.findIndex(
              (element) => parseInt(element) === parseInt(ele.รหัสวิชา)
            );
            if ((findindex === -1 && ele.รหัสวิชา) || index === 0) {
              course_code.push(ele.รหัสวิชา);
              self.setCoruse(ele);
            } else if (findindex > -1 && ele.รหัสวิชา) {
              console.log(123);
              self.setSection(ele);
            } else {
              console.log(123);
              self.setSectionDate(ele);
            }
          }); //สิ้นสุดจัดข้อมูล

          console.log(course_code);
          console.log(self.data_course_import);
          this.import_filename = files[0].name;
          this.import_status = true;
        } catch (e) {
          return alert("Read failure!");
        }
      };
      fileReader.readAsBinaryString(files[0]);
      var input = document.getElementById("upload");
      input.value = undefined;
    },
    setCoruse(ele) {
      // console.log("setCoruse");
      // console.log(ele);
      const self = this;
      self.data_course_import.push({
        course_id: 0,
        course_code: ele.รหัสวิชา,
        course_name: ele.ชื่อวิชา,
        course_type: ele.ประเภทรายวิชา,
        course_year: ele.ปีหลักสูตร,
        course_unit: ele.หน่วยกิต,
        course_lac_unit: ele.หน่วยกิตบรรยาย,
        course_lab_unit: ele.หน่วยกิตปฏิบัติ,
        course_self_unit: ele.หน่วยกิตเรียนรู้ด้วยตัวเอง,
        course_section: [
          {
            section_id: 0,
            section_number: ele.กลุ่ม,
            section_student: ele.จำนวนที่ลงทะเบียน,
            section_detail: ele.รายละเอียดกลุ่มเรียน,
            section_date: [
              {
                section_date: ele.วัน,
                section_room: ele.ห้อง,
                section_start: ele.เวลาเริ่มเรียน,
                section_end: ele.เวลาเลิกเรียน,
                course_person: ele.ผู้สอน,
                course_person_position: 0,
              },
            ],
          },
        ],
      });
    },
    setSection(ele) {
      const self = this;
      // console.log("setSection");
      self.data_course_import[
        self.data_course_import.findIndex(
          (element) => parseInt(element.course_code) == parseInt(ele.รหัสวิชา)
        )
      ].course_section.push({
        section_id: 0,
        section_number: ele.กลุ่ม,
        section_student: ele.จำนวนที่ลงทะเบียน,
        section_detail: ele.รายละเอียดกลุ่มเรียน,
        section_date: [
          {
            section_date: ele.วัน,
            section_room: ele.ห้อง,
            section_start: ele.เวลาเริ่มเรียน,
            section_end: ele.เวลาเลิกเรียน,
            course_person: ele.ผู้สอน,
            course_person_position: 0,
          },
        ],
      });
    },
    setSectionDate(ele) {
      const self = this;
      let i =
        self.data_course_import[self.data_course_import.length - 1]
          .course_section.length - 1;
      // console.log(i);
      // console.log("setectiondate");
      self.data_course_import[
        self.data_course_import.length - 1
      ].course_section[i].section_date.push({
        section_date: ele.วัน,
        section_room: ele.ห้อง,
        section_start: ele.เวลาเริ่มเรียน,
        section_end: ele.เวลาเลิกเรียน,
        course_person: ele.ผู้สอน,
        course_person_position: 0,
      });
    },
    Insert_course() {
      var self = this;
      // console.log("Year :", self.select_course_year);
      // console.log("Term :", self.select_course_term);
      Axios.post("http://localhost:8080/WlsInsert/insertcourse", {
        course: self.data_course_import,
        course_term: self.select_course_term,
        course_year: self.select_course_year,
        person_id: this.$store.state.user.user_id,
      })
        .then()
        .catch((err) => alert(err));
    },
    get_all_sourse() {
      var self = this;
      Axios.post("http://localhost:8080/WlsInsert/getallcourse")
        .then((response) => {
          response.data.results.forEach((element) => {
            let course = {
              course_id: element.course_id,
              course_code: element.course_code,
              course_year: element.course_year,
              course_name: element.course_name,
              course_credit:
                element.course_unit +
                " (" +
                element.course_lecture_unit +
                "-" +
                element.course_lab_unit +
                "-" +
                element.course_learning_unit +
                ")",
            };
            self.course_record.push(course);
          });
          // console.log(self.course_record);
        })
        .catch((err) => alert(err));
    },
    get_course_detail(id) {
      const self = this;

      self.course_detail_id = id;
      // console.log("ID Button :", id);
      // console.log("Course Detail :", this.course_detail_record);

      Axios.post("http://localhost:8080/WlsInsert/getcoursedetail", {
        course_id: id,
      })
        .then((response) => {
          console.log(response.data.results);
          if (response.data.results == 0) {
            // console.log("nodata");
            this.$info({
              title: "ไม่พบข้อมูลกลุ่มเรียน",
              onOk() {},
            });
          } else {
            self.course_detail_data = [];
            response.data.results.forEach(function (ele) {
              self.course_detail_data.push({
                section_id: ele.section_id,
                section_number: ele.section_number,
                section_student: ele.section_student,
                section_name: ele.section_name,
                section_term: ele.section_term,
                section_year: ele.section_year,
                section_date: ele.section_date,
              });
            });
            // console.log("Data Detail : ", self.course_detail_data);
            self.modal_detail = true;
          }
        })
        .catch((err) => alert(err));
    },
    RemoveSection(id) {
      // console.log(id);
      Axios.post("http://localhost:8080/WlsInsert/changestatus", {
        section_id: id,
      })
        .then()
        .catch((err) => alert(err));
    },
    EditDetail(id) {
      let self = this;

      // console.log(id);
      Axios.post("http://localhost:8080/WlsInsert/getsectiondetailid", {
        section_detail_id: id,
      })
        .then((response) => {
          self.data_section_detail_edit_id =
            response.data.results[0].section_detail_id;
          self.data_section_detail_edit_date =
            response.data.results[0].section_detail_day;
          self.data_section_detail_edit_start_time =
            response.data.results[0].section_detail_start_time;
          self.data_section_detail_edit_end_time =
            response.data.results[0].section_detail_end_time;
          self.data_section_detail_edit_room =
            response.data.results[0].section_detail_room;
        })
        .catch((err) => alert(err));

      self.modal_edit_detail = true;
    },
    edit_section_detail() {
      let self = this;

      Axios.post("http://localhost:8080/WlsInsert/editsectiondetail", {
        section_detail_id: self.data_section_detail_edit_id,
        section_detail_day: self.data_section_detail_edit_date,
        section_detail_start_time: self.data_section_detail_edit_start_time,
        section_detail_end_time: self.data_section_detail_edit_end_time,
        section_detail_room: self.data_section_detail_edit_room,
      })
        .then()
        .catch((err) => alert(err));
      self.colse_edit_edtail();
      self.get_course_detail(self.course_detail_id);
    },
    exportPDF() {
      let self = this;

      // for (var i = 0; i < 3; i++) {
      //   let data = {
      //     number: 1,
      //     serial_number: "1AX85PC",
      //     name_product: "A5",
      //     catagories: "อุปกรณ์",
      //     import: 20,
      //     export: 10,
      //     change: 20,
      //     total: 10,
      //   };
      //   self.data_store.push(data);
      // }

      // var headers = {
      //   column1: {
      //     col_1: { text: "ลำดับ", style: "tableheader", rowSpan: 2 },
      //     col_2: { text: "หมายเลขวัสดุ", style: "tableheader", rowSpan: 2 },
      //     col_3: { text: "ชื่อวัสดุ", style: "tableheader", rowSpan: 2 },
      //     col_4: { text: "หมวดหมู่", style: "tableheader", rowSpan: 2 },
      //     col_5: { text: "จำนวนวัสดุ", style: "tableheader", colSpan: 4 },
      //     col_6: {
      //       rowSpan: undefined,
      //       _maxWidth: 0,
      //       _minWidth: 0,
      //       _span: true,
      //     },
      //     col_7: {
      //       rowSpan: undefined,
      //       _maxWidth: 0,
      //       _minWidth: 0,
      //       _span: true,
      //     },
      //     col_8: {
      //       rowSpan: undefined,
      //       _maxWidth: 0,
      //       _minWidth: 0,
      //       _span: true,
      //     },
      //   },
      //   column2: {
      //     col_1: {
      //       _span: true,
      //       _minWidth: 0,
      //       _maxWidth: 0,
      //       _columnEndingContext: {
      //         page: 0,
      //         x: 5,
      //         y: 16.200000000000003,
      //         availableHeight: null,
      //         availableWidth: 30,
      //         lastColumnWidth: 30,
      //       },
      //       _rowSpanCurrentOffset: 1,
      //     },
      //     col_2: {
      //       _span: true,
      //       _minWidth: 0,
      //       _maxWidth: 0,
      //       _columnEndingContext: {
      //         page: 0,
      //         x: 5,
      //         y: 16.200000000000003,
      //         availableHeight: null,
      //         availableWidth: 30,
      //         lastColumnWidth: 30,
      //       },
      //       _rowSpanCurrentOffset: 1,
      //     },
      //     col_3: {
      //       _span: true,
      //       _minWidth: 0,
      //       _maxWidth: 0,
      //       _columnEndingContext: {
      //         page: 0,
      //         x: 5,
      //         y: 16.200000000000003,
      //         availableHeight: null,
      //         availableWidth: 30,
      //         lastColumnWidth: 30,
      //       },
      //       _rowSpanCurrentOffset: 1,
      //     },
      //     col_4: {
      //       _span: true,
      //       _minWidth: 0,
      //       _maxWidth: 0,
      //       _columnEndingContext: {
      //         page: 0,
      //         x: 5,
      //         y: 16.200000000000003,
      //         availableHeight: null,
      //         availableWidth: 30,
      //         lastColumnWidth: 30,
      //       },
      //       _rowSpanCurrentOffset: 1,
      //     },
      //     col_5: { text: "นำเข้า", style: "tableheader" },
      //     col_6: { text: "เบิกจ่าย", style: "tableheader" },
      //     col_7: { text: "ปรับยอด", style: "tableheader" },
      //     col_8: { text: "คงเหลือ", style: "tableheader" },
      //   },
      // };

      var body = [];

      var headers = {
        colum1: {
          col_1: {
            text: "หมวดวิชา / รหัสวิชา",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 26.168,
            _maxWidth: 46.344,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_2: {
            text: "หน่วยกิต",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 19.456,
            _maxWidth: 19.456,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_3: {
            text: "วัน-เวลา",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 10.416,
            _maxWidth: 18.72,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_4: {
            text: "กลุ่ม",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 9.656,
            _maxWidth: 9.656,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_5: {
            text: "จำนวนหน่วยกิต",
            style: "headersmall",
            alignment: "center",
            colSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 35.224000000000004,
            _maxWidth: 35.224000000000004,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_6: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_7: {
            text: "จำนวนนิสิตที่ลงทะเบียน\nเรียนในรายวิชา",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 52.904,
            _maxWidth: 52.904,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_8: {
            text: "จำนวนกลุ่มที่สอน",
            style: "headersmall",
            alignment: "center",
            colSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 38.736000000000004,
            _maxWidth: 38.736000000000004,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_9: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_10: {
            text: "ภาระงาน",
            style: "headersmall",
            alignment: "center",
            colSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 20.136,
            _maxWidth: 20.136,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_11: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_12: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_13: {
            text: "ภาระงานรวม(นก)",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 39.632,
            _maxWidth: 39.632,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_14: {
            text: "สัดส่วน\nภาระงาน\nที่สอน\n(สัปดาห์)",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 20.136,
            _maxWidth: 20.136,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_15: {
            text: "ภาระงาน\nรวมที่ได้\nตามสัดส่วน\nการสอน(นก)",
            style: "headersmall",
            alignment: "center",
            rowSpan: 3,
            _margin: null,
            _inlines: [],
            _minWidth: 28.752,
            _maxWidth: 28.752,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
        },
        colum2: {
          col_1: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_2: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_3: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_4: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_5: {
            text: "บรรยาย",
            style: "headersmall",
            alignment: "center",
            rowSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 17.688,
            _maxWidth: 17.688,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_6: {
            text: "lab",
            style: "headersmall",
            alignment: "center",
            rowSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 8.120000000000001,
            _maxWidth: 8.120000000000001,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_7: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_8: {
            text: "บรรยาย",
            style: "headersmall",
            alignment: "center",
            rowSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 17.688,
            _maxWidth: 17.688,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_9: {
            text: "lab",
            style: "headersmall",
            alignment: "center",
            rowSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 8.120000000000001,
            _maxWidth: 8.120000000000001,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_10: {
            text: "ภาระงานพื้นฐาน",
            style: "headersmall",
            alignment: "center",
            rowSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 36.584,
            _maxWidth: 36.584,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_11: {
            text: "ภาระงานตรวจงาน",
            style: "headersmall",
            alignment: "center",
            colSpan: 2,
            _margin: null,
            _inlines: [],
            _minWidth: 40.856,
            _maxWidth: 40.856,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_12: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
          },
          col_13: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_14: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
          col_15: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _rowSpanCurrentOffset: 1,
          },
        },
        colum3: {
          col_1: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 5,
              y: 11.8,
              availableHeight: null,
              availableWidth: 100,
              lastColumnWidth: 100,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_2: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 114,
              y: 11.8,
              availableHeight: null,
              availableWidth: 25,
              lastColumnWidth: 25,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_3: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 148,
              y: 11.8,
              availableHeight: null,
              availableWidth: 100,
              lastColumnWidth: 100,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_4: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 257,
              y: 11.8,
              availableHeight: null,
              availableWidth: 40,
              lastColumnWidth: 40,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_5: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 306,
              y: 25.6,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_6: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 345,
              y: 25.6,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_7: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 384,
              y: 20.6,
              availableHeight: null,
              availableWidth: 60,
              lastColumnWidth: 60,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_8: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 453,
              y: 25.6,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_9: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 492,
              y: 25.6,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_10: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 531,
              y: 34.400000000000006,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_11: {
            text: "ชั่วโมง\nบรรยาย",
            style: "headersmall",
            alignment: "center",
            _margin: null,
            _inlines: [],
            _minWidth: 17.688,
            _maxWidth: 17.688,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_12: {
            text: "ชั่วโมง \nlab",
            style: "headersmall",
            alignment: "center",
            _margin: null,
            _inlines: [],
            _minWidth: 14.248000000000001,
            _maxWidth: 14.248000000000001,
            positions: [
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
              {
                pageNumber: 6,
                pageOrientation: "landscape",
                pageInnerHeight: 515.28,
                pageInnerWidth: 761.89,
                left: 40,
                top: 102.80000000000001,
                verticalRatio: 0.1218754851731098,
                horizontalRatio: 0,
              },
            ],
          },
          col_13: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 648,
              y: 20.6,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_14: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 687,
              y: 38.2,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 2,
          },
          col_15: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 726,
              y: 38.2,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 2,
          },
        },
      };
      for (var item in headers) {
        var header = headers[item];
        var row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        row.push(header.col_5);
        row.push(header.col_6);
        row.push(header.col_7);
        row.push(header.col_8);
        row.push(header.col_9);
        row.push(header.col_10);
        row.push(header.col_11);
        row.push(header.col_12);
        row.push(header.col_13);
        row.push(header.col_14);
        row.push(header.col_15);
        body.push(row);
      }
      // for (var item in headers) {
      //   var header = headers[item];
      //   var row = new Array();
      //   row.push(header.col_1);
      //   row.push(header.col_2);
      //   row.push(header.col_3);
      //   row.push(header.col_4);
      //   row.push(header.col_5);
      //   row.push(header.col_6);
      //   row.push(header.col_7);
      //   row.push(header.col_8);
      //   body.push(row);
      // }

      // for (var key in self.data_store) {
      //   var data = self.data_store[key];
      //   var newrow = new Array();
      //   newrow.push(data.number.toString());
      //   newrow.push(data.serial_number.toString());
      //   newrow.push(data.name_product.toString());
      //   newrow.push(data.catagories.toString());
      //   newrow.push(data.import.toString());
      //   newrow.push(data.export.toString());
      //   newrow.push(data.change.toString());
      //   newrow.push(data.total.toString());
      //   body.push(newrow);
      // }
      console.log("Body", body);

      pdfMake.vfs = pdfFonts.pdfMake.vfs; // 2. set vfs pdf font
      pdfMake.fonts = {
        THSarabunPsk: {
          normal: "THSarabun.ttf",
          bold: "THSarabun-Bold.ttf",
          italics: "THSarabu-Italic.ttf",
          bolditalics: "THSarabun-Bold-Italic.ttf",
        },
      };
      var dd = {
        content: [
          {
            pageSize: "A4",
            pageOrientation: "landscape",
            pageBreak: "before",
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
              heights: [
                "*",
                "*",
                "*",
                "*",
                "*",
                "*",
                "*",
                "*",
                "*",
                "*",
                "*",
                "*",
                "*",
                "*",
                "*",
              ],
              body: body,
            },
          },
        ],
        defaultStyle: {
          font: "THSarabunPsk",
        },
        styles: {
          tableheader: {
            bold: true,
            alignment: "center",
          },
          header: {
            fontSize: 22,
            bold: true,
            alignment: "center",
          },
        },
      };
      // const docDefinition = {
      //   pageSize: "A4",
      //   content: [
      //     {
      //       table: {
      //         headerRows: 2,
      //         widths: [30, "*", "*", "*", "*", "*", "*", "*"],
      //         heights: ["*", "*", "*", "*", "*", "*", "*", "*"],

      //         body: [
      //           [
      //             { text: "ลำดับ", style: "tableheader", rowSpan: 2 },
      //             { text: "หมายเลขวัสดุ", style: "tableheader", rowSpan: 2 },
      //             { text: "ชื่อวัสดุ", style: "tableheader", rowSpan: 2 },
      //             { text: "หมวดหมู่", style: "tableheader", rowSpan: 2 },
      //             { text: "จำนวนวัสดุ", style: "tableheader", colSpan: 4 },
      //             {},
      //             {},
      //             {},
      //           ],
      //           [
      //             {},
      //             {},
      //             {},
      //             {},
      //             { text: "นำเข้า", style: "tableheader" },
      //             { text: "เบิกจ่าย", style: "tableheader" },
      //             { text: "ปรับยอด", style: "tableheader" },
      //             { text: "คงเหลือ", style: "tableheader" },
      //           ],
      //           [
      //             { text: "นำเข้า", style: "tableheader" },
      //             { text: "นำเข้า", style: "tableheader" },
      //             { text: "นำเข้า", style: "tableheader" },
      //             { text: "นำเข้า", style: "tableheader" },
      //             { text: "นำเข้า", style: "tableheader" },
      //             { text: "เบิกจ่าย", style: "tableheader" },
      //             { text: "ปรับยอด", style: "tableheader" },
      //             { text: "คงเหลือ", style: "tableheader" },
      //           ],
      //         ],
      //       },
      //     },
      //   ],
      //   defaultStyle: {
      //     font: "THSarabunPsk",
      //   },
      //   styles: {
      //     tableheader: {
      //       bold: true,
      //       alignment: "center",
      //     },
      //     header: {
      //       fontSize: 22,
      //       bold: true,
      //       alignment: "center",
      //     },
      //   },
      // };
      console.log(dd);
      pdfMake.createPdf(dd).open({}, window.open());
      self.data_store = [];
    },
    get_position_user() {
      let self = this;
      console.log("user id :", this.$store.state.user.user_id);
      Axios.post("http://localhost:8080/personRouters/getpositionAccessById", {
        person_id: this.$store.state.user.user_id,
      })
        .then((response) => {
          // console.log(response.data.results[0].position_access_id);
          self.user_position = response.data.results[0].position_access_id;
        })
        .catch((err) => alert(err));
    },
  },
  created() {
    this.get_all_sourse();
    this.Years_course();
    this.get_position_user();
  },
};
</script>

<style>
</style>

