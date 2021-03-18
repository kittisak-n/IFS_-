<template>
  <div class="MDS_exchequer_adjust_suppiles">
    <a-row :gutter="[8, 8]">
      <a-col :span="10">
        <a-row :gutter="[8, 8]">
          <a-col :span="24">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px;">
                  <a-card-meta
                    :title="
                      'รายละเอียดวัสดุหมายเลข : ' + this.material.material_code
                    "
                  >
                    <a-icon
                      slot="avatar"
                      type="file-search"
                      :style="{
                        fontSize: '150%',
                      }"
                    />
                  </a-card-meta>
                </a-col>
              </a-row>
              <hr style="width:100%" />
              <a-row :gutter="[8, 8]" type="flex">
                <a-col :span="12" style="text-align:center">
                  <img
                    alt="example"
                    width="50%"
                    :src="this.material.material_image"
                  />
                </a-col>
                <a-col :span="12">
                  <p><b>หมายเลขวัสดุ</b> : {{ this.material.material_code }}</p>
                  <p><b>ชื่อวัสดุ</b> : {{ this.material.material_name }}</p>
                  <p><b>หมวดหมู่</b> : {{ this.material.material_type }}</p>
                  <p><b>หน่วยนับ </b> : {{ this.material.material_unit }}</p>
                  <p>
                    <b>จำนวนคงเหลือ </b> : {{ this.material.material_balance }}
                  </p>
                  <p>
                    <b>สถานะ </b> :
                    <a-tag :color="'#28a745'">
                      เบิกได้
                    </a-tag>
                  </p>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="24">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px;">
                  <a-card-meta
                    :title="
                      'รายการนำเข้าของวัสดุหมายเลข : ' +
                        this.material.material_code
                    "
                  >
                    <a-icon
                      slot="avatar"
                      type="inbox"
                      :style="{
                        fontSize: '150%',
                      }"
                    />
                  </a-card-meta>
                </a-col>
              </a-row>
              <hr style="width:100%" />
              <a-row :gutter="[8, 8]" type="flex">
                <a-col :span="24" style="text-align:center">
                  <a-table
                    :columns="columns_material_import"
                    :data-source="material_import"
                    :pagination="false"
                    size="small"
                    bordered
                  >
                    <span slot="key" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        {{ index + 1 }}
                      </div>
                    </span>
                    <span slot="material_import_code" slot-scope="text">
                      <div>
                        {{ text }}
                      </div>
                    </span>
                    <span slot="material_import_date" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="material_import_amount" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="material_import_balance" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="action" slot-scope="text, record">
                      <div :style="{ textAlign: 'center' }">
                        <a-button
                          icon="block"
                          type="info"
                          @click="
                            getMaterialList(
                              record.material_import_code,
                              record.material_import_id
                            )
                          "
                        />
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
      </a-col>
      <a-col :span="14">
        <a-card size="small" v-if="material_import_code !== ''">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px;">
              <a-card-meta
                :title="'รายการปรับยอดวัสดุหมายเลข : ' + material_import_code"
              >
                <a-icon
                  slot="avatar"
                  type="block"
                  :style="{
                    fontSize: '150%',
                  }"
                />
              </a-card-meta>
            </a-col>
          </a-row>
          <hr style="width:100%" />
          <a-row :gutter="[8, 8]" type="flex">
            <a-col :span="24">
              <a-table
                :columns="columns_material_adjust"
                :data-source="material_adjust"
                :pagination="false"
                size="small"
                bordered
              >
                <span slot="key" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    {{ index + 1 }}
                  </div>
                </span>
                <span slot="material_adjust_date" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="material_adjust_type" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="material_adjust_amount" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span
                  slot="material_adjust_adjust"
                  slot-scope="text, record, index"
                >
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="
                      index + 1 != material_adjust.length ||
                        record.material_adjust_balacne === 0
                    "
                  >
                    {{ text }}
                  </div>
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="
                      index + 1 == material_adjust.length &&
                        record.material_adjust_balacne !== 0
                    "
                  >
                    <a-input-number
                      :min="0"
                      :max="material_adjust[index - 1].material_adjust_balacne"
                      :default-value="0"
                      v-model="material_adjust[index].material_adjust_adjust"
                    />
                  </div>
                </span>
                <span
                  slot="material_adjust_balacne"
                  slot-scope="text, record, index"
                >
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 != material_adjust.length"
                  >
                    {{
                      record.material_adjust_amount -
                        record.material_adjust_adjust
                    }}
                  </div>
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 == material_adjust.length"
                  >
                    {{
                      record.material_adjust_amount -
                        record.material_adjust_adjust
                    }}
                  </div>
                </span>
                <span slot="material_adjust_creator" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span
                  slot="material_adjust_note"
                  slot-scope="text, record, index"
                >
                  <div
                    v-if="
                      index + 1 != material_adjust.length ||
                        record.material_adjust_balacne === 0
                    "
                  >
                    {{ text }}
                  </div>
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="
                      index + 1 == material_adjust.length &&
                        record.material_adjust_balacne !== 0
                    "
                  >
                    <a-input
                      v-model="material_adjust[index].material_adjust_note"
                      placeholder="หมายเหตุการปรับรายการ"
                    />
                  </div>
                </span>
                <span slot="action" slot-scope="text, record, index">
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 != material_adjust.length"
                  >
                    <div :style="{ textAlign: 'center' }">
                      <a-tooltip placement="top">
                        <template slot="title">
                          <span>ลบรายการปรับยอด</span>
                        </template>
                        <a-button
                          icon="close"
                          type="danger"
                          :disabled="
                            index === 0 || index < material_adjust.length - 2
                          "
                          @click="deleteAdjustmaterial(index)"
                        />
                      </a-tooltip>
                    </div>
                  </div>
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 == material_adjust.length"
                  >
                    <div :style="{ textAlign: 'center' }">
                      <a-tooltip placement="top">
                        <template slot="title">
                          <span>บันทึกรายการปรับยอด</span>
                        </template>
                        <a-button
                          icon="save"
                          type="success"
                          :disabled="record.material_adjust_balacne === 0"
                          @click="saveAdjustmaterial(index)"
                        />
                      </a-tooltip>
                    </div>
                  </div>
                </span>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
        <a-card size="small" v-if="material_import_code === ''">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px;">
              <a-card-meta :title="'รายการปรับยอดวัสดุ'">
                <a-icon
                  slot="avatar"
                  type="block"
                  :style="{
                    fontSize: '150%',
                  }"
                />
              </a-card-meta>
            </a-col>
          </a-row>
          <hr style="width:100%" />
          <a-row :gutter="[8, 8]" type="flex">
            <a-col :span="24"> </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  components: {},
  data() {
    return {
      month: [
        "ม.ค.",
        "ก.พ.",
        "มี.ค.",
        "เม.ย.",
        "พ.ค.",
        "มิ.ย.",
        "ก.ค.",
        "ส.ค.",
        "ก.ย.",
        "ต.ค.",
        "พ.ย.",
        "ธ.ค.",
      ],
      total: 0,
      current: 10,
      material_code_search: "",
      material_import_code: "",
      material_import_id_search: "",
      material: {},
      columns_material_import: [
        {
          title: "#",
          dataIndex: "key",
          key: "key",
          width: "3%",
          scopedSlots: {
            customRender: "key",
          },
          type: "flex",
          align: "top",
        },
        {
          title: "หมายเลขรายการนำเข้า",
          dataIndex: "material_import_code",
          key: "material_import_code",
          width: "15%",
          scopedSlots: {
            customRender: "material_import_code",
          },
        },
        {
          title: "วันที่นำเข้าวัสดุ",
          dataIndex: "material_import_date",
          key: "material_import_date",
          width: "10%",
          scopedSlots: {
            customRender: "material_import_date",
          },
        },
        {
          title: "จำนวน",
          children: [
            {
              title: "นำเข้า",
              dataIndex: "material_import_amount",
              key: "material_import_amount",
              width: "5%",
              scopedSlots: { customRender: "material_import_amount" },
            },
            {
              title: "คงเหลือ",
              dataIndex: "material_import_balance",
              key: "material_import_balance",
              width: "5%",
              scopedSlots: { customRender: "material_import_balance" },
            },
          ],
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
          width: "3%",
          scopedSlots: { customRender: "action" },
        },
      ],
      material_import: [],
      columns_material_adjust: [
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
          title: "วันที่",
          dataIndex: "material_adjust_date",
          key: "material_adjust_date",
          width: "5%",
          scopedSlots: {
            customRender: "material_adjust_date",
          },
        },
        {
          title: "ประเภท",
          dataIndex: "material_adjust_type",
          key: "material_adjust_type",
          width: "5%",
          scopedSlots: {
            customRender: "material_adjust_type",
          },
        },
        {
          title: "จำนวน",
          children: [
            {
              title: "ยอดเดิม",
              dataIndex: "material_adjust_amount",
              key: "material_adjust_amount",
              width: "6%",
              scopedSlots: { customRender: "material_adjust_amount" },
            },
            {
              title: "ปรับยอด",
              dataIndex: "material_adjust_adjust",
              key: "material_adjust_adjust",
              width: "5%",
              scopedSlots: { customRender: "material_adjust_adjust" },
            },
            {
              title: "คงเหลือ",
              dataIndex: "material_adjust_balacne",
              key: "material_adjust_balacne",
              width: "6%",
              scopedSlots: { customRender: "material_adjust_balacne" },
            },
          ],
        },
        {
          title: "ผู้ทำรายการ",
          dataIndex: "material_adjust_creator",
          key: "material_adjust_creator",
          width: "5%",
          scopedSlots: { customRender: "material_adjust_creator" },
        },
        {
          title: "หมายเหตุ",
          dataIndex: "material_adjust_note",
          key: "material_adjust_note",
          width: "10%",
          scopedSlots: { customRender: "material_adjust_note" },
        },
        {
          title: "ดำเนินการ",
          dataIndex: "action",
          key: "action",
          width: "3%",
          scopedSlots: { customRender: "action" },
        },
      ],
      material_adjust: [],
      index_adjust: 1,
    };
  },
  methods: {
    genDate(date) {
      const self = this;
      let dateThai = new Date(date).toISOString().split("T")[0];
      dateThai = `${dateThai.split("-")[2]} ${
        self.month[parseInt(dateThai.split("-")[1] - 1)]
      } ${parseInt(dateThai.split("-")[0]) + 543}`;
      return dateThai;
    },
    saveAdjustmaterial(index) {
      const self = this;
      console.log(index);
      let data = {
        purchase_order_id: self.material_import_id_search,
        material_adjust_amount:
          self.material_adjust[index].material_adjust_adjust,
        material_adjust_balance:
          self.material_adjust[index].material_adjust_balacne -
          self.material_adjust[index].material_adjust_adjust,
        material_adjust_create_by: self.$store.state.user.user_id,
        note:
          self.material_adjust[index].material_adjust_note != undefined
            ? self.material_adjust[index].material_adjust_note
            : " ",
      };
      console.log(data);
      axios
        .post(self.$store.state.url + "/adjustRouters/insertAdjust", data)
        .then(function(res) {
          console.log(res);

          self.material_adjust[index].material_adjust_id = res.data.results;
          console.log(self.material_adjust[index].material_adjust_id);
          self.material_adjust.push({
            key: self.index_adjust,
            material_adjust_id: undefined,
            material_adjust_date: self.genDate(new Date()),
            material_adjust_type: "ปรับยอด",
            material_adjust_amount: data.material_adjust_balance,
            material_adjust_adjust: 0,
            material_adjust_balacne: data.material_adjust_balance,
            material_adjust_creator: self.$store.state.user.user_name,
            material_adjust_note: undefined,
          });
          self.index_adjust++;
          self.material.material_balance =
            self.material.material_balance -
            self.material_adjust[index].material_adjust_adjust;
          self.material_import[
            self.material_import.findIndex(
              (ele) => ele.material_import_id === self.material_import_id_search
            )
          ].material_import_balance =
            self.material_import[
              self.material_import.findIndex(
                (ele) =>
                  ele.material_import_id === self.material_import_id_search
              )
            ].material_import_balance -
            self.material_adjust[index].material_adjust_adjust;
        });
    },
    deleteAdjustmaterial(index) {
      const self = this;
      console.log(index);
      let data = {
        material_adjust_id: self.material_adjust[index].material_adjust_id,
        purchase_order_id: self.material_import_id_search,
        material_adjust_amount:
          self.material_adjust[index].material_adjust_adjust,
        material_adjust_create_by: self.$store.state.user.user_id,
      };
      axios
        .post(self.$store.state.url + "/adjustRouters/deleteAdjust", data)
        .then(function(res) {
          console.log(res);
          self.index_adjust--;
          self.material_adjust[index + 1].key = "";
          self.material_adjust[index + 1].material_adjust_amount =
            self.material_adjust[index].material_adjust_balacne;
          self.material_adjust[index + 1].material_adjust_adjust = 0;
          self.material_adjust[index + 1].material_adjust_balacne =
            self.material_adjust[index].material_adjust_balacne;
          console.log(index);
          self.material.material_balance =
            self.material.material_balance +
            self.material_adjust[index].material_adjust_adjust;
          self.material_import[
            self.material_import.findIndex(
              (ele) => ele.material_import_id === self.material_import_id_search
            )
          ].material_import_balance =
            self.material_import[
              self.material_import.findIndex(
                (ele) =>
                  ele.material_import_id === self.material_import_id_search
              )
            ].material_import_balance +
            self.material_adjust[index].material_adjust_adjust;
          self.material_adjust.splice(index, 1);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getByMaterialCode() {
      const self = this;
      axios
        .post(self.$store.state.url + "/adjustRouters/getMaterialDetail", {
          material_code: self.material_code_search,
        })
        .then(function(res) {
          console.log(res);
          let data = res.data.results[0];
          console.log(data);
          let obj = {
            material_code: data.material_code,
            material_image: data.material_image,
            material_name: data.material_name,
            material_type: data.type_name,
            material_unit: data.unit_name,
            material_minimum: data.material_minimun,
            material_status: [
              {
                status: data.material_status,
                tag: data.material_status_tag,
              },
            ],
            material_balance: data.material_balance,
          };
          self.material = obj;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getMaterialimport() {
      const self = this;
      axios
        .post(self.$store.state.url + "/adjustRouters/getMaterialimport", {
          material_code: self.material_code_search,
          start: 1,
          end: 10,
        })
        .then(function(res) {
          console.log(res);
          let data = res.data.results;
          self.material_import = [];
          data.forEach(function(ele, index) {
            console.log(ele);
            self.material_import.push({
              key: index + 1,
              material_import_id: ele.purchase_order_material_id,
              material_import_code: ele.purchase_order_code,
              material_import_date: self.genDate(
                ele.purchase_order_material_create_date
              ),
              material_import_amount: ele.purchase_order_material_import_amount,
              material_import_balance:
                ele.purchase_order_material_balance_amount,
            });
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getMaterialList(material_import_code, material_import_id) {
      const self = this;
      self.material_import_code = material_import_code;
      self.material_import_id_search = material_import_id;
      console.log(material_import_code);
      axios
        .post(self.$store.state.url + "/adjustRouters/getAdjustlist", {
          material_code: self.material_code_search,
          purchase_order_material_id: self.material_import_id_search,
        })
        .then(function(res) {
          console.log("adjust");
          console.log(res);
          self.material_adjust = [];
          let balacne = 0;
          res.data.results.forEach(function(ele, index) {
            self.material_adjust.push({
              key: index + 1,
              material_adjust_id: ele.adjust_id,
              material_adjust_date: self.genDate(ele.adjust_date),
              material_adjust_type:
                ele.adjust_type === 1
                  ? "นำเข้าวัสดุ"
                  : ele.adjust_type === 2
                  ? "ปรับยอด"
                  : "เบิกจ่าย",
              material_adjust_amount: index == 0 ? ele.adjsut_amount : balacne,
              material_adjust_adjust: index == 0 ? balacne : ele.adjsut_amount,
              material_adjust_balacne: ele.adjust_balance,
              material_adjust_creator: ele.adjust_create_dy,
              material_adjust_note: ele.adjust_note,
            });
            balacne = ele.adjust_balance;
            console.log(ele.adjust_balance);
            self.index_adjust++;
          });
          console.log(balacne);
          self.material_adjust.push({
            key: self.index_adjust,
            material_adjust_id: undefined,
            material_adjust_date: self.genDate(new Date()),
            material_adjust_type: "ปรับยอด",
            material_adjust_amount: balacne,
            material_adjust_adjust: 0,
            material_adjust_balacne: balacne,
            material_adjust_creator: self.$store.state.user.user_name,
            material_adjust_note: undefined,
          });
          self.index_adjust++;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
  },
  created() {
    this.material_code_search = this.$route.query.material_code;
    this.getByMaterialCode();
    this.getMaterialimport();
  },
};
</script>

<style lang="scss">
.MDS_exchequer_adjust_suppiles {
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
      vertical-align: middle !important;
    }
  }
}
</style>
