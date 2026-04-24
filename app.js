const { useState, useMemo, useEffect } = React;

const fmt = (v) => Number(v || 0).toLocaleString("vi-VN");

// ================= LOGO HEADER =================
function Header() {
  return (
    <div className="rounded-3xl bg-blue-700 text-white p-4 shadow-lg flex items-center gap-3">
      <img src="logo.png" className="w-12 h-12 bg-white rounded-xl p-1 object-contain"
        onError={(e)=>e.target.style.display="none"} />
      <div>
        <h1 className="text-xl font-bold">SAM ANH</h1>
        <p className="text-xs opacity-80">Quản lý vận hành xe</p>
      </div>
    </div>
  );
}

// ================= APP =================
function App() {
  const [tab, setTab] = useState("dashboard");

  const [trips, setTrips] = useState(() => JSON.parse(localStorage.getItem("trips")) || []);
  const [tour, setTour] = useState(() => JSON.parse(localStorage.getItem("tour")) || []);

  useEffect(()=>localStorage.setItem("trips", JSON.stringify(trips)),[trips]);
  useEffect(()=>localStorage.setItem("tour", JSON.stringify(tour)),[tour]);

  const [form, setForm] = useState({
    customer:"Vedan",
    vehicleType:"7 chỗ",
    km:"",
    hours:"",
    price:"",
    paid:false
  });

  // ================= VEDAN =================
  function calcVedan(){
    let km = Number(form.km||0);
    let hours = Number(form.hours||0);
    let base = 1000000;
    if(km>100) base+= (km-100)*7000;
    if(hours>8) base+= (hours-8)*60000;
    return base;
  }

  // ================= SAVE =================
  function saveTrip(){
    let price = form.customer==="Vedan" ? calcVedan() : Number(form.price||0);
    setTrips([{...form, price, id:Date.now()}, ...trips]);
  }

  function saveTour(){
    setTour([{...form, id:Date.now()}, ...tour]);
  }

  // ================= REPORT =================
  const report = useMemo(()=>{
    let today = new Date().toISOString().slice(0,10);
    let month = today.slice(0,7);

    let todayTrips = trips.filter(t=>t.date===today);
    let monthTrips = trips.filter(t=>t.date?.startsWith(month));

    return {
      todayRevenue: todayTrips.reduce((s,t)=>s+t.price,0),
      monthRevenue: monthTrips.reduce((s,t)=>s+t.price,0),
      total: trips.length
    };
  },[trips]);

  const input="w-full p-3 rounded-xl border";
  const card="bg-white p-4 rounded-2xl shadow";

  return (
    <div className="max-w-md mx-auto p-4 pb-28 bg-slate-100 min-h-screen">

      <Header/>

      {/* ================= DASHBOARD ================= */}
      {tab==="dashboard" && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className={card}>Tổng chuyến<br/><b>{report.total}</b></div>
          <div className={card}>Hôm nay<br/><b>{fmt(report.todayRevenue)} đ</b></div>
          <div className={card}>Tháng<br/><b>{fmt(report.monthRevenue)} đ</b></div>
          <div className={card}>Xe DL<br/><b>{tour.length}</b></div>
        </div>
      )}

      {/* ================= NHẬP ================= */}
      {tab==="entry" && (
        <div className="mt-4 space-y-3">
          <select className={input} value={form.customer}
            onChange={e=>setForm({...form,customer:e.target.value})}>
            <option>Vedan</option>
            <option>Khách khác</option>
          </select>

          <select className={input} value={form.vehicleType}
            onChange={e=>setForm({...form,vehicleType:e.target.value})}>
            <option>7 chỗ</option>
            <option>16 chỗ</option>
          </select>

          {form.customer==="Vedan" && (
            <>
              <input className={input} placeholder="KM"
                onChange={e=>setForm({...form,km:e.target.value})}/>
              <input className={input} placeholder="Giờ"
                onChange={e=>setForm({...form,hours:e.target.value})}/>
              <div className={card}>Giá Vedan: {fmt(calcVedan())} đ</div>
            </>
          )}

          {form.customer!=="Vedan" && (
            <input className={input} placeholder="Giá"
              onChange={e=>setForm({...form,price:e.target.value})}/>
          )}

          <button onClick={saveTrip} className="bg-blue-700 text-white w-full p-3 rounded-xl">
            Lưu
          </button>
        </div>
      )}

      {/* ================= TRIPS ================= */}
      {tab==="trips" && (
        <div className="mt-4 space-y-3">
          {trips.map(t=>(
            <div key={t.id} className={card}>
              {t.customer} - {t.vehicleType}<br/>
              {fmt(t.price)} đ
            </div>
          ))}
        </div>
      )}

      {/* ================= TOUR ================= */}
      {tab==="tour" && (
        <div className="mt-4 space-y-3">
          <input className={input} placeholder="Giá"
            onChange={e=>setForm({...form,price:e.target.value})}/>
          <button onClick={saveTour} className="bg-green-600 text-white w-full p-3 rounded-xl">
            Lưu xe du lịch
          </button>

          {tour.map(t=>(
            <div key={t.id} className={card}>
              Xe DL: {fmt(t.price)} đ
            </div>
          ))}
        </div>
      )}

      {/* ================= NAV ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-4 text-center py-3 text-sm font-semibold">
          <button onClick={()=>setTab("dashboard")}>🏠</button>
          <button onClick={()=>setTab("entry")}>➕</button>
          <button onClick={()=>setTab("trips")}>🚗</button>
          <button onClick={()=>setTab("tour")}>🧳</button>
        </div>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
