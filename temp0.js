
        // Load dataset from localStorage or fallback
        let coops = [];
        const storedCoops = localStorage.getItem('coops');
        if (storedCoops) {
            coops = JSON.parse(storedCoops);
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
                    history: [],
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

        // Render Daily Logs table / switch empty state
        function renderDailyLogsTable() {
            const emptyBlock = document.getElementById('empty-records-block');
            const tableBlock = document.getElementById('records-table-block');
            const tbody = document.getElementById('records-table-body');

            tbody.innerHTML = '';

            if (!coop.history || coop.history.length === 0) {
                emptyBlock.style.display = 'flex';
                tableBlock.style.display = 'none';
                return;
            }

            emptyBlock.style.display = 'none';
            tableBlock.style.display = 'block';

            coop.history.forEach(log => {
                const eggsCount = (log.telur || 0) * 16;
                const pop = log.sehat + log.sakit;
                const hdp = pop > 0 ? ((eggsCount / pop) * 100) : 0;
                const fcr = log.telur > 0 ? (log.pakan / log.telur) : 0;

                tbody.innerHTML += `
                    <tr>
                        <td style="font-family:'DM Mono', monospace; font-weight:600;">${log.date}</td>
                        <td style="color: var(--sage); font-weight: 600;">${log.sehat.toLocaleString('id')} ekor</td>
                        <td style="color: var(--amber); font-weight: 600;">${log.sakit.toLocaleString('id')} ekor</td>
                        <td style="color: var(--rust); font-weight: 600;">${log.mati.toLocaleString('id')} ekor</td>
                        <td style="font-weight: 500;">${log.pakan} kg</td>
                        <td style="font-weight: 500;">${log.telur} kg</td>
                        <td style="color: var(--purple); font-weight: 500;">${log.susu} L</td>
                        <td style="color: var(--purple); font-weight: 500;">${log.daging} kg</td>
                        <td style="font-family:'DM Mono', monospace; font-weight:600;">${fcr > 0 ? fcr.toFixed(1) : '—'}</td>
                        <td style="font-family:'DM Mono', monospace; font-weight:600; color:var(--sage);">${hdp > 0 ? hdp.toFixed(0) + '%' : '0%'}</td>
                    </tr>
                `;
            });
        }

        // Modal Helpers
        function openModal(id) {
            document.getElementById(id).classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('open');
            document.body.style.overflow = '';
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

        // Submit daily record log entry
        function submitDailyLog(event) {
            event.preventDefault();

            const sehat = parseInt(document.getElementById('form-sehat').value) || 0;
            const sakit = parseInt(document.getElementById('form-sakit').value) || 0;
            const mati = parseInt(document.getElementById('form-mati').value) || 0;
            const temp = parseFloat(document.getElementById('form-temp').value) || null;
            const pakan = parseInt(document.getElementById('form-pakan').value) || 0;
            const telur = parseInt(document.getElementById('form-telur').value) || 0;
            const susu = parseInt(document.getElementById('form-susu').value) || 0;
            const daging = parseInt(document.getElementById('form-daging').value) || 0;

            const today = new Date();
            const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

            // Add new log to history
            const newLog = {
                date: dateStr,
                sehat: sehat,
                sakit: sakit,
                mati: mati,
                temp: temp,
                pakan: pakan,
                telur: telur,
                susu: susu,
                daging: daging
            };

            if (!coop.history) coop.history = [];
            coop.history.unshift(newLog);

            // Update cumulative status in coop
            coop.sehat = sehat;
            coop.sakit = sakit;
            coop.mati += mati;

            // Also reduce one of the lot quantities dynamically for fidelity simulation
            if (coop.occupants && coop.occupants.length > 0 && mati > 0) {
                // decrease the first occupant's quantity by mortality
                const primaryLot = coop.occupants[0];
                primaryLot.hereQty = Math.max(0, primaryLot.hereQty - mati);
                primaryLot.hereSehat = Math.max(0, primaryLot.hereSehat - mati);
                primaryLot.batchMatiCount += mati;
            }

            // Save state & re-render
            saveState();
            closeModal('input-log-modal');
            
            // Re-render components
            renderMetrics();
            renderOccupants();
            renderDailyLogsTable();
        }

        // Initialize Page
        initPage();
    