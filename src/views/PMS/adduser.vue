<template>
  <div class="add">
    <a-row :gutter="[8, 8]">
      <a-col :span="24">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px;">
              <a-card-meta title="แบบฟอร์มเพิ่มข้อมูลผู้ใช้งาน">
                <a-icon
                  slot="avatar"
                  type="folder-open"
                  :style="{
                    fontSize: '150%',
                  }"
                />
              </a-card-meta>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px;">
              <a-steps :current="current">
                <a-step
                  v-for="item in steps"
                  :key="item.title"
                  :title="item.title"
                />
              </a-steps>
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="[8, 8]">
            <a-col class="form-addUser" v-if="current == 0" :span="24">
              <br />
              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :span="4" style="text-align:end">
                  <b>ชื่อผู้ใช้งาน:</b>
                </a-col>
                <a-col :span="12">
                  <!-- <a-input-search style="width:80%">
                    <a-button type="primary" icon="search" style="width:20%">
                      ตรวจสอบผู้ใช้งาน
                    </a-button>
                  </a-input-search> -->

                  <a-input-search
                    placeholder="กรอกชื่อผู้ใช้งาน"
                    style="width:100%"
                    enter-button="ค้นหา"
                    @search="onSearch"
                    v-model="username_search"
                  >
                    <a-button slot="enterButton" type="primary" icon="search">
                      ตรวจสอบผู้ใช้งาน
                    </a-button>
                  </a-input-search>
                </a-col>
              </a-row>
              <br />
              <div v-if="chackUsername_search">
                <a-row :gutter="[8, 8]" type="flex">
                  <a-col :span="6" style="text-align:end">
                    <b>ชื่อ (อังกฤษ):</b>
                  </a-col>
                  <!-- <a-col :span="4">
                  <a-input style="width:100%" v-model="nameEng" disabled />
                </a-col> -->
                  <a-col :span="6">
                    <a-input
                      style="width:100%"
                      v-model="person.nameEng"
                      disabled
                    />
                  </a-col>
                  <a-col :span="6">
                    <a-input
                      style="width:100%"
                      v-model="person.lastnameEng"
                      disabled
                    />
                  </a-col>
                </a-row>
                <br />
                <a-row :gutter="[8, 8]" type="flex">
                  <a-col :span="6" style="text-align:end">
                    <b>ชื่อ-นามสกุล (ภาษาไทย):</b>
                  </a-col>
                  <a-col :span="4">
                    <a-select
                      style="width:100%"
                      v-model="person.prefix_id"
                      placeholder="โปรดเลือกคำนำหน้า"
                    >
                      <!-- <a-select-option :value="null" v-if="(value = null)">
                        คำนำหน้าชื่อ
                      </a-select-option> -->
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
                    <b> ตำแหน่ง:</b>
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
                    <b> ที่อยู่:</b>
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
                  <!-- <a-col :span="2" style="text-align:end">
                  จังหวัด :
                </a-col>

                <a-col :span="2">
                  <a-input style="width:100%" />
                </a-col> -->
                  <a-col :span="2" style="text-align:end">
                    <b>จังหวัด:</b>
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
                    <b> อำเภอ:</b>
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
                    <b> ตำบล:</b>
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
                    <b>รหัสไปรษณีย์:</b>
                  </a-col>
                  <a-col :span="4">
                    <a-select
                      style="width:100%"
                      v-model="person.district_id"
                      disabled
                    >
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
              </div>
              <br />
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col
              class="form-addUser"
              v-if="current == 1"
              :span="24"
              style="margin: 0.2em 0px;"
            >
              <br />
              <a-row
                :gutter="[10, 10]"
                v-for="(item, index) in person.position_access"
                :key="item.key"
                type="flex"
                justify="center"
              >
                <a-col :span="10">
                  <a-select
                    show-search
                    placeholder="โปรดกำหนดสิทธิ์ให้กับผู้ใช้งาน"
                    option-filter-prop="children"
                    style="width: 100%;"
                    v-model="person.position_access[index].position_access_id"
                    :filter-option="filterOptionPositionAccess"
                  >
                    <a-select-option
                      v-for="item in dataPositionAccess"
                      :key="item.key"
                      :value="item.position_access_id"
                      :disabled="
                        person.position_access.find(
                          (ele) =>
                            ele.position_access_id === item.position_access_id
                        )
                      "
                    >
                      {{ item.position_access_name_TH }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="1">
                  <a-button
                    type="primary"
                    icon="search"
                    :disabled="
                      person.position_access[index].position_access_id ==
                        undefined
                    "
                    @click="getPositionDetail(index)"
                  />
                </a-col>
                <a-col :span="1">
                  <a-button
                    type="success"
                    icon="plus"
                    @click="addPositionAccess()"
                    v-if="index == person.position_access.length - 1"
                  />
                  <a-button
                    type="danger"
                    icon="line"
                    @click="
                      removePositionAccess(person.position_access[index].key)
                    "
                    v-if="index < person.position_access.length - 1"
                  />
                </a-col>
              </a-row>

              <br />
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col
              class="form-addUser"
              v-if="current == 2"
              :span="24"
              style="margin: 0.2em 0px;"
            >
              <br />
              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :span="24" style="text-align:center">
                  <h3>ตรวจสอบรายละอียดข้อมูล</h3>
                </a-col>
              </a-row>
              <br />
              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :span="6" style="text-align:end">
                  <b>ชื่อ-นามสกุล (อังกฤษ):</b>
                </a-col>
                <a-col :span="6" v-model="nameEngVeri">
                  <span style="width:100%"> {{ nameEngVeri }} </span>
                  <!-- <a-input style="width:100%" v-model="nameEngVeri" /> -->
                </a-col>
              </a-row>
              <br />
              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :span="6" style="text-align:end" v-model="prefixVeri">
                  <b>ชื่อ-นามสกุล (ภาษาไทย): </b>
                </a-col>
                <a-col :span="6" v-model="nameThaiVeri">
                  <span style="width:100%">
                    {{ prefixVeri }} {{ nameThaiVeri }}
                  </span>
                  <!-- <a-input style="width:100%" v-model="nameThaiVeri" /> -->
                </a-col>
              </a-row>
              <br />
              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :span="2" style="text-align:end">
                  <b>ตำแหน่ง:</b>
                </a-col>
                <a-col :span="2" v-model="positionVeri">
                  <span style="width:100%"> {{ positionVeri }}</span>
                </a-col>
                <a-col :span="2" style="text-align:end">
                  <b> ที่อยู่:</b>
                </a-col>
                <a-col :span="2" v-model="addressVeri">
                  <span style="width:100%"> {{ addressVeri }}</span>
                </a-col>
              </a-row>
              <br />
              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :span="2" style="text-align:end">
                  <b>จังหวัด:</b>
                </a-col>
                <a-col :span="2" v-model="provinceVeri">
                  <span style="width:100%"> {{ provinceVeri }}</span>
                </a-col>
                <a-col :span="2" style="text-align:end">
                  <b> อำเภอ:</b>
                </a-col>
                <a-col :span="2" v-model="amphureVeri">
                  <span style="width:100%"> {{ amphureVeri }}</span>
                </a-col>
                <a-col :span="2" style="text-align:end">
                  <b> ตำบล:</b>
                </a-col>
                <a-col :span="2" v-model="districtVeri">
                  <span style="width:100%"> {{ districtVeri }}</span>
                </a-col>
                <a-col :span="2" style="text-align:end">
                  <b>รหัสไปรษณีย์:</b>
                </a-col>
                <a-col :span="2" v-model="zipcodeVeri">
                  <span style="width:100%"> {{ zipcodeVeri }}</span>
                </a-col>
              </a-row>
              <br />
              <!-- <hr style="width:90%" />
              <br />

              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :span="24" style="text-align:center">
                  <h3>ตรวจสอบสิทธิ์</h3>
                </a-col>
              </a-row>
              <br /> -->

              <!-- <a-row :gutter="[8, 8]">
                <a-col :span="24" :offset="10">
                  <b>ฝ่ายธุรการ</b>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" :offset="11">
                  <p>ระบบคำนวณภาระงาน</p>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" :offset="12">
                  <p>ข้อมูลรายวิชา</p>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" :offset="12">
                  <p>สรุปภาระงาน</p>
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="24" :offset="10">
                  <b>ฝ่ายบุคลากร</b>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" :offset="11">
                  <p>ระบบเบิกจ่ายวัสดุ</p>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" :offset="12">
                  <p>รายการเบิกจ่ายวัสดุ</p>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" :offset="12">
                  <p>เบิกจ่ายวัสดุ</p>
                </a-col>
              </a-row> -->
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px;">
              <div class="steps-action" style="text-align:right">
                <a-button
                  v-if="current > 0"
                  style="margin-right: 8px"
                  @click="prev"
                >
                  ย้อนกลับ
                </a-button>
                <router-link :to="{ path: '/permission_manage' }">
                  <a-button v-if="current == 0" style="margin-right: 8px">
                    ยกเลิก
                  </a-button>
                </router-link>
                <!-- <a-button
                  v-if="current < steps.length - 1"
                  type="primary"
                  @click="next"
                >
                  ถัดไป1
                </a-button> -->

                <a-button
                  v-if="current == 0"
                  type="primary"
                  @click="next1"
                  :disabled="!chackUsername_search"
                >
                  ถัดไป
                </a-button>

                <a-button v-if="current == 1" type="primary" @click="next2">
                  ถัดไป
                </a-button>
                <!-- <router-link :to="{ path: '/permission_manage' }">
                  <a-button v-if="current < steps.length - 1">
                    ยกเลิก
                  </a-button>
                </router-link> -->
                <router-link :to="{ path: '/permission_manage' }">
                  <a-button
                    v-if="current == steps.length - 1"
                    type="primary"
                    @click="saveUser()"
                  >
                    เสร็จสิ้น
                  </a-button>
                </router-link>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-modal
      v-model="visible_adduser"
      title="ตรวจสอบสิทธิ์การเข้าถึง"
      @ok="handleOk"
      :footer="null"
    >
      <a-table
        :columns="columns_modal_manage"
        :data-source="systemPositionAccess"
        size="small"
        :pagination="false"
        bordered
      >
        ]

        <span slot="expandedRowRender" slot-scope="record" style="margin: 0">
          <div v-for="(item, index) in record.sub_system" :key="index">
            <p v-if="item.sub_system_name_TH == null">
              ไม่มีระบบย่อย
            </p>
            <p v-else>
              {{ item.sub_system_name_TH }}
            </p>
          </div>
        </span>
        <!-- <template slot="title" >
            Header
          </template> -->
        <!-- <template slot="footer">
            Footer
          </template> -->
      </a-table>

      <!-- <a-row :gutter="[8, 8]">
        <a-col :span="24" v-model="system">
          <p>{{ system }}</p>
        </a-col>
      </a-row>

      <a-row :gutter="[8, 8]">
        <a-col :span="24" v-model="sub_system">
          <p>{{ sub_system }}</p>
        </a-col>
      </a-row> -->
    </a-modal>

    <a-modal
      v-model="visible_LDAP"
      title="เข้าสู่ระบบมหาวิทยาลัยบรูพาของท่านเพื่อเพิ่มผู้ใช้งาน"
      @ok="handleOk"
      :footer="null"
    >
      <a-crad id="cardLogin" v-if="this.loading">
        <a-row :gutter="[8, 8]">
          <!-- <a-col :span="24">
            <h1>Informatics System</h1>
          </a-col> -->
        </a-row>
        <a-row :gutter="[8, 16]">
          <a-col :span="24">
            <a-input
              type="text"
              placeholder="กรอกชื่อผู้ใช้"
              v-model="username"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-col>
          <a-col :span="24">
            <a-input
              type="password"
              placeholder="กรอกรหัสผ่าน"
              v-model="password"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-col>
        </a-row>
        <br />

        <a-row :gutter="[8, 8]">
          <a-col :span="24">
            <a-button
              type="primary"
              :style="{ width: '100%' }"
              @click="login()"
            >
              ค้นหาผู้ใช้งาน
            </a-button>
          </a-col>
        </a-row>
      </a-crad>
      <a-crad v-if="!this.loading">
        <a-row :gutter="[8, 8]">
          <vue-loading
            type="spin"
            color="blue"
            :size="{ width: '70px', height: '70px' }"
          ></vue-loading>
        </a-row>
        <br />
        <a-row :gutter="[8, 0]">
          <a-col :span="24">
            <p style="text-align:center"><b>ตรวจสอบบัญชีผู้ใช้</b></p>
          </a-col>
        </a-row>
      </a-crad>
    </a-modal>
  </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
