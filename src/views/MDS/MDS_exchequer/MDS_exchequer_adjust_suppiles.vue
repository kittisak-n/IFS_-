<template>
  <div class="MDS_exchequer_adjust_suppiles">
    <a-row :gutter="[8, 8]">
      <a-col :span="10">
        <a-row :gutter="[8, 8]">
          <a-col :span="24">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px;">
                  <a-card-meta title="รายละเอียดวัสดุหมายเลข : MDS5010770">
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
                    src="https://www.dohome.co.th/media/catalog/product/cache/2/image/255x255/9df78eab33525d08d6e5fb8d27136e95/1/0/10024002_REM_1200_1.jpg"
                  />
                </a-col>
                <a-col :span="12">
                  <p><b>หมายเลขวัสดุ</b> : MDS5010770</p>
                  <p><b>ชื่อวัสดุ</b> : กระดาษถ่ายเอกสาร A4 Double A</p>
                  <p><b>หมวดหมู่</b> : อุปกรณ์สำนักงาน</p>
                  <p><b>หน่วยนับ </b> : รีม</p>
                  <p><b>จำนวนคงเหลือ </b> : 65</p>
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
                  <a-card-meta title="รายการนำเข้าของวัสดุหมายเลข : MDS5010770">
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
                    :columns="columns_meterail_import"
                    :data-source="meterail_import"
                    :pagination="false"
                    size="small"
                    :scroll="{ y: 500 }"
                    bordered
                  >
                    <span slot="key" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        {{ index + 1 }}
                      </div>
                    </span>
                    <span slot="meterail_import_code" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="meterail_import_date" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="meterail_import_amount" slot-scope="text">
                      <div :style="{ textAlign: 'center' }">
                        {{ text }}
                      </div>
                    </span>
                    <span
                      slot="meterail_import_balance"
                      slot-scope="text, record, index"
                    >
                      <div :style="{ textAlign: 'center' }" v-if="index == 0">
                        {{
                          meterail_adjust[index_adjust].meterail_adjust_balacne
                        }}
                      </div>
                      <div :style="{ textAlign: 'center' }" v-if="index != 0">
                        {{ text }}
                      </div>
                    </span>
                    <span slot="action" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        <a-button
                          icon="block"
                          type="info"
                          :disabled="index === 0 ? '' : disabled"
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
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px;">
              <a-card-meta title="ปรับยอดวัสดุหมายเลขรายการ : OE03122020002">
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
                :columns="columns_meterail_adjust"
                :data-source="meterail_adjust"
                :pagination="false"
                size="small"
                :scroll="{ y: 730 }"
                bordered
              >
                <span slot="key" slot-scope="text, record, index">
                  <div :style="{ textAlign: 'center' }">
                    {{ index + 1 }}
                  </div>
                </span>
                <span slot="meterail_adjust_date" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="meterail_adjust_type" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span slot="meterail_adjust_amount" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span
                  slot="meterail_adjust_adjust"
                  slot-scope="text, record, index"
                >
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 != meterail_adjust.length"
                  >
                    {{ text }}
                  </div>
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 == meterail_adjust.length"
                  >
                    <a-input-number
                      :min="0"
                      :max="meterail_adjust[index - 1].meterail_adjust_balacne"
                      :default-value="0"
                      v-model="meterail_adjust[index].meterail_adjust_adjust"
                    />
                  </div>
                </span>
                <span
                  slot="meterail_adjust_balacne"
                  slot-scope="text, record, index"
                >
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 != meterail_adjust.length"
                  >
                    {{ text }}
                  </div>
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 == meterail_adjust.length"
                  >
                    {{
                      record.meterail_adjust_amount -
                        record.meterail_adjust_adjust
                    }}
                  </div>
                </span>
                <span slot="meterail_adjust_creator" slot-scope="text">
                  <div :style="{ textAlign: 'center' }">
                    {{ text }}
                  </div>
                </span>
                <span
                  slot="meterail_adjust_note"
                  slot-scope="text, record, index"
                >
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 != meterail_adjust.length"
                  >
                    {{ text }}
                  </div>
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 == meterail_adjust.length"
                  >
                    <a-input
                      v-model="meterail_adjust[index].note"
                      placeholder="หมายเหตุการปรับรายการ"
                    />
                  </div>
                </span>
                <span slot="action" slot-scope="text, record, index">
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 != meterail_adjust.length"
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
                            index === 0 || index < meterail_adjust.length - 2
                              ? ''
                              : disabled
                          "
                          @click="deleteAdjustMeterail(index)"
                        />
                      </a-tooltip>
                    </div>
                  </div>
                  <div
                    :style="{ textAlign: 'center' }"
                    v-if="index + 1 == meterail_adjust.length"
                  >
                    <div :style="{ textAlign: 'center' }">
                      <a-tooltip placement="top">
                        <template slot="title">
                          <span>บันทึกรายการปรับยอด</span>
                        </template>
                        <a-button
                          icon="save"
                          type="success"
                          @click="saveAdjustMeterail(index)"
                        />
                      </a-tooltip>
                    </div>
                  </div>
                </span>
              </a-table>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      columns_meterail_import: [
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
          dataIndex: "meterail_import_code",
          key: "meterail_import_code",
          width: "10%",
          scopedSlots: {
            customRender: "meterail_import_code",
          },
        },
        {
          title: "วันที่นำเข้าวัสดุ",
          dataIndex: "meterail_import_date",
          key: "meterail_import_date",
          width: "10%",
          scopedSlots: {
            customRender: "meterail_import_date",
          },
        },
        {
          title: "จำนวน",
          children: [
            {
              title: "นำเข้า",
              dataIndex: "meterail_import_amount",
              key: "meterail_import_amount",
              width: "5%",
              scopedSlots: { customRender: "meterail_import_amount" },
            },
            {
              title: "คงเหลือ",
              dataIndex: "meterail_import_balance",
              key: "meterail_import_balance",
              width: "5%",
              scopedSlots: { customRender: "meterail_import_balance" },
            },
          ],
        },
        {
          title: "ปรับยอด",
          dataIndex: "action",
          key: "action",
          width: "5%",
          scopedSlots: { customRender: "action" },
        },
      ],
      meterail_import: [
        {
          key: 1,
          meterail_import_code: "OE03122020002",
          meterail_import_date: "3 ธันวาคม 2563",
          meterail_import_amount: 50,
          meterail_import_balance: 50,
        },
        {
          key: 2,
          meterail_import_code: "OE01122020001",
          meterail_import_date: "1 ธันวาคม 2563",
          meterail_import_amount: 50,
          meterail_import_balance: 15,
        },
      ],
      columns_meterail_adjust: [
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
          dataIndex: "meterail_adjust_date",
          key: "meterail_adjust_date",
          width: "5%",
          scopedSlots: {
            customRender: "meterail_adjust_date",
          },
        },
        {
          title: "ประเภท",
          dataIndex: "meterail_adjust_type",
          key: "meterail_adjust_type",
          width: "5%",
          scopedSlots: {
            customRender: "meterail_adjust_type",
          },
        },
        {
          title: "จำนวน",
          children: [
            {
              title: "ยอดเดิม",
              dataIndex: "meterail_adjust_amount",
              key: "meterail_adjust_amount",
              width: "6%",
              scopedSlots: { customRender: "meterail_adjust_amount" },
            },
            {
              title: "ปรับยอด",
              dataIndex: "meterail_adjust_adjust",
              key: "meterail_adjust_adjust",
              width: "6%",
              scopedSlots: { customRender: "meterail_adjust_adjust" },
            },
            {
              title: "คงเหลือ",
              dataIndex: "meterail_adjust_balacne",
              key: "meterail_adjust_balacne",
              width: "6%",
              scopedSlots: { customRender: "meterail_adjust_balacne" },
            },
          ],
        },
        {
          title: "ผู้ทำรายการ",
          dataIndex: "meterail_adjust_creator",
          key: "meterail_adjust_creator",
          width: "5%",
          scopedSlots: { customRender: "meterail_adjust_creator" },
        },
        {
          title: "หมายเหตุ",
          dataIndex: "meterail_adjust_note",
          key: "meterail_adjust_note",
          width: "10%",
          scopedSlots: { customRender: "meterail_adjust_note" },
        },
        {
          title: "ดำเนินการ",
          dataIndex: "action",
          key: "action",
          width: "3%",
          scopedSlots: { customRender: "action" },
        },
      ],
      meterail_adjust: [
        {
          key: 1,
          meterail_adjust_date: "3 ธ.ค. 2563",
          meterail_adjust_type: "นำเข้าสินค้า",
          meterail_adjust_amount: 0,
          meterail_adjust_adjust: 50,
          meterail_adjust_balacne: 50,
          meterail_adjust_creator: "กิตติศักดิ์",
          meterail_adjust_note: " ",
        },
        {
          key: 2,
          meterail_adjust_date: "29 ธ.ค. 2563",
          meterail_adjust_type: "ปรับยอด",
          meterail_adjust_amount: 50,
          meterail_adjust_adjust: 0,
          meterail_adjust_balacne: 50,
          meterail_adjust_creator: "กิตติศักดิ์",
          meterail_adjust_note: " ",
        },
      ],
      index_adjust: 1,
    };
  },
  methods: {
    saveAdjustMeterail(index) {
      this.meterail_adjust[index].meterail_adjust_balacne =
        this.meterail_adjust[index].meterail_adjust_amount -
        this.meterail_adjust[index].meterail_adjust_adjust;
      let AdjustMeterail = {
        key: index + 1,
        meterail_adjust_date: "29 ธ.ค. 2563",
        meterail_adjust_type: "ปรับยอด",
        meterail_adjust_amount: this.meterail_adjust[index]
          .meterail_adjust_balacne,
        meterail_adjust_adjust: 0,
        meterail_adjust_balacne: this.meterail_adjust[index]
          .meterail_adjust_balacne,
        meterail_adjust_creator: "กิตติศักดิ์",
        meterail_adjust_note: " ",
      };

      this.meterail_adjust.push(AdjustMeterail);
      this.index_adjust++;
    },
    deleteAdjustMeterail(index) {
      this.index_adjust--;
      this.meterail_adjust.splice(index, 1);
    },
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
