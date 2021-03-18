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
                size="large"
                :scroll="{ y: 500 }"
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
        <!-- <a-row :gutter="[10, 50]">
          <a-col :span="24" :style="{ textAlign: 'center' }">
            <router-link :to="{ path: '/Show_course/InsertCourse' }">
              <a-button type="primary" style="width: 80%">
                เพิ่มรายวิชาด้วยตนเอง
              </a-button>
            </router-link>
          </a-col>
        </a-row>
        <br />
        <hr />
        <br /> -->
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
          width: "30%",
          scopedSlots: {
            customRender: "section_number",
          },
          type: "flex",
          align: "center",
        },
        {
          title: "รายละเอียดกลุ่ม",
          dataIndex: "section_name",
          key: "section_name",
          width: "40%",
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
          width: "30%",
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
    };
  },
  methods: {
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
          let course_code = []; //จัดข้อมูล
          ws.forEach(function (ele, index) {
            if (
              (course_code.find((element) => element != ele.รหัสวิชา) &&
                ele.รหัสวิชา) ||
              index === 0
            ) {
              course_code.push(ele.รหัสวิชา);
              self.setCoruse(ele);
            } else if (course_code == ele.รหัสวิชา && ele.รหัสวิชา) {
              self.setSection(ele);
            } else {
              self.setSectionDate(ele);
            }
          }); //สิ้นสุดจัดข้อมูล

          // console.log(self.data_course_import);
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
          (element) => (element.course_code = ele.รหัสวิชา)
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
          // console.log(response.data.results);
          if (response.data.results == 0) {
            // console.log("nodata");
            this.$info({
              title: "ไม่พบข้อมูลกลุ่มเรียน",
              onOk() {},
            });
          } else {
            self.course_detail_data = [];
            response.data.results.forEach(function (ele) {
              // console.log(
              //   "Section Des :",
              //   ele.section_date[0].section_detail_description
              // );
              self.course_detail_data.push({
                section_id: ele.section_id,
                section_number: ele.section_number,
                section_student: ele.section_student,
                section_name: ele.section_name,
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

      for (var i = 0; i < 3; i++) {
        let data = {
          number: 1,
          serial_number: "1AX85PC",
          name_product: "A5",
          catagories: "อุปกรณ์",
          import: 20,
          export: 10,
          change: 20,
          total: 10,
        };
        self.data_store.push(data);
      }

      var headers = {
        column1: {
          col_1: { text: "ลำดับ", style: "tableheader", rowSpan: 2 },
          col_2: { text: "หมายเลขวัสดุ", style: "tableheader", rowSpan: 2 },
          col_3: { text: "ชื่อวัสดุ", style: "tableheader", rowSpan: 2 },
          col_4: { text: "หมวดหมู่", style: "tableheader", rowSpan: 2 },
          col_5: { text: "จำนวนวัสดุ", style: "tableheader", colSpan: 4 },
          col_6: {
            rowSpan: undefined,
            _maxWidth: 0,
            _minWidth: 0,
            _span: true,
          },
          col_7: {
            rowSpan: undefined,
            _maxWidth: 0,
            _minWidth: 0,
            _span: true,
          },
          col_8: {
            rowSpan: undefined,
            _maxWidth: 0,
            _minWidth: 0,
            _span: true,
          },
        },
        column2: {
          col_1: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 5,
              y: 16.200000000000003,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_2: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 5,
              y: 16.200000000000003,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_3: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 5,
              y: 16.200000000000003,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_4: {
            _span: true,
            _minWidth: 0,
            _maxWidth: 0,
            _columnEndingContext: {
              page: 0,
              x: 5,
              y: 16.200000000000003,
              availableHeight: null,
              availableWidth: 30,
              lastColumnWidth: 30,
            },
            _rowSpanCurrentOffset: 1,
          },
          col_5: { text: "นำเข้า", style: "tableheader" },
          col_6: { text: "เบิกจ่าย", style: "tableheader" },
          col_7: { text: "ปรับยอด", style: "tableheader" },
          col_8: { text: "คงเหลือ", style: "tableheader" },
        },
      };

      var body = [];

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
        body.push(row);
      }

      for (var key in self.data_store) {
        var data = self.data_store[key];
        var newrow = new Array();
        newrow.push(data.number.toString());
        newrow.push(data.serial_number.toString());
        newrow.push(data.name_product.toString());
        newrow.push(data.catagories.toString());
        newrow.push(data.import.toString());
        newrow.push(data.export.toString());
        newrow.push(data.change.toString());
        newrow.push(data.total.toString());
        body.push(newrow);
      }
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
            table: {
              widths: [30, "*", "*", "*", "*", "*", "*", "*"],
              heights: ["*", "*", "*", "*", "*", "*", "*", "*"],
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
  },
  created() {
    this.get_all_sourse();
    this.Years_course();
  },
};
</script>

<style>
</style>

