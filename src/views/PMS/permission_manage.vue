<template>
  <div id="permisson">
    <a-row :gutter="[8, 8]">
      <a-col :span="7">
        <a-card>
          <a-row>
            <a-col :span="4">
              <a-icon
                type="user"
                :style="{
                  fontSize: '580%',
                  color: '#f0b95a',
                }"
              />
            </a-col>
            <a-col :span="20" style="text-align:end">
              <br />
              <div class="text-head">จำนวนบุคลากรที่มีอยู่ในระบบ</div>
              <div>
                <span class="text-number ">{{ numPerson }} </span>คน
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="16" style="margin: 0.2em 0px;">
              <a-card-meta title="รายการผู้มีสิทธิ์การใช้งานระบบ">
                <a-icon
                  slot="avatar"
                  type="folder-open"
                  :style="{
                    fontSize: '150%',
                  }"
                />
              </a-card-meta>
            </a-col>

            <a-col :span="4" :style="{ textAlign: 'end' }">
              <router-link :to="{ path: '/addposition' }">
                <a-button type="primary" icon="plus" style="width:100%">
                  เพิ่มสิทธิ์การเข้าถึง
                </a-button>
              </router-link>
            </a-col>

            <a-col :span="4" :style="{ textAlign: 'start' }">
              <router-link :to="{ path: '/permission_manage/adduser' }">
                <a-button type="success" icon="user-add" style="width:100%">
                  เพิ่มผู้มีสิทธิ์เข้าใช้ระบบ
                </a-button>
              </router-link>
            </a-col>
          </a-row>
          <hr style="width:100%" />
          <br />
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-table
                :columns="columns"
                :data-source="dataPerson"
                :pagination="false"
                size="small"
              >
                <!-- <span slot="name" slot-scope="text, record, index">
                  <div style="text-align:center">
                    {{ index }}
                    {{ text }}
                    {{ record }}
                  </div> -->
                <span slot="key" slot-scope="text">
                  <div style="text-align:center">
                    {{ text }}
                  </div>
                </span>
                <span slot="name" slot-scope="text">
                  <div style="margin-left:15%">
                    {{ text }}
                  </div>
                </span>

                <span slot="position" slot-scope="text">
                  <div style="text-align:center">
                    {{ text }}
                  </div>
                </span>

                <span slot="permission" slot-scope="text">
                  <div style="text-align:center">
                    {{ text }}
                  </div>
                </span>

                <span slot="status" slot-scope="text, record, index">
                  <div style="text-align:center">
                    <a-switch
                      :checked="dataPerson[index].status"
                      @click="
                        () =>
                          (dataPerson[index].status = !dataPerson[index].status)
                      "
                      @change="closePersonId(record.person_id)"
                    >
                      <a-icon slot="checkedChildren" type="check" />
                      <a-icon slot="unCheckedChildren" type="close" />
                    </a-switch>
                  </div>
                </span>

                <span slot="action" slot-scope="record">
                  <div style="text-align:center">
                    <a-tooltip placement="top" title="จัดการสิทธิ์">
                      <a-button
                        type="warning"
                        @click="getPostionAccessById(record.person_id)"
                        icon="edit"
                      >
                      </a-button>
                    </a-tooltip>
                    <!-- <a-tooltip placement="top" title="ปิดการใช้งาน">
                      <a-button
                        type="danger"
                        icon="close"
                        @click="
                          showDeleteConfirm(record.person_id, record.name)
                        "
                      >
                      </a-button>
                    </a-tooltip> -->
                    <a-tooltip placement="top" title="ตรวจสอบข้อมูล">
                      <a-button
                        type="primary"
                        icon="search"
                        @click="getByIdPerson(record.person_id)"
                      >
                      </a-button>
                    </a-tooltip>
                  </div>
                </span>
              </a-table>
            </a-col>
          </a-row>
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
                <a-select-option value="10">
                  10
                </a-select-option>
                <a-select-option value="25">
                  25
                </a-select-option>
                <a-select-option value="50">
                  50
                </a-select-option>
                <a-select-option value="100">
                  100
                </a-select-option>
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

    <!-- modal -->
    <div>
      <a-modal
        v-model="visible_manage"
        title="จัดการสิทธิ์"
        @ok="handleOk"
        cancelText="ปิด"
        okText="ยืนยัน"
        :footer="null"
      >
        <a-table
          :columns="columns_modal_manage"
          :data-source="personPositionAccess"
          size="small"
          :pagination="false"
          bordered
        >
          <!-- <span slot="expandedRowRender" slot-scope="record" style="margin: 0">
            <div v-for="(item, index) in record.sub_system" :key="index">
              <p v-if="item.sub_system_name_TH == null">
                ไม่มีระบบย่อย
              </p>
              <p v-else>
                {{ item.sub_system_name_TH }}
              </p>
            </div>
            
          </span> -->
          <span slot="postion_access_name_TH" slot-scope="text, record, index">
            <div
              v-if="index != personPositionAccess.length - 1"
              style="text-align:center"
            >
              {{ text }}
            </div>
            <div
              v-if="index == personPositionAccess.length - 1"
              style="text-align:center"
            >
              <a-select
                style="width:100%"
                v-model="personPositionAccess[index].postion_access_id"
                placeholder="โปรดเลือกสิทธิ์เข้าถึง"
              >
                <a-select-option
                  v-for="item in dataPostionAccess"
                  :key="item.key"
                  :value="item.postion_access_id"
                  :disabled="
                    personPositionAccess.find(
                      (ele) => ele.postion_access_id == item.postion_access_id
                    )
                  "
                >
                  {{ item.postion_access_name_TH }}
                </a-select-option>
              </a-select>
            </div>
          </span>
          <span slot="status_modal" slot-scope="text, record, index">
            <div
              v-if="index != personPositionAccess.length - 1"
              style="text-align:center"
            >
              <a-switch
                :checked="personPositionAccess[index].prepair_status"
                @click="
                  () =>
                    (personPositionAccess[
                      index
                    ].prepair_status = !personPositionAccess[index]
                      .prepair_status)
                "
                @change="changeStatusPositionAccess(record.person_id)"
              >
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
            </div>
            <div
              v-if="index == personPositionAccess.length - 1"
              style="text-align:center"
            >
              <a-button
                type="success"
                icon="save"
                @click="
                  updatePermission(record.postion_access_id, record.person_id)
                "
              ></a-button>
            </div>
          </span>

          <!-- <template slot="title" >
            Header
          </template> -->
          <!-- <template slot="footer" :footer="null">
            Footer
          </template> -->
        </a-table>

        <!-- <template slot="footer">
          <a-select
            default-value="lucy"
            style="width: 120px"
            @change="handleChange"
          >
            <a-select-option value="jack">
              Jack
            </a-select-option>
          </a-select>
        </template> -->
      </a-modal>

      <a-modal
        v-model="visible_info"
        title="ข้อมูลรายละเอียด"
        @ok="handleOk"
        :footer="null"
      >
        <a-row :gutter="[8, 8]">
          <a-col :span="24">
            <a-card>
              <a-row :gutter="[8, 8]">
                <a-col :span="12" v-model="nameInfo">
                  <div style="text-align:center">
                    <b>ชื่อ : </b>
                    <span>{{ nameInfo }}</span>
                  </div>
                </a-col>
                <a-col :span="12" v-model="lastnameInfo">
                  <div style="text-align:center">
                    <b>นามสกุล : </b>
                    <span>{{ lastnameInfo }}</span>
                  </div>
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" v-model="positionInfo">
                  <div style="text-align:center">
                    <b>ตำแหน่ง : </b>
                    <span>{{ positionInfo }}</span>
                  </div>
                </a-col>
                <a-col :span="12" v-model="addressInfo">
                  <div style="text-align:center">
                    <b>ที่อยู่ : </b>
                    <span>{{ addressInfo }}</span>
                  </div>
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" v-model="districtInfo">
                  <div style="text-align:center">
                    <b>ตำบล : </b>
                    <span>{{ districtInfo }}</span>
                  </div>
                </a-col>
                <a-col :span="12" v-model="amphurInfo">
                  <div style="text-align:center">
                    <b>อำเภอ : </b>
                    <span>{{ amphurInfo }}</span>
                  </div>
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" v-model="provinceInfo">
                  <div style="text-align:center">
                    <b>จังหวัด : </b>
                    <span>{{ provinceInfo }}</span>
                  </div>
                </a-col>
                <a-col :span="12" v-model="zipcodeInfo">
                  <div style="text-align:center">
                    <b>รหัสไปรษณีย์ : </b>
                    <span>{{ zipcodeInfo }}</span>
                  </div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>

        <a-row :gutter="[8, 8]">
          <a-col :span="24">
            <a-card>
              <a-row>
                <a-col :span="4">
                  <a-icon
                    type="database"
                    :style="{
                      fontSize: '300%',
                      color: '#000080',
                    }"
                  />
                </a-col>
                <a-col :span="20" style="text-align:end">
                  <div class="text-head">จำนวนระบบ</div>
                  <div>
                    <span class="text-number ">{{ numSystemPermission }} </span
                    >ระบบ
                  </div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <!-- <a-col :span="12">
            <a-card>
              <a-row>
                <a-col :span="4">
                  <a-icon
                    type="clock-circle"
                    :style="{
                      fontSize: '300%',
                      color: '#008000',
                    }"
                  />
                </a-col>
                <a-col :span="20" style="text-align:end">
                  <div class="text-head">จำนวนการเข้าใช้ระบบ</div>
                  <div><span class="text-number ">10 </span>จำนวนครั้ง</div>
                </a-col>
              </a-row>
            </a-card>
          </a-col> -->
        </a-row>

        <a-row :gutter="[8, 8]">
          <a-col>
            <a-table
              :columns="columns_modal_info"
              :data-source="personSystem"
              :pagination="false"
              size="small"
            >
              <span slot="key" slot-scope="text">
                <div style="text-align:center">
                  {{ text }}
                </div>
              </span>
            </a-table>
          </a-col>
        </a-row>
      </a-modal>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
