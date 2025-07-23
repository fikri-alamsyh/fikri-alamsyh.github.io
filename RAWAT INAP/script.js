// Simulasi data kamar tersedia
const kamarData = [
    { tipe: "Umum", tersedia: Math.floor(Math.random() * 10) + 1 },
    { tipe: "VIP", tersedia: Math.floor(Math.random() * 5) + 1 },
    { tipe: "ICU", tersedia: Math.floor(Math.random() * 3) + 1 }
];

function tampilkanKamar() {
    let html = "<ul>";
    kamarData.forEach(kamar => {
        html += `<li>${kamar.tipe}: <strong>${kamar.tersedia}</strong> kamar tersedia</li>`;
    });
    html += "</ul>";
    document.getElementById("kamar-status").innerHTML = html;
}

function refreshKamar() {
    kamarData.forEach(kamar => {
        kamar.tersedia = Math.floor(Math.random() * 10) + 1;
    });
    tampilkanKamar();
}

// Simpan data ke LocalStorage
function simpanPendaftaran(data) {
    let daftar = JSON.parse(localStorage.getItem("pendaftaranRSUNTAN")) || [];
    daftar.push(data);
    localStorage.setItem("pendaftaranRSUNTAN", JSON.stringify(daftar));
}

// Fitur animasi menarik pada card pendaftar (fade-in dan hover pulse)
function animatePendaftarTable() {
    const table = document.querySelector("#daftar-list table");
    if (table) {
        table.style.opacity = "0";
        table.style.transform = "translateY(24px)";
        setTimeout(() => {
            table.style.transition = "opacity 0.7s, transform 0.7s";
            table.style.opacity = "1";
            table.style.transform = "translateY(0)";
        }, 100);
        // Animasi pulse pada hover baris
        Array.from(table.querySelectorAll("tr")).forEach((row, idx) => {
            if (idx === 0) return; // skip header
            row.onmouseenter = function() {
                row.style.boxShadow = "0 0 16px #ffd70099";
                row.style.transform = "scale(1.03)";
                row.style.transition = "box-shadow 0.3s, transform 0.3s";
            };
            row.onmouseleave = function() {
                row.style.boxShadow = "";
                row.style.transform = "";
            };
        });
    }
}

// Tambahkan animasi pada fitur card layanan
function animateFeatureCards() {
    document.querySelectorAll('.feature').forEach(card => {
        card.addEventListener('mouseenter', function() {
            card.style.boxShadow = "0 0 24px #0fc0e8";
            card.style.transform = "scale(1.06)";
            card.style.transition = "box-shadow 0.3s, transform 0.3s";
        });
        card.addEventListener('mouseleave', function() {
            card.style.boxShadow = "";
            card.style.transform = "";
        });
    });
}

// Animasi pada toast notification
function showToast(msg, color='#0fc0e8') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '32px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = color;
        toast.style.color = '#fff';
        toast.style.padding = '12px 28px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 2px 16px #002c79';
        toast.style.display = 'none';
        toast.style.fontSize = '16px';
        toast.style.zIndex = '999';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.background = color;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.opacity = '1'; }, 50);
    setTimeout(() => { toast.style.opacity = '0'; }, 2200);
    setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

// Panggil animasi setelah daftar pendaftar dan fitur card muncul
function tampilkanDaftar() {
    let daftar = JSON.parse(localStorage.getItem("pendaftaranRSUNTAN")) || [];
    let html = "<h3>Data Pendaftar Rawat Inap</h3>";
    if (daftar.length === 0) {
        html += "<p>Belum ada pendaftar.</p>";
    } else {
        html += "<table border='1' cellpadding='6' style='width:100%;margin-top:10px'><tr><th>Nama</th><th>Umur</th><th>Jenis Kelamin</th><th>Kamar</th><th>Keluhan</th></tr>";
        daftar.forEach(d => {
            html += `<tr>
                <td>${d.nama}</td>
                <td>${d.umur}</td>
                <td>${d.jenis_kelamin}</td>
                <td>${d.kamar}</td>
                <td>${d.keluhan}</td>
            </tr>`;
        });
        html += "</table>";
    }
    let daftarDiv = document.getElementById("daftar-list");
    if (daftarDiv) {
        daftarDiv.innerHTML = html;
        animatePendaftarTable();
    }
}

