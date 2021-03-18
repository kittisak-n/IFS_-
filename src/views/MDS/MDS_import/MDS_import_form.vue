<template>
  <div id="reveal_form">
    <a-row :gutter="[8, 8]" type="flex" justify="center">
      <a-col :span="24">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="20" style="margin: 0.2em 0px;">
              <a-card-meta title="เพิ่มรายการนำเข้าวัสดุ/อุปกรณ์">
                <a-icon
                  slot="avatar"
                  type="folder-add"
                  :style="{
                    fontSize: '150%',
                  }"
                />
              </a-card-meta>
            </a-col>
          </a-row>
          <hr style="width:100%" />
          <br />
          <a-row :gutter="[8, 8]" type="flex" justify="start">
            <a-col :span="24" :style="{ fontSize: '120%' }">
              <b>ข้อมูลการสั่งซื้อ</b>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="2" :style="{ textAlign: 'end', margin: '0.2em 0px' }">
              <b>หมายเลขใบรายการ</b> :
            </a-col>
            <a-col :span="8">
              <a-input
                placeholder="หมายเลขใบรายการ"
                v-model="PurchaseOrder.purchase_order_code"
              />
            </a-col>
            <a-col :span="2" :style="{ textAlign: 'end', margin: '0.2em 0px' }">
              <b>ผู้จัดจำหน่าย</b>
            </a-col>
            <a-col :span="8">
              <a-input
                placeholder="ชื่อบริษัท"
                v-model="PurchaseOrder.purchase_order_company"
              />
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="2" :style="{ textAlign: 'end', margin: '0.2em 0px' }">
              <b>ยอดชำระ</b> :</a-col
            >
            <a-col :span="3">
              <a-input
                type="text"
                disabled
                v-model="PurchaseOrder.purchase_order_payment_amount"
              />
            </a-col>
            <a-col :span="2" :style="{ textAlign: 'end', margin: '0.2em 0px' }">
              <b>ภาษี (7%)</b> :
            </a-col>
            <a-col :span="3">
              <a-input
                type="text"
                disabled
                v-model="PurchaseOrder.purchase_order_vat_amount"
              />
            </a-col>
            <a-col :span="2" :style="{ textAlign: 'end', margin: '0.2em 0px' }">
              <b>ยอดชำระสุทธิ</b> :
            </a-col>

            <a-col :span="3">
              <a-input
                disabled
                type="text"
                :value="
                  parseFloat(PurchaseOrder.purchase_order_vat_amount) +
                  parseFloat(PurchaseOrder.purchase_order_payment_amount)
                    ? parseFloat(PurchaseOrder.purchase_order_vat_amount) +
                      parseFloat(PurchaseOrder.purchase_order_payment_amount)
                    : 0
                "
              />
            </a-col>
            <a-col :span="2" :style="{ textAlign: 'end', margin: '0.2em 0px' }">
              <b>จำนวน</b> :
            </a-col>
            <a-col :span="3">
              <a-input
                disabled
                type="number"
                min="1"
                :value="PurchaseOrder.purchase_suppiles.length"
              />
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="24" :style="{ fontSize: '120%' }">
              <b>รายการวัสดุนำเข้า</b>
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="24">
              <a-table
                :columns="columns_order_material"
                :data-source="PurchaseOrder.purchase_suppiles"
                :pagination="false"
                size="small"
                bordered
              >
                <span slot="key" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    {{ index + 1 }}
                  </div>
                </span>
                <span
                  slot="order_material_name"
                  slot-scope="text, record, index"
                >
                  <div :style="{ textAlign: 'center' }">
                    <a-select
                      show-search
                      v-model="
                        PurchaseOrder.purchase_suppiles[index].order_material_id
                      "
                      placeholder="กรอกชื่อวัสดุ"
                      style="width: 100%"
                      :default-active-first-option="false"
                      :show-arrow="false"
                      :filter-option="false"
                      :not-found-content="null"
                      @search="handleSearch"
                      @change="handleChange"
                    >
                      <a-select-option
                        v-for="item in optionMaterial"
                        :key="item.material_id"
                      >
                        {{ item.material_name }}
                      </a-select-option>
                    </a-select>
                  </div>
                </span>
                <span
                  slot="order_material_amount"
                  slot-scope="text, record, index"
                >
                  <div :style="{ textAlign: 'center' }">
                    <a-input
                      placeholder="จำนวนวัสดุ"
                      v-model="
                        PurchaseOrder.purchase_suppiles[index]
                          .order_material_amount
                      "
                      @change="summary()"
                    />
                  </div>
                </span>
                <span
                  slot="order_material_unit"
                  slot-scope="text, record, index"
                >
                  <div :style="{ textAlign: 'center' }">
                    <a-select
                      style="width: 100%"
                      v-model="
                        PurchaseOrder.purchase_suppiles[index].order_material_id
                      "
                      disabled
                    >
                      <a-select-option :value="null">
                        หน่วยนับ
                      </a-select-option>
                      <a-select-option
                        v-for="item in objMaterial"
                        :key="item.key"
                        :value="item.material_id"
                      >
                        {{ item.unit_name }}
                      </a-select-option>
                    </a-select>
                  </div>
                </span>
                <span
                  slot="order_material_price_per_unit"
                  slot-scope="text, record, index"
                >
                  <div :style="{ textAlign: 'center' }">
                    <a-input
                      placeholder="ราคาต่อหน่วย"
                      v-model="
                        PurchaseOrder.purchase_suppiles[index]
                          .order_material_price_per_unit
                      "
                      @change="summary()"
                    />
                  </div>
                </span>
                <span
                  slot="order_material_price"
                  slot-scope="text, record, index"
                >
                  <div :style="{ textAlign: 'center' }">
                    <a-input
                      disabled
                      placeholder="ราคารวมของวัสดุ"
                      :value="
                        parseFloat(
                          PurchaseOrder.purchase_suppiles[index]
                            .order_material_amount
                        ) *
                        parseFloat(
                          PurchaseOrder.purchase_suppiles[index]
                            .order_material_price_per_unit
                        )
                          ? parseFloat(
                              PurchaseOrder.purchase_suppiles[index]
                                .order_material_amount
                            ) *
                            parseFloat(
                              PurchaseOrder.purchase_suppiles[index]
                                .order_material_price_per_unit
                            )
                          : 0
                      "
                    />
                  </div>
                </span>
                <span slot="action" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>ลบข้อมูลวัสดุ</span>
                      </template>
                      <a-button
                        :disabled="PurchaseOrder.purchase_suppiles.length == 1"
                        type="danger"
                        icon="close"
                        @click="deleteRecordmaterial(index)"
                      >
                      </a-button>
                    </a-tooltip>
                  </div>
                </span>
              </a-table>
            </a-col>
          </a-row>
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="20">
              <a-button
                type="dashed"
                style="width:100%"
                icon="plus"
                @click="addRecordmaterial()"
                >เพิ่มรายการข้อมูล
              </a-button>
            </a-col>
          </a-row>

          <template slot="actions" class="ant-card-actions">
            <a-row :gutter="[8, 8]" type="flex" justify="center">
              <a-col :span="12" style="text-align:start">
                <a-button type="danger" style="width:25%;margin:0px 1.5%"
                  >ยกเลิก
                </a-button>
              </a-col>
              <a-col :span="12" style="text-align:end">
                <a-button
                  type="success"
                  style="width:25%;margin:0px 1.5%"
                  icon="save"
                  @click="SaveRecordmaterial()"
                  >บันทึกรายการ
                </a-button>
              </a-col>
            </a-row>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from "axios";