const columns = [
  {
    dataIndex: "key",
    key: "key",
    title: "ลำดับ",
    width: "10%",
    scopedSlots: { customRender: "key" },
  },
  {
    dataIndex: "name",
    key: "name",
    title: "ชื่อ - นามสกุล",
    width: "30%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "ตำแหน่ง",
    dataIndex: "position",
    width: "20%",
    key: "age",
    scopedSlots: { customRender: "position" },
  },
  // {
  //   title: "สิทธิ์การเข้าถึง",
  //   dataIndex: "permission",
  //   width: "20%",
  //   key: "",
  //   scopedSlots: { customRender: "permission" },
  // },

  // {
  //   title: "ไว้ก่อน",
  //   dataIndex: "address",
  //   width: "20%",
  //   key: "address",
  //   scopedSlots: { customRender: "test" },
  // },
  {
    title: "สถานะ",
    key: "status",
    dataIndex: "status",
    width: "20%",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "ดำเนินการ",
    key: "action",
    width: "20%",
    scopedSlots: { customRender: "action" },
  },
];

const columns_modal_manage = [
  {
    title: "สิทธิ์การใช้งาน",
    dataIndex: "postion_access_name_TH",
    key: "postion_access_name_TH",
    scopedSlots: { customRender: "postion_access_name_TH" },
  },
  {
    title: "จัดการ",
    scopedSlots: { customRender: "status_modal" },
  },
];