// Toast notification
function showToast(msg, color='#0fc0e8') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '32px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = color;
        toast.style.color = '#fff';
        toast.style.padding = '12px 28px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 2px 16px #002c79';
        toast.style.display = 'none';
        toast.style.fontSize = '16px';
        toast.style.zIndex = '999';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.background = color;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.opacity = '1'; }, 50);
    setTimeout(() => { toast.style.opacity = '0'; }, 2200);
    setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

// Animasi pada submit pendaftaran
function showLoaderOnForm() {
    let loader = document.getElementById('form-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'form-loader';
        loader.innerHTML = '<span class="loader"></span> Memproses...';
        loader.style.textAlign = 'center';
        loader.style.marginTop = '10px';
        document.getElementById('form-daftar').appendChild(loader);
    }
    loader.style.display = 'block';
}
function hideLoaderOnForm() {
    let loader = document.getElementById('form-loader');
    if (loader) loader.style.display = 'none';
}

// Dark mode toggle
document.getElementById('darkmode-toggle').onclick = function() {
    document.body.classList.toggle('darkmode');
    showToast(document.body.classList.contains('darkmode') ? 'Dark mode aktif' : 'Dark mode nonaktif', '#0fc0e8');
};

// Floating chat button animasi
let floatingChat = document.getElementById('floating-chat');
if (floatingChat) {
    floatingChat.onmouseenter = function() {
        floatingChat.style.transform = 'scale(1.1)';
        showToast('Hubungi admin via WhatsApp!', '#0fc0e8');
    };
    floatingChat.onmouseleave = function() {
        floatingChat.style.transform = 'scale(1)';
    };
}

// Animasi submit pendaftaran
document.addEventListener("DOMContentLoaded", function() {
    tampilkanKamar();
    tampilkanDaftar();

    const form = document.getElementById("form-daftar");
    const alertBox = document.getElementById("form-alert");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        showLoaderOnForm();
        setTimeout(() => {
            const data = {
                nama: form.nama.value,
                umur: form.umur.value,
                jenis_kelamin: form.jenis_kelamin.value,
                kamar: form.kamar.value,
                keluhan: form.keluhan.value
            };
            simpanPendaftaran(data);
            hideLoaderOnForm();
            alertBox.style.display = "block";
            alertBox.textContent = "Pendaftaran berhasil! Data Anda telah tersimpan.";
            showToast("Pendaftaran berhasil!", "#0fc0e8");
            form.reset();
            tampilkanDaftar();
            setTimeout(() => { alertBox.style.display = "none"; }, 4000);
        }, 1200);
    });

    // FAQ interaktif (expand/collapse)
    document.querySelectorAll('#faq ul li').forEach(function(item) {
        item.style.cursor = "pointer";
        item.addEventListener('click', function() {
            if (item.childNodes.length > 1) {
                let detail = item.querySelector('span');
                if (detail) {
                    detail.style.display = detail.style.display === "none" ? "inline" : "none";
                }
            }
        });
    });

    // Kontak interaktif
    let kontakSection = document.getElementById("kontak");
    if (kontakSection) {
        let waBtn = document.createElement("button");
        waBtn.textContent = "Chat WhatsApp";
        waBtn.className = "glow-btn";
        waBtn.style.marginRight = "10px";
        waBtn.onclick = function() {
            window.open("https://wa.me/6281234567890", "_blank");
        };
        kontakSection.appendChild(waBtn);

        let emailBtn = document.createElement("button");
        emailBtn.textContent = "Kirim Email";
        emailBtn.className = "glow-btn";
        emailBtn.onclick = function() {
            window.location.href = "mailto:info@rsuntan.ac.id";
        };
        kontakSection.appendChild(emailBtn);
    }

    // Tombol export, print, clear, dan search
    let exportBtn = document.getElementById('export-btn');
    if (exportBtn) exportBtn.onclick = exportPendaftarCSV;
    let printBtn = document.getElementById('print-data-btn');
    if (printBtn) printBtn.onclick = printPendaftar;
    let clearBtn = document.getElementById('clear-data-btn');
    if (clearBtn) clearBtn.onclick = clearPendaftar;
    let searchInput = document.getElementById('search-pendaftar');
    if (searchInput) searchInput.oninput = function() {
        searchPendaftar(this.value);
        tampilkanStatistikPendaftar();
    };

    // Tampilkan statistik saat daftar pendaftar muncul
    tampilkanStatistikPendaftar();
    animateFeatureCards();
});

