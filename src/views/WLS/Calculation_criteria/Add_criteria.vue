<template>
  <div id="Add_criteria">
    <a-card size="small">
      <a-row :gutter="[8, 8]">
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          :xl="24"
          style="margin: 1px 0px 15px"
        >
          <a-steps :current="current">
            <a-step
              v-for="item in steps"
              :key="item.title"
              :title="item.title"
            />
          </a-steps>
        </a-col>
      </a-row>

      <!-- STEP 0 -->
      <div v-if="current == 0">
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
              style="margin: 0.2em 0px"
            >
              <a-card-meta title="ตั้งค่าทั่วไป"> </a-card-meta
            ></a-col>
          </a-row>
        </a-card>
        <a-row :gutter="[8, 8]" style="padding: 1%">
          <a-col
            :xs="8"
            :sm="8"
            :md="8"
            :lg="10"
            :xl="10"
            style="text-align: right"
          >
            <span>ชื่อหลักเกณฑ์กำหนดภาระงาน: </span>
          </a-col>

          <a-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
            <a-input
              v-model="schedule_name"
              placeholder="กรุณากรอกชื่อ"
              allow-clear
              @change="onChange"
              style="width: 50%"
            />
          </a-col>
        </a-row>
        <a-row :gutter="[8, 8]" style="padding: 1%">
          <a-col
            :xs="8"
            :sm="8"
            :md="8"
            :lg="10"
            :xl="10"
            style="text-align: right"
          >
            <span>วันที่เริ่มใช้งาน: </span>
          </a-col>
          <a-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
            <a-date-picker
              text-format="String"
              style="width: 50%"
              v-model="schedule_start_date"
              @change="onChangedate"
            />
          </a-col>
        </a-row>

        <a-row :gutter="[8, 8]" style="padding: 1%">
          <a-col
            :xs="8"
            :sm="8"
            :md="8"
            :lg="10"
            :xl="10"
            style="text-align: right"
          >
            <span>อัตราเงินต่อหน่วยกิต: </span>
          </a-col>
          <a-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
            <a-input
              v-model="schedule_per_credit"
              addon-after="บาท"
              type="number"
              min="1"
              style="width: 50%"
              placeholder="เช่น 400"
            />
          </a-col>
        </a-row>

        <a-row :gutter="[8, 8]" style="text-align: start,padding: 1%">
          <a-col :span="24" style="margin: 0.2em 0px"
            ><h1>
              กำหนดภาระงานเพื่อการจ่ายค่าตอบแทนสอนเกินของคณาจารย์ประจำที่ไม่ได้ดำรงตำแหน่งบริหาร
            </h1></a-col
          >
        </a-row>

        <a-row :gutter="[8, 8]" style="text-align: center; padding: 2%">
          <a-col
            :xs="12"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="12"
            style="margin: 0.2em 0px; text-align: center"
          >
            ขั้นต่ำ:
            <a-input
              addon-after="หน่วยภาระงานสอน"
              placeholder="เช่น 6"
              type="number"
              style="width: 80%"
              v-model="schedule_general_min"
              min="1"
            />
          </a-col>

          <a-col
            :xs="12"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="12"
            style="margin: 0.2em 0px; text-align: start"
          >
            ขั้นสูง:
            <a-input
              addon-after="หน่วยภาระงานสอน"
              type="number"
              style="width: 80%"
              v-model="schedule_general_max"
              min="1"
              placeholder="เช่น 18"
            />
          </a-col>
        </a-row>

        <!-- สิ้นสุด ตั้งค่าทั่วไป -->
      </div>
      <!-- END SETP 0 -->

      <!-- STEP 1 -->
      <div v-if="current == 1">
        <a-row :gutter="[8, 8]">
          <!-- วิชาในหลักสูตร -->
          <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0p">
                  <a-card-meta title="วิชาในหลักสูตร"> </a-card-meta>
                </a-col>
              </a-row>
            </a-card>

            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <h1>การสอนแบบบรรยาย</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
                  <h1>จำนวนนิสิตต่อกลุ่ม</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับปริญญาตรี :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    placeholder="เช่น 50"
                    min="1"
                    v-model="criteria_Internal.lecture.Bachelor"
                    addon-after="คน"
                    type="number"
                    style="width: 80%"
                  />
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับบัณฑิตศึกษา :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    placeholder="เช่น 20"
                    min="1"
                    v-model="criteria_Internal.lecture.Graduate"
                    addon-after="คน"
                    type="number"
                    style="width: 80%"
                  />
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
                  <h1>เงื่อนไขค่าน้ำหนัก</h1>
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]" justify="center">
                <a-col :span="24">
                  <a-table
                    :columns="columns_condition"
                    :data-source="criteria_Internal.lecture.condition"
                    :pagination="false"
                    size="small"
                    bordered
                  >
                    <span slot="key" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        {{ index + 1 }}
                      </div>
                    </span>
                    <span slot="condition" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center', fontSize: '13px' }">
                        <span>จำนวนนิสิตที่เกิน: </span>

                        <a-input
                          placeholder="1"
                          min="1"
                          type="number"
                          style="width: 16%"
                          addon-after="คน"
                          v-model="
                            criteria_Internal.lecture.condition[index]
                              .schedule_condition_min
                          "
                        >
                        </a-input>
                        <span> ถึง </span>
                        <a-input
                          placeholder="20"
                          min="1"
                          type="number"
                          style="width: 16%"
                          addon-after="คน"
                          v-model="
                            criteria_Internal.lecture.condition[index]
                              .schedule_condition_max
                          "
                        ></a-input>
                        <span> เท่ากับ </span>
                        <a-input
                          min="0"
                          type="number"
                          placeholder="เช่น 0.0156"
                          style="width: 40%"
                          addon-after="ค่าน้ำหนักต่อหน่วยกิต"
                          v-model="
                            criteria_Internal.lecture.condition[index]
                              .schedule_condition_weight_per_credit
                          "
                        ></a-input>
                      </div>
                    </span>

                    <span slot="action" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        <a-tooltip placement="top">
                          <template slot="title">
                            <span>ลบข้อมูลวัสดุ</span>
                          </template>
                          <a-button
                            :disabled="
                              criteria_Internal.lecture.condition.length == 1
                            "
                            type="danger"
                            icon="close"
                            @click="
                              delet_criteria_Internal_condition_lecture(index)
                            "
                          >
                          </a-button>
                        </a-tooltip>
                      </div>
                    </span>
                  </a-table>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <a-button
                    type="dashed"
                    style="width: 100%"
                    icon="plus"
                    @click="add_criteria_Internal_condition_lecture()"
                    >เพิ่มเงื่อนไขช่วงค่าน้ำหนักต่อหน่วยกิต
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
            <!-- สิ้นสุดการสอนแบบบรรยาย -->
          </a-col>

          <!-- วิชาศึกษาทั่วไป วิชานอก -->
          <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0p">
                  <a-card-meta title="วิชาศึกษาทั่วไป"> </a-card-meta>
                </a-col>
              </a-row>
            </a-card>

            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <h1>การสอนแบบบรรยาย</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
                  <h1>จำนวนนิสิตต่อกลุ่ม</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับปริญญาตรี :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    placeholder="เช่น 50"
                    style="width: 80%"
                    v-model="criteria_external.lecture.Bachelor"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับบัณฑิตศึกษา :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    placeholder="เช่น 20"
                    style="width: 80%"
                    v-model="criteria_external.lecture.Graduate"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
                  <h1>เงื่อนไขค่าน้ำหนัก</h1>
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]" justify="center">
                <a-col :span="24">
                  <a-table
                    :columns="columns_condition"
                    :data-source="criteria_external.lecture.condition"
                    :pagination="false"
                    size="small"
                    bordered
                  >
                    <span slot="key" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        {{ index + 1 }}
                      </div>
                    </span>
                    <span slot="condition" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center', fontSize: '13px' }">
                        <span>จำนวนนิสิตที่เกิน: </span>

                        <a-input
                          placeholder="1"
                          type="number"
                          style="width: 16%"
                          addon-after="คน"
                          v-model="
                            criteria_external.lecture.condition[index]
                              .schedule_condition_min
                          "
                        >
                        </a-input>
                        <span> ถึง </span>
                        <a-input
                          type="number"
                          placeholder="20"
                          style="width: 16%"
                          addon-after="คน"
                          v-model="
                            criteria_external.lecture.condition[index]
                              .schedule_condition_max
                          "
                        ></a-input>
                        <span> เท่ากับ </span>
                        <a-input
                          type="number"
                          placeholder="เช่น 0.0015"
                          style="width: 40%"
                          addon-after="ค่าน้ำหนักต่อหน่วยกิต"
                          v-model="
                            criteria_external.lecture.condition[index]
                              .schedule_condition_weight_per_credit
                          "
                        ></a-input>
                      </div>
                    </span>

                    <span slot="action" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        <a-tooltip placement="top">
                          <template slot="title">
                            <span>ลบข้อมูลวัสดุ</span>
                          </template>
                          <a-button
                            :disabled="
                              criteria_external.lecture.condition.length == 1
                            "
                            type="danger"
                            icon="close"
                            @click="
                              delet_criteria_external_condition_lecture(index)
                            "
                          >
                          </a-button>
                        </a-tooltip>
                      </div>
                    </span>
                  </a-table>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <a-button
                    type="dashed"
                    style="width: 100%"
                    icon="plus"
                    @click="add_criteria_external_condition_lecture()"
                    >เพิ่มเงื่อนไขช่วงค่าน้ำหนักต่อหน่วยกิต
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
            <!-- สิ้นสุดเงื่อนไขค่าน้ำหนัก -->
          </a-col>
        </a-row>

        <a-row :gutter="[8, 8]">
          <!-- วิชาในหลักสูตร -->
          <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0p">
                  <a-card-meta title="วิชาในหลักสูตร"> </a-card-meta>
                </a-col>
              </a-row>
            </a-card>

            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <h1>การสอนแบบปฏิบัติการ</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
                  <h1>จำนวนนิสิตต่อกลุ่ม</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับปริญญาตรี :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    placeholder="เช่น 50"
                    style="width: 80%"
                    min="1"
                    v-model="criteria_Internal.lab.Bachelor"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับบัณฑิตศึกษา :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    placeholder="เช่น 20"
                    style="width: 80%"
                    min="1"
                    v-model="criteria_Internal.lab.Graduate"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
                  <h1>เงื่อนไขค่าน้ำหนัก</h1>
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]" justify="center">
                <a-col :span="24">
                  <a-table
                    :columns="columns_condition"
                    :data-source="criteria_Internal.lab.condition"
                    :pagination="false"
                    size="small"
                    bordered
                  >
                    <span slot="key" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        {{ index + 1 }}
                      </div>
                    </span>
                    <span slot="condition" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center', fontSize: '13px' }">
                        <span>จำนวนนิสิตที่เกิน: </span>

                        <a-input
                          min="1"
                          type="number"
                          style="width: 16%"
                          addon-after="คน"
                          placeholder="1"
                          v-model="
                            criteria_Internal.lab.condition[index]
                              .schedule_condition_min
                          "
                        >
                        </a-input>
                        <span> ถึง </span>
                        <a-input
                          min="1"
                          type="number"
                          placeholder="20"
                          style="width: 16%"
                          addon-after="คน"
                          v-model="
                            criteria_Internal.lab.condition[index]
                              .schedule_condition_max
                          "
                        ></a-input>
                        <span> เท่ากับ </span>
                        <a-input
                          min="0"
                          type="number"
                          placeholder="เช่น 0.0015"
                          style="width: 40%"
                          addon-after="ค่าน้ำหนักต่อหน่วยกิต"
                          v-model="
                            criteria_Internal.lab.condition[index]
                              .schedule_condition_weight_per_credit
                          "
                        ></a-input>
                      </div>
                    </span>

                    <span slot="action" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        <a-tooltip placement="top">
                          <template slot="title">
                            <span>ลบข้อมูลวัสดุ</span>
                          </template>
                          <a-button
                            :disabled="
                              criteria_Internal.lab.condition.length == 1
                            "
                            type="danger"
                            icon="close"
                            @click="
                              delet_criteria_Internal_condition_lab(index)
                            "
                          >
                          </a-button>
                        </a-tooltip>
                      </div>
                    </span>
                  </a-table>
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <a-button
                    type="dashed"
                    style="width: 100%"
                    icon="plus"
                    @click="add_criteria_Internal_condition_lab()"
                    >เพิ่มเงื่อนไขช่วงค่าน้ำหนักต่อหน่วยกิต
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
            <!-- สิ้นสุดการสอนแบบปฏิบัติการ -->
          </a-col>

          <!-- วิชาศึกษาทั่วไป วิชานอก -->
          <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0p">
                  <a-card-meta title="วิชาศึกษาทั่วไป"> </a-card-meta>
                </a-col>
              </a-row>
            </a-card>

            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <h1>การสอนแบบปฏิบัติการ</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
                  <h1>จำนวนนิสิตต่อกลุ่ม</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับปริญญาตรี :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    style="width: 80%"
                    placeholder="เช่น 50"
                    min="1"
                    v-model="criteria_external.lab.Bachelor"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับบัณฑิตศึกษา :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    placeholder="เช่น 20"
                    style="width: 80%"
                    min="1"
                    v-model="criteria_external.lab.Graduate"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
                  <h1>เงื่อนไขค่าน้ำหนัก</h1>
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]" justify="center">
                <a-col :span="24">
                  <a-table
                    :columns="columns_condition"
                    :data-source="criteria_external.lab.condition"
                    :pagination="false"
                    size="small"
                    bordered
                  >
                    <span slot="key" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        {{ index + 1 }}
                      </div>
                    </span>
                    <span slot="condition" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center', fontSize: '13px' }">
                        <span>จำนวนนิสิตที่เกิน: </span>

                        <a-input
                          placeholder="1"
                          min="1"
                          type="number"
                          style="width: 16%"
                          addon-after="คน"
                          v-model="
                            criteria_external.lab.condition[index]
                              .schedule_condition_min
                          "
                        >
                        </a-input>
                        <span> ถึง </span>
                        <a-input
                          min="1"
                          type="number"
                          placeholder="20"
                          style="width: 16%"
                          addon-after="คน"
                          v-model="
                            criteria_external.lab.condition[index]
                              .schedule_condition_max
                          "
                        ></a-input>
                        <span> เท่ากับ </span>
                        <a-input
                          min="0"
                          type="number"
                          placeholder="เช่น 0.0015"
                          style="width: 40%"
                          addon-after="ค่าน้ำหนักต่อหน่วยกิต"
                          v-model="
                            criteria_external.lab.condition[index]
                              .schedule_condition_weight_per_credit
                          "
                        ></a-input>
                      </div>
                    </span>

                    <span slot="action" slot-scope="text, record, index">
                      <div :style="{ textAlign: 'center' }">
                        <a-tooltip placement="top">
                          <template slot="title">
                            <span>ลบข้อมูลวัสดุ</span>
                          </template>
                          <a-button
                            :disabled="
                              criteria_external.lab.condition.length == 1
                            "
                            type="danger"
                            icon="close"
                            @click="
                              delet_criteria_external_condition_lab(index)
                            "
                          >
                          </a-button>
                        </a-tooltip>
                      </div>
                    </span>
                  </a-table>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]" type="flex" justify="center">
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <a-button
                    type="dashed"
                    style="width: 100%"
                    icon="plus"
                    @click="add_criteria_external_condition_lab()"
                    >เพิ่มเงื่อนไขช่วงค่าน้ำหนักต่อหน่วยกิต
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
            <!-- สิ้นสุดเงื่อนไขค่าน้ำหนัก -->
          </a-col>
        </a-row>
      </div>
      <!-- END STEP 1-->

      <!-- STEP 2 -->
      <div v-if="current == 2">
        <!-- เริ่ม ส่วนตั้งค่าทั่วไป -->
        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="24" style="margin: 0.2em 0px">
              <a-card-meta title="ตั้งค่าทั่วไป"> </a-card-meta
            ></a-col>
          </a-row>
        </a-card>

        <a-card size="small">
          <a-row :gutter="[8, 8]">
            <a-col :span="6" style="margin: 0.2em 0px"> </a-col>
            <a-col :span="6" style="margin: 0.2em 0px"
              >ชื่อหลักเกณฑ์กำหนดภาระงาน:</a-col
            >
            <a-col :span="6" style="margin: 0.2em 0px">
              <a-input style="width: 100%" disabled v-model="schedule_name"
            /></a-col>
            <a-col :span="6" style="margin: 0.2em 0px"></a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="6" style="margin: 0.2em 0px"> </a-col>
            <a-col :span="6" style="margin: 0.2em 0px">วันที่เริ่มใช้:</a-col>
            <a-col :span="6" style="margin: 0.2em 0px">
              <a-date-picker
                style="width: 100%"
                v-model="schedule_start_date"
                disabled
              />
            </a-col>
            <a-col :span="6" style="margin: 0.2em 0px"></a-col>
          </a-row>

          <a-row :gutter="[8, 8]">
            <a-col :span="6" style="margin: 0.2em 0px"> </a-col>
            <a-col :span="6" style="margin: 0.2em 0px"
              >ผู้สร้างหลักเกณฑ์กำหนดภาระงาน:</a-col
            >
            <a-col :span="6" style="margin: 0.2em 0px">
              <a-input style="width: 100%" disabled
            /></a-col>
            <a-col :span="6" style="margin: 0.2em 0px"></a-col>
          </a-row>
          <a-row :gutter="[8, 8]">
            <a-col :span="6" style="margin: 0.2em 0px"> </a-col>
            <a-col :span="6" style="margin: 0.2em 0px"
              >อัตราเงินต่อหน่วยกิต:</a-col
            >
            <a-col :span="6" style="margin: 0.2em 0px">
              <a-input
                style="width: 100%"
                v-model="schedule_per_credit"
                disabled
                addon-after="บาท"
                type="number"
            /></a-col>
            <a-col :span="6" style="margin: 0.2em 0px"></a-col>
          </a-row>

          <a-row :gutter="[8, 8]" style="text-align: start">
            <a-col :span="24" style="margin: 0.2em 0px"
              ><h1>
                กำหนดภาระงานเพื่อการจ่ายค่าตอบแทนสอนเกินของคณาจารย์ประจำที่ไม่ได้ดำรงตำแหน่งบริหาร
              </h1></a-col
            >
          </a-row>

          <a-row :gutter="[8, 8]" style="text-align: center">
            <a-col
              :xs="12"
              :sm="12"
              :md="12"
              :lg="12"
              :xl="12"
              style="margin: 0.2em 0px; text-align: center"
            >
              ขั้นต่ำ:
              <a-input
                addon-after="หน่วยภาระงานสอน"
                type="number"
                style="width: 70%"
                disabled
                v-model="schedule_general_min"
              />
            </a-col>

            <a-col
              :xs="12"
              :sm="12"
              :md="12"
              :lg="12"
              :xl="12"
              style="margin: 0.2em 0px; text-align: start"
            >
              ขั้นสูง:
              <a-input
                addon-after="หน่วยภาระงานสอน"
                type="number"
                style="width: 70%"
                v-model="schedule_general_max"
                disabled
              />
            </a-col>
          </a-row>
        </a-card>
        <!-- สิ้นสุด ส่วนตั้งค่าทั่วไป -->

        <!-- วิชาในหลักสูตร -->
        <a-row :gutter="[8, 8]">
          <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0p">
                  <a-card-meta title="วิชาในหลักสูตร"> </a-card-meta>
                </a-col>
              </a-row>
            </a-card>
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <h1>การสอนแบบบรรยาย</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
                  <h1>จำนวนนิสิตต่อกลุ่ม</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับปริญญาตรี :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    style="width: 100%"
                    disabled
                    v-model="criteria_Internal.lecture.Bachelor"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับบัณฑิตศึกษา :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    style="width: 100%"
                    disabled
                    v-model="criteria_Internal.lecture.Graduate"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
                  <h1>เงื่อนไขค่าน้ำหนัก</h1>
                </a-col>
              </a-row>

              <a-row
                :gutter="[8, 8]"
                v-for="data in criteria_Internal.lecture.condition"
                :key="data.key"
              >
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <span>จำนวนนิสิตที่เกิน: </span>
                  <a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_min"
                    addon-after="คน"
                  />
                  <span> ถึง </span>
                  <a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_max"
                    addon-after="คน"
                  />
                  <span> เท่ากับ </span
                  ><a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_weight_per_credit"
                  />
                  <span> ค่าน้ำหนักต่อหน่วยกิต</span>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <!-- สิ้นสุด วิชาในหลักสูตร -->

          <!-- วิชาศึกษาทั่วไป -->
          <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0p">
                  <a-card-meta title="วิชาศึกษาทั่วไป"> </a-card-meta>
                </a-col>
              </a-row>
            </a-card>
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <h1>การสอนแบบบรรยาย</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
                  <h1>จำนวนนิสิตต่อกลุ่ม</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับปริญญาตรี :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    style="width: 100%"
                    disabled
                    v-model="criteria_external.lecture.Bachelor"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับบัณฑิตศึกษา :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    style="width: 100%"
                    disabled
                    v-model="criteria_external.lecture.Graduate"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
                  <h1>เงื่อนไขค่าน้ำหนัก</h1>
                </a-col>
              </a-row>

              <a-row
                :gutter="[8, 8]"
                v-for="data in criteria_external.lecture.condition"
                :key="data.key"
              >
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <span>จำนวนนิสิตที่เกิน: </span>
                  <a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_min"
                    addon-after="คน"
                  />
                  <span> ถึง </span>
                  <a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_max"
                    addon-after="คน"
                  />
                  <span> เท่ากับ </span
                  ><a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_weight_per_credit"
                  />
                  <span> ค่าน้ำหนักต่อหน่วยกิต</span>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
        <!-- สิ้นสุด วิชาศึกษาทั่วไป -->

        <!-- วิชาในหลักสูตร -->
        <a-row :gutter="[8, 8]">
          <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <h1>การสอนแบบปฏิบัติการ</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
                  <h1>จำนวนนิสิตต่อกลุ่ม</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับปริญญาตรี :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    style="width: 100%"
                    disabled
                    v-model="criteria_Internal.lab.Bachelor"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับบัณฑิตศึกษา :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    style="width: 100%"
                    disabled
                    v-model="criteria_Internal.lab.Graduate"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
                  <h1>เงื่อนไขค่าน้ำหนัก</h1>
                </a-col>
              </a-row>

              <a-row
                :gutter="[8, 8]"
                v-for="data in criteria_Internal.lab.condition"
                :key="data.key"
              >
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <span>จำนวนนิสิตที่เกิน: </span>
                  <a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_min"
                    addon-after="คน"
                  />
                  <span> ถึง </span>
                  <a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_max"
                    addon-after="คน"
                  />
                  <span> เท่ากับ </span
                  ><a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_weight_per_credit"
                  />
                  <span> ค่าน้ำหนักต่อหน่วยกิต</span>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <!-- สิ้นสุด วิชาในหลักสูตร -->

          <!-- วิชาศึกษาทั่วไป -->
          <a-col :span="12" style="margin: 0.2em 0px; text-align: center">
            <a-card size="small">
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <h1>การสอนแบบปฏิบัติการ</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="24" style="margin: 0.2em 0px; text-align: start">
                  <h1>จำนวนนิสิตต่อกลุ่ม</h1>
                </a-col>
              </a-row>
              <a-row :gutter="[8, 8]">
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับปริญญาตรี :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    style="width: 100%"
                    disabled
                    v-model="criteria_external.lab.Bachelor"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <span> ระดับบัณฑิตศึกษา :</span>
                </a-col>
                <a-col :span="6" style="margin: 0.2em 0px; text-align: center">
                  <a-input
                    style="width: 100%"
                    disabled
                    v-model="criteria_external.lab.Graduate"
                    addon-after="คน"
                    type="number"
                  />
                </a-col>
              </a-row>

              <a-row :gutter="[8, 8]">
                <a-col :span="12" style="margin: 0.2em 0px; text-align: start">
                  <h1>เงื่อนไขค่าน้ำหนัก</h1>
                </a-col>
              </a-row>

              <a-row
                :gutter="[8, 8]"
                v-for="data in criteria_external.lab.condition"
                :key="data.key"
              >
                <a-col :span="24" style="margin: 0.2em 0px; text-align: center">
                  <span>จำนวนนิสิตที่เกิน: </span>
                  <a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_min"
                    addon-after="คน"
                  />
                  <span> ถึง </span>
                  <a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_max"
                    addon-after="คน"
                  />
                  <span> เท่ากับ </span
                  ><a-input
                    disabled
                    style="width: 15%"
                    v-model="data.schedule_condition_weight_per_credit"
                  />
                  <span> ค่าน้ำหนักต่อหน่วยกิต</span>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
        <!-- สิ้นสุด วิชาศึกษาทั่วไป -->
      </div>
      <!-- END STEP 2-->

      <div class="steps-action" style="text-align: end">
        <a-button v-if="current > 0" style="margin-right: 91%" @click="prev">
          ย้อนกลับ
        </a-button>
        <a-button
          v-if="current < steps.length - 1"
          type="primary"
          @click="next"
        >
          ถัดไป
        </a-button>
        <router-link :to="{ path: '/Calculation_criteria' }">
          <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="Add_schedule()"
          >
            บันทึก
          </a-button></router-link
        >
      </div>
    </a-card>
  </div>