const columns_modal_info = [
  {
    title: "สิทธิ์การใช้งาน",
    key: "key",
    dataIndex: "system_name_TH",
  },
];

// const data = [
//   {
//     key: "1",
//     name: "ประไพพรรณ สุ่มทรัพย์",
//     position: "เจ้าหน้าที่ฝ่ายธุรการ",
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "นันทิกานต์ คุ้มเพชร",
//     position: "เจ้าหน้าที่เบิกวัสดุ",
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "ปุณณานันท์ มีเงินมาก",
//     position: "อาจารย์ที่ปรึกษา",
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

// const dataPerson = [
//   {
//     key: dataPerson.results.person_id,
//     name: dataPerson.person_firstname_TH + " " + dataPerson.person_lastname_TH,
//     position: "เจ้าหน้าที่ฝ่ายธุรการ",
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
// ];

const data_modal_info = [
  {
    key: "1",
    permission_activate: "ระบบคำนวณภาระงาน",
  },
  {
    key: "2",
    permission_activate: "ระบบเบิกจ่ายวัสดุ",
  },
];

export default {
  data() {
    return {
      dataPerson: [],
      personSystem: [],
      personPositionAccess: [],
      dataPostionAccess: [],
      // dataPersonId: {
      //   person_id: "",
      //   person_username: "",
      //   prefix_id: "",
      //   person_firstname_TH: "",
      //   person_lastname_TH: "",
      //   person_address: "",
      //   person_province: "",
      //   person_amphur: "",
      //   person_district: "",
      //   person_position: "",
      //   person_status: "",
      // },
      // data,
      columns,
      columns_modal_manage,
      data_modal_info,
      columns_modal_info,
      visible_manage: false,
      visible_info: false,
      nameInfo: "",
      lastnameInfo: "",
      positionInfo: "",
      addressInfo: "",
      provinceInfo: "",
      amphurInfo: "",
      districtInfo: "",
      zipcodeInfo: "",
      nameDeleteFirm: "",
      sub_system: "",
      numPerson: 0,
      numSystemPermission: 0,
      position_access_index: 1,
    };
  },
  methods: {
    getAllPerson() {
      const self = this;
      self.numPerson = 0;
      axios
        .post("http://localhost:8080/personRouters/getAllPerson")
        .then(function(res) {
          const data = res.data;
          // console.log(data.results);
          data.results.forEach(function(ele, index) {
            self.numPerson += 1;
            let data = {
              key: index + 1,
              person_id: ele.person_id,
              name:
                ele.pf_name_abbr == null
                  ? ele.person_firstname_TH + " " + ele.person_lastname_TH
                  : ele.pf_name_abbr +
                    ele.person_firstname_TH +
                    " " +
                    ele.person_lastname_TH,
              position: ele.postition_name,
              // permission: ele.person_status,
              status: ele.person_status == 1 ? true : false,
            };
            self.dataPerson.push(data);
          });
          console.log(self.dataPerson);
        });
    },

    getByIdPerson(id) {
      this.visible_info = true;
      console.log(id);
      const self = this;
      self.numSystemPermission = 0;
      self.personSystem = [];
      axios
        .post("http://localhost:8080/personRouters/getByIdPerson", {
          person_id: id,
        })
        .then(function(res) {
          const data = res.data;

          if (data.results[0].pf_name_abbr == null) {
            data.results[0].pf_name_abbr = "";
          }

          self.nameInfo =
            data.results[0].pf_name_abbr + data.results[0].person_firstname_TH;
          self.lastnameInfo = data.results[0].person_lastname_TH;
          self.positionInfo = data.results[0].postition_name;
          self.addressInfo = data.results[0].person_address;
          self.provinceInfo = data.results[0].province;
          self.amphurInfo = data.results[0].amphures;
          self.districtInfo = data.results[0].districts;
          self.zipcodeInfo = data.results[0].zipcode;
        });

      axios
        .post("http://localhost:8080/personRouters/getSystemByIdPerson", {
          person_id: id,
        })
        .then(function(res) {
          const data = res.data;

          data.results.forEach(function(ele, index) {
            self.numSystemPermission += 1;
            let data = {
              key: index + 1,
              system_name_TH: ele.system_name_TH,
            };
            self.personSystem.push(data);
          });
        });
    },

    closePersonId(data) {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/closePersonId", {
          person_id: data,
        })
        .then(function(res) {
          const data = res.data;
          if (data.results) {
            self.$notification["success"]({
              message: "การแจ้งเตือน",
              description: "การเปลี่ยนสถานะสำเร็จ",
              duration: 3,
            });
          }
        });
    },
    updatePermission(position_access_id_update, person_id_update) {
      console.log(position_access_id_update);
      console.log(person_id_update);
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/updatePermission", {
          position_access_id: position_access_id_update,
          person_id: person_id_update,
        })
        .then(function(res) {
          const data = res.data;
          if (data.results) {
            self.$notification["success"]({
              message: "การแจ้งเตือน",
              description: "การเปลี่ยนสิทธิ์สำเร็จ",
              duration: 3,
            });
          }
        });
      this.visible_manage = false;
    },
    changeStatusPositionAccess(data) {
      const self = this;
      axios
        .post(
          "http://localhost:8080/personRouters/changeStatusPositionAccess",
          {
            person_id: data,
          }
        )
        .then(function(res) {
          const data = res.data;
          if (data.results) {
            self.$notification["success"]({
              message: "การแจ้งเตือน",
              description: "การเปลี่ยนสถานะสำเร็จ",
              duration: 3,
            });
          }
        });
    },

    getPostionAccessById(index) {
      this.visible_manage = true;
      const self = this;
      self.personPositionAccess = [];
      axios
        .post("http://localhost:8080/personRouters/getPostionAccessById", {
          person_id: index,
        })
        .then(function(res) {
          const data = res.data;

          data.results.forEach(function(ele, index) {
            self.personPositionAccess.push({
              key: index + 1,
              postion_access_id: ele.postion_access_id,
              postion_access_name_TH: ele.postion_access_name_TH,
              person_id: ele.person_id,
              prepair_status: ele.prepair_status == 1 ? true : false,
            });
            self.position_access_index++;
          });
          self.personPositionAccess.push({
            key: self.position_access_index,
            postion_access_id: undefined,
            postion_access_name_TH: undefined,
            person_id: index,
            prepair_status: undefined,
          });
          self.position_access_index++;
        });
      // self.getPositionDetail(self.personPositionAccess.postion_access_id);
    },

    getPositionDetail(index) {
      console.log(index);
      const self = this;
      console.log(self.person.position_access[index].position_access_id);
      axios
        .post("http://localhost:8080/personRouters/getPositionName", {
          position_access_id:
            self.person.position_access[index].position_access_id,
        })
        .then(function(result) {
          console.log(result.data.results);
          self.systemPositionAccess = [];
          result.data.results.forEach(function(res) {
            self.systemPositionAccess.push(res);
          });
        });
    },

    getPostionAccess() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getPostionAccess")
        .then(function(res) {
          console.log(res.data);
          const data = res.data;
          // console.log(data.results);
          data.results.forEach(function(ele, index) {
            let data = {
              key: index + 1,
              postion_access_id: ele.postion_access_id,
              postion_access_name_TH: ele.postion_access_name_TH,
            };
            self.dataPostionAccess.push(data);
          });
        });
    },

    // showDeleteConfirm(id, name) {
    //   console.log(id);

    //   this.$confirm({
    //     title: "คุณการต้องลบใช่หรือไม่",
    //     content: name,
    //     okText: "ยืนยัน",
    //     okType: "danger",
    //     cancelText: "ยกเลิก",
    //     onOk() {
    //       console.log("OK");

    //       axios
    //         .post("http://localhost:8080/personRouters/deletePrepair", {
    //           person_id: id,
    //         })
    //         .then(function(res) {
    //           const data = res.data;
    //           console.log(data.results);
    //         });

    //       axios
    //         .post("http://localhost:8080/personRouters/deletePerson", {
    //           person_id: id,
    //         })
    //         .then(function(res) {
    //           const data = res.data;
    //           console.log(data.results);
    //           this.getAllPerson();
    //         });

    //       this.$notification["success"]({
    //         message: "การแจ้งเตือน",
    //         description: "ลบสำเร็จ",
    //         duration: 3,
    //       });
    //     },
    //     onCancel() {
    //       console.log("Cancel");
    //     },
    //   });
    // },
    handleOk(e) {
      console.log(e);
      this.visible_manage = false;
      this.visible_info = false;
    },
    // test(data) {
    //   console.log(data);
    // },
  },
  created() {
    this.getAllPerson();
    this.getPostionAccess();
    // console.log(this.$store.state.user.user_name);
    // console.log(this.$store.state.user.user_id);
    // console.log(this.$store.state.user_menu);
  },
};
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}

#setColor {
  background-color: #ffcc00;
}
</style>
