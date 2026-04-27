const { useState, useEffect } = React;

const STORAGE_COSTS = "sam_anh_vehicle_costs_v1";

function fmt(v) {
  return Number(v || 0).toLocaleString("vi-VN");
}

function calcVehicleCost(cost) {
  return (
    Number(cost.fuel || 0) +
    Number(cost.salary || 0) +
    Number(cost.maintenance || 0) +
    Number(cost.toll || 0) +
    Number(cost.other || 0)
  );
}

function App() {
  const [tab, setTab] = useState("home");

  // 🔥 CHI PHÍ
  const [costs, setCosts] = useState([]);
  const [form, setForm] = useState({
    month: new Date().toISOString().slice(0, 7),
    vehicle: "",
    fuel: "",
    salary: "",
    maintenance: "",
    toll: "",
    other: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_COSTS);
    if (saved) setCosts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_COSTS, JSON.stringify(costs));
  }, [costs]);

  function saveCost() {
    setCosts([{ ...form, id: Date.now() }, ...costs]);
    setForm({
      month: new Date().toISOString().slice(0, 7),
      vehicle: "",
      fuel: "",
      salary: "",
      maintenance: "",
      toll: "",
      other: ""
    });
  }

  function deleteCost(id) {
    setCosts(costs.filter(c => c.id !== id));
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>SAM ANH APP</h1>

      {/* MENU */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab("home")}>Trang chính</button>
        <button onClick={() => setTab("costs")}>Chi phí</button>
      </div>

      {/* HOME */}
      {tab === "home" && <div>App giữ nguyên như cũ</div>}

      {/* CHI PHÍ */}
      {tab === "costs" && (
        <div>
          <h2>Chi phí xe</h2>

          <input
            type="month"
            value={form.month}
            onChange={e => setForm({ ...form, month: e.target.value })}
          />

          <input
            placeholder="Biển số xe"
            value={form.vehicle}
            onChange={e => setForm({ ...form, vehicle: e.target.value })}
          />

          <input
            placeholder="Nhiên liệu"
            type="number"
            value={form.fuel}
            onChange={e => setForm({ ...form, fuel: e.target.value })}
          />

          <input
            placeholder="Lương lái xe"
            type="number"
            value={form.salary}
            onChange={e => setForm({ ...form, salary: e.target.value })}
          />

          <input
            placeholder="Bảo dưỡng"
            type="number"
            value={form.maintenance}
            onChange={e => setForm({ ...form, maintenance: e.target.value })}
          />

          <input
            placeholder="Cầu đường"
            type="number"
            value={form.toll}
            onChange={e => setForm({ ...form, toll: e.target.value })}
          />

          <input
            placeholder="Chi phí khác"
            type="number"
            value={form.other}
            onChange={e => setForm({ ...form, other: e.target.value })}
          />

          <button onClick={saveCost}>Lưu</button>

          <h3>Danh sách</h3>

          {costs.map(c => (
            <div key={c.id} style={{ border: "1px solid #ccc", marginTop: 10, padding: 10 }}>
              <b>{c.vehicle}</b> - {c.month}
              <div>Tổng: {fmt(calcVehicleCost(c))} đ</div>
              <button onClick={() => deleteCost(c.id)}>Xóa</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