const axios = require("axios");
const columns_modal_manage = [
  {
    title: "สิทธิ์การใช้งานระบบ",
    dataIndex: "system_name",
    key: "system_name",
    scopedSlots: { customRender: "system_name" },
  },
];
export default {
  data() {
    return {
      columns_modal_manage,
      person: {
        username_search: "",
        nameEng: "",
        lastnameEng: "",
        prefix_id: undefined,
        nameThai: "",
        lastnameThai: "",
        position_id: undefined,
        position_access: [
          {
            key: 1,
            position_access_id: undefined,
            sub_access: [],
          },
        ],
        address: "",
        province_id: undefined,
        amphure_id: undefined,
        district_id: undefined,
        zipcode: undefined,
        create_by: this.$store.state.user.user_id,
      },
      dataPrefix: [],
      dataAmphures: [],
      dataDistricts: [],
      dataProvinces: [],
      dataPosition: [],
      dataPositionAccess: [],
      systemPositionAccess: [],
      system: "",
      sub_system: "",
      prefixVeri: "",
      nameEngVeri: "",
      nameThaiVeri: "",
      firstnameVeri: "",
      lastnameVeri: "",
      positionVeri: "",
      addressVeri: "",
      provinceVeri: "",
      amphureVeri: "",
      districtVeri: "",
      zipcodeVeri: "",
      username_search: "",
      chackUsername_search: false,
      // positon: [
      //   { id: "1", name: "ฝ่ายธุระการ" },
      //   { id: "2", name: "บุคลากร" },
      //   { id: "3", name: "การเงิน" },
      // ],
      current: 0,
      steps: [
        {
          title: "กรอกข้อมูลส่วนตัว",
          content: "First-content",
        },
        {
          title: "กำหนดสิทธิ์",
          content: "Second-content",
        },
        {
          title: "ตรวจสอบ",
          content: "Last-content",
        },
      ],
      visible_adduser: false,
      visible_LDAP: false,
      loading: true,
      username: "",
      password: "",
      indexpostion: 1,
      checkLogin: false,
      // province_id: 11,
      checkUser: false,
    };
  },
  components: {
    VueLoading,
  },
  methods: {
    getAllPrefix() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getPrefixTh")
        .then(function(res) {
          console.log(res.data);
          const data = res.data;
          // console.log(data.results);
          data.results.forEach(function(ele, index) {
            let data = {
              key: index + 1,
              pf_id: ele.pf_id,
              pf_name_abbr: ele.pf_name_abbr,
            };
            self.dataPrefix.push(data);
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
              value: ele.id,
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
            let data = {
              key: index + 1,
              postion_id: ele.postion_id,
              postition_name: ele.postition_name,
            };
            self.dataPosition.push(data);
          });
          console.log(self.dataPosition);
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
              position_access_id: ele.postion_access_id,
              position_access_name_TH: ele.postion_access_name_TH,
              position_access_status: false,
            });
          });
          console.log(self.dataPositionAccess);
        });
    },
    getPositionDetail(index) {
      this.visible_adduser = true;
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
    login() {
      if (!this.checkSpecificKey(this.username)) {
        this.$notification["warning"]({
          message: "การแจ้งเตือน",
          description: "อักษรพิเศษและช่องว่างไม่สามารถกรอกได้",
          duration: 3,
        });
      } else if (this.username == "") {
        this.$notification["warning"]({
          message: "ชื่อผู้ใช้ ไม่ได้กรอกข้อมูล",
          description: "กรุณากรอกชื่อผู้ใช้",
          duration: 3,
        });
      } else if (this.password == "") {
        this.$notification["warning"]({
          message: "รหัสผ่าน ไม่ได้กรอกข้อมูล",
          description: "กรุณากรอกรหัสผ่าน",
          duration: 3,
        });
      } else {
        const self = this;
        self.loading = false;
        // console.log(self.person.username_search);
        // console.log(self.username);
        // console.log(self.password);

        axios
          .post("http://localhost:8080/personRouters/searcLdaphPerson", {
            username_search: self.username_search,
            username: self.username,
            password: self.password,
          })
          .then(function(response) {
            self.loading = true;
            const data = response.data;
            if (data.status) {
              self.$notification["success"]({
                message: "การแจ้งเตือน",
                description: "ค้นหาสำเร็จ",
                duration: 3,
              });
              self.chackUsername_search = true;
              self.person.username_search = self.username_search;
              self.person.nameEng = data.results.givenName;
              self.person.lastnameEng = data.results.sn;
              self.visible_LDAP = false;
              self.checkLogin = true;
            } else if (!data.authen) {
              self.$notification["error"]({
                message: "ไม่สามารถเข้าสู่ระบบได้",
                description: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                duration: 3,
              });
            } else {
              self.$notification["warning"]({
                message: "ไม่พบบัญชีผู้ใช้งาน",
                description: "กรุณาตรวจสอบใหม่อีกครั้ง",
                duration: 3,
              });
              self.visible_LDAP = false;
            }
          })
          .catch(function(error) {
            this.loading = true;
            console.log("error");
            console.log(error);
          });
      }
    },
    checkSpecificKey(data) {
      var specialKey =
        "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      for (var i = 0; i < data.length; i++) {
        if (specialKey.indexOf(data.substr(i, 1)) != -1) {
          return false;
        }
        if (data[i] == " ") {
          return false;
        }
      }
      return true;
    },
    onSearch(value) {
      const self = this;
      console.log(value);
      // for (var i = 0; i < this.person.username_search.length - 1; i++) {
      //   if (this.person.username_search[i] == " ") {
      //     this.$notification["warning"]({
      //       message: "อักษรพิเศษ",
      //       description: "Username ไม่สามารถใช้อักษรพิเศษ",
      //       duration: 1.5,
      //     });
      //     break;
      //   }
      axios
        .post("http://localhost:8080/personRouters/checkPerson", {
          person_username: value,
        })
        .then(function(res) {
          const data = res.data;
          console.log(data.status);
          if (data.status) {
            self.$notification["warning"]({
              message: "การแจ้งเตือน",
              description: "มีข้อมูลผู้ใช้งานอยู่ในระบบ",
              duration: 3,
            });
          }
          else if (value == "") {
            self.$notification["warning"]({
              message: "ชื่อผู้ใช้งาน ไม่ได้กรอกข้อมูล",
              description: "กรุณากรอกชื่อผู้ใช้งาน",
              duration: 3,
            });
          } else if (!self.checkSpecificKey(value)) {
            self.$notification["warning"]({
              message: "การแจ้งเตือน",
              description: "อักษรพิเศษและช่องว่างไม่สามารถกรอกได้",
              duration: 3,
            });
          } else {
            self.showModal_LDAP();
          }
        });
    },
    next1() {
      if (this.checkLogin) {
        this.current++;
      } else {
        this.$notification["warning"]({
          message: "การแจ้งเตือน",
          description: "ต้องทำการค้นหาข้อมูลผู้ใช้ก่อน",
          duration: 3,
        });
      }
    },
    next2() {
      this.current++;
      console.log(this.prefixVeri);
      console.log(this.person);
      this.nameEngVeri = this.person.nameEng + " " + this.person.lastnameEng;

      // this.nameThaiVeri =
      //   this.person.prefix_id == undefined ? "ไม่ได้ระบุ" : this.getPrefixId();

      if (this.person.prefix_id == undefined) {
        this.prefixVeri = "ไม่ได้ระบุ";
      } else {
        this.getPrefixId();
      }

      if (this.person.nameThai == "") {
        this.firstnameVeri = "ไม่ได้ระบุ";
      } else {
        this.firstnameVeri = this.person.nameThai;
      }

      if (this.person.lastnameThai == "") {
        this.lastnameVeri = "ไม่ได้ระบุ";
      } else {
        this.lastnameVeri = this.person.lastnameThai;
      }

      this.nameThaiVeri = this.firstnameVeri + " " + this.lastnameVeri;

      this.addressVeri =
        this.person.address == "" ? "ไม่ได้ระบุ" : this.person.address;

      if (this.person.position_id == undefined) {
        this.positionVeri = "ไม่ได้ระบุ";
      } else {
        this.getPositionId();
      }

      if (this.person.province_id == undefined) {
        this.provinceVeri = "ไม่ได้ระบุ";
      } else {
        this.getPervinceId();
      }

      if (this.person.amphure_id == undefined) {
        this.amphureVeri = "ไม่ได้ระบุ";
      } else {
        this.getAmphureId();
      }

      if (this.person.district_id == undefined) {
        this.districtVeri = "ไม่ได้ระบุ";
        this.zipcodeVeri = "ไม่ได้ระบุ";
      } else {
        this.getDistrictId();
      }
    },
    prev() {
      this.current--;
    },
    showModal_adduser() {
      this.visible_adduser = true;
    },
    showModal_LDAP() {
      this.visible_LDAP = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible_adduser = false;
      this.visible_LDAP = false;
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
    addPositionAccess() {
      this.person.position_access.push({
        key: this.indexpostion + 1,
        position_access_id: undefined,
        sub_access: [],
      });
      this.indexpostion++;
    },
    removePositionAccess(id) {
      this.person.position_access.splice(
        this.person.position_access.findIndex((ele) => ele.key == id),
        1
      );
    },
    saveUser() {
      const self = this;
      console.log("sukarnya", self.person);
      axios
        .post("http://localhost:8080/personRouters/insertPerson", self.person)
        .then(function(res) {
          console.log(res.data);
        });

      this.$notification["success"]({
        message: "การแจ้งเตือน",
        description: "เพิ่มผู้ใช้งานสำเร็จ",
        duration: 3,
      });
    },
    getPervinceId() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getPervinceId", {
          id: self.person.province_id,
        })
        .then(function(res) {
          const data = res.data;
          self.provinceVeri = data.results[0].name_th;
        });
    },
    getAmphureId() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getAmphureId", {
          id: self.person.amphure_id,
        })
        .then(function(res) {
          const data = res.data;
          self.amphureVeri = data.results[0].name_th;
        });
    },
    getDistrictId() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getDistrictId", {
          id: self.person.district_id,
        })
        .then(function(res) {
          const data = res.data;
          self.districtVeri = data.results[0].name_th;
          self.zipcodeVeri = data.results[0].zip_code;
        });
    },
    getPrefixId() {
      const self = this;
      // self.prefixVeri =
      //   self.dataPrefix[
      //     self.dataPrefix.findIndex(
      //       (ele) => ele.pf_id === self.person.prefix_id
      //     )
      //   ].pf_name_abbr;

      axios
        .post("http://localhost:8080/personRouters/getPrefixId", {
          pf_id: self.person.prefix_id,
        })
        .then(function(res) {
          const data = res.data;
          self.prefixVeri = data.results[0].pf_name;

          // console.log(self.person.prefix_id)
          // console.log(data.results[0].pf_name)
        });
    },
    getPositionId() {
      const self = this;
      axios
        .post("http://localhost:8080/personRouters/getPositionId", {
          postion_id: self.person.position_id,
        })
        .then(function(res) {
          const data = res.data;
          self.positionVeri = data.results[0].postition_name;
        });
    },
  },
  created() {
    this.getAllPrefix();
    this.getAllProvice();
    this.getAllPosition();
    this.getAllPositionAccess();
  },
};
</script>
<style lang="scss">
.add {
  .form-addUser {
    border: 1px solid;
    border-radius: 5px;
  }
}
</style>
