
        // Initial Coops mock dataset (aligned to user mockup)
        let coops = [];
        const storedCoops = localStorage.getItem('coops');
        if (storedCoops) {
            coops = JSON.parse(storedCoops);
        } else {
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
                    { date: "23/5/2026", sehat: 3, sakit: 0, mati: 0, temp: 27.2 },
                    { date: "22/5/2026", sehat: 3, sakit: 0, mati: 1, temp: 27.8 },
                    { date: "21/5/2026", sehat: 4, sakit: 0, mati: 0, temp: 28.0 }
                ],
                occupants: [
                    {
                        name: "Ayam petanjan",
                        species: "AYAM PETELUR",
                        hereQty: 0,
                        hereSehat: 0,
                        hereSakit: 0,
                        hereMati: 0,
                        totalQty: 8029,
                        totalSehat: 3,
                        totalSakit: 2,
                        totalMati: 0
                    },
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
                        totalMati: 0
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
                        totalMati: 0
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
                history: [
                    { date: "23/5/2026", sehat: 36, sakit: 0, mati: 0, temp: 26.9 },
                    { date: "22/5/2026", sehat: 36, sakit: 0, mati: 1, temp: 27.5 }
                ],
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
                        totalMati: 0
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
                        totalMati: 0
                    },
                    {
                        name: "Ayam Petelur Siap P...",
                        species: "AYAM PETELUR",
                        hereQty: 35,
                        hereSehat: 35,
                        hereSakit: 0,
                        hereMati: 0,
                        totalQty: 123,
                        totalSehat: 0,
                        totalSakit: 0,
                        totalMati: 0
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
                        totalMati: 0
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
                history: [
                    { date: "23/5/2026", sehat: 39, sakit: 0, mati: 1, temp: 28.1 },
                    { date: "22/5/2026", sehat: 40, sakit: 0, mati: 5, temp: 29.0 }
                ],
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
                        totalMati: 0
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
                        totalMati: 0
                    },
                    {
                        name: "Test Satu",
                        species: "AYAM PETELUR",
                        hereQty: 6,
                        hereSehat: 6,
                        hereSakit: 0,
                        hereMati: 0,
                        totalQty: 10,
                        totalSehat: 5,
                        totalSakit: 5,
                        totalMati: 0
                    },
                    {
                        name: "Test",
                        species: "AYAM PETELUR",
                        hereQty: 1,
                        hereSehat: 1,
                        hereSakit: 0,
                        hereMati: 0,
                        totalQty: 13,
                        totalSehat: 1,
                        totalSakit: 1,
                        totalMati: 0
                    },
                    {
                        name: "Pep Test",
                        species: "AYAM PETELUR",
                        hereQty: 2,
                        hereSehat: 2,
                        hereSakit: 0,
                        hereMati: 0,
                        totalQty: 22,
                        totalSehat: 1,
                        totalSakit: 1,
                        totalMati: 0
                    }
                ]
            },
            {
                id: 4,
                name: "Kandang B Lapis Lama",
                status: "Terhapus",
                loc: "Blok Timur",
                periodName: "Periode Afkir Q1",
                periodDate: "10/1/2026",
                sehat: 0,
                sakit: 0,
                mati: 0,
                capacity: 500,
                type: "Battery Cage",
                species: "Ayam Petelur",
                history: [],
                occupants: []
            }
        ];
        }

        let activeTab = 'Aktif';
        let iotInterval = null;

        function setTab(tabName) {
            activeTab = tabName;
            
            // update classes of tabs
            document.getElementById('tab-aktif').classList.toggle('active', tabName === 'Aktif');
            document.getElementById('tab-terhapus').classList.toggle('active', tabName === 'Terhapus');
            
            // update status filter element automatically too
            const statusFilter = document.getElementById('filter-status');
            statusFilter.value = tabName;
            
            applyFilters();
        }

        // modal helpers
        function openModal(id) {
            document.getElementById(id).classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('open');
            document.body.style.overflow = '';
        }

        document.querySelectorAll('.overlay').forEach(o => {
            o.addEventListener('click', e => {
                if (e.target === o) {
                    if (o.id === 'monitor-iot-modal') {
                        closeIotModal();
                    } else {
                        closeModal(o.id);
                    }
                }
            });
        });

        // submit form
        function submitKandang(event) {
            event.preventDefault();
            const name = document.getElementById('k-name').value;
            const loc = document.getElementById('k-loc').value;
            const type = document.getElementById('k-type').value;
            const cap = parseInt(document.getElementById('k-cap').value) || 200;
            const species = document.getElementById('k-species').value;
            const period = document.getElementById('k-period').value;

            const today = new Date();
            const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

            const newCoop = {
                id: Date.now(),
                name: name,
                status: "Aktif",
                loc: loc,
                periodName: period,
                periodDate: dateStr,
                sehat: 0,
                sakit: 0,
                mati: 0,
                capacity: cap,
                type: type,
                species: species,
                history: [],
                occupants: []
            };

            coops.unshift(newCoop);
            closeModal('add-kandang-modal');
            document.getElementById('add-kandang-form').reset();
            
            // Render
            setTab('Aktif');
        }

        // reset filters
        function resetFilters() {
            document.getElementById('filter-search').value = '';
            document.getElementById('filter-status').value = 'All';
            document.getElementById('filter-type').value = 'All';
            document.getElementById('filter-species').value = 'All';
            
            // Back to active tab
            setTab('Aktif');
        }

        // apply filtering logic
        function applyFilters() {
            const query = document.getElementById('filter-search').value.toLowerCase();
            const statusFilter = document.getElementById('filter-status').value;
            const typeFilter = document.getElementById('filter-type').value;
            const speciesFilter = document.getElementById('filter-species').value;

            // Sync status tabs if dropdown status changed
            if (statusFilter !== 'All' && statusFilter !== activeTab) {
                activeTab = statusFilter;
                document.getElementById('tab-aktif').classList.toggle('active', activeTab === 'Aktif');
                document.getElementById('tab-terhapus').classList.toggle('active', activeTab === 'Terhapus');
            }

            const filtered = coops.filter(c => {
                // Search match
                const matchSearch = c.name.toLowerCase().includes(query) || c.loc.toLowerCase().includes(query);
                
                // Status match (or 'All')
                let matchStatus = true;
                if (statusFilter === 'All') {
                    // Match the activeTab if 'All' is selected in the select input, to match layout tabs
                    matchStatus = c.status === activeTab;
                } else {
                    matchStatus = c.status === statusFilter;
                }

                // Type match
                const matchType = typeFilter === 'All' || c.type === typeFilter;

                // Species match
                const matchSpecies = speciesFilter === 'All' || c.species === speciesFilter;

                return matchSearch && matchStatus && matchType && matchSpecies;
            });

            renderCoopGrid(filtered);
        }

        // Action Handlers
        // Delete Coop (Soft delete to archived category tab)
        function confirmDeleteCoop(id) {
            const coop = coops.find(c => c.id === id);
            if (!coop) return;

            document.getElementById('del-kandang-name').textContent = coop.name;
            const confirmBtn = document.getElementById('btn-confirm-delete-action');
            
            // Re-assign action button click
            confirmBtn.onclick = function() {
                // If it is already archived, delete completely or toggle back. But mockup asks to move it
                if (coop.status === 'Aktif') {
                    coop.status = 'Terhapus';
                } else {
                    // Complete delete if archiving the archived
                    coops = coops.filter(c => c.id !== id);
                }
                closeModal('delete-confirm-modal');
                applyFilters();
            };

            openModal('delete-confirm-modal');
        }

        // Restore Coop from archived state back to active
        function restoreCoop(id) {
            const coop = coops.find(c => c.id === id);
            if (coop) {
                coop.status = 'Aktif';
                applyFilters();
            }
        }

        // Open Edit Modal
        function openEditModal(id) {
            const coop = coops.find(c => c.id === id);
            if (!coop) return;

            document.getElementById('edit-k-id').value = coop.id;
            document.getElementById('edit-k-name').value = coop.name;
            document.getElementById('edit-k-loc').value = coop.loc;
            document.getElementById('edit-k-type').value = coop.type;
            document.getElementById('edit-k-cap').value = coop.capacity;
            document.getElementById('edit-k-species').value = coop.species;
            document.getElementById('edit-k-period').value = coop.periodName;

            openModal('edit-kandang-modal');
        }

        function submitEditKandang(event) {
            event.preventDefault();
            const id = parseInt(document.getElementById('edit-k-id').value);
            const name = document.getElementById('edit-k-name').value;
            const loc = document.getElementById('edit-k-loc').value;
            const type = document.getElementById('edit-k-type').value;
            const cap = parseInt(document.getElementById('edit-k-cap').value) || 200;
            const species = document.getElementById('edit-k-species').value;
            const period = document.getElementById('edit-k-period').value;

            const coop = coops.find(c => c.id === id);
            if (coop) {
                coop.name = name;
                coop.loc = loc;
                coop.type = type;
                coop.capacity = cap;
                coop.species = species;
                coop.periodName = period;
            }

            closeModal('edit-kandang-modal');
            applyFilters();
        }

        // Live IoT Monitor Simulation
        function openMonitorModal(id) {
            const coop = coops.find(c => c.id === id);
            if (!coop) return;

            document.getElementById('iot-modal-title').innerHTML = `🖥️ Live Telemetri — ${coop.name}`;
            
            // Randomize starting values
            let t = 26.5 + Math.random() * 2;
            let h = 58 + Math.floor(Math.random() * 10);
            let a = 5 + Math.floor(Math.random() * 6);

            const tEl = document.getElementById('iot-temp');
            const hEl = document.getElementById('iot-hum');
            const aEl = document.getElementById('iot-nh3');

            tEl.textContent = `${t.toFixed(1)} °C`;
            hEl.textContent = `${h} %`;
            aEl.textContent = `${a} ppm`;

            // Fluctuating interval
            clearInterval(iotInterval);
            iotInterval = setInterval(() => {
                t += (Math.random() - 0.5) * 0.2;
                h += Math.floor((Math.random() - 0.5) * 3);
                a += Math.floor((Math.random() - 0.5) * 2);

                if (h > 100) h = 100; if (h < 20) h = 20;
                if (a < 0) a = 0;

                tEl.textContent = `${t.toFixed(1)} °C`;
                hEl.textContent = `${h} %`;
                aEl.textContent = `${a} ppm`;
            }, 1500);

            openModal('monitor-iot-modal');
        }

        function closeIotModal() {
            clearInterval(iotInterval);
            closeModal('monitor-iot-modal');
        }

        function toggleHw(hwId) {
            const el = document.getElementById(hwId);
            const statusEl = el.querySelector('.hw-status');
            const isActive = el.classList.toggle('active');

            if (isActive) {
                if (hwId === 'hw-fan') statusEl.textContent = 'AKTIF (AUTO)';
                else if (hwId === 'hw-heater') statusEl.textContent = 'AKTIF';
                else statusEl.textContent = 'SIAGA';
            } else {
                statusEl.textContent = 'MATI';
            }
        }

        // Daily Record Modal & log history
        function openRecordModal(id) {
            const coop = coops.find(c => c.id === id);
            if (!coop) return;

            document.getElementById('record-k-id').value = coop.id;
            document.getElementById('record-modal-title').textContent = `📋 Detail & Catatan Harian — ${coop.name}`;
            
            // Prefill with current numbers
            document.getElementById('rec-sehat').value = coop.sehat;
            document.getElementById('rec-sakit').value = coop.sakit;
            document.getElementById('rec-mati').value = 0; // Default new mortality to 0 on open
            document.getElementById('rec-temp').value = coop.history.length > 0 ? coop.history[0].temp : '';

            renderRecordHistory(coop);
            openModal('detail-record-modal');
        }

        function renderRecordHistory(coop) {
            const tbody = document.getElementById('record-history-body');
            tbody.innerHTML = '';

            if (!coop.history || coop.history.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--ink3)">Belum ada riwayat pencatatan harian.</td></tr>`;
                return;
            }

            coop.history.forEach(log => {
                tbody.innerHTML += `
                    <tr>
                        <td style="font-family:'DM Mono', monospace; font-weight:500;">${log.date}</td>
                        <td style="color:var(--sage);font-weight:600;">${log.sehat} ekor</td>
                        <td style="color:var(--amber);font-weight:600;">${log.sakit} ekor</td>
                        <td style="color:var(--rust);font-weight:600;">${log.mati} ekor</td>
                        <td style="font-weight:500;">${log.temp ? log.temp + ' °C' : '—'}</td>
                    </tr>
                `;
            });
        }

        function submitDailyRecord(event) {
            event.preventDefault();
            const id = parseInt(document.getElementById('record-k-id').value);
            const sehat = parseInt(document.getElementById('rec-sehat').value) || 0;
            const sakit = parseInt(document.getElementById('rec-sakit').value) || 0;
            const mati = parseInt(document.getElementById('rec-mati').value) || 0;
            const temp = parseFloat(document.getElementById('rec-temp').value) || null;

            const coop = coops.find(c => c.id === id);
            if (coop) {
                // Update stats
                coop.sehat = sehat;
                coop.sakit = sakit;
                // Add mortality to cumulative or log
                coop.mati += mati;

                // Add record entry
                const today = new Date();
                const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

                if (!coop.history) coop.history = [];
                coop.history.unshift({
                    date: dateStr,
                    sehat: sehat,
                    sakit: sakit,
                    mati: mati,
                    temp: temp
                });
            }

            closeModal('detail-record-modal');
            applyFilters();
        }

        // render grid of coops
        function renderCoopGrid(data) {
            const container = document.getElementById('coop-grid');
            container.innerHTML = '';

            if (data.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📂</div>
                        <div class="empty-state-title">Kandang Tidak Ditemukan</div>
                        <p style="font-size: 12.5px;">Coba ubah kata pencarian atau bersihkan filter Anda.</p>
                    </div>
                `;
                return;
            }

            data.forEach(c => {
                // calculate totals
                const totalAlive = c.sehat + c.sakit;
                const capacityPct = Math.min(100, Math.round((totalAlive / c.capacity) * 100));

                // generate occupants HTML
                let occupantsHTML = '';
                if (c.occupants && c.occupants.length > 0) {
                    occupantsHTML = `
                        <div class="occupants-section">
                            <div class="occ-title">Penghuni Kandang</div>
                    `;
                    c.occupants.forEach(occ => {
                        occupantsHTML += `
                            <div class="occ-card">
                                <div class="occ-header">
                                    <span class="occ-name">${occ.name}</span>
                                    <span class="occ-species">${occ.species}</span>
                                </div>
                                <div class="occ-metric-row">
                                    <div class="occ-sub-metric">
                                        <span class="occ-metric-lbl">Di Kandang Ini</span>
                                        <span class="occ-metric-val">
                                            ${occ.hereQty.toLocaleString('id')} ekor
                                            <span class="mini-dot-list">
                                                <span class="mini-dot-badge md-sehat">${occ.hereSehat}</span>
                                                <span class="mini-dot-badge md-sakit">${occ.hereSakit}</span>
                                                <span class="mini-dot-badge md-mati">${occ.hereMati}</span>
                                            </span>
                                        </span>
                                    </div>
                                    <div class="occ-sub-metric">
                                        <span class="occ-metric-lbl">Total Batch (Semua)</span>
                                        <span class="occ-metric-val">
                                            ${occ.totalQty.toLocaleString('id')}
                                            <span class="mini-dot-list">
                                                <span class="mini-dot-badge md-sehat">${occ.totalSehat}</span>
                                                <span class="mini-dot-badge md-sakit">${occ.totalSakit}</span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    occupantsHTML += `</div>`;
                } else {
                    occupantsHTML = `
                        <div class="occupants-section">
                            <div class="occ-title">Penghuni Kandang</div>
                            <div style="font-size: 11.5px; color: var(--ink3); padding: 12px; text-align: center; border: 1px dashed var(--bdr); border-radius: 8px;">
                                Kosong / Tidak ada penghuni
                            </div>
                        </div>
                    `;
                }

                // Action buttons row (dynamically matches mockup status)
                let actionsHTML = '';
                if (c.status === 'Aktif') {
                    actionsHTML = `
                        <div class="card-actions">
                            <button class="btn-action-primary" onclick="location.href='detail-kandang.html?id=${c.id}'">Detail & Pencatatan Harian</button>
                            <button class="btn-action-secondary" onclick="openMonitorModal(${c.id})">🖥️ Monitor Kandang</button>
                            <div class="action-row-bottom">
                                <button class="btn-edit" onclick="openEditModal(${c.id})">📝 Edit</button>
                                <button class="btn-delete" onclick="confirmDeleteCoop(${c.id})" title="Arsipkan"><span style="color:var(--rust)">🗑️</span></button>
                            </div>
                        </div>
                    `;
                } else {
                    // For archived coops, show Restore option instead
                    actionsHTML = `
                        <div class="card-actions">
                            <button class="btn-action-primary" style="background:var(--sky)" onclick="restoreCoop(${c.id})">↩️ Kembalikan / Aktifkan Lagi</button>
                            <div class="action-row-bottom">
                                <button class="btn-delete" style="width:100%" onclick="confirmDeleteCoop(${c.id})" title="Hapus Permanen"><span style="color:var(--rust); font-weight:600;">🗑️ Hapus Permanen</span></button>
                            </div>
                        </div>
                    `;
                }

                // create coop card element
                const card = document.createElement('div');
                card.className = 'coop-card';
                card.innerHTML = `
                    <div class="coop-header">
                        <div class="coop-title-block">
                            <span class="coop-name">${c.name}</span>
                            <span class="coop-loc">📍 ${c.loc}</span>
                        </div>
                        <span class="badge-status ${c.status.toLowerCase()}">${c.status}</span>
                    </div>

                    <div class="period-box">
                        <div class="pb-header">
                            <span class="pb-label">Periode Aktif</span>
                            <span class="pb-date">📅 ${c.periodDate}</span>
                        </div>
                        <div class="pb-desc">${c.periodName}</div>
                    </div>

                    <div class="density-section">
                        <div class="density-title-row">
                            <span class="density-title">Kepadatan Hewan</span>
                            <span class="density-vals">${totalAlive.toLocaleString('id')} / ${c.capacity.toLocaleString('id')}</span>
                        </div>
                        <div class="density-bar-track">
                            <div class="density-bar-fill" style="width: ${capacityPct}%"></div>
                        </div>
                        <div class="density-detail-row">
                            <div class="dots-row">
                                <span class="dot-val"><span class="d-circle sehat"></span> ${c.sehat}</span>
                                <span class="dot-val"><span class="d-circle sakit"></span> ${c.sakit}</span>
                                <span class="dot-val"><span class="d-circle mati"></span> ${c.mati}</span>
                            </div>
                            <span class="capacity-pct">${capacityPct}% Kapasitas</span>
                        </div>
                    </div>

                    <div class="specs-row">
                        <div class="spec-item">
                            <span class="spec-lbl">Tipe</span>
                            <span class="spec-val">${c.type}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-lbl">Kapasitas</span>
                            <span class="spec-val">${c.capacity.toLocaleString('id')} ekor</span>
                        </div>
                    </div>

                    ${occupantsHTML}

                    ${actionsHTML}
                `;
                container.appendChild(card);
            });
        }

        // Initialize view
        applyFilters();
    