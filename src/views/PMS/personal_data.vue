<template>
  <div id="personal_data">
    <a-card>
      <br />
      <a-row :gutter="[8, 8]" type="flex">
        <a-col :span="6" style="text-align:end">
          ชื่อ-นามสกุล (ภาษาไทย) :
        </a-col>
        <a-col :span="4">
          <a-select
            style="width:100%"
            v-model="person.prefix_id"
            placeholder="โปรดเลือกคำนำหน้า"
          >
            <a-select-option
              v-for="item in dataPrefix"
              :key="item.key"
              :value="item.pf_id"
            >
              {{ item.pf_name_abbr }}
            </a-select-option>
          </a-select>
        </a-col>

        <a-col :span="6">
          <a-input
            style="width:100%"
            v-model="person.nameThai"
            placeholder="กรอกชื่อจริงผู้ใช้งาน"
          />
        </a-col>
        <a-col :span="6">
          <a-input
            style="width:100%"
            v-model="person.lastnameThai"
            placeholder="กรอกนามสกุลผู้ใช้งาน"
          />
        </a-col>
      </a-row>
      <br />
      <a-row :gutter="[8, 8]" type="flex" justify="center">
        <a-col :span="2" style="text-align:end">
          ตำแหน่ง :
        </a-col>

        <a-col :span="6">
          <a-select
            style="width:100%"
            v-model="person.position_id"
            placeholder="โปรดเลือกตำแหน่ง"
          >
            <!-- <a-select-option :value="null" v-if="(value = null)">
              ตำแหน่ง
            </a-select-option> -->
            <a-select-option
              v-for="item in dataPosition"
              :key="item.key"
              :value="item.postion_id"
            >
              {{ item.postition_name }}
            </a-select-option>

          </a-select>
        </a-col>

        <a-col :span="2" style="text-align:end">
          ที่อยู่ :
        </a-col>
        <a-col :span="6">
          <a-input
            style="width:100%"
            v-model="person.address"
            placeholder="กรอกที่อยู่บ้านเลขที่"
          />
        </a-col>
      </a-row>
      <br />
      <a-row :gutter="[8, 8]" type="flex" justify="center">
        <a-col :span="2" style="text-align:end">
          จังหวัด :
        </a-col>
        <a-col :span="4">
          <a-select
            show-search
            placeholder="โปรดเลือกจังหวัด"
            option-filter-prop="children"
            style="width: 100%"
            v-model="person.province_id"
            :filter-option="filterOptionProvince"
            @change="getAllAmphur()"
          >
            <a-select-option
              v-for="item in dataProvinces"
              :key="item.key"
              :value="item.value"
            >
              {{ item.name_th }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2" style="text-align:end">
          อำเภอ :
        </a-col>
        <a-col :span="4">
          <a-select
            show-search
            placeholder="โปรดเลือกอำเภอ"
            option-filter-prop="children"
            style="width: 100%"
            v-model="person.amphure_id"
            :filter-option="filterOptionAmphure"
            @change="getAllDistrict()"
          >
            <a-select-option
              v-for="item in dataAmphures"
              :key="item.key"
              :value="item.value"
            >
              {{ item.name_th }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2" style="text-align:end">
          ตำบล :
        </a-col>
        <a-col :span="4">
          <a-select
            show-search
            placeholder="โปรดเลือกตำบล"
            option-filter-prop="children"
            style="width: 100%"
            v-model="person.district_id"
            :filter-option="filterOptionDistrict"
            @change="getAllDistrict()"
          >
            <a-select-option
              v-for="item in dataDistricts"
              :key="item.key"
              :value="item.value"
            >
              {{ item.name_th }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2" style="text-align:end">
          รหัสไปรษณีย์ :
        </a-col>
        <a-col :span="4">
          <a-select style="width:100%" v-model="person.district_id" disabled>
            <a-select-option :value="null">
              โปรดเลือก
            </a-select-option>
            <a-select-option
              v-for="item in dataDistricts"
              :key="item.key"
              :value="item.value"
            >
              {{ item.zip_code }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <br />
      <a-row :gutter="[8, 8]" type="flex" justify="center">
        <a-col :span="24" style="text-align:center">
          <a-button type="success" @click="updatePerson()">
            บันทึก
          </a-button>
        </a-col>
      </a-row>
    </a-card>

    <br />
    <a-card>
      <a-row :gutter="[8, 8]" type="flex" justify="center">
        <h3>รายละเอียดรายวิชาที่สอน</h3>
      </a-row>
      <a-row :gutter="[8, 8]" type="flex" justify="center">
        <a-col :span="24" style="text-align: end">
          <a-table :columns="subject_columns" :data-source="subject_data">
            <span slot="action" slot-scope="record">
              <a-button
                type="warning"
                @click="ModalEditUnit(record.person_id, record.section_id)"
                ><a-icon type="edit"
              /></a-button>
            </span>
          </a-table>
        </a-col>
      </a-row>
    </a-card>

    <!-- modal edit unit -->
    <a-modal
      v-model="edit_unit_modal"
      title="แก้ไขหน่วยกิต"
      on-ok="handleOk"
      width="900px"
    >
      <template slot="footer">
        <a-button @click="close_modal_edit"> ยกเลิก </a-button>
        <a-button
          type="success"
          v-if="edit_unit != 0"
          @click="EditUnitPerson()"
        >
          ยืนยัน
        </a-button>
      </template>
      <a-row :gutter="[8, 8]">
        <a-col :span="2" :style="{ textAlign: 'end', marginTop: '3px' }"
          >หน่วยกิต :
        </a-col>
        <a-col :span="3"
          ><a-input-number v-model="edit_unit" :min="0" :max="10"
        /></a-col>
        <a-col :span="2" :style="{ textAlign: 'end', marginTop: '3px' }"
          >บรรยาย :
        </a-col>
        <a-col :span="3"
          ><a-input-number v-model="edit_lecture_unit" :min="0" :max="10"
        /></a-col>
        <a-col :span="2" :style="{ textAlign: 'end', marginTop: '3px' }"
          >ปฏิบัติ :
        </a-col>
        <a-col :span="3"
          ><a-input-number v-model="edit_lab_unit" :min="0" :max="10"
        /></a-col>
        <a-col :span="4" :style="{ textAlign: 'end', marginTop: '3px' }"
          >เรียนรู้ด้วยตนเอง :
        </a-col>
        <a-col :span="3"
          ><a-input-number v-model="edit_learning_unit" :min="0" :max="10"
        /></a-col>
      </a-row>
    </a-modal>
    <!-- end modal edit unit -->
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      person: {
        prefix_id: undefined,
        person_firstname_TH: "",
        person_lastname_TH: "",
        person_address: "",
        person_province: undefined,
        person_amphur: undefined,
        person_district: undefined,
        position_id: undefined,
        person_update_by: this.$store.state.user.user_id,
        person_id: this.$store.state.user.user_id,
      },
      dataPrefix: [],
      dataAmphures: [],
      dataDistricts: [],
      dataProvinces: [],
      dataPosition: [],
      dataPositionAccess: [],
      nameEngVeri: "",
      nameThaiVeri: "",

      edit_unit_modal: false, // modal edit unit
      edit_unit: 0,
      edit_lecture_unit: 0,
      edit_lab_unit: 0,
      edit_learning_unit: 0,

      subject_columns: [
        {
          title: "รหัสวิชา",
          dataIndex: "course_code",
          key: "course_code",
          scopedSlots: { customRender: "course_code" },
          type: "flex",
          align: "center",
        },
        {
          title: "ชื่อวิชา",
          dataIndex: "course_name",
          key: "course_name",
          scopedSlots: { customRender: "course_name" },
          type: "flex",
          align: "center",
        },
        {
          title: "กลุ่มเรียน",
          dataIndex: "section_number",
          key: "section_number",
          scopedSlots: { customRender: "section_number" },
          type: "flex",
          align: "center",
        },
        {
          title: "รายละเอียดกลุ่มเรียน",
          dataIndex: "section_name",
          key: "section_name",
          scopedSlots: { customRender: "section_name" },
          type: "flex",
          align: "center",
        },
        {
          title: "หน่วยกิต",
          dataIndex: "section_unit",
          key: "section_unit",
          scopedSlots: { customRender: "section_unit" },
          type: "flex",
          align: "center",
        },
        {
          title: "ดำเนินการ",
          key: "action",
          scopedSlots: { customRender: "action" },
          type: "flex",
          align: "center",
        },
      ],
      subject_data: [],
      subject_edit_data: [],
    };
  },
  methods: {
    getByIdPerson() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getByIdPerson", {
          person_id: self.$store.state.user.user_id,
        })
        .then(function(res) {
          const data = res.data;
          console.log("data");
          console.log(data);

          self.person.prefix_id = data.results[0].prefix_id;
          self.person.nameThai = data.results[0].person_firstname_TH;
          self.person.lastnameThai = data.results[0].person_lastname_TH;
          self.person.position_id = data.results[0].person_position;
          self.person.address = data.results[0].person_address;
          self.person.province_id = data.results[0].person_province;
          self.person.amphure_id = data.results[0].person_amphur;
          self.person.district_id = data.results[0].person_district;
          self.getAllProvice();
          self.getAllAmphur();
          self.getAllDistrict();
        });
    },

    updatePerson() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/updatePerson", self.person)
        .then(function(res) {
          const data = res.data;
          console.log(data);
          if (data.status) {
            self.$notification["success"]({
              message: "การแจ้งเตือน",
              description: "แก้ไขข้อมูลสำเร็จ",
              duration: 3,
            });
            self.$router.push({ path: "home" });
          }
        });
    },
    getAllPrefix() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getPrefixTh")
        .then(function(res) {
          console.log(res.data);
          const data = res.data;
          // console.log(data.results);
          data.results.forEach(function(ele, index) {
            self.dataPrefix.push({
              key: index + 1,
              pf_id: ele.pf_id,
              pf_name_abbr: ele.pf_name_abbr,
            });
          });
          console.log(self.dataPrefix);
        });
    },
    getAllProvice() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getProvinces")
        .then(function(res) {
          console.log(res.data);
          const data = res.data;
          // console.log(data.results);
          data.results.forEach(function(ele, index) {
            let data = {
              key: index + 1,
              value: ele.id,
              name_th: ele.name_th,
            };
            self.dataProvinces.push(data);
          });
          console.log(self.dataProvinces);
        });
    },
    getAllAmphur() {
      const self = this;
      console.log(1);
      const amphures = self.person.province_id;
      axios
        .post("http://localhost:8080/personRouters/getAmphures", {
          province_id: amphures,
        })
        .then(function(res) {
          console.log(res.data);
          const data = res.data;
          self.dataAmphures = [];
          data.results.forEach(function(ele, index) {
            self.dataAmphures.push({
              key: index + 1,
              value: ele.id,
              name_th: ele.name_th,
              province_id: ele.province_id,
            });
          });
          console.log(self.dataAmphures);
        });
    },
    getAllDistrict() {
      const self = this;
      const districts = self.person.amphure_id;
      axios
        .post("http://localhost:8080/personRouters/getDistricts", {
          amphure_id: districts,
        })
        .then(function(res) {
          console.log(res.data);
          const data = res.data;
          self.dataDistricts = [];
          data.results.forEach(function(ele, index) {
            self.dataDistricts.push({
              key: index + 1,
              value: parseInt(ele.id),
              zip_code: ele.zip_code,
              name_th: ele.name_th,
              amphure_id: ele.amphure_id,
            });
          });
          console.log(self.dataDistricts);
        });
    },
    getAllPosition() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getPosition")
        .then(function(res) {
          console.log(res.data);
          const data = res.data;
          // console.log(data.results);
          data.results.forEach(function(ele, index) {
            self.dataPosition.push({
              key: index + 1,
              postion_id: ele.postion_id,
              postition_name: ele.postition_name,
            });
          });
        });
    },
    getAllPositionAccess() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getPostionAccess")
        .then(function(res) {
          console.log(res.data);
          const data = res.data;
          // console.log(data.results);
          data.results.forEach(function(ele, index) {
            self.dataPositionAccess.push({
              key: index + 1,
              postion_access_id: ele.postion_access_id,
              postion_access_name_TH: ele.postion_access_name_TH,
            });
          });
          console.log(self.dataPositionAccess);
        });
    },
    filterOptionProvince(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    filterOptionAmphure(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    filterOptionDistrict(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    filterOptionPositionAccess(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },

    close_modal_edit() {
      this.edit_unit_modal = false;
    },
    GetSubject() {
      let self = this;
      axios
        .post("http://localhost:8080/WlsInsert/getsubject", {
          person_id: 1, //รอ User
        })
        .then(function(result) {
          console.log(result.data.results);
          result.data.results.forEach((element) => {
            let data = {
              section_id: element.section_id,
              person_id: element.person_id,
              course_code: element.course_code,
              course_name: element.course_name,
              section_number: element.section_number,
              section_name: element.section_name,
              section_unit:
                element.section_person_unit +
                " (" +
                element.section_person_lecture_unit +
                "-" +
                element.section_person_lab_unit +
                "-" +
                element.section_person_learning_unit +
                ")",
            };
            self.subject_data.push(data);
          });
        })
        .catch((err) => alert(err));
    },
    EditUnitPerson() {
      let self = this;
      axios.post("http://localhost:8080/WlsInsert/editpersonsection", {
        person_id: self.subject_edit_data[0].person_id,
        section_id: self.subject_edit_data[0].section_id,
        unit: self.edit_unit,
        lecture_unit: self.edit_lecture_unit,
        lab_unit: self.edit_lab_unit,
        learning_unit: self.edit_learning_unit,
      });
      self.close_modal_edit();
      location.reload();
    },
    ModalEditUnit(person, section) {
      var self = this;
      self.edit_unit_modal = true;
      console.log("Person :", person);
      console.log("Section :", section);
      axios
        .post("http://localhost:8080/WlsInsert/getsubjectunit", {
          person_id: person,
          section_id: section,
        })
        .then(function(result) {
          console.log(result.data.results);
          result.data.results.forEach((element) => {
            let data = {
              person_id: element.person_id,
              section_id: element.section_id,
            };
            (self.edit_unit = element.section_person_unit),
              (self.edit_lecture_unit = element.section_person_lecture_unit),
              (self.edit_lab_unit = element.section_person_lab_unit),
              (self.edit_learning_unit = element.section_person_learning_unit),
              self.subject_edit_data.push(data);
          });
        })
        .catch((err) => alert(err));
    },
  },
  created() {
    this.getByIdPerson();
    this.getAllPrefix();
    this.getAllPosition();
    // this.getAllPositionAccess();
    // this.GetSubject();
  },
};
</script>

<style></style>
