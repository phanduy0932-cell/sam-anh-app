const { useState, useMemo, useEffect } = React;

// ================== STORAGE ==================
const STORAGE_TRIPS = "sam_anh_final_trips_v1";
const STORAGE_TOURS = "sam_anh_final_tours_v1";
const STORAGE_COSTS = "sam_anh_vehicle_costs_v1"; // 🔥 NEW

// ================== FORMAT ==================
function fmt(value) {
  return Number(value || 0).toLocaleString("vi-VN");
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// ================== COST ==================
function calcVehicleCost(cost) {
  return (
    Number(cost.fuelCost || 0) +
    Number(cost.driverSalary || 0) +
    Number(cost.maintenanceCost || 0) +
    Number(cost.tollCost || 0) +
    Number(cost.otherCost || 0)
  );
}

function makeInitialCostForm() {
  return {
    month: new Date().toISOString().slice(0, 7),
    vehicle: "",
    fuelCost: "",
    driverSalary: "",
    maintenanceCost: "",
    tollCost: "",
    otherCost: ""
  };
}

// ================== DATA ==================
const customers = [
  { id: "olympus", name: "OLYMPUS" },
  { id: "vedan", name: "Vedan" },
  { id: "other", name: "Khách khác" }
];

// (giữ nguyên toàn bộ data cũ phía dưới – không sửa)

// ================== APP ==================
function App() {
  const [tab, setTab] = useState("dashboard");

  const [trips, setTrips] = useState([]);
  const [tourTrips, setTourTrips] = useState([]);

  // 🔥 NEW COST STATE
  const [vehicleCosts, setVehicleCosts] = useState([]);
  const [costForm, setCostForm] = useState(makeInitialCostForm());

  // ================== LOAD ==================
  useEffect(() => {
    try {
      const savedTrips = localStorage.getItem(STORAGE_TRIPS);
      const savedTours = localStorage.getItem(STORAGE_TOURS);
      const savedCosts = localStorage.getItem(STORAGE_COSTS);

      if (savedTrips) setTrips(JSON.parse(savedTrips));
      if (savedTours) setTourTrips(JSON.parse(savedTours));
      if (savedCosts) setVehicleCosts(JSON.parse(savedCosts));
    } catch (err) {
      console.log("Lỗi load dữ liệu", err);
    }
  }, []);

  // ================== SAVE ==================
  useEffect(() => {
    localStorage.setItem(STORAGE_TRIPS, JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TOURS, JSON.stringify(tourTrips));
  }, [tourTrips]);

  useEffect(() => {
    localStorage.setItem(STORAGE_COSTS, JSON.stringify(vehicleCosts));
  }, [vehicleCosts]);

  // ================== SAVE COST ==================
  function saveVehicleCost() {
    setVehicleCosts([
      { ...costForm, id: Date.now() },
      ...vehicleCosts
    ]);
    setCostForm(makeInitialCostForm());
  }

  function deleteVehicleCost(id) {
    setVehicleCosts(vehicleCosts.filter(c => c.id !== id));
  }
  // ================== UI ==================
  const card = "bg-white rounded-3xl border border-slate-200 shadow-sm p-4";
  const input = "w-full rounded-2xl border border-slate-200 px-3 py-2";
  const mainButton = "w-full bg-blue-700 text-white rounded-2xl py-3 font-bold";

  return (
    <div className="p-4 space-y-4">
      
      {/* MENU */}
      <div className="flex gap-2 flex-wrap">
        {[
          ["dashboard", "Tổng quan"],
          ["trips", "Chuyến"],
          ["tour", "Xe DL"],
          ["quote", "Báo giá"],
          ["costs", "Chi phí"], // 🔥 NEW TAB
          ["report", "Báo cáo"]
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-xl ${
              tab === key ? "bg-blue-700 text-white" : "bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ================== CHI PHÍ ================== */}
      {tab === "costs" && (
        <div className={card}>
          <h2 className="text-xl font-bold mb-3">Chi phí xe</h2>

          <input
            className={input}
            type="month"
            value={costForm.month}
            onChange={(e) =>
              setCostForm({ ...costForm, month: e.target.value })
            }
          />

          <input
            className={input}
            placeholder="Biển số xe"
            value={costForm.vehicle}
            onChange={(e) =>
              setCostForm({ ...costForm, vehicle: e.target.value })
            }
          />

          <input
            className={input}
            placeholder="Xăng / dầu"
            value={costForm.fuelCost}
            onChange={(e) =>
              setCostForm({ ...costForm, fuelCost: e.target.value })
            }
          />

          <input
            className={input}
            placeholder="Lương lái xe"
            value={costForm.driverSalary}
            onChange={(e) =>
              setCostForm({ ...costForm, driverSalary: e.target.value })
            }
          />

          <input
            className={input}
            placeholder="Bảo dưỡng"
            value={costForm.maintenanceCost}
            onChange={(e) =>
              setCostForm({ ...costForm, maintenanceCost: e.target.value })
            }
          />

          <input
            className={input}
            placeholder="Cầu đường"
            value={costForm.tollCost}
            onChange={(e) =>
              setCostForm({ ...costForm, tollCost: e.target.value })
            }
          />

          <input
            className={input}
            placeholder="Chi phí khác"
            value={costForm.otherCost}
            onChange={(e) =>
              setCostForm({ ...costForm, otherCost: e.target.value })
            }
          />

          <button className={mainButton} onClick={saveVehicleCost}>
            Lưu chi phí
          </button>

          <div className="mt-4 space-y-2">
            {vehicleCosts.map((c) => (
              <div key={c.id} className="border p-3 rounded-xl">
                <div className="font-bold">
                  {c.vehicle} - {c.month}
                </div>
                <div className="text-blue-700 font-bold">
                  Tổng: {fmt(calcVehicleCost(c))} đ
                </div>
                <button
                  className="text-red-600 mt-2"
                  onClick={() => deleteVehicleCost(c.id)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ================== COMPONENT PHỤ ==================
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}

// ================== RENDER ==================
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
