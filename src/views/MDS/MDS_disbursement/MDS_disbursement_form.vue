<template>
  <div id="reveal_form">
    <a-row :gutter="[8, 8]" type="flex" justify="center">
      <a-col :span="24">
        <a-card size="small" title="ใบเบิกวัสดุ">
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="24">หมายเหตุการเบิกวัสดุ </a-col>
            <a-col :span="24"
              ><a-input
                v-model="material.material_note"
                placeholder="วัตถุประสงค์การเบิกวัสดุ"
              />
            </a-col>
          </a-row>
          <br />
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="24"> รายการเบิกวัสดุ</a-col>
          </a-row>
          <a-row :gutter="[8, 8]" type="flex" justify="center">
            <a-col :span="24">
              <a-table
                :columns="columns_material"
                :data-source="material.material_list"
                :pagination="false"
                size="small"
                bordered
              >
                <span slot="key" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    {{ index + 1 }}
                  </div>
                </span>
                <span slot="material_name" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    <a-select
                      show-search
                      v-model="material.material_list[index].material_id"
                      placeholder="ชื่อวัสดุ"
                      option-filter-prop="children"
                      style="width: 100%"
                      :filter-option="filterOptionMaterial"
                    >
                      <a-select-option
                        v-for="item in optionMaterial"
                        :key="item.key"
                        :value="item.material_id"
                        :disabled="
                          material.material_list.find(
                            (ele) => ele.material_id == item.material_id
                          ) || item.material_balance == 0
                        "
                      >
                        {{ item.material_name }}
                      </a-select-option>
                    </a-select>
                  </div>
                </span>
                <span slot="material_unit" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    {{
                      optionMaterial.findIndex(
                        (ele) =>
                          ele.material_id ===
                          material.material_list[index].material_id
                      ) != -1
                        ? optionMaterial[
                            optionMaterial.findIndex(
                              (ele) =>
                                ele.material_id ===
                                material.material_list[index].material_id
                            )
                          ].material_unit
                        : ""
                    }}
                  </div>
                </span>
                <span slot="material_balance" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    {{
                      optionMaterial.findIndex(
                        (ele) =>
                          ele.material_id ===
                          material.material_list[index].material_id
                      ) != -1
                        ? optionMaterial[
                            optionMaterial.findIndex(
                              (ele) =>
                                ele.material_id ===
                                material.material_list[index].material_id
                            )
                          ].material_balance
                        : ""
                    }}
                  </div>
                </span>
                <span slot="material_reveal" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    <a-input-number
                      style="width: 100%"
                      v-model="material.material_list[index].material_reveal"
                      :min="1"
                      :max="
                        optionMaterial.findIndex(
                          (ele) =>
                            ele.material_id ===
                            material.material_list[index].material_id
                        ) != -1
                          ? optionMaterial[
                              optionMaterial.findIndex(
                                (ele) =>
                                  ele.material_id ===
                                  material.material_list[index].material_id
                              )
                            ].material_balance
                          : 1
                      "
                      placeholder="จำนวนวัสดุที่ต้องการเบิก"
                    />
                  </div>
                </span>

                <span slot="material_note">
                  <div :style="{ textAlign: 'center' }">
                    <a-input placeholder="ระบุหมายเหตุการเบิก" />
                  </div>
                </span>

                <span slot="action" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>ลบข้อมูลวัสดุ</span>
                      </template>
                      <a-button
                        :disabled="material.material_list.length == 1"
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
            <a-col :span="24">
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
                <a-button
                  style="width:25%;margin:0px 1.5%"
                  icon="line"
                  @click="cancleConfirm()"
                  >กลับ
                </a-button>
              </a-col>
              <a-col :span="12" style="text-align:end">
                <a-button
                  type="success"
                  style="width:25%;margin:0px 1.5%"
                  icon="save"
                  @click="SaveMaterial()"
                  >บันทึกการเพิ่มข้อมูล
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
export default {
  name: "reveal_form",
  data() {
    return {
      columns_material: [
        {
          title: "ลำดับ",
          dataIndex: "key",
          key: "key",
          width: "5%",
          scopedSlots: {
            customRender: "key",
          },
        },
        {
          title: "วัสดุ",
          dataIndex: "material_name",
          key: "material_name",
          width: "15%",
          scopedSlots: {
            customRender: "material_name",
          },
        },
        {
          title: "หน่วย",
          dataIndex: "material_unit",
          key: "material_unit",
          width: "10%",
          scopedSlots: {
            customRender: "material_unit",
          },
        },
        {
          title: "จำนวนวัสดุ",
          children: [
            {
              title: "จำนวนคงเหลือ",
              dataIndex: "material_balance",
              key: "material_balance",
              width: "10%",
              scopedSlots: { customRender: "material_balance" },
            },
            {
              title: "จำนวนเบิก",
              dataIndex: "material_reveal",
              key: "material_reveal",
              width: "10%",
              scopedSlots: { customRender: "material_reveal" },
            },
          ],
        },
        {
          title: "หมายเหตุ",
          dataIndex: "material_note",
          key: "material_note",
          width: "10%",
          scopedSlots: {
            customRender: "material_note",
          },
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
          width: "5%",
          scopedSlots: { customRender: "action" },
        },
      ],
      material: {
        material_note: undefined,
        material_list: [
          {
            key: 1,
            material_id: undefined,
            material_reveal: 1,
            material_note: undefined,
          },
        ],
        requisition_create_by: this.$store.state.user.user_id,
      },
      keymaterial_list: 2,
      optionMaterial: [],
    };
  },
  methods: {
    addRecordmaterial() {
      this.material.material_list.push({
        key: this.keymaterial_list,
        material_id: undefined,
        material_reveal: 1,
        material_note: undefined,
      });
      this.keymaterial_list++;
    },
    getMaterial() {
      const self = this;
      axios
        .post(self.$store.state.url + "/materialRouters/getMaterialOption")
        .then(function(res) {
          console.log(res);
          const data = res.data.results;
          self.optionMaterial = [];
          data.forEach(function(ele, index) {
            self.optionMaterial.push({
              key: index + 1,
              material_id: ele.material_id,
              material_name: ele.material_name,
              material_unit: ele.unit_name,
              material_balance: ele.material_balance,
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filterOptionMaterial(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    deleteRecordmaterial(index) {
      this.material.material_list.splice(index, 1);
    },
    SaveMaterial() {
      const self = this;
      console.log(self.material);
      axios
        .post(
          self.$store.state.url +
            "/RequisitionOrderRouters/insertRequisitionOrder",
          self.material
        )
        .then(function(res) {
          console.log(res);
          self.$router.back();
        })
        .catch(function(err) {
          console.log(err);
        });
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