// Fitur: Export data pendaftar ke CSV
function exportPendaftarCSV() {
    let daftar = JSON.parse(localStorage.getItem("pendaftaranRSUNTAN")) || [];
    if (daftar.length === 0) return showToast("Tidak ada data untuk diexport!", "#e53935");
    let csv = "Nama,Umur,Jenis Kelamin,Kamar,Keluhan\n";
    daftar.forEach(d => {
        csv += `"${d.nama}","${d.umur}","${d.jenis_kelamin}","${d.kamar}","${d.keluhan}"\n`;
    });
    let blob = new Blob([csv], {type: 'text/csv'});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "data_pendaftar_rawat_inap.csv";
    link.click();
    showToast("Data berhasil diexport!", "#0fc0e8");
}

// Fitur: Print data pendaftar
function printPendaftar() {
    let daftarDiv = document.getElementById("daftar-list");
    if (!daftarDiv || daftarDiv.innerHTML.trim() === "") return showToast("Tidak ada data untuk dicetak!", "#e53935");
    let win = window.open('', '', 'width=900,height=600');
    win.document.write('<html><head><title>Cetak Data Pendaftar</title>');
    win.document.write('<link rel="stylesheet" href="style.css">');
    win.document.write('</head><body>');
    win.document.write(daftarDiv.innerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
}

// Fitur: Hapus semua data pendaftar
function clearPendaftar() {
    if (confirm("Yakin ingin menghapus semua data pendaftar?")) {
        localStorage.removeItem("pendaftaranRSUNTAN");
        tampilkanDaftar();
        showToast("Semua data telah dihapus!", "#e53935");
    }
}

// Fitur: Pencarian data pendaftar
function searchPendaftar(keyword) {
    let daftar = JSON.parse(localStorage.getItem("pendaftaranRSUNTAN")) || [];
    let filtered = daftar.filter(d => d.nama.toLowerCase().includes(keyword.toLowerCase()));
    let html = "<h3>Data Pendaftar Rawat Inap</h3>";
    if (filtered.length === 0) {
        html += "<p>Tidak ditemukan pendaftar dengan nama tersebut.</p>";
    } else {
        html += "<table border='1' cellpadding='6' style='width:100%;margin-top:10px'><tr><th>Nama</th><th>Umur</th><th>Jenis Kelamin</th><th>Kamar</th><th>Keluhan</th></tr>";
        filtered.forEach(d => {
            html += `<tr>
                <td>${d.nama}</td>
                <td>${d.umur}</td>
                <td>${d.jenis_kelamin}</td>
                <td>${d.kamar}</td>
                <td>${d.keluhan}</td>
            </tr>`;
        });
        html += "</table>";
    }
    let daftarDiv = document.getElementById("daftar-list");
    if (daftarDiv) daftarDiv.innerHTML = html;
}

// Fitur: Statistik jumlah pendaftar
function tampilkanStatistikPendaftar() {
    let daftar = JSON.parse(localStorage.getItem("pendaftaranRSUNTAN")) || [];
    let total = daftar.length;
    let laki = daftar.filter(d => d.jenis_kelamin === "Laki-laki").length;
    let perempuan = daftar.filter(d => d.jenis_kelamin === "Perempuan").length;
    let html = `
        <div style="display:flex;gap:24px;justify-content:center;margin-bottom:18px;">
            <div style="background:#0fc0e8;color:#fff;padding:18px 24px;border-radius:12px;box-shadow:0 2px 8px #0fc0e8;">
                <div style="font-size:22px;font-weight:bold;">${total}</div>
                <div>Total Pendaftar</div>
            </div>
            <div style="background:#ffd700;color:#002c79;padding:18px 24px;border-radius:12px;box-shadow:0 2px 8px #ffd700;">
                <div style="font-size:22px;font-weight:bold;">${laki}</div>
                <div>Laki-laki</div>
            </div>
            <div style="background:#002c79;color:#fff;padding:18px 24px;border-radius:12px;box-shadow:0 2px 8px #002c79;">
                <div style="font-size:22px;font-weight:bold;">${perempuan}</div>
                <div>Perempuan</div>
            </div>
        </div>
    `;
    let daftarDiv = document.getElementById("daftar-list");
    if (daftarDiv) daftarDiv.insertAdjacentHTML('afterbegin', html);
}

// Tambahkan animasi loader CSS jika belum ada
if (!document.getElementById('loader-style')) {
    const style = document.createElement('style');
    style.id = 'loader-style';
    style.innerHTML = `
    .loader {
        border: 4px solid #e0f2f1;
        border-top: 4px solid #0fc0e8;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        animation: spin 0.8s linear infinite;
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
    }
    @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
    }
    `;
    document.head.appendChild(style);
}