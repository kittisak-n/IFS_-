<template>
  <div class="MDS_exchequer">
    <a-row :gutter="[8, 8]">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xxl="4">
        <a-card>
          <a-row>
            <a-col :span="5">
              <a-icon
                type="database"
                :style="{
                  fontSize: '580%',
                  color: '#1890ff',
                }"
              />
            </a-col>
            <a-col :span="19" style="text-align: end">
              <div class="text-head">วัสดุทั้งหมด</div>
              <div>
                <span class="text-number">
                  {{ this.material_report.total }}
                </span>
                รายการ
              </div>
              <div>วัสดุทั้งหมดที่มีในคลัง</div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xxl="5">
        <a-card>
          <a-row :gutter="[8, 8]">
            <a-col :span="5">
              <a-icon
                type="check-circle"
                :style="{
                  fontSize: '550%',
                  color: '#28a745',
                }"
              />
            </a-col>
            <a-col :span="19" style="text-align: end">
              <div class="text-head">รายการวัสดุที่เบิกได้</div>
              <div>
                <span class="text-number">
                  {{ this.material_report.reveal + " " }}
                </span>
                รายการ
              </div>
              <div>รายการวัสดุที่สามารถเบิกได้</div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xxl="5">
        <a-card>
          <a-row :gutter="[8, 8]">
            <a-col :span="5">
              <a-icon
                type="close-circle"
                :style="{
                  fontSize: '550%',
                }"
              />
            </a-col>
            <a-col :span="19" style="text-align: end">
              <div class="text-head">รายการวัสดุที่งดเบิก</div>
              <div>
                <span class="text-number">
                  {{ this.material_report.unreveal }}
                </span>
                รายการ
              </div>
              <div>รายการวัสดุที่ไม่สามารถเบิกได้</div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xxl="5">
        <a-card>
          <a-row>
            <a-col :span="4">
              <a-icon
                type="warning"
                :style="{
                  fontSize: '580%',
                  color: '#f0b95a',
                }"
              />
            </a-col>
            <a-col :span="20" style="text-align: end">
              <div class="text-head">รายการวัสดุใกล้หมดคลัง</div>
              <div>
                <span class="text-number">
                  {{ this.material_report.depleted }}
                </span>
                รายการ
              </div>
              <div>วัสดุที่คงเหลือน้อยกว่าค่าต่ำสุด</div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xxl="5">
        <a-card>
          <a-row>
            <a-col :span="4">
              <a-icon
                type="stop"
                :style="{
                  fontSize: '580%',
                  color: '#ff4d4f',
                }"
              />
            </a-col>
            <a-col :span="20" style="text-align: end">
              <div class="text-head">รายการวัสดุหมดคลัง</div>
              <div>
                <span class="text-number">
                  {{ this.material_report.undepleted }}
                </span>
                รายการ
              </div>
              <div>รายการวัสดุที่คงเหลือเป็น 0</div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[8, 8]">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xxl="24">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="20" style="margin: 0.2em 0px">
              <a-card-meta title="รายการวัสดุ/อุปกรณ์ : ปี 2563">
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
              <a-tooltip placement="top">
                <template slot="title">
                  <span>ส่งออกไฟล์ PDF</span>
                </template>
                <a-button
                  type="danger"
                  icon="file-pdf"
                  :style="{ marginRight: '3%' }"
                  @click="exportPDF()"
                />
              </a-tooltip>
              <a-button
                type="primary"
                icon="plus"
                @click="insertAndupdatematerial()"
              >
                เพิ่มรายการวัสดุ
              </a-button>
            </a-col>
          </a-row>
          <hr style="width: 100%" />
          <a-row :gutter="[8, 8]" type="flex" justify="end">
            <a-col :span="3" style="text-align: end">
              <a-select
                :default-value="0"
                style="width: 100%"
                v-model="status_search"
                @change="changeCondition()"
              >
                <a-select-option :value="0"> วัสดุทั้งหมด </a-select-option>
                <a-select-option :value="1">
                  วัสดุที่สามารถเบิกได้
                </a-select-option>
                <a-select-option :value="2"> วัสดุงดเบิก </a-select-option>
                <a-select-option :value="3">
                  วัสดุใกล้หมดสต๊อก
                </a-select-option>
                <a-select-option :value="4"> วัสดุหมดสต๊อก </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="5" style="text-align: end">
              <a-input-search
                placeholder="ค้นหาตามรหัส หรือ ชื่อวัสดุ"
                style="width: 100%"
                v-model="text_search"
                v-on:keyup.enter="changeCondition()"
              />
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="24">
              <a-table
                :columns="material_columns"
                :data-source="material_record"
                :pagination="false"
                size="small"
                bordered
              >
                <span slot="key" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">{{ text }}</div>
                </span>
                <span slot="material_image" slot-scope="text">
                  <div :style="{ textAlign: 'center', marginTop: '10%' }">
                    <img :src="text" alt="" />
                  </div>
                </span>
                <span slot="material_code" slot-scope="text, record">
                  <div :style="{ textAlign: 'left', fontSize: '16px' }">
                    <b>หมายเลขวัสดุ : </b> {{ record.material_code }}
                  </div>
                  <div :style="{ textAlign: 'left', fontSize: '16px' }">
                    <b>ชื่อวัสดุ : </b> {{ record.material_name }}
                  </div>
                  <div :style="{ textAlign: 'left', fontSize: '16px' }">
                    <b>หมวดหมู่ : </b>
                    {{ record.material_catergory }}
                  </div>
                  <div :style="{ textAlign: 'left', fontSize: '16px' }">
                    <b>จำนวนขั้นต่ำ : </b>
                    {{ record.material_minimun }}
                  </div>
                  <div :style="{ textAlign: 'left', fontSize: '16px' }">
                    <b>หน่วยนับ : </b> {{ record.material_unit }}
                  </div>
                  <div :style="{ textAlign: 'left', fontSize: '16px' }">
                    <b>สถานะ : </b>
                    <span>
                      <a-tag
                        v-for="tag in record.material_status"
                        :key="tag"
                        :color="
                          tag.status === 1
                            ? '#28a745'
                            : tag.status === 2
                            ? ''
                            : tag.status === 3
                            ? '#f0b95a'
                            : '#ff4d4f'
                        "
                      >
                        {{ tag.tag }}
                      </a-tag>
                    </span>
                  </div>
                  <br />
                  <div :style="{ textAlign: 'left', fontSize: '16px' }">
                    <a-button
                      type="warning"
                      icon="edit"
                      @click="insertAndupdatematerial(record.material_id)"
                    >
                      แก้ไขข้อมูลวัสดุ
                    </a-button>
                    <router-link
                      :to="{
                        path:
                          '/MDS_exchequer/MDS_exchequer_adjust_material?material_code=' +
                          record.material_code,
                      }"
                    >
                      <a-button type="info" icon="block">
                        ปรับยอดคงเหลือวัสดุ
                      </a-button>
                    </router-link>
                  </div>
                </span>
                <span slot="material_import" slot-scope="text, record">
                  <div :style="{ textAlign: 'center', fontSize: '16px' }">
                    {{ moneyFormat(parseInt(record.material_import)) }}
                  </div>
                </span>
                <span slot="material_export" slot-scope="text, record">
                  <div :style="{ textAlign: 'center', fontSize: '16px' }">
                    {{ moneyFormat(parseInt(record.material_export)) }}
                  </div>
                </span>
                <span slot="material_adjust" slot-scope="text, record">
                  <div :style="{ textAlign: 'center', fontSize: '16px' }">
                    {{ moneyFormat(parseInt(record.material_adjust)) }}
                  </div>
                </span>
                <span slot="material_balance" slot-scope="text, record">
                  <div :style="{ textAlign: 'center', fontSize: '16px' }">
                    {{ moneyFormat(parseInt(record.material_balance)) }}
                  </div>
                </span>
              </a-table>
            </a-col>
          </a-row>
          <br />
          <a-row>
            <a-col :span="15">
              <p
                :style="{ margin: '0.3em 0.5%' }"
                v-if="this.total_search != 0"
              >
                {{ this.start_search }} -
                {{
                  this.end_search > this.total_search
                    ? this.total_search
                    : this.end_search
                }}
                จาก {{ this.total_search }} รายการ
              </p>
              <p
                :style="{ margin: '0.3em 0.5%' }"
                v-if="this.total_search == 0"
              >
                ไม่พบรายการที่ค้นหา
              </p>
            </a-col>
            <a-col :span="9" :style="{ textAlign: 'Right' }">
              แสดงทีละ
              <a-select
                default-value="10"
                v-model="PageSize"
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
                :total="total_search"
                :page-size="PageSize"
                @change="changePageTable(current)"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      name="insert_and_edit_material"
      width="800px"
      centered
      v-model="materialModal"
      :title="title_modal_edit"
    >
      <a-row :gutter="[24, 16]">
        <a-col :span="11">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="uploadimage"
          >
            <img
              v-if="material.material_image"
              :src="material.material_image"
              alt="avatar"
            />
            <div style="width: auto" v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">เลือกรูปวัสดุ <br /> ขนาดรูปไม่เกิน 20 KB</div>
            </div>
          </a-upload>
        </a-col>
        <a-col :span="13">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" class="label"> ชื่อวัสดุ </a-col>
            <a-col :span="24">
              <a-input
                width="100%"
                placeholder="ชื่อวัสดุ"
                v-model="material.material_name"
              />
            </a-col>
            <a-col :span="24" class="label"> หมวดหมู่วัสดุ </a-col>
            <a-col :span="24">
              <a-select
                v-model="material.material_type"
                style="width: 100%"
                :disabled="this.material_id == null ? disabled : ''"
              >
                <a-select-option :value="null" disabled>
                  โปรดเลือกหมวดหมู่วัสดุ
                </a-select-option>
                <a-select-option
                  v-for="item in this.type"
                  :key="item.key"
                  :value="item.type_id"
                >
                  {{ item.type_name }}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="14" class="label"> จำนวนขั้นต่ำ </a-col>
            <a-col :span="10" class="label"> หน่วยนับ </a-col>
            <a-col :span="14">
              <a-input
                width="100%"
                placeholder="ชื่อวัสดุ"
                type="number"
                min="0"
                v-model="material.material_minimum"
              />
            </a-col>
            <a-col :span="10">
              <a-select v-model="material.material_unit" style="width: 100%">
                <a-select-option :value="null" disabled>
                  โปรดเลือกหน่วยนับวัสดุ
                </a-select-option>
                <a-select-option
                  v-for="item in this.unit"
                  :key="item.key"
                  :value="item.unit_id"
                >
                  {{ item.unit_name }}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="24" class="label"> สถานะการเบิกจ่าย </a-col>
            <a-col :span="24">
              <a-select v-model="material.material_status" style="width: 100%">
                <a-select-option :value="1"> เบิกได้ </a-select-option>
                <a-select-option :value="2"> งดเบิก </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <template slot="footer">
        <a-row :gutter="[8, 8]">
          <a-col :span="12" :style="{ textAlign: 'start' }">
            <a-button type="danger"> ยกเลิก </a-button>
          </a-col>
          <a-col :span="12">
            <a-button type="success" icon="save" @click="savematerial()">
              บันทึก
            </a-button>
          </a-col>
        </a-row>
      </template>
    </a-modal>
  </div>