let timeout;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  function fake() {
    axios
      .post("http://localhost:8080/materialRouters/getMaterialOption", {
        material_name: value,
      })
      .then(function(res) {
        console.log(res);
        const data = res.data.results;
        const optionMaterial = [];
        data.forEach(function(ele) {
          optionMaterial.push({
            material_id: ele.material_id,
            material_name: ele.material_name,
          });
          console.log(optionMaterial);
          callback(optionMaterial);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  timeout = setTimeout(fake, 300);
}

export default {
  name: "reveal_form",
  components: {},
  data() {
    return {
      optionMaterial: [],
      objMaterial: [],
      indexPurchaseOrder: 2,
      PurchaseOrder: {
        purchase_order_code: null,
        purchase_order_company: null,
        purchase_order_amount: 0,
        purchase_order_payment_amount: 0,
        purchase_order_vat_amount: 0,
        purchase_order_by: this.$store.state.user.user_id,
        purchase_suppiles: [
          {
            key: 1,
            order_material_id: undefined,
            order_material_amount: 0,
            order_material_price_per_unit: 0,
          },
        ],
      },
      columns_order_material: [
        {
          title: "#",
          dataIndex: "key",
          key: "key",
          width: "3%",
          scopedSlots: {
            customRender: "key",
          },
        },
        {
          title: "รายการวัสดุ",
          dataIndex: "order_material_name",
          key: "order_material_name",
          width: "15%",
          scopedSlots: {
            customRender: "order_material_name",
          },
        },
        {
          title: "จำนวน",
          dataIndex: "order_material_amount",
          key: "order_material_amount",
          width: "7%",
          scopedSlots: {
            customRender: "order_material_amount",
          },
        },
        {
          title: "หน่วยนับ",
          dataIndex: "order_material_unit",
          key: "order_material_unit",
          width: "5%",
          scopedSlots: {
            customRender: "order_material_unit",
          },
        },
        {
          title: "ราคาต่อหน่วย",
          dataIndex: "order_material_price_per_unit",
          key: "order_material_price_per_unit",
          width: "5%",
          scopedSlots: {
            customRender: "order_material_price_per_unit",
          },
        },
        {
          title: "ราคารวม (บาท)",
          dataIndex: "order_material_price",
          key: "order_material_price",
          width: "5%",
          scopedSlots: {
            customRender: "order_material_price",
          },
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
          width: "5%",
          scopedSlots: {
            customRender: "action",
          },
        },
      ],
    };
  },
  methods: {
    filterOption(input, option) {
      console.log(option);
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    addRecordmaterial() {
      this.PurchaseOrder.purchase_suppiles.push({
        key: this.indexPurchaseOrder,
        order_material_id: undefined,
        order_material_amount: 0,
        order_material_price_per_unit: 0,
      });
      this.indexPurchaseOrder++;
    },
    deleteRecordmaterial(index) {
      this.PurchaseOrder.purchase_suppiles.splice(index, 1);
    },
    getMaterial() {
      const self = this;
      axios
        .post(self.$store.state.url + "/materialRouters/getMaterialOption", {
          material_name: "",
        })
        .then(function(res) {
          console.log(res);
          let data = res.data.results;
          data.forEach(function(ele, index) {
            self.objMaterial.push({
              key: index + 1,
              material_id: ele.material_id,
              unit_name: ele.unit_name,
            });
            console.log(self.objMaterial);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    summary() {
      const self = this;
      self.PurchaseOrder.purchase_order_payment_amount = 0;
      self.PurchaseOrder.purchase_order_vat_amount = 0;
      self.PurchaseOrder.purchase_suppiles.forEach((ele) => {
        self.PurchaseOrder.purchase_order_payment_amount +=
          ele.order_material_amount * ele.order_material_price_per_unit;
      });
      self.PurchaseOrder.purchase_order_vat_amount =
        (self.PurchaseOrder.purchase_order_payment_amount * 7) / 100;
    },
    SaveRecordmaterial() {
      const self = this;
      console.log(self.PurchaseOrder.purchase_suppiles);
      axios
        .post(
          self.$store.state.url + "/purchaseOrderRouters/insertPurchaseOrder",
          self.PurchaseOrder
        )
        .then(function(res) {
          console.log(res);
          self.$notification["success"]({
            message: "นำเข้าวัสดุเสร็จสิ้น",
            duration: 2,
          });
          self.$router.go(-1);
        })
        .catch(function(error) {
          console.log(error);
          self.$notification["error"]({
            message: "นำเข้าวัสดุเสร็จสิ้น",
            duration: 2,
          });
        });
    },
    handleSearch(value) {
      fetch(value, (optionMaterial) => (this.optionMaterial = optionMaterial));
    },
    handleChange(value) {
      console.log(value);

      fetch(value, (optionMaterial) => (this.optionMaterial = optionMaterial));
    },
  },
  created() {
    this.getMaterial();
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  min-height: 200px;
  padding: 20px;
}

.steps-action {
  margin-top: 24px;
  text-align: end;
}
</style>
