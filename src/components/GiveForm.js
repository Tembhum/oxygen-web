import React from "react";
import "../css/GiveForm.css";
import Card from "./Card";

const GiveForm = () => {
  return (
    <div>
      <Card className="expense-item">
        <form>
          <h1>ฟอร์ม</h1>
          <h3>กรอกข้อมูลของผู้ป่วยตามความจริง</h3>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>วันที่</label>
              <input type="date" min="2019-01-01" max="2022-12-31" />
            </div>

            <div className="new-expense__control">
              <label>ชื่อ-นามสกุล</label>
              <input type="text" />
            </div>

            <div className="new-expense__control">
              <label>อายุ</label>
              <input type="number" min="0" step="1" />
            </div>

            <div className="new-expense__control">
              <label>ที่อยู่</label>
              <input type="text" />
              <button>map</button>
            </div>
          </div>
        </form>
      </Card>
      <Card>
        <form>
          <h1>สำหรับเจ้าหน้าที่</h1>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>วันส่งคืน</label>
              <input type="date" min="2019-01-01" max="2022-12-31" />
            </div>

            <div className="new-expense__control">
              <label>serial number</label>
              <input type="text" />
            </div>
          </div>
        </form>
      </Card>

      <div className="new-expense__actions">
        <button type="Submit">Submit</button>
      </div>
    </div>
  );
};

export default GiveForm;