</template>
<script>
const axios = require("axios");
import pdfMake from "pdfmake";
import pdfFonts from "@/assets/fontsPDF/THSarabunPsk-fonts.js"; // 1. import custom fonts

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "MDS_exchequer",
  data() {
    return {
      material_report: {
        total: 0,
        reveal: 0,
        unreveal: 0,
        depleted: 0,
        undepleted: 0,
      },
      start_search: 1,
      end_search: 10,
      PageSize: 10,
      total_search: 0,
      current: 1,
      text_search: "",
      condition: "",
      status_search: 0,
      title_modal_edit: "",
      material_columns: [
        {
          title: "#",
          dataIndex: "key",
          key: "key",
          width: "2%",
          scopedSlots: {
            customRender: "key",
          },
          type: "flex",
          align: "top",
        },
        {
          title: "รูปภาพ",
          dataIndex: "material_image",
          key: "material_image",
          width: "5%",
          scopedSlots: {
            customRender: "material_image",
          },
        },
        {
          title: "รายการ",
          dataIndex: "material_code",
          key: "material_code",
          width: "15%",
          scopedSlots: {
            customRender: "material_code",
          },
        },
        {
          title: "จำนวนวัสดุ",
          children: [
            {
              title: "นำเข้า",
              dataIndex: "material_import",
              key: "material_import",
              width: "5%",
              scopedSlots: { customRender: "material_import" },
            },
            {
              title: "เบิกจ่าย",
              dataIndex: "material_export",
              key: "material_export",
              width: "5%",
              scopedSlots: { customRender: "material_export" },
            },
            {
              title: "ปรับยอด",
              dataIndex: "material_adjust",
              key: "material_adjust",
              width: "5%",
              scopedSlots: { customRender: "material_adjust" },
            },
            {
              title: "คงเหลือ",
              dataIndex: "material_balance",
              key: "material_balance",
              width: "5%",
              scopedSlots: { customRender: "material_balance" },
            },
          ],
        },
      ],
      material_record: [],
      material_id: null,

      //สำหรัชการเพิ่มหรืออัพเดตวัสดุ
      unit: [],
      type: [],
      material: {},
      materialModal: false,
      data_store: [],
    };
  },
  methods: {
    genDate(date) {
      const month = [
        "มกราคม",
        "กุมพาพันธ์",
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
      ];
      let dateThai = new Date(date).toISOString().split("T")[0];
      dateThai = `${dateThai.split("-")[2]} ${
        month[parseInt(dateThai.split("-")[1]) - 1]
      } ${parseInt(dateThai.split("-")[0]) + 543}`;
      return dateThai;
    },
    getMaterialReport() {
      const self = this;
      axios
        .post(self.$store.state.url + "/materialRouters/getMaterialTotal")
        .then(function (res) {
          self.material_report = res.data.results[0];
        });
    },
    getCondition() {
      const self = this;
      self.condition = "";
      self.condition +=
        'where (mt.material_code LIKE "%' +
        self.text_search +
        '%" or mt.material_name LIKE "%' +
        self.text_search +
        '%")';
      if (this.status_search != 0) {
        if (this.status_search == 1 || this.status_search == 2) {
          self.condition += "and mt.material_status = " + this.status_search;
        } else if (this.status_search == 3) {
          self.condition +=
            "\n and mt.material_balance < mt.material_minimun and mt.material_balance != 0";
        } else {
          self.condition += "\n and mt.material_balance = 0";
        }
      }
    },
    getMaterialRecord() {
      const self = this;
      self.getCondition();
      axios
        .post(self.$store.state.url + "/materialRouters/getRecordMaterial", {
          condition: self.condition,
        })
        .then(function (response) {
          console.log(response);
          self.total_search = response.data.results[0].total_Row;
          // const data = response.data;
          self.getMaterialByCondition();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getMaterialByCondition() {
      const self = this;
      self.getCondition();
      self.material_record = [];
      axios
        .post(
          self.$store.state.url + "/materialRouters/getMaterialByCondition",
          {
            condition: self.condition,
            start: self.start_search,
            end: self.end_search,
          }
        )
        .then(function (response) {
          console.log(response);
          const data = response.data;
          self.generateMaterial(data.results);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    generateMaterial(Material) {
      const self = this;
      Material.forEach(function (ele) {
        let materail = {
          key: ele.num,
          material_id: ele.material_id,
          material_image: ele.material_image,
          material_code: ele.material_code,
          material_name: ele.material_name,
          material_catergory: ele.type_name,
          material_unit: ele.unit_name,
          material_status: [
            {
              status: ele.material_status,
              tag: ele.material_status_tag,
            },
          ],
          material_minimun: ele.material_minimun,
          material_import: ele.material_import,
          material_export: ele.material_export,
          material_adjust: ele.material_adjust,
          material_balance: ele.material_balance,
        };

        if (ele.material_balance == 0) {
          let status_tag = {
            status: 4,
            tag: "วัสดุหมดคลัง",
          };
          materail.material_status.push(status_tag);
        } else if (ele.material_balance < ele.material_minimun) {
          let status_tag = {
            status: 3,
            tag: "วัสดุใกล้หมดคลัง",
          };
          materail.material_status.push(status_tag);
        }
        self.material_record.push(materail);
      });
    },
    changePageTable(current) {
      console.log(current);
      const self = this;
      self.start_search = self.PageSize * (current - 1) + 1;
      self.end_search = self.PageSize * (current - 1) + parseInt(self.PageSize);
      console.log(self.start_search);
      console.log(self.end_search);
      self.getMaterialByCondition();
    },
    changeCondition() {
      const self = this;
      self.start_search = 1;
      self.end_search = self.PageSize;
      self.getMaterialRecord();
    },
    getUnitMaterial() {
      const self = this;
      axios
        .post(self.$store.state.url + "/unitRouters/getAllUnit")
        .then(function (res) {
          console.log(res);
          res.data.results.forEach(function (ele, index) {
            let eleUnit = {
              key: index + 1,
              unit_id: ele.unit_id,
              unit_name: ele.unit_name,
            };
            self.unit.push(eleUnit);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getTypeMaterial() {
      const self = this;
      axios
        .post(self.$store.state.url + "/typeRouters/getAlltype")
        .then(function (res) {
          console.log(res);
          res.data.results.forEach(function (ele, index) {
            let eleUnit = {
              key: index + 1,
              type_id: ele.type_id,
              type_name: ele.type_name,
            };
            self.type.push(eleUnit);
          });
          console.log(self.type);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    uploadimage(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.material.material_image = imageUrl;
          this.loading = false;
        });
      }
    },
    savematerial() {
      console.log(this.material);
      if (this.material_id == null) {
        this.insertMaterial();
      } else {
        this.updateMaterial();
      }
      this.materialModal = false;
    },
    insertAndupdatematerial(material_id = null) {
      if (material_id == null) {
        this.material_id = null;
        let data = {
          material_image: null,
          material_name: null,
          material_type: null,
          material_unit: null,
          material_minimum: 0,
          material_status: 1,
        };
        this.material = data;
        this.title_modal_edit = "เพิ่มรายการวัสดุ";
      } else {
        this.material_id = material_id;
        this.title_modal_edit = "แก้ไขรายการวัสดุ";

        let obj = this.material_record.find(
          (item) => item.material_id === material_id
        );
        console.log(obj);
        let data = {
          material_id: material_id,
          material_image: obj.material_image,
          material_name: obj.material_name,
          material_type: this.type.find(
            (item) => item.type_name === obj.material_catergory
          ).type_id,
          material_unit: this.unit.find(
            (item) => item.unit_name === obj.material_unit
          ).unit_id,
          material_minimum: obj.material_minimun,
          material_status: obj.material_status[0].status,
        };
        this.material = data;
      }
      this.materialModal = true;
    },
    insertMaterial() {
      const self = this;
      axios
        .post(
          self.$store.state.url + "/materialRouters/insertMaterial",
          self.material
        )
        .then(function (res) {
          console.log(res);
          self.$notification["success"]({
            message: "เพิ่มข้อมูลวัสดุเสร็จสิ้น",
            duration: 2,
          });
          self.getMaterialReport();
          self.getMaterialRecord();
        })
        .catch(function (err) {
          console.log(err);
          self.$notification["error"]({
            message: "เพิ่มข้อมูลวัสดุไม่สำเร็จ",
            duration: 2,
          });
        });
    },
    updateMaterial() {
      const self = this;
      axios
        .post(
          self.$store.state.url + "/materialRouters/updateMaterial",
          self.material
        )
        .then(function (res) {
          console.log(res);
          self.$notification["success"]({
            message: "แก้ไขข้อมูลวัสดุเสร็จสิ้น",
            duration: 2,
          });
          self.getMaterialReport();
          self.getMaterialRecord();
          self.material_id = null;
        })
        .catch(function (err) {
          console.log(err);
          self.$notification["error"]({
            message: "เพิ่มข้อมูลวัสดุไม่สำเร็จ",
            duration: 2,
          });
        });
    },
    exportPDF() {
      let self = this;
      axios
        .post(self.$store.state.url + "/materialRouters/getMt")
        .then(function (res) {
          res.data.results.forEach(function (ele, index) {
            self.data_store.push({
              number: index + 1,
              serial_number: ele.material_code,
              name_product: ele.material_name,
              catagories: ele.type_name,
              import: ele.material_import,
              export: ele.material_export,
              change: ele.material_adjust,
              total: ele.material_balance,
            });
          });
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
          var docDefinition = {
            pageSize: "A4",
            content: [
              {
                text: "ใบรายการวัสดุ",
                style: "header",
              },
              {
                text: "วันที่ " + self.genDate(new Date()),
                style: "date",
              },
              {
                text: "",
                style: "date",
              },
              {
                table: {
                  widths: [30, "*", "*", "*", "*", "*", "*", "*"],
                  heights: ["*", "*", "*", "*", "*", "*", "*", "*"],
                  body: body,
                },
              },
            ],
            // footer: function(currentPage, pageCount) {
            //   return currentPage.toString() + " of " + pageCount;
            // },
            defaultStyle: {
              font: "THSarabunPsk",
            },
            styles: {
              tableheader: {
                bold: true,
                alignment: "center",
              },
              header: {
                fontSize: 28,
                bold: true,
                alignment: "center",
              },
              date: {
                fontSize: 16,
                bold: false,
                alignment: "right",
              },
            },
          };
          self.data_store = [];
          pdfMake.createPdf(docDefinition).open({}, window.open());
        });
    },
    moneyFormat(price) {
      const pieces = parseFloat(price).toFixed(2).split("");
      let ii = pieces.length - 3;
      while ((ii -= 3) > 0) {
        pieces.splice(ii, 0, ",");
      }
      return pieces.join("");
    },
  },
  created() {
    this.getMaterialReport();
    this.getMaterialRecord();
    this.getUnitMaterial();
    this.getTypeMaterial();
  },
  // data() {
  //   return {
  //     current: 1,
  //     total: 10,

  //     material_total: 0,
  //     Reveal: 0,
  //     unReveal: 0,
  //     //out of stock
  //     ofs: 0,
  //     uofs: 0,

  //     status_search: 0,
  //     text_search: "",
  //     material_columns: [
  //       {
  //         title: "#",
  //         dataIndex: "material_id",
  //         key: "material_id",
  //         width: "2%",
  //         scopedSlots: {
  //           customRender: "material_id",
  //         },
  //         type: "flex",
  //         align: "top",
  //       },
  //       {
  //         title: "รูปภาพ",
  //         dataIndex: "material_image",
  //         key: "material_image",
  //         width: "5%",
  //         scopedSlots: {
  //           customRender: "material_image",
  //         },
  //       },
  //       {
  //         title: "รายการ",
  //         dataIndex: "material_code",
  //         key: "material_code",
  //         width: "15%",
  //         scopedSlots: {
  //           customRender: "material_code",
  //         },
  //       },
  //       {
  //         title: "จำนวนวัสดุ",
  //         children: [
  //           {
  //             title: "นำเข้า",
  //             dataIndex: "material_import",
  //             key: "material_import",
  //             width: "5%",
  //             scopedSlots: { customRender: "material_import" },
  //           },
  //           {
  //             title: "เบิกจ่าย",
  //             dataIndex: "material_export",
  //             key: "material_export",
  //             width: "5%",
  //             scopedSlots: { customRender: "material_export" },
  //           },
  //           {
  //             title: "ปรับยอด",
  //             dataIndex: "material_adjust",
  //             key: "material_adjust",
  //             width: "5%",
  //             scopedSlots: { customRender: "material_adjust" },
  //           },
  //           {
  //             title: "คงเหลือ",
  //             dataIndex: "material_balance",
  //             key: "material_balance",
  //             width: "5%",
  //             scopedSlots: { customRender: "material_balance" },
  //           },
  //         ],
  //       },
  //     ],

  //     material_record: [],
  //     title_modal_edit: "",
  //     material: {},
  //     material_insert: false,
  //     visible: false,
  //     loading: false,
  //     imageUrl: "",
  //     unit: [
  //       {
  //         key: 1,
  //         text: "รีม",
  //       },
  //       {
  //         key: 2,
  //         text: "ด้าม",
  //       },
  //       {
  //         key: 3,
  //         text: "ม้วน",
  //       },
  //       {
  //         key: 4,
  //         text: "กล่อง",
  //       },
  //     ],
  //     catergory: [
  //       {
  //         key: 1,
  //         text: "อุปกรณ์สำนักงาน",
  //       },
  //       {
  //         key: 2,
  //         text: "อุปกรณ์ทั่วไป",
  //       },
  //     ],
  //     columns_material_detail: [
  //       {
  //         title: "#",
  //         dataIndex: "index",
  //         key: "index",
  //         width: "2%",
  //         scopedSlots: {
  //           customRender: "index",
  //         },
  //       },
  //       {
  //         title: "วันที่รายการ",
  //         dataIndex: "material_detail_date",
  //         key: "material_detail_date",
  //         width: "7%",
  //         scopedSlots: {
  //           customRender: "material_detail_date",
  //         },
  //       },
  //       {
  //         title: "ประเภท",
  //         dataIndex: "material_detail_type",
  //         key: "material_detail_type",
  //         width: "7%",
  //         scopedSlots: {
  //           customRender: "material_detail_type",
  //         },
  //       },
  //       {
  //         title: "จำนวน",
  //         dataIndex: "material_detail_amount",
  //         key: "material_detail_amount",
  //         width: "7%",
  //         scopedSlots: {
  //           customRender: "material_detail_amount",
  //         },
  //       },
  //       {
  //         title: "คงเหลือ",
  //         dataIndex: "material_detail_balance",
  //         key: "material_detail_balance",
  //         width: "7%",
  //         scopedSlots: {
  //           customRender: "material_detail_balance",
  //         },
  //       },
  //       {
  //         title: "หมายเหตุ",
  //         dataIndex: "material_detail_note",
  //         key: "material_detail_note",
  //         width: "10%",
  //         scopedSlots: {
  //           customRender: "material_detail_note",
  //         },
  //       },
  //     ],
  //     material_detail: [
  //       {
  //         key: 1,
  //         material_detail_date: "10 ธันวาคม 2563",
  //         material_detail_type: "เบิกจ่าย",
  //         material_detail_amount: 25,
  //         material_detail_balance: 65,
  //         material_detail_note: "",
  //       },
  //       {
  //         key: 2,
  //         material_detail_date: "5 ธันวาคม 2563",
  //         material_detail_type: "ปรับยอด",
  //         material_detail_amount: 10,
  //         material_detail_balance: 90,
  //         material_detail_note: "วัสดุชำรุด/เสียหาย",
  //       },
  //       {
  //         key: 3,
  //         material_detail_date: "3 ธันวาคม 2563",
  //         material_detail_type: "นำเข้า",
  //         material_detail_amount: 50,
  //         material_detail_balance: 100,
  //         material_detail_note: "",
  //       },
  //       {
  //         key: 3,
  //         material_detail_date: "1 ธันวาคม 2563",
  //         material_detail_type: "นำเข้า",
  //         material_detail_amount: 50,
  //         material_detail_balance: 50,
  //         material_detail_note: "",
  //       },
  //     ],
  //   };
  // },
  // methods: {
  //   getMeterial() {
  //     const self = this;
  //     self.material_record = [];
  //     axios
  //       .post(self.$store.state.url + "/materialRouters/getMaterialAll")
  //       .then(function(response) {
  //         const data = response.data;
  //         console.log(data);
  //         self.material_total = data.results.length;
  //         self.generateMaterial(data.results);
  //         data.results.forEach(function(ele) {
  //           ele.material_status == 1 ? self.Reveal++ : self.unReveal++;
  //           ele.material_balance == 0
  //             ? self.uofs++
  //             : ele.material_balance < ele.material_minimun
  //             ? self.ofs++
  //             : "";
  //         });
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //       });
  //   },
  //   getMeterialByCondition() {
  //     const self = this;
  //     self.material_record = [];
  //     let condition = "";
  //     condition +=
  //       'where (mt.material_code LIKE "%' +
  //       this.text_search +
  //       '%" or mt.material_name LIKE "%' +
  //       this.text_search +
  //       '%")';

  //     if (this.status_search != 0) {
  //       if (this.status_search == 1 || this.status_search == 2) {
  //         condition += "and mt.material_status = " + this.status_search;
  //       } else if (this.status_search == 3) {
  //         condition +=
  //           "\n and mt.material_balance < mt.material_minimun and mt.material_balance != 0";
  //       } else {
  //         condition += "\n and mt.material_balance = 0";
  //       }
  //     }

  //     axios
  //       .post(
  //         self.$store.state.url + "/materialRouters/getMaterialByCondition",
  //         {
  //           condition: condition,
  //         }
  //       )
  //       .then(function(response) {
  //         const data = response.data;
  //         self.generateMaterial(data.results);
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //       });
  //   },
  //   generateMaterial(Material) {
  //     const self = this;
  //     Material.forEach(function(ele, index) {
  //       let materail = {
  //         key: index,
  //         material_id: ele.material_id,
  //         material_image: ele.material_image,
  //         material_code: ele.material_code,
  //         material_name: ele.material_name,
  //         material_catergory: ele.type_name,
  //         material_unit: ele.unit_name,
  //         material_status: [
  //           {
  //             status: ele.material_status,
  //             tag: ele.material_status_tag,
  //           },
  //         ],
  //         material_minimun: ele.material_minimun,
  //         material_import: ele.material_import,
  //         material_export: ele.material_export,
  //         material_adjust: ele.material_adjust,
  //         material_balance: ele.material_balance,
  //       };

  //       if (ele.material_balance == 0) {
  //         let status_tag = {
  //           status: 4,
  //           tag: "วัสดุหมดคลัง",
  //         };
  //         materail.material_status.push(status_tag);
  //       } else if (ele.material_balance < ele.material_minimun) {
  //         let status_tag = {
  //           status: 3,
  //           tag: "วัสดุใกล้หมดคลัง",
  //         };
  //         materail.material_status.push(status_tag);
  //       }

  //       self.material_record.push(materail);
  //     });
  //     console.log(self.material_record);
  //   },

  //   canclematerial() {
  //     this.material_insert = false;
  //   },

  // created() {
  //   this.getMeterialByCondition();
  // },
};
</script>
<style lang="scss">
.MDS_exchequer {
  .text-head {
    font-size: 135%;
    font-weight: 600;
  }
  .text-number {
    font-size: 135%;
    font-weight: 600;
  }

  .btn-margi_two {
    .ant-btn {
      margin-right: 1%;
    }
  }
  .ant-table {
    img {
      width: 120px;
      width: 120px;
    }
    th {
      font-size: 16px;
      font-weight: 600;
    }
    td {
      vertical-align: top;
    }
  }

  .label {
    font-size: 16px;
    font-weight: 500;
  }
}
.ant-upload {
  width: 100% !important;
  height: 309px !important;
  img {
    width: 100% !important;
    height: 309px !important;
  }
}
</style>
