const TRIP = {
  password: "19",
  targetDate: "2026-11-18T13:30:00", // Buluşacağınız tarihi buradan ayarlayabilirsin
  days: [
    {
      n:"01", date:"18 KASIM", title:"Yola çıkıyoruz",
      text:"İlk günümüz. Şehre varış, otele yerleşme ve birlikte keşfetmeye başlayacağımız sakin bir akşam.",
      places:["Varış","Dürüm500Ankara","Kuğulu Pasajı(Parfüm)","50.Parkı","Gece Çorbası","Otel Giriş"],
      image:"tunalı kahvaltı.jpeg",
      memory:true, memoryTitle:"Bizim en sevdiğimiz kahvaltımız", memoryDate:"19 KASIM ",
      
    },
    {
      n:"02", date:"19 KASIM", title:"1. Yılımız ♡",
      text:"Bugün sıradan bir gün değil. Bir yıl önce başlayan hikâyemizin yeni sayfasını birlikte açıyoruz.",
      places:["Eymir Gölü (bisiklet ve kahvaltı)","Saç Kesimi","Portakal Çiçeği Parkı","Millet Kütüphanesi","Türk Tarih Müzesi ve Parkı","Yıl Dönümü Yemeğimiz"],
      image:"19mayıs.jpeg",
      memory:true, memoryTitle:"Bizim ilk sayfalarımız", memoryDate:"19 KASIM • 1. YIL",
      memoryText:"İlk sevgili olduğumuz gün balım nice yıllarımız bir ömrümüz olsun beraber çok seviyorum çok bi sürüü seni"
    },
    {
      n:"03", date:"20 KASIM", title:"Şehri keşfet",
      text:"Biraz tarih, biraz kahve, bolca piknikk. Plansızca kaybolabileceğimiz gün.",
      places:["Mavi Göl","Atatürk Orman Çiftliği","Körserlik Göleti","Hava Müzesi","Türk Rus Dostluk Evi Kültür ve Sanat","Sürpsiz Bir Yer"],
      image:"piknik12.jpeg",
      memory:true, memoryTitle:"Bizim ilk pikniğimizzz", memoryDate:"12 MAYIS ",
    },
    {
      n:"04", date:"21 KASIM", title:"Biz bize",
      text:"Bugünü en eğlenceli haliyle yapıyoruzz balımmm. Güzel bir kahvaltı, sevdiğimiz yerler ve birlikte bol bol fotoğraf.",
      places:["İsmail Abi Kahvaltı","Zeplinx(Forumankaraavm)","Burgasm","Lunapark","Luum x Dandelion Cafe","Art Artisan Cafe","Sinema"],
      image:"gösteri.jpeg",
      memory:true, memoryTitle:"Birlikte geçen güzel bir gün", memoryDate:"14 MAYIS",
      memoryText:"AH ahhh sevgilim klasik müzik dinlediğimiz mükemmel bir günnn"
    },
    {
      n:"05", date:"22 KASIM", title:"Son sayfa değil",
      text:"Dönüş günü. Bavullar kapanıyor ama defter burada bitmiyor. Bir sonraki yolculuğun ilk cümlesini yazıyoruz.",
      places:["Tunalı Kahvaltı","Luuq Çukurambar","Beraber Zaman ve Eve dönüş"],
      image:"son gün.jpeg",
      memory:true, memoryTitle:"Bizim mutlu üzgün ilk günümüz", memoryDate:"28 KASIM ",
    }
  ]
};

const $ = s => document.querySelector(s);
const dayList = $("#dayList");

function renderDays(){
  dayList.innerHTML = TRIP.days.map((d,i)=>`
    <article class="day-card">
      <div class="day-number">${d.n}<small>GÜN</small></div>
      <div class="day-content">
        <span class="date">${d.date}</span>
        <h4>${d.title}</h4>
        <p>${d.text}</p>
        <div class="places">${d.places.map(x=>`<span class="place"><i>♡</i>${x}</span>`).join("")}</div>
      </div>
      <div class="day-photo" style="background-image:url('${d.image}')" data-index="${i}">
        ${d.memory ? '<span class="memory-badge">POLAROID ♡</span>' : ''}
        <span class="photo-label">${d.memory ? "Anımızı görmek için dokun" : "Günün rotası"}</span>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".day-photo").forEach(el=>{
    el.addEventListener("click",()=>openMemory(Number(el.dataset.index)));
  });
}

function openMemory(i){
  const d=TRIP.days[i];
  if(!d.memory){
    return;
  }
  $("#memoryTitle").textContent=d.memoryTitle;
  $("#memoryDate").textContent=d.memoryDate;
  $("#memoryText").textContent=d.memoryText;
  $("#memoryImage").style.backgroundImage=`url('${d.memoryImage || d.image}')`;
  $("#memoryModal").classList.remove("hidden");
}

$("#closeModal").onclick=()=>$("#memoryModal").classList.add("hidden");
$("#memoryModal").querySelector(".modal-backdrop").onclick=()=>$("#memoryModal").classList.add("hidden");

// GERİ SAYIM
function initCountdown() {
  const target = new Date(TRIP.targetDate).getTime();
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) {
      clearInterval(timer);
      $("#countdown").innerHTML = "<p class='intro' style='color:var(--rose-dark); font-weight:bold; font-size:18px;'>O büyük gün geldi! ♡</p>";
      return;
    }

    $("#cdDays").textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    $("#cdHours").textContent = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    $("#cdMins").textContent = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    $("#cdSecs").textContent = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
  }, 1000);
}

function unlock(){
  const val=$("#codeInput").value.trim();
  if(val===TRIP.password){
    $("#lockScreen").classList.add("hidden");
    $("#appScreen").classList.remove("hidden");
    window.scrollTo(0,0);
  }else{
    $("#errorMsg").classList.add("show");
    $("#codeInput").animate([{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:260});
  }
}
$("#unlockBtn").onclick=unlock;
$("#codeInput").addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});
$("#codeInput").addEventListener("input",()=>$("#errorMsg").classList.remove("show"));

// PAPATYALARI GÖRSEL İLE YAĞDIRMA
function startPetals(count=15){
  const box=$("#petals");
  for(let i=0;i<count;i++){
    const p=document.createElement("img");
    p.className="petal";
    p.src="papatya.png"; // KLASÖRDEKİ GÖRSELİN İSMİ
    p.style.left=Math.random()*100+"vw";
    p.style.animationDuration=(6+Math.random()*6)+"s";
    p.style.animationDelay=(Math.random()*5)+"s";
    p.style.setProperty("--drift",(-150+Math.random()*300)+"px");
    const size = (20 + Math.random() * 20); 
    p.style.width = size + "px";
    p.style.height = "auto";
    box.appendChild(p);
  }
}

renderDays();
initCountdown();
startPetals();