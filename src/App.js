import { useState } from "react";
import './App.css';

function App() {
  // 表单状态
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 1,
    occasion: ""
  });
  const [confirmed, setConfirmed] = useState(false);

  // 允许的可选时间
  const availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

  // 输入变更
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // 表单提交 + 校验
  function handleSubmit(e) {
    e.preventDefault();
    // 校验规则
    if (!formData.date) {
      alert("请选择日期");
      return;
    }
    if (!formData.time) {
      alert("请选择时间");
      return;
    }
    if (formData.guests < 1 || formData.guests > 10) {
      alert("用餐人数必须是1~10人");
      return;
    }
    // 校验通过，标记预订成功
    setConfirmed(true);
  }

  // 重置表单
  function resetForm() {
    setFormData({
      date: "",
      time: "",
      guests: 1,
      occasion: ""
    });
    setConfirmed(false);
  }

  return (
    <div className="App" style={{ maxWidth: "500px", margin: "3rem auto", padding: "0 20px" }}>
      <h1>Little Lemon 预订餐桌</h1>
      {confirmed ? (
        <div style={{background:"#defade",padding:"20px",borderRadius:12}}>
          <h2>✅ 预订成功！</h2>
          <p>日期：{formData.date}</p>
          <p>时间：{formData.time}</p>
          <p>人数：{formData.guests}</p>
          <button onClick={resetForm}>新建预订</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{margin:"12px 0"}}>
            <label>选择日期：</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{margin:"12px 0"}}>
            <label>选择时间：</label>
            <select name="time" value={formData.time} onChange={handleChange} required>
              <option value="">请选择时段</option>
              {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{margin:"12px 0"}}>
            <label>用餐人数：</label>
            <input
              type="number"
              name="guests"
              min="1"
              max="10"
              value={formData.guests}
              onChange={handleChange}
            />
          </div>
          <div style={{margin:"12px 0"}}>
            <label>特殊场合（可选）：</label>
            <select name="occasion" value={formData.occasion} onChange={handleChange}>
              <option value="">无</option>
              <option value="birthday">生日</option>
              <option value="anniversary">纪念日</option>
            </select>
          </div>
          <button type="submit" style={{padding:"8px 16px",marginRight:10}}>提交预订</button>
          <button type="button" onClick={resetForm}>重置</button>
        </form>
      )}
    </div>
  );
}

export default App;