</template>
<script>
const axios = require("axios");

export default {
  data() {
    return {
      columns_condition: [
        {
          title: "ลำดับ",
          dataIndex: "key",
          key: "key",
          width: "4%",
          scopedSlots: {
            customRender: "key",
          },
        },
        {
          title: "เงื่อนไข",
          dataIndex: "condition",
          key: "condition",
          width: "50%",
          scopedSlots: {
            customRender: "condition",
          },
        },
        {
          title: "",
          dataIndex: "action",
          key: "action",
          width: "1%",
          scopedSlots: {
            customRender: "action",
          },
        },
      ],

      // ตัวแปรที่ใช้ในการกำหนดอัตราการจ่ายค่าตอบแทน
      schedule_name: null,
      schedule_start_date: null,
      schedule_per_credit: null,
      //  กำหนดภาระงานเพื่อการจ่ายค่าตอบแทนสอนเกินของคณาจารย์ประจำที่ไม่ได้ดำรงตำแหน่งบริหาร
      schedule_general_min: null,
      schedule_general_max: null,

      schedule_create_by: null,
      schedule_create_date: null,

      // วิชาในหลักสูตร
      criteria_Internal: {
        lab: {
          Bachelor: null,
          Graduate: null,
          index_condition: 0,
          condition: [
            {
              key: 1,
              schedule_condition_min: null,
              schedule_condition_max: null,
              schedule_condition_weight_per_credit: null,
            },
          ],
        },
        lecture: {
          Bachelor: null,
          Graduate: null,
          index_condition: 0,
          condition: [
            {
              key: 1,
              schedule_condition_min: null,
              schedule_condition_max: null,
              schedule_condition_weight_per_credit: null,
            },
          ],
        },
      },

      // วิชานอกหลักสูตร
      criteria_external: {
        lab: {
          Bachelor: null,
          Graduate: null,
          index_condition: 0,
          condition: [
            {
              key: 1,
              schedule_condition_min: null,
              schedule_condition_max: null,
              schedule_condition_weight_per_credit: null,
            },
          ],
        },
        lecture: {
          Bachelor: null,
          Graduate: null,
          index_condition: 0,
          condition: [
            {
              key: 1,
              schedule_condition_min: null,
              schedule_condition_max: null,
              schedule_condition_weight_per_credit: null,
            },
          ],
        },
      },

      current: 0,
      steps: [
        {
          key: 1,
          title: "ตั้งค่าทั่วไป",
        },
        {
          key: 2,
          title: "ตั้งค่าเงื่อนไขการคำนวณ",
        },
        {
          key: 3,
          title: "ตรวจสอบข้อมูล",
        },
      ],
    };
  },
  methods: {
    //ตรวจสอบการกรอกข้อมูล
    validate_add() {
      const self = this;

      let check_ymd = true;
      let check = true;
      //false กรุณากรอก ข้อมูลว่าง

      const today = new Date();

      const year = today.getFullYear();

      const Month = today.getMonth() + 1;

      const Day = today.getDate();

      console.log(this.schedule_start_date.split("-"));
      let schedule_start_date_DATA = self.schedule_start_date.split("-");
      console.log(schedule_start_date_DATA);

      if (parseInt(schedule_start_date_DATA[0]) < year) {
        console.log("ปี พ.ศ. น้อยกว่าปัจจุบัน");

        self.$message.error("ปี พ.ศ. น้อยกว่าปัจจุบัน");
        check_ymd = false;
      } else if (parseInt(schedule_start_date_DATA[1]) < Month) {
        console.log("เดือน น้อยกว่าปัจจุบัน");
        self.$message.error("เดือน น้อยกว่าปัจจุบัน");
        check_ymd = false;
      } else if (parseInt(schedule_start_date_DATA[2]) < Day) {
        console.log("วัน น้อยกว่าปัจจุบัน");
        self.$message.error("วัน น้อยกว่าปัจจุบัน");
        check_ymd = false;
      } else {
        check_ymd = true;
      }
      console.log()
      if (self.current == 0) {
        if (
          self.schedule_name == null ||
          self.schedule_name == "" ||
          self.schedule_start_date == null ||
          self.schedule_start_date == "" ||
          !check_ymd ||
          self.schedule_per_credit == null ||
          self.schedule_per_credit == "" ||
          self.schedule_general_min == null ||
          self.schedule_general_min == "" ||
          self.schedule_general_max == null ||
          self.schedule_general_max == ""
        ) {
          console.log("กรุณากรอกข้อความ");
          check = false;
        } else {
          check = true;
          console.log("กรอกข้อมูลครบแล้ว");
        }
      } else if (self.current == 1) {
        // เช็ควิชาใน บรรยาย
        for (
          let i = 0;
          i < this.criteria_Internal.lecture.condition.length;
          i++
        ) {
          if (
            this.criteria_Internal.lecture.Bachelor == null ||
            this.criteria_Internal.lecture.Bachelor == "" ||
            this.criteria_Internal.lecture.Graduate == null ||
            this.criteria_Internal.lecture.Graduate == "" ||
            this.criteria_Internal.lecture.condition[i]
              .schedule_condition_min == null ||
            this.criteria_Internal.lecture.condition[i]
              .schedule_condition_min == "" ||
            this.criteria_Internal.lecture.condition[i]
              .schedule_condition_max == null ||
            this.criteria_Internal.lecture.condition[i]
              .schedule_condition_max == "" ||
            this.criteria_Internal.lecture.condition[i]
              .schedule_condition_weight_per_credit == null ||
            this.criteria_Internal.lecture.condition[i]
              .schedule_condition_weight_per_credit == ""
          ) {
            console.log("กรุณากรอกข้อความ วิชาใน บรรยาย");
            check = false;
          } else {
            check = true;
          }
        }

        // เช็ควิชาใน ปฏิบัติ
        for (let i = 0; i < this.criteria_Internal.lab.condition.length; i++) {
          if (
            this.criteria_Internal.lab.Bachelor == null ||
            this.criteria_Internal.lab.Bachelor == "" ||
            this.criteria_Internal.lab.Graduate == null ||
            this.criteria_Internal.lab.Graduate == "" ||
            this.criteria_Internal.lab.condition[i].schedule_condition_min ==
              null ||
            this.criteria_Internal.lab.condition[i].schedule_condition_min ==
              "" ||
            this.criteria_Internal.lab.condition[i].schedule_condition_max ==
              null ||
            this.criteria_Internal.lab.condition[i].schedule_condition_max ==
              "" ||
            this.criteria_Internal.lab.condition[i]
              .schedule_condition_weight_per_credit == null ||
            this.criteria_Internal.lab.condition[i]
              .schedule_condition_weight_per_credit == ""
          ) {
            console.log("กรุณากรอกข้อความ วิชาใน ปฏิบัติ");
            check = false;
          } else {
            check = true;
            console.log("กรอกข้อมูลครบแล้ว");
          }
        }

        // เช็ควิชานอก บรรยาย
        for (
          let i = 0;
          i < this.criteria_external.lecture.condition.length;
          i++
        ) {
          if (
            this.criteria_external.lecture.Bachelor == null ||
            this.criteria_external.lecture.Bachelor == "" ||
            this.criteria_external.lecture.Graduate == null ||
            this.criteria_external.lecture.Graduate == "" ||
            this.criteria_external.lecture.condition[i]
              .schedule_condition_min == null ||
            this.criteria_external.lecture.condition[i]
              .schedule_condition_min == "" ||
            this.criteria_external.lecture.condition[i]
              .schedule_condition_max == null ||
            this.criteria_external.lecture.condition[i]
              .schedule_condition_max == "" ||
            this.criteria_external.lecture.condition[i]
              .schedule_condition_weight_per_credit == null ||
            this.criteria_external.lecture.condition[i]
              .schedule_condition_weight_per_credit == ""
          ) {
            check = false;
          } else {
            check = true;
            console.log("กรอกข้อมูลครบแล้ว");
          }
        }

        // เช็ควิชานอก ปฏิบัติ
        for (let i = 0; i < this.criteria_external.lab.condition.length; i++) {
          if (
            this.criteria_external.lab.Bachelor == null ||
            this.criteria_external.lab.Bachelor == "" ||
            this.criteria_external.lab.Graduate == null ||
            this.criteria_external.lab.Graduate == "" ||
            this.criteria_external.lab.condition[i].schedule_condition_min ==
              null ||
            this.criteria_external.lab.condition[i].schedule_condition_min ==
              "" ||
            this.criteria_external.lab.condition[i].schedule_condition_max ==
              null ||
            this.criteria_external.lab.condition[i].schedule_condition_max ==
              "" ||
            this.criteria_external.lab.condition[i]
              .schedule_condition_weight_per_credit == null ||
            this.criteria_external.lab.condition[i]
              .schedule_condition_weight_per_credit == ""
          ) {
            check = false;
          } else {
            check = true;
            console.log("กรอกข้อมูลครบแล้ว");
          }
        }
      }
      return check;
    },
    // บันทึก ตั้งค่าอัตราการจ่ายค่าตอบแทนภาระงานสอน
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    Add_schedule() {
      const self = this;
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      this.$message.success(
        "บันทึกตั้งค่าอัตราการจ่ายค่าตอบแทนภาระงานสอนเสร็จสิ้น"
      );

      let Add_schedules = {
        schedule_name: this.schedule_name,
        schedule_start_date: this.schedule_start_date,
        schedule_create_by: "666",
        schedule_create_date: date,
        schedule_status: 1,
        schedule_per_credit: parseInt(this.schedule_per_credit),
        schedule_general_min: parseInt(this.schedule_general_min),
        schedule_general_max: parseInt(this.schedule_general_max),
      };

      // Update_status_schedule

      if (Add_schedules.schedule_start_date == this.formatDate(new Date())) {
        console.log(
          "วันที่สร้างแล้ววันที่ปัจจุบันตรงกัน ให้ใช้ตัวที่สร้างใหม่"
        );
        Add_schedules.schedule_status = 1;
      } else {
        console.log("วันที่สร้างแล้ววันที่ปัจจุบันไม่ตรงกัน ให้ใช้ตัวเก่า");
        Add_schedules.schedule_status = 0;
      }

      console.log(Add_schedules);
      //  Add_schedules
      axios
        .post(this.$store.state.url + "/WlsRouters/Add_schedule", Add_schedules)
        .then(function (response) {
          //  Add_schedule_detail วิชาใน lecture      schedule_detail_type 0 ใน 1 นอก   schedule_detail_subject 0 lucther  1 lab

          console.log(response.data.results.insertId);

          let Add_schedule_detail_Internal_lecture = {
            schedule_id: response.data.results.insertId,
            schedule_detail_type: 0,
            schedule_detail_subject: 0,
            schedule_detail_bachelor: self.criteria_Internal.lecture.Bachelor,
            schedule_detail_graduate: self.criteria_Internal.lecture.Graduate,
            schedule_detail_create_by: "666",
            schedule_detail_create_date: date,
            schedule_detail_update_by: "666",
            schedule_detail_update_date: date,
          };

          console.log(Add_schedule_detail_Internal_lecture);

          axios
            .post(
              "http://localhost:8080/WlsRouters/Add_schedule_detail",
              Add_schedule_detail_Internal_lecture
            )
            .then(function (response) {
              self.criteria_Internal.lecture.condition.forEach((data) => {
                let condition = {
                  schedule_detail_id: response.data.results.insertId,
                  schedule_condition_min: data.schedule_condition_min,
                  schedule_condition_max: data.schedule_condition_max,
                  schedule_condition_weight_per_credit:
                    data.schedule_condition_weight_per_credit,
                };

                console.log(condition);

                axios
                  .post(
                    "http://localhost:8080/WlsRouters/Add_schedule_condition",
                    condition
                  )
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              });
            })
            .catch(function (error) {
              console.log(error);
            })
            .then(function () {
              // always executed  ถ้าเจอ  Eror ทำไรต่อ
            });

          //  Add_schedule_detail วิชาใน lab

          let Add_schedule_detail_Internal_lab = {
            schedule_id: response.data.results.insertId,
            schedule_detail_type: 0,
            schedule_detail_subject: 1,
            schedule_detail_bachelor: self.criteria_Internal.lab.Bachelor,
            schedule_detail_graduate: self.criteria_Internal.lab.Graduate,
            schedule_detail_create_by: "666",
            schedule_detail_create_date: date,
            schedule_detail_update_by: "666",
            schedule_detail_update_date: date,
          };
          axios
            .post(
              "http://localhost:8080/WlsRouters/Add_schedule_detail",
              Add_schedule_detail_Internal_lab
            )
            .then(function (response) {
              self.criteria_Internal.lab.condition.forEach((data) => {
                let condition = {
                  schedule_detail_id: response.data.results.insertId,
                  schedule_condition_min: data.schedule_condition_min,
                  schedule_condition_max: data.schedule_condition_max,
                  schedule_condition_weight_per_credit:
                    data.schedule_condition_weight_per_credit,
                };

                console.log(condition);

                axios
                  .post(
                    "http://localhost:8080/WlsRouters/Add_schedule_condition",
                    condition
                  )
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              });
            })
            .catch(function (error) {
              console.log(error);
            })
            .then(function () {
              // always executed  ถ้าเจอ  Eror ทำไรต่อ
            });

          //  Add_schedule_detail วิชานอก lecture      schedule_detail_type 0 ใน 1 นอก   schedule_detail_subject 0 lucther  1 lab

          let Add_schedule_detail_external_lecture = {
            schedule_id: response.data.results.insertId,
            schedule_detail_type: 1,
            schedule_detail_subject: 0,
            schedule_detail_bachelor: self.criteria_external.lecture.Bachelor,
            schedule_detail_graduate: self.criteria_external.lecture.Graduate,
            schedule_detail_create_by: "666",
            schedule_detail_create_date: date,
            schedule_detail_update_by: "666",
            schedule_detail_update_date: date,
          };

          axios
            .post(
              "http://localhost:8080/WlsRouters/Add_schedule_detail",
              Add_schedule_detail_external_lecture
            )
            .then(function (response) {
              self.criteria_external.lecture.condition.forEach((data) => {
                let condition = {
                  schedule_detail_id: response.data.results.insertId,
                  schedule_condition_min: data.schedule_condition_min,
                  schedule_condition_max: data.schedule_condition_max,
                  schedule_condition_weight_per_credit:
                    data.schedule_condition_weight_per_credit,
                };

                console.log(condition);

                axios
                  .post(
                    "http://localhost:8080/WlsRouters/Add_schedule_condition",
                    condition
                  )
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              });
            })
            .catch(function (error) {
              console.log(error);
            })
            .then(function () {
              // always executed  ถ้าเจอ  Eror ทำไรต่อ
            });

          //  Add_schedule_detail วิชาใน lab

          let Add_schedule_detail_external_lab = {
            schedule_id: response.data.results.insertId,
            schedule_detail_type: 1,
            schedule_detail_subject: 1,
            schedule_detail_bachelor: self.criteria_external.lab.Bachelor,
            schedule_detail_graduate: self.criteria_external.lab.Graduate,
            schedule_detail_create_by: "666",
            schedule_detail_create_date: date,
            schedule_detail_update_by: "666",
            schedule_detail_update_date: date,
          };
          axios
            .post(
              "http://localhost:8080/WlsRouters/Add_schedule_detail",
              Add_schedule_detail_external_lab
            )
            .then(function (response) {
              self.criteria_external.lab.condition.forEach((data) => {
                let condition = {
                  schedule_detail_id: response.data.results.insertId,
                  schedule_condition_min: data.schedule_condition_min,
                  schedule_condition_max: data.schedule_condition_max,
                  schedule_condition_weight_per_credit:
                    data.schedule_condition_weight_per_credit,
                };

                console.log(condition);

                axios
                  .post(
                    "http://localhost:8080/WlsRouters/Add_schedule_condition",
                    condition
                  )
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              });
            })
            .catch(function (error) {
              console.log(error);
            })
            .then(function () {
              // always executed  ถ้าเจอ  Eror ทำไรต่อ
            });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed  ถ้าเจอ  Eror ทำไรต่อ
        });
    },

    next() {
      // this.validate_add()
      if (this.validate_add()) {
        this.current++;
      } else {
        this.$message.error("กรุณากรอกข้อมูลให้ครบก่อนไปลำดับถัดไป");
      }
    },
    prev() {
      this.current--;
    },
    onChange(e) {
      console.log(e);
    },
    onChangedate(date, dateString) {
      console.log(date, dateString);

      this.schedule_start_date = dateString;
    },

    handleChange(value) {
      console.log(value);
      this.value = value;
      fetch(value, (data) => (this.data = data));
    },

    //  วิชาใน
    //delet_criteria_Internal_condition_lecture ลบเงื่อนไขวิชาใน บรรยาย
    delet_criteria_Internal_condition_lecture(index) {
      this.criteria_Internal.lecture.index_condition--;
      this.criteria_Internal.lecture.condition.splice(index, 1);
      console.log(this.criteria_Internal.lecture.index_condition);
      console.log(
        this.criteria_Internal.lecture.condition[
          this.criteria_Internal.lecture.index_condition
        ]
      );
    },
    //add_criteria_Internal_condition_lecture  เพิ่มเงื่อนไขวิชาใน บรรยาย
    add_criteria_Internal_condition_lecture() {
      let data = {
        key: this.criteria_Internal.lecture.condition.length + 1,
        schedule_condition_min: this.criteria_Internal.lecture.condition[
          this.criteria_Internal.lecture.index_condition
        ].schedule_condition_min,
        schedule_condition_max: this.criteria_Internal.lecture.condition[
          this.criteria_Internal.lecture.index_condition
        ].schedule_condition_max,
        schedule_condition_weight_per_credit: this.criteria_Internal.lecture
          .condition[this.criteria_Internal.lecture.index_condition]
          .schedule_condition_weight_per_credit,
      };

      console.log(
        "ก่อนเพิ่ม : " + this.criteria_Internal.lecture.index_condition
      );
      this.criteria_Internal.lecture.condition.push(data);
      console.log(this.criteria_Internal.lecture.condition);
      this.criteria_Internal.lecture.index_condition++;
      console.log(
        "หลังเพิ่ม : " + this.criteria_Internal.lecture.index_condition
      );
    },
    //delet_criteria_Internal_condition_lab  ลบเงื่อนไขวิชาใน การสอนแบบปฏิบัติการ
    delet_criteria_Internal_condition_lab(index) {
      this.criteria_Internal.lab.index_condition--;
      this.criteria_Internal.lab.condition.splice(index, 1);
      console.log(this.criteria_Internal.lab.index_condition);
      console.log(
        this.criteria_Internal.lab.condition[
          this.criteria_Internal.lab.index_condition
        ]
      );
    },
    //add_criteria_Internal_condition_lab  เพิ่มเงื่อนไขวิชาใน การสอนแบบปฏิบัติการ
    add_criteria_Internal_condition_lab() {
      let data = {
        key: this.criteria_Internal.lab.condition.length + 1,
        schedule_condition_min: this.criteria_Internal.lab.condition[
          this.criteria_Internal.lab.index_condition
        ].schedule_condition_min,
        schedule_condition_max: this.criteria_Internal.lab.condition[
          this.criteria_Internal.lab.index_condition
        ].schedule_condition_max,
        schedule_condition_weight_per_credit: this.criteria_Internal.lab
          .condition[this.criteria_Internal.lab.index_condition]
          .schedule_condition_weight_per_credit,
      };

      console.log("ก่อนเพิ่ม : " + this.criteria_Internal.lab.index_condition);
      this.criteria_Internal.lab.condition.push(data);
      console.log(this.criteria_Internal.lab.condition);
      this.criteria_Internal.lab.index_condition++;
      console.log("หลังเพิ่ม : " + this.criteria_Internal.lab.index_condition);
    },

    //  วิชานอก
    //delet_criteria_external_condition_lecture ลบเงื่อนไขวิชาใน การสอนแบบบรรยาย
    delet_criteria_external_condition_lecture(index) {
      this.criteria_external.lecture.index_condition--;
      this.criteria_external.lecture.condition.splice(index, 1);
      console.log(this.criteria_external.lecture.index_condition);
      console.log(
        this.criteria_external.lecture.condition[
          this.criteria_external.lecture.index_condition
        ]
      );
    },
    //add_criteria_external_condition_lecture  เพิ่มเงื่อนไขวิชาใน การสอนแบบบรรยาย
    add_criteria_external_condition_lecture() {
      let data = {
        key: this.criteria_external.lecture.condition.length + 1,
        schedule_condition_min: this.criteria_external.lecture.condition[
          this.criteria_external.lecture.index_condition
        ].schedule_condition_min,
        schedule_condition_max: this.criteria_external.lecture.condition[
          this.criteria_external.lecture.index_condition
        ].schedule_condition_max,
        schedule_condition_weight_per_credit: this.criteria_external.lecture
          .condition[this.criteria_external.lecture.index_condition]
          .schedule_condition_weight_per_credit,
      };

      console.log(
        "ก่อนเพิ่ม : " + this.criteria_external.lecture.index_condition
      );
      this.criteria_external.lecture.condition.push(data);
      console.log(this.criteria_external.lecture.condition);
      this.criteria_external.lecture.index_condition++;
      console.log(
        "หลังเพิ่ม : " + this.criteria_external.lecture.index_condition
      );
    },
    //delet_criteria_external_condition_lab  ลบเงื่อนไขวิชาใน การสอนแบบปฏิบัติการ
    delet_criteria_external_condition_lab(index) {
      this.criteria_external.lab.index_condition--;
      this.criteria_external.lab.condition.splice(index, 1);
      console.log(this.criteria_external.lab.index_condition);
      console.log(
        this.criteria_external.lab.condition[
          this.criteria_external.lab.index_condition
        ]
      );
    },
    //add_criteria_external_condition_lab  เพิ่มเงื่อนไขวิชาใน การสอนแบบปฏิบัติการ
    add_criteria_external_condition_lab() {
      let data = {
        key: this.criteria_external.lab.condition.length + 1,
        schedule_condition_min: this.criteria_external.lab.condition[
          this.criteria_external.lab.index_condition
        ].schedule_condition_min,
        schedule_condition_max: this.criteria_external.lab.condition[
          this.criteria_external.lab.index_condition
        ].schedule_condition_max,
        schedule_condition_weight_per_credit: this.criteria_external.lab
          .condition[this.criteria_external.lab.index_condition]
          .schedule_condition_weight_per_credit,
      };

      console.log("ก่อนเพิ่ม : " + this.criteria_external.lab.index_condition);
      this.criteria_external.lab.condition.push(data);
      console.log(this.criteria_external.lab.condition);
      this.criteria_external.lab.index_condition++;
      console.log("หลังเพิ่ม : " + this.criteria_external.lab.index_condition);
    },
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #ffffff;
  min-height: 200px;
  text-align: center;
}

.steps-action {
  margin-top: 10px;
}
</style>