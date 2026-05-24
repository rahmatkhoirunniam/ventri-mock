
        // Load dataset from localStorage or fallback
        let coops = [];
        const storedCoops = localStorage.getItem('coops');
        if (storedCoops) {
            coops = JSON.parse(storedCoops);
            // Inject dummy data for Kandang 1 if history is empty (for demo purposes)
            let kandang1 = coops.find(c => c.id === 1);
            if (kandang1 && (!kandang1.history || kandang1.history.length < 5)) {
                kandang1.history = [
                    { date: "24/05/2026", type: "pakan", pakan_type: "pakan-premix", pakan: 55, air: 120 },
                    { date: "23/05/2026", type: "produksi", telur: 18.5, susu: 0, daging: 0 },
                    { date: "22/05/2026", type: "deplesi", sehat: 3, sakit: 0, mati: 1, afkir: 0 },
                    { date: "21/05/2026", type: "catatan", notes: "Pengecekan rutin ventilasi berjalan lancar. Hewan terpantau aktif.", photo: "kondisi_pagi.jpg" },
                    { date: "20/05/2026", type: "pakan", pakan_type: "pakan-standar", pakan: 54, air: 115 },
                    { date: "20/05/2026", type: "produksi", telur: 17.8, susu: 0, daging: 0 }
                ];
                localStorage.setItem('coops', JSON.stringify(coops));
            }
        } else {
            // Initial Coops dataset fallback
            coops = [
                {
                    id: 1,
                    name: "Kandang ayam ayaman",
                    status: "Aktif",
                    loc: "Lokasi tidak ditentukan",
                    periodName: "sss",
                    periodDate: "20/5/2026",
                    sehat: 3,
                    sakit: 0,
                    mati: 1,
                    capacity: 200,
                    type: "Battery Cage",
                    species: "Ayam Petelur",
                    history: [
                        { date: "24/05/2026", type: "pakan", pakan_type: "pakan-premix", pakan: 55, air: 120 },
                        { date: "23/05/2026", type: "produksi", telur: 18.5, susu: 0, daging: 0 },
                        { date: "22/05/2026", type: "deplesi", sehat: 3, sakit: 0, mati: 1, afkir: 0 },
                        { date: "21/05/2026", type: "catatan", notes: "Pengecekan rutin ventilasi berjalan lancar. Hewan terpantau aktif.", photo: "kondisi_pagi.jpg" },
                        { date: "20/05/2026", type: "pakan", pakan_type: "pakan-standar", pakan: 54, air: 115 },
                        { date: "20/05/2026", type: "produksi", telur: 17.8, susu: 0, daging: 0 }
                    ],
                    occupants: [
                        {
                            name: "xxxxxx",
                            species: "AYAM PETELUR",
                            hereQty: 2,
                            hereSehat: 2,
                            hereSakit: 0,
                            hereMati: 0,
                            totalQty: 10,
                            totalSehat: 0,
                            totalSakit: 0,
                            totalMati: 0,
                            batchMatiCount: 0
                        },
                        {
                            name: "Test Satu",
                            species: "AYAM PETELUR",
                            hereQty: 1,
                            hereSehat: 1,
                            hereSakit: 0,
                            hereMati: 0,
                            totalQty: 10,
                            totalSehat: 5,
                            totalSakit: 5,
                            totalMati: 0,
                            batchMatiCount: 5
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Kandang pejantan",
                    status: "Aktif",
                    loc: "Lokasi tidak ditentukan",
                    periodName: "Test",
                    periodDate: "1/6/2026",
                    sehat: 36,
                    sakit: 0,
                    mati: 1,
                    capacity: 1000,
                    type: "Battery Cage",
                    species: "Ayam Petelur",
                    history: [],
                    occupants: [
                        {
                            name: "Ayam petanjan",
                            species: "AYAM PETELUR",
                            hereQty: 76,
                            hereSehat: 73,
                            hereSakit: 3,
                            hereMati: 22,
                            totalQty: 8029,
                            totalSehat: 3,
                            totalSakit: 2,
                            totalMati: 0,
                            batchMatiCount: 22
                        },
                        {
                            name: "cccc",
                            species: "AYAM PETELUR",
                            hereQty: 197,
                            hereSehat: 194,
                            hereSakit: 3,
                            hereMati: 1,
                            totalQty: 211,
                            totalSehat: 3,
                            totalSakit: 1,
                            totalMati: 0,
                            batchMatiCount: 1
                        }
                    ]
                },
                {
                    id: 3,
                    name: "kandang a",
                    status: "Aktif",
                    loc: "kandang a",
                    periodName: "xxx",
                    periodDate: "16/3/2026",
                    sehat: 39,
                    sakit: 0,
                    mati: 6,
                    capacity: 1000,
                    type: "Battery Cage",
                    species: "Ayam Petelur",
                    history: [],
                    occupants: [
                        {
                            name: "ayam uye",
                            species: "AYAM PETELUR",
                            hereQty: 20,
                            hereSehat: 20,
                            hereSakit: 0,
                            hereMati: 0,
                            totalQty: 155,
                            totalSehat: 0,
                            totalSakit: 0,
                            totalMati: 0,
                            batchMatiCount: 0
                        },
                        {
                            name: "DOC Layer Super",
                            species: "AYAM PETELUR",
                            hereQty: 10,
                            hereSehat: 10,
                            hereSakit: 0,
                            hereMati: 0,
                            totalQty: 551,
                            totalSehat: 0,
                            totalSakit: 0,
                            totalMati: 0,
                            batchMatiCount: 0
                        }
                    ]
                }
            ];
            localStorage.setItem('coops', JSON.stringify(coops));
        }

        // Parse query string for ?id=X
        const urlParams = new URLSearchParams(window.location.search);
        const coopId = parseInt(urlParams.get('id')) || 1;

        // Retrieve coop details
        const coop = coops.find(c => c.id === coopId);

        // State variables
        let initialPop = 3;

        // Save coops state back to localStorage
        function saveState() {
            localStorage.setItem('coops', JSON.stringify(coops));
        }

        // Initialize Page Information
        function initPage() {
            if (!coop) {
                document.getElementById('coop-name-title').textContent = "Kandang Tidak Ditemukan";
                return;
            }

            // Header info
            document.getElementById('coop-name-title').textContent = coop.name;
            document.getElementById('coop-meta-sub').textContent = `Kapasitas: ${coop.capacity.toLocaleString('id')} ekor | Lokasi: ${coop.loc}`;

            // Banner Period
            document.getElementById('period-name-display').textContent = `Periode Aktif: ${coop.periodName}`;
            document.getElementById('period-start-date').textContent = `Mulai: ${coop.periodDate}`;

            // Calculate Initial Population based on sum of occupants hereQty + mati
            const sumOccupantsQty = coop.occupants ? coop.occupants.reduce((s, o) => s + o.hereQty, 0) : 0;
            // Let initial pop be sumOccupantsQty + coop.mati
            initialPop = sumOccupantsQty + coop.mati;
            if (initialPop === 0) initialPop = coop.capacity; // Fallback

            // Fill prefilled values in the input form based on current coop states
            document.getElementById('form-sehat').value = coop.sehat;
            document.getElementById('form-sakit').value = coop.sakit;

            // Render components
            renderMetrics();
            renderOccupants();
            renderDailyLogsTable();
        }

        // Render Occupants grid
        function renderOccupants() {
            const container = document.getElementById('lots-grid-container');
            container.innerHTML = '';

            if (!coop.occupants || coop.occupants.length === 0) {
                container.innerHTML = `<div class="empty-grid-col">Tidak ada batch penghuni di kandang ini saat ini.</div>`;
                return;
            }

            coop.occupants.forEach(occ => {
                const healthy = occ.hereSehat ?? occ.hereQty;
                const sick = occ.hereSakit ?? 0;
                const deadCount = occ.batchMatiCount ?? 0;
                container.innerHTML += `
                    <div class="lot-c">
                        <div class="lot-c-header">
                            <span class="lot-c-name">${occ.name}</span>
                            <span class="lot-c-badge">${occ.hereQty} Ekor</span>
                        </div>
                        <div style="font-size:10px; color:var(--ink3); font-weight:600; text-transform:uppercase;">${occ.species}</div>
                        <div class="lot-c-details">
                            <div class="lot-c-dots">
                                <span class="lot-c-dot-val"><span class="l-dot sehat"></span> ${healthy}</span>
                                <span class="lot-c-dot-val"><span class="l-dot sakit"></span> ${sick}</span>
                            </div>
                            <span class="lot-c-batch-mortality">Batch: ${deadCount} Mati</span>
                        </div>
                    </div>
                `;
            });
        }

        // Calculate and Render Metrics Cards
        function renderMetrics() {
            const totalAlive = coop.sehat + coop.sakit;
            
            // 1. Populasi Card
            document.getElementById('val-pop').textContent = totalAlive.toLocaleString('id');
            document.getElementById('sub-pop').textContent = `Dari awal ${initialPop.toLocaleString('id')} ekor`;

            // 2. Persentase Deplesi Card
            const deplesiPct = initialPop > 0 ? ((coop.mati / initialPop) * 100) : 0;
            document.getElementById('val-dep').textContent = `${deplesiPct.toFixed(0)}%`;
            document.getElementById('sub-dep').textContent = `Mati: ${coop.mati} | Afkir: 0`;

            // 3. FCR Cumulative Card
            // Calculate total feed and egg weight from history
            let totalFeed = 0;
            let totalEgg = 0;
            let totalSusu = 0;
            let totalDaging = 0;

            if (coop.history) {
                coop.history.forEach(log => {
                    totalFeed += log.pakan || 0;
                    totalEgg += log.telur || 0;
                    totalSusu += log.susu || 0;
                    totalDaging += log.daging || 0;
                });
            }

            const fcr = totalEgg > 0 ? (totalFeed / totalEgg) : 0;
            document.getElementById('val-fcr').textContent = fcr > 0 ? fcr.toFixed(1) : '0';
            document.getElementById('sub-fcr').textContent = `Total Pakan: ${totalFeed.toLocaleString('id')} kg`;

            // 4. HDP Terakhir Card (Hen Day Production)
            // HDP = (Eggs produced (butir) / laying hens population) * 100
            // Assuming 1 kg of egg = 16 eggs. For the last log:
            let lastHdp = 0;
            let totalEggHistory = totalEgg;
            
            if (coop.history && coop.history.length > 0) {
                const lastLog = coop.history[0];
                const eggsCount = (lastLog.telur || 0) * 16;
                const layingPop = lastLog.sehat + lastLog.sakit;
                lastHdp = layingPop > 0 ? ((eggsCount / layingPop) * 100) : 0;
            }

            document.getElementById('val-hdp').textContent = `${lastHdp.toFixed(0)}%`;
            document.getElementById('sub-hdp').textContent = `Total Telur (Kg): ${totalEggHistory.toLocaleString('id')}`;

            // 5. Hasil Lainnya Card
            document.getElementById('val-susu').textContent = totalSusu.toLocaleString('id');
            document.getElementById('val-daging').textContent = totalDaging.toLocaleString('id');
        }

        // Tab Switchers
        function switchRecordTab(tabName, btnElement) {
            const btns = btnElement.parentElement.querySelectorAll('.tab-btn');
            btns.forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');

            const panes = document.querySelectorAll('#records-table-block .tab-pane');
            panes.forEach(p => p.classList.remove('active'));
            document.getElementById('pane-' + tabName).classList.add('active');
        }

        function switchModalTab(tabName, btnElement) {
            const btns = btnElement.parentElement.querySelectorAll('.tab-btn');
            btns.forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');

            const modal = document.getElementById('input-log-modal');
            if (modal) modal.dataset.activeTab = tabName;

            const panes = document.querySelectorAll('#input-log-modal .modal-tab-pane');
            panes.forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
            const target = document.getElementById('form-tab-' + tabName);
            if (target) { target.style.display = 'block'; target.classList.add('active'); }
        }

        // Set modal UI mode: 'create' shows tabs; 'edit' hides tabs and only shows specific form
        function setModalMode(mode, type) {
            const modal = document.getElementById('input-log-modal');
            if (!modal) return;
            const tabNav = modal.querySelector('.tab-nav');
            const titleEl = modal.querySelector('.mt');
            const saveBtn = modal.querySelector('.mfooter .btn-solid');
            if (mode === 'edit') {
                modal.dataset.mode = 'edit';
                if (tabNav) tabNav.style.display = 'none';
                // show only the supplied type form
                if (type) {
                    const tabBtn = modal.querySelector(`.tab-nav .tab-btn[onclick*="${type}"]`) || modal.querySelector(`.tab-nav .tab-btn`);
                    if (tabBtn) switchModalTab(type, tabBtn);
                }
                // update title and save text
                if (titleEl) titleEl.textContent = `Edit ${type === 'pakan' ? 'Pakan' : type === 'produksi' ? 'Produksi' : type === 'deplesi' ? 'Deplesi' : 'Catatan'}`;
                if (saveBtn) saveBtn.textContent = 'Simpan Perubahan';
            } else {
                // create mode
                delete modal.dataset.mode;
                if (tabNav) tabNav.style.display = '';
                if (titleEl) titleEl.textContent = 'Catat Log Harian Kandang';
                if (saveBtn) saveBtn.textContent = 'Simpan';
            }
        }

        // Submit the currently active tab form (used by unified footer Save button)
        function submitActiveTab() {
            const modal = document.getElementById('input-log-modal');
            const activeTab = modal && modal.dataset.activeTab ? modal.dataset.activeTab : 'pakan';
            const form = document.getElementById('form-tab-' + activeTab);
            if (!form) return;
            const fakeEvent = { preventDefault: function(){}, target: form };
            submitDailyLog(fakeEvent, activeTab);
        }

        // Render Daily Logs table / switch empty state
        function renderDailyLogsTable() {
            const emptyBlock = document.getElementById('empty-records-block');
            const tableBlock = document.getElementById('records-table-block');

            // Apply filter date
            const filterDateEl = document.getElementById('filter-date');
            const filterDateVal = filterDateEl ? filterDateEl.value : '';
            let filterDateStr = '';
            if (filterDateVal) {
                const parts = filterDateVal.split('-');
                filterDateStr = `${parseInt(parts[2], 10)}/${parseInt(parts[1], 10)}/${parts[0]}`;
            }

            let displayHistory = coop.history || [];
            if (filterDateStr) {
                displayHistory = displayHistory.filter(log => log.date === filterDateStr);
            }

            if (!displayHistory || displayHistory.length === 0) {
                emptyBlock.style.display = 'flex';
                tableBlock.style.display = 'none';
                return;
            }

            emptyBlock.style.display = 'none';
            tableBlock.style.display = 'block';

            const tbodyPakan = document.getElementById('tbody-pakan');
            const tbodyProduksi = document.getElementById('tbody-produksi');
            const tbodyDeplesi = document.getElementById('tbody-deplesi');
            const tbodyCatatan = document.getElementById('tbody-catatan');

            tbodyPakan.innerHTML = '';
            tbodyProduksi.innerHTML = '';
            tbodyDeplesi.innerHTML = '';
            tbodyCatatan.innerHTML = '';

            displayHistory.forEach(log => {
                const originalIndex = coop.history.indexOf(log);
                const eggsCount = (log.telur || 0) * 16;
                const pop = (log.sehat || 0) + (log.sakit || 0);
                const hdp = pop > 0 ? ((eggsCount / pop) * 100) : 0;
                const fcr = log.telur > 0 ? ((log.pakan || 0) / log.telur) : 0;

                const aksiHtml = `<td style="white-space:nowrap;">
                    <button style="border:none; background:none; cursor:pointer; font-size:14px; margin-right:6px;" onclick="editLog(${originalIndex})" title="Edit">✏️</button>
                    <button style="border:none; background:none; cursor:pointer; font-size:14px;" onclick="deleteLog(${originalIndex})" title="Hapus">🗑️</button>
                </td>`;

                // Render Pakan
                if (!log.type || log.type === 'pakan') {
                    const pakanTypeLabel = {
                        'pakan-premix': 'Premium Mix',
                        'pakan-standar': 'Standar',
                        'pakan-konsentrat': 'Konsentrat',
                        'pakan-limbah': 'Limbah'
                    }[log.pakan_type] || log.pakan_type || '—';
                    tbodyPakan.innerHTML += `
                        <tr>
                            <td style="font-family:'DM Mono', monospace; font-weight:600;">${log.date}</td>
                            <td style="font-size:10px; color:var(--ink3); font-family:'DM Sans', sans-serif;">${log.flock && log.flock !== 'Semua' ? log.flock : 'Semua Flock'}</td>
                            <td style="font-weight: 500;">${pakanTypeLabel}</td>
                            <td style="font-weight: 500;">${log.pakan || 0} kg</td>
                            <td style="font-weight: 500; color: var(--sky);">${log.air || 0} L</td>
                            ${aksiHtml}
                        </tr>
                    `;
                }

                // Render Produksi
                if (!log.type || log.type === 'produksi') {
                    // compute HDP only for egg commodities
                    let prodLabel = log.komoditas || (log.telur ? 'Telur' : '—');
                    let totalLabel = (typeof log.total !== 'undefined') ? `${log.total} ${log.satuan || ''}` : (log.telur ? `${log.telur} kg` : '—');
                    const totalKg = log.total_kg || log.telur || 0;
                    const fcrVal = totalKg > 0 ? ((log.pakan || 0) / totalKg) : 0;
                    let lastHdpCell = '—';
                    if ((log.komoditas && log.komoditas.toLowerCase().includes('telur')) || log.telur) {
                        const eggsCount = (typeof log.total === 'number' && log.total > 0) ? log.total : (log.total_kg ? log.total_kg * 16 : (log.telur || 0) * 16);
                        const layingPop = (log.sehat || 0) + (log.sakit || 0);
                        const hdpCalc = layingPop > 0 ? ((eggsCount / layingPop) * 100) : 0;
                        lastHdpCell = hdpCalc > 0 ? hdpCalc.toFixed(0) + '%' : '—';
                    }
                    tbodyProduksi.innerHTML += `
                        <tr>
                            <td style="font-family:'DM Mono', monospace; font-weight:600;">${log.date}</td>
                            <td style="font-size:10px; color:var(--ink3); font-family:'DM Sans', sans-serif;">${log.flock && log.flock !== 'Semua' ? log.flock : 'Semua Flock'}</td>
                            <td style="font-weight: 500;">${prodLabel}</td>
                            <td style="font-weight: 500;">${totalLabel}</td>
                            <td style="font-weight: 500;">${totalKg ? totalKg + ' kg' : '—'}</td>
                            <td style="font-family:'DM Mono', monospace; font-weight:600; color:var(--sage);">${lastHdpCell}</td>
                            <td style="font-family:'DM Mono', monospace; font-weight:600;">${fcrVal > 0 ? fcrVal.toFixed(1) : '—'}</td>
                            ${aksiHtml}
                        </tr>
                    `;
                }

                // Render Deplesi
                if (!log.type || log.type === 'deplesi') {
                    tbodyDeplesi.innerHTML += `
                        <tr>
                            <td style="font-family:'DM Mono', monospace; font-weight:600;">${log.date}</td>
                            <td style="font-size:10px; color:var(--ink3); font-family:'DM Sans', sans-serif;">${log.flock && log.flock !== 'Semua' ? log.flock : 'Semua Flock'}</td>
                            <td style="color: var(--rust); font-weight: 600;">${log.mati || 0} ekor</td>
                            <td style="color: var(--rust); font-weight: 600;">${log.afkir || 0} ekor</td>
                            <td style="color: var(--amber); font-weight: 600;">${log.sakit || 0} ekor</td>
                            ${aksiHtml}
                        </tr>
                    `;
                }

                // Render Catatan
                if (!log.type || log.type === 'catatan') {
                    tbodyCatatan.innerHTML += `
                        <tr>
                            <td style="font-family:'DM Mono', monospace; font-weight:600;">${log.date}<br><span style="font-size:10px; color:var(--ink3); font-family:'DM Sans', sans-serif;">${log.flock && log.flock !== 'Semua' ? log.flock : 'Semua Flock'}</span></td>
                            <td style="font-weight: 500;">${log.notes || '—'}</td>
                            <td style="font-weight: 500;">${log.photo ? '📷 Terlampir' : '—'}</td>
                            ${aksiHtml}
                        </tr>
                    `;
                }
            });
        }

        // Modal Helpers
        function openModal(id) {
            if (id === 'input-log-modal') {
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const dd = String(today.getDate()).padStart(2, '0');
                document.getElementById('global-inp-date').value = `${yyyy}-${mm}-${dd}`;

                const flockSelect = document.getElementById('global-inp-flock');
                flockSelect.innerHTML = '<option value="Semua">Semua Flock</option>';
                if (coop && coop.occupants) {
                    coop.occupants.forEach(occ => {
                        flockSelect.innerHTML += `<option value="${occ.name}">${occ.name}</option>`;
                    });
                }
                // default the active tab to pakan and update UI
                const modal = document.getElementById('input-log-modal');
                if (modal) {
                    setModalMode('create');
                    modal.dataset.activeTab = 'pakan';
                    const firstBtn = modal.querySelector('.tab-nav .tab-btn');
                    if (firstBtn) switchModalTab('pakan', firstBtn);
                }
            }
            document.getElementById(id).classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('open');
            document.body.style.overflow = '';
            currentEditIndex = -1;
            // reset modal to create mode when closing
            const modal = document.getElementById('input-log-modal');
            if (modal) setModalMode('create');
        }

        // Close Active Period action simulation
        function closePeriodAction() {
            if (confirm("Apakah Anda yakin ingin menutup periode aktif saat ini? Semua hewan yang tersisa akan dipindahkan ke kandang afkir.")) {
                coop.sehat = 0;
                coop.sakit = 0;
                coop.periodName = "Periode Ditutup / Afkir";
                coop.status = "Terhapus";
                saveState();
                location.href = 'monitoring-kandang.html';
            }
        }

        let currentEditIndex = -1;

        function editLog(index) {
            currentEditIndex = index;
            const log = coop.history[index];
            const type = log.type || 'pakan';
            
            if (log.date) {
                const parts = log.date.split('/');
                if (parts.length === 3) {
                    const dd = parts[0].padStart(2, '0');
                    const mm = parts[1].padStart(2, '0');
                    const yyyy = parts[2];
                    document.getElementById('global-inp-date').value = `${yyyy}-${mm}-${dd}`;
                }
            }
            
            const flockSelect = document.getElementById('global-inp-flock');
            flockSelect.innerHTML = '<option value="Semua">Semua Flock</option>';
            if (coop && coop.occupants) {
                coop.occupants.forEach(occ => {
                    flockSelect.innerHTML += `<option value="${occ.name}">${occ.name}</option>`;
                });
            }
            flockSelect.value = log.flock || 'Semua';

            if (type === 'pakan') {
                document.getElementById('inp-pakan-type').value = log.pakan_type || '';
                document.getElementById('inp-pakan-jumlah').value = log.pakan || 0;
                document.getElementById('inp-air').value = log.air || 0;
            } else if (type === 'produksi') {
                document.getElementById('inp-komoditas').value = log.komoditas || '';
                document.getElementById('inp-total').value = log.total || 0;
                document.getElementById('inp-satuan').value = log.satuan || '';
                document.getElementById('inp-total-kg').value = log.total_kg || 0;
            } else if (type === 'deplesi') {
                const inpSakitEl = document.getElementById('inp-sakit');
                if (inpSakitEl) inpSakitEl.value = log.sakit || '';
                document.getElementById('inp-mati').value = log.mati || 0;
                document.getElementById('inp-afkir').value = log.afkir || 0;
            } else if (type === 'catatan') {
                document.getElementById('inp-notes').value = log.notes || '';
            }

            // open modal and set edit mode (hide tabs)
            document.getElementById('input-log-modal').classList.add('open');
            document.body.style.overflow = 'hidden';
            setModalMode('edit', type);
        }

        function deleteLog(index) {
            if (confirm("Apakah Anda yakin ingin menghapus catatan harian ini?")) {
                coop.history.splice(index, 1);
                saveState();
                renderDailyLogsTable();
                renderMetrics();
                renderOccupants();
            }
        }

        // Submit daily record log entry
        function submitDailyLog(event, type) {
            event.preventDefault();

            const globalDateVal = document.getElementById('global-inp-date').value;
            const globalFlock = document.getElementById('global-inp-flock').value;

            let dateStr = '';
            if (globalDateVal) {
                const parts = globalDateVal.split('-');
                dateStr = `${parseInt(parts[2], 10)}/${parseInt(parts[1], 10)}/${parts[0]}`;
            } else {
                const today = new Date();
                dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
            }

            const newLog = {
                date: dateStr,
                type: type,
                flock: globalFlock
            };

            if (type === 'pakan') {
                newLog.pakan_type = document.getElementById('inp-pakan-type').value;
                newLog.pakan = parseFloat(document.getElementById('inp-pakan-jumlah').value) || 0;
                newLog.air = parseFloat(document.getElementById('inp-air').value) || 0;
            } else if (type === 'produksi') {
                newLog.komoditas = document.getElementById('inp-komoditas').value || '';
                newLog.total = parseFloat(document.getElementById('inp-total').value) || 0;
                newLog.satuan = document.getElementById('inp-satuan').value || '';
                newLog.total_kg = parseFloat(document.getElementById('inp-total-kg').value) || 0;
            } else if (type === 'deplesi') {
                const inpSakitEl = document.getElementById('inp-sakit');
                newLog.sakit = inpSakitEl ? parseInt(inpSakitEl.value) || 0 : 0;
                newLog.mati = parseInt(document.getElementById('inp-mati').value) || 0;
                newLog.afkir = parseInt(document.getElementById('inp-afkir').value) || 0;
                
                // Update cumulative status in coop
                if (inpSakitEl && inpSakitEl.value !== "") {
                    coop.sakit = newLog.sakit;
                }
                coop.mati += newLog.mati;

                // Also reduce one of the lot quantities dynamically for fidelity simulation
                if (coop.occupants && coop.occupants.length > 0 && newLog.mati > 0) {
                    const primaryLot = coop.occupants[0];
                    primaryLot.hereQty = Math.max(0, primaryLot.hereQty - newLog.mati);
                    primaryLot.hereSehat = Math.max(0, primaryLot.hereSehat - newLog.mati);
                    primaryLot.batchMatiCount += newLog.mati;
                }
            } else if (type === 'catatan') {
                newLog.notes = document.getElementById('inp-notes').value;
                const photoInput = document.getElementById('inp-photo');
                newLog.photo = photoInput.files.length > 0 ? photoInput.files[0].name : null;
            }

            if (currentEditIndex > -1) {
                coop.history[currentEditIndex] = newLog;
                currentEditIndex = -1;
            } else {
                if (!coop.history) coop.history = [];
                coop.history.unshift(newLog);
            }

            // Save state & re-render
            saveState();
            closeModal('input-log-modal');
            
            // Re-render components
            renderMetrics();
            renderOccupants();
            renderDailyLogsTable();
            
            // Clear the form
            event.target.reset();
        }

        // Initialize Page
        initPage();
    