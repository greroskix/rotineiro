const MEDICAMENTOS_DATA = [
  { id: "med-01", momento: "Ao Acordar", periodo: "Manhã", medicamentos: ["Synthroid (Levotiroxina)"], instrucao: "Tomar em jejum com água ao despertar." },
  { id: "med-02", momento: "Antes do Café", periodo: "Manhã", medicamentos: ["Metformina"], instrucao: "Tomar minutos antes de iniciar o café da manhã." },
  { id: "med-03", momento: "Depois do Café", periodo: "Manhã", medicamentos: ["Losartana", "Gliclazida", "Hidro (Hidroclorotiazida)", "Vitamina B"], instrucao: "Tomar logo após terminar o café da manhã com água." },
  { id: "med-04", momento: "Antes do Almoço", periodo: "Tarde", medicamentos: ["Metformina"], instrucao: "Tomar antes de servir o almoço." },
  { id: "med-05", momento: "Após o Almoço", periodo: "Tarde", medicamentos: ["AAS"], instrucao: "Tomar após a refeição do almoço." },
  { id: "med-06", momento: "Antes da Janta", periodo: "Noite", medicamentos: ["Metformina"], instrucao: "Tomar minutos antes de iniciar a janta." },
  { id: "med-07", momento: "Depois da Janta", periodo: "Noite", medicamentos: ["Losartana", "Gliclazida", "Sinvastatina", "Vitamina B"], instrucao: "Tomar logo após o término da janta com água." },
  { id: "med-08", momento: "Antes de Dormir", periodo: "Noite", medicamentos: ["Donepezila"], instrucao: "Medicação para a memória/Alzheimer antes de ir para a cama." },
  { id: "med-09", momento: "Ao Deitar (Depois)", periodo: "Noite", medicamentos: ["Nortriptilina"], instrucao: "Tomar no momento de deitar na cama para repouso." }
];

const PERIOD_CONFIG = {
  manha: { title: "Manhã", range: "09:00 às 12:20" },
  tarde: { title: "Tarde", range: "12:20 às 19:00" },
  noite: { title: "Noite", range: "19:00 às 22:00" }
};

const ROUTINE_DATA = [
  // Manhã
  { id: "task-01", period: "manha", time: "09:00", startMins: 540, endMins: 545, tags: ["Acordar"], title: "Horário de Acordar", desc: "Acordar com calma, iluminação suave e no tempo dela. Bom dia tranquilo." },
  { id: "task-02", period: "manha", time: "09:00 / 09:15", startMins: 540, endMins: 555, tags: ["Arrumação"], title: "Despertar e Arrumação do Quarto", desc: "Trocar o pijama com tranquilidade, arrumar a cama, os bichinhos e o quarto no geral." },
  { id: "task-03", period: "manha", time: "09:15 / 09:25", startMins: 555, endMins: 565, tags: ["Remédios", "Água"], title: "Remédios Ao Acordar: Synthroid (Levotiroxina) e Água", desc: "Ir ao banheiro, tomar Synthroid (Levotiroxina) em jejum e beber 1 copo de água (pelo menos 300ml).", tip: "A hidratação logo ao acordar evita quedas de pressão e traz bem-estar.", isWater: true, linkedMedId: "med-01" },
  { id: "task-04", period: "manha", time: "09:25 / 09:30", startMins: 565, endMins: 570, tags: ["Pandora"], title: "Incentivo para Cuidar da Pandora", desc: "Entregar o pote de ração e incentivar: 'Vai lá alimentar sua cachorra'.", tip: "Importante para o senso de propósito e afeto, nem que ela coloque apenas alguns grãos no pote." },
  { id: "task-04b", period: "manha", time: "09:30", startMins: 570, endMins: 575, tags: ["Remédios"], title: "Remédio Antes do Café: Metformina", desc: "Tomar a Metformina antes de iniciar o café da manhã.", linkedMedId: "med-02" },
  { id: "task-05", period: "manha", time: "09:35 / 10:00", startMins: 575, endMins: 600, tags: ["Café"], title: "Café da Manhã Tranquilo", desc: "Tomar o café da manhã com serenidade em ambiente calmo.", tip: "Use pratos e xícaras de cores fortes que contrastem com a mesa (exemplo: prato vermelho em mesa branca) para facilitar o foco visual." },
  { id: "task-06", period: "manha", time: "10:00 / 10:05", startMins: 600, endMins: 605, tags: ["Remédios"], title: "Remédios Depois do Café: Losartana, Gliclazida, Hidro e Vitamina B", desc: "Tomar os medicamentos pós-café e ir ao banheiro.", linkedMedId: "med-03" },
  { id: "task-07", period: "manha", time: "10:05 / 10:40", startMins: 605, endMins: 640, tags: ["Pandora"], title: "Enxugar Louça e 1ª Ida da Pandora na Garagem", desc: "Enxugar a louça do café com calma e levar a cachorrinha para a primeira volta na garagem." },
  { id: "task-08", period: "manha", time: "10:40 / 11:10", startMins: 640, endMins: 670, tags: ["Atividade"], title: "Tarefa Manual: Dobrar Panos de Prato", desc: "Entregar cerca de 10 panos de prato para ela dobrar e separar por cores na mesa da cozinha.", tip: "Atividade manual leve para distração e concentração saudável." },
  { id: "task-09", period: "manha", time: "11:10 / 11:15", startMins: 670, endMins: 675, tags: ["Café", "Água"], title: "Café Preto e Copo de Água (300ml)", desc: "Oferecer um café preto e logo em seguida 300ml de água para hidratação.", isWater: true },
  { id: "task-10", period: "manha", time: "11:15 / 11:40", startMins: 675, endMins: 700, tags: ["Música", "Água"], title: "Momento da Música e Água (200ml)", desc: "Deixar ela escolher os discos livremente. Ao final de cada disco colocar outro e oferecer 200ml de água.", isWater: true },
  { id: "task-11", period: "manha", time: "11:40 / 12:15", startMins: 700, endMins: 735, tags: ["Televisão"], title: "Televisão ou Distração até o Almoço", desc: "Assistir um pouco de TV ou deixar a TV de fundo enquanto ela mexe em brinquedos ou arruma pequenos objetos." },

  // Tarde
  { id: "task-11b", period: "tarde", time: "12:15 / 12:20", startMins: 735, endMins: 740, tags: ["Remédios"], title: "Remédio Antes do Almoço: Metformina", desc: "Tomar a dose de Metformina antes de almoçar.", linkedMedId: "med-04" },
  { id: "task-12", period: "tarde", time: "12:20 / 12:40", startMins: 740, endMins: 760, tags: ["Almoço", "Água"], title: "Almoço Tranquilo e Água (300ml)", desc: "Horário do almoço com ambiente quieto e suave, acompanhado de 300ml de água.", tip: "Continuar com pratos contrastantes. Dobrar o papel toalha em formato geométrico ajuda na atenção visual.", isWater: true },
  { id: "task-13", period: "tarde", time: "12:40 / 12:45", startMins: 760, endMins: 765, tags: ["Remédios"], title: "Remédio Após o Almoço: AAS", desc: "Tomar o AAS após o almoço e ir ao banheiro.", linkedMedId: "med-05" },
  { id: "task-14", period: "tarde", time: "12:45 / 13:15", startMins: 765, endMins: 795, tags: ["Pandora"], title: "2ª Ida da Pandora na Garagem", desc: "Segunda descida com a Pandora.", tip: "Se notar que ela estiver cansada, pode deixar tirar um cochilo até 14:30 ou 15:00." },
  { id: "task-15", period: "tarde", time: "13:15 / 13:30", startMins: 795, endMins: 810, tags: ["Lanche", "Água"], title: "Lanche Rápido e Goles de Água", desc: "Fruta fresca com café do gosto dela e oferta de água (200ml a 300ml).", isWater: true },
  { id: "task-16", period: "tarde", time: "13:30 / 13:50", startMins: 810, endMins: 830, tags: ["Pandora"], title: "3ª Ida da Pandora na Garagem", desc: "Terceira descida com a Pandora." },
  { id: "task-17", period: "tarde", time: "13:50 / 14:20", startMins: 830, endMins: 860, tags: ["Atividade"], title: "Tarefa Manual: Enrolar Novelo de Lã", desc: "Atividade manual para estimulação leve. Pode ser enrolar novelos de lã ou outra atividade similar." },
  { id: "task-18", period: "tarde", time: "14:20 / 14:40", startMins: 860, endMins: 880, tags: ["Pandora"], title: "4ª Ida da Pandora na Garagem", desc: "Quarta descida com a Pandora." },
  { id: "task-19", period: "tarde", time: "14:40 / 15:00", startMins: 880, endMins: 900, tags: ["Atividade", "Água"], title: "Distração Manual e Água (300ml)", desc: "Caça-palavras bem simples, separar grãos ou espanar suavemente a casa, com mais 1 copo de água.", tip: "Caso ela tenha dormido mais cedo, esse costuma ser o horário em que já estará acordada.", isWater: true },
  { id: "task-20", period: "tarde", time: "15:00 / 15:20", startMins: 900, endMins: 920, tags: ["Pandora"], title: "5ª Ida da Pandora na Garagem", desc: "Penúltima descida com a cachorra." },
  { id: "task-21", period: "tarde", time: "15:20 / 15:40", startMins: 920, endMins: 940, tags: ["Atividade"], title: "Rasgar Papéis, Plantas ou TV", desc: "Rasgar folhas de papel aleatórias em tiras, regar plantas ou assistir 20 minutos de televisão." },
  { id: "task-22", period: "tarde", time: "15:40 / 16:10", startMins: 940, endMins: 970, tags: ["Pandora"], title: "6ª e Última Ida da Pandora", desc: "Última descida do dia com a Pandora na garagem." },
  { id: "task-23", period: "tarde", time: "16:10 / 16:40", startMins: 970, endMins: 1000, tags: ["Banho"], title: "Horário do Banho", desc: "Banho no ritmo dela, sem pressa. Apenas entregar a toalha no final.", tip: "Atenção: Retire todas as outras toalhas do banheiro antes, deixando somente a toalha dela para não causar confusão." },
  { id: "task-24", period: "tarde", time: "16:40 / 18:55", startMins: 1000, endMins: 1135, tags: ["Televisão", "Água"], title: "Danone, Novelas e Copos de Água", desc: "Horário de novela com Danone. Durante esse período, oferecer copos de água de 200ml a 300ml de vez em quando.", isWater: true },

  // Noite
  { id: "task-24b", period: "noite", time: "18:55 / 19:00", startMins: 1135, endMins: 1140, tags: ["Remédios"], title: "Remédio Antes da Janta: Metformina", desc: "Tomar a dose de Metformina antes de iniciar a janta.", linkedMedId: "med-06" },
  { id: "task-25", period: "noite", time: "19:00 / 19:40", startMins: 1140, endMins: 1180, tags: ["Jantar"], title: "Jantar e Diálogo Familiar", desc: "Horário da janta. Conversar sobre o dia dela com paciência e deixar ela enxugar a louça se tiver vontade." },
  { id: "task-26", period: "noite", time: "19:40 / 19:45", startMins: 1180, endMins: 1185, tags: ["Remédios"], title: "Remédios Depois da Janta: Losartana, Gliclazida, Sinvastatina e Vitamina B", desc: "Tomar as medicações pós-jantar e ir ao banheiro.", linkedMedId: "med-07" },
  { id: "task-27", period: "noite", time: "19:50 / 20:30", startMins: 1190, endMins: 1230, tags: ["Televisão"], title: "Televisão e Descanso", desc: "Descanso no sofá assistindo televisão com calma." },
  { id: "task-28", period: "noite", time: "20:30 / 21:30", startMins: 1230, endMins: 1290, tags: ["Televisão"], title: "Televisão até o Sono", desc: "Assistir TV até dar sono e preparar o ambiente para a noite." },
  { id: "task-28b", period: "noite", time: "21:30", startMins: 1290, endMins: 1305, tags: ["Remédios"], title: "Remédio Antes de Dormir: Donepezila", desc: "Tomar Donepezila antes de deitar na cama.", tip: "Medicação fundamental para o cuidado do Alzheimer e memória.", linkedMedId: "med-08" },
  { id: "task-29", period: "noite", time: "21:45 / 22:00", startMins: 1305, endMins: 1320, tags: ["Remédios", "Dormir"], title: "Ao Deitar (Depois): Nortriptilina e Dormir", desc: "Tomar Nortriptilina no momento de deitar na cama. Quarto calmo, escuro e confortável para repouso.", linkedMedId: "med-09" }
];

const LOCAL_STORAGE_KEYS = {
  COMPLETED: "rotineiro_completed_tasks_v3",
  COMPLETED_MEDS: "rotineiro_completed_meds_v3",
  WATER: "rotineiro_water_count_v3",
  TOKEN: "rotineiro_sql_token",
  USER: "rotineiro_sql_user"
};

const TOTAL_WATER_GOAL = 6;
let authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) || null;
let currentUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER) || null;
let authMode = "login"; // "login" | "register"
let currentTab = "todas";
let hideCompleted = false;
let completedTaskIds = new Set();
let completedMedIds = new Set();
let waterGlassesCount = 0;

const toTagClass = tag => tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const getNowMinutes = () => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};

const getTodayDateStr = () => new Date().toISOString().slice(0, 10);

/**
 * Carrega dados locais (fallback offline)
 */
function loadLocalData() {
  try {
    const savedCompleted = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COMPLETED) || "[]");
    completedTaskIds = new Set(Array.isArray(savedCompleted) ? savedCompleted : []);

    const savedMeds = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COMPLETED_MEDS) || "[]");
    completedMedIds = new Set(Array.isArray(savedMeds) ? savedMeds : []);

    const savedWater = parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.WATER) || "0", 10);
    waterGlassesCount = Math.min(Math.max(0, savedWater), TOTAL_WATER_GOAL);
  } catch (e) {
    console.error("Erro ao carregar dados locais:", e);
  }
}

/**
 * Salva dados locais de imediato
 */
function saveLocalData() {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.COMPLETED, JSON.stringify([...completedTaskIds]));
    localStorage.setItem(LOCAL_STORAGE_KEYS.COMPLETED_MEDS, JSON.stringify([...completedMedIds]));
    localStorage.setItem(LOCAL_STORAGE_KEYS.WATER, waterGlassesCount.toString());
  } catch (e) {
    console.error("Erro ao salvar dados locais:", e);
  }
}

/**
 * Sincroniza com o backend SQLite se o usuário estiver logado
 */
async function syncToServer() {
  saveLocalData();
  if (!authToken) return;

  try {
    await fetch("/api/routine/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({
        date: getTodayDateStr(),
        completed_tasks: [...completedTaskIds],
        completed_meds: [...completedMedIds],
        water_count: waterGlassesCount
      })
    });
  } catch (err) {
    console.warn("Backend offline ou inacessível, dados mantidos localmente:", err.message);
  }
}

/**
 * Carrega do banco SQL de hoje
 */
async function syncFromServer() {
  if (!authToken) {
    loadLocalData();
    return;
  }

  try {
    const res = await fetch(`/api/routine/day?date=${getTodayDateStr()}`, {
      headers: { "Authorization": `Bearer ${authToken}` }
    });

    if (res.ok) {
      const data = await res.json();
      completedTaskIds = new Set(Array.isArray(data.completed_tasks) ? data.completed_tasks : []);
      completedMedIds = new Set(Array.isArray(data.completed_meds) ? data.completed_meds : []);
      waterGlassesCount = Math.min(Math.max(0, Number(data.water_count) || 0), TOTAL_WATER_GOAL);
      saveLocalData();
    } else if (res.status === 401) {
      // Sessão expirou
      handleLogoutLocal();
    } else {
      loadLocalData();
    }
  } catch {
    loadLocalData();
  }
}

function toggleTask(taskId) {
  const task = ROUTINE_DATA.find(t => t.id === taskId);
  if (!task) return;
  const wasDone = completedTaskIds.has(taskId);

  if (wasDone) {
    completedTaskIds.delete(taskId);
    if (task.linkedMedId) completedMedIds.delete(task.linkedMedId);
  } else {
    completedTaskIds.add(taskId);
    if (task.linkedMedId) completedMedIds.add(task.linkedMedId);
    if (task.isWater && waterGlassesCount < TOTAL_WATER_GOAL) {
      waterGlassesCount++;
      renderWater();
    }
  }

  syncToServer();
  renderCurrentView();
  updateProgress();
}

function toggleMedication(medId) {
  const linkedTask = ROUTINE_DATA.find(t => t.linkedMedId === medId);
  if (linkedTask) {
    toggleTask(linkedTask.id);
  } else {
    if (completedMedIds.has(medId)) {
      completedMedIds.delete(medId);
    } else {
      completedMedIds.add(medId);
    }
    syncToServer();
    renderCurrentView();
    updateProgress();
  }
}

function updateProgress() {
  const total = ROUTINE_DATA.length;
  const completed = completedTaskIds.size;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const fill = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");

  if (fill) fill.style.width = `${pct}%`;
  if (text) text.textContent = `${completed} de ${total} tarefas (${pct}%)`;
}

function renderWater() {
  const container = document.getElementById("water-slots-container");
  const label = document.getElementById("water-count");
  const quickBtn = document.getElementById("btn-quick-water");
  if (!container || !label) return;

  waterGlassesCount = Math.min(Math.max(0, waterGlassesCount), TOTAL_WATER_GOAL);
  label.textContent = `${waterGlassesCount} de ${TOTAL_WATER_GOAL} copos`;

  if (container.children.length !== TOTAL_WATER_GOAL) {
    container.innerHTML = Array.from({ length: TOTAL_WATER_GOAL }, (_, i) => {
      const num = i + 1;
      return `<button class="water-slot-btn ${num <= waterGlassesCount ? 'active' : ''}" data-slot="${num}" title="Copo ${num} (300ml)">${num}</button>`;
    }).join("");
  } else {
    Array.from(container.children).forEach((btn, i) => {
      btn.classList.toggle("active", i < waterGlassesCount);
    });
  }

  if (quickBtn) {
    const reached = waterGlassesCount >= TOTAL_WATER_GOAL;
    quickBtn.disabled = reached;
    quickBtn.textContent = reached ? "Meta atingida" : "+ 1 Copo (300ml)";
  }
}

function renderCurrentView() {
  const routineView = document.getElementById("view-routine");
  const remediosView = document.getElementById("view-remedios");
  const isRemedios = currentTab === "remedios";

  routineView?.classList.toggle("hidden", isRemedios);
  remediosView?.classList.toggle("hidden", !isRemedios);

  if (isRemedios) {
    renderRemediosView();
  } else {
    renderRoutineTimeline();
  }
  updateCurrentTaskBanner();
}

function renderRoutineTimeline() {
  const container = document.getElementById("routine-timeline");
  if (!container) return;

  const nowMins = getNowMinutes();
  const periods = Object.entries(PERIOD_CONFIG);
  let html = "";

  periods.forEach(([periodKey, config]) => {
    if (currentTab !== "todas" && currentTab !== periodKey) return;

    let tasks = ROUTINE_DATA.filter(t => t.period === periodKey);
    if (hideCompleted) tasks = tasks.filter(t => !completedTaskIds.has(t.id));
    if (tasks.length === 0) return;

    html += `
      <section class="period-block">
        <div class="period-title-bar">
          <h2 class="period-title-text">${config.title}</h2>
          <span class="period-interval">${config.range}</span>
        </div>
        <div class="routine-cards-list">
          ${tasks.map(task => {
            const isDone = completedTaskIds.has(task.id);
            const isCurrent = !isDone && nowMins >= task.startMins && nowMins < task.endMins;
            const tagsHtml = (task.tags || []).map(tag => `<span class="badge-tag ${toTagClass(tag)}">${tag}</span>`).join("");
            const currentBadge = isCurrent ? '<span class="badge-tag active-now">Em andamento</span>' : '';

            return `
              <article class="task-row-card ${isDone ? 'is-done' : ''} ${isCurrent ? 'is-active-now' : ''}" id="card-${task.id}">
                <button class="custom-check-btn" data-task-id="${task.id}" aria-label="Concluir tarefa">✓</button>
                <div class="card-content">
                  <div class="card-top-row">
                    <span class="badge-time">${task.time}</span>
                    ${tagsHtml}
                    ${currentBadge}
                  </div>
                  <h3 class="card-title">${task.title}</h3>
                  <p class="card-description">${task.desc}</p>
                  ${task.tip ? `<div class="card-tip-box"><strong>Observação:</strong> ${task.tip}</div>` : ''}
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  });

  container.innerHTML = html.trim() || '<div class="empty-state">Nenhuma atividade pendente encontrada neste filtro.</div>';
}

function renderRemediosView() {
  const container = document.getElementById("remedios-list-container");
  if (!container) return;

  let meds = MEDICAMENTOS_DATA;
  if (hideCompleted) meds = meds.filter(m => !completedMedIds.has(m.id));

  if (meds.length === 0) {
    container.innerHTML = '<div class="empty-state">Todos os medicamentos já foram tomados!</div>';
    return;
  }

  container.innerHTML = meds.map(med => {
    const isDone = completedMedIds.has(med.id);
    const pillsHtml = med.medicamentos.map(pill => `<span class="remedio-pill-tag">${pill}</span>`).join("");

    return `
      <article class="remedio-item-card ${isDone ? 'is-done' : ''}" id="med-card-${med.id}">
        <button class="custom-check-btn" data-med-id="${med.id}" aria-label="Marcar remédio como tomado">✓</button>
        <div class="card-content">
          <div class="card-top-row">
            <span class="remedio-momento-title">${med.momento}</span>
            <span class="remedio-periodo-tag">${med.periodo}</span>
          </div>
          <div class="remedio-pills-wrap">${pillsHtml}</div>
          <p class="remedio-desc">${med.instrucao}</p>
        </div>
      </article>
    `;
  }).join("");
}

function updateCurrentTaskBanner() {
  const banner = document.getElementById("current-task-banner");
  const content = document.getElementById("current-task-content");
  if (!banner || !content) return;

  if (currentTab === "remedios") {
    banner.classList.add("hidden");
    return;
  }

  const nowMins = getNowMinutes();
  let active = ROUTINE_DATA.find(t => !completedTaskIds.has(t.id) && nowMins >= t.startMins && nowMins < t.endMins);
  if (!active) {
    active = ROUTINE_DATA.find(t => !completedTaskIds.has(t.id) && t.startMins > nowMins);
  }

  if (active) {
    const periodTitle = PERIOD_CONFIG[active.period]?.title || "";
    banner.classList.remove("hidden");
    content.innerHTML = `
      <div class="current-task-inner">
        <div>
          <span class="current-task-meta">${active.time} &bull; ${periodTitle}</span>
          <h3 class="current-task-title">${active.title}</h3>
          <p class="current-task-desc">${active.desc}</p>
        </div>
        <button class="btn-outline current-task-btn" data-task-id="${active.id}">
          ✓ Concluir
        </button>
      </div>
    `;
  } else {
    banner.classList.add("hidden");
  }
}

// ================= AUTENTICAÇÃO E HISTÓRICO SQL =================

function updateUserUI() {
  const container = document.getElementById("user-profile-bar");
  if (!container) return;

  if (currentUser) {
    container.innerHTML = `
      <div class="user-badge" title="Conectado como ${currentUser}">
        <span class="user-email-text">${currentUser}</span>
      </div>
      <button id="btn-open-history" class="btn-history" title="Ver registros anteriores no banco SQL">Histórico</button>
      <button id="btn-logout" class="btn-logout" title="Sair da conta">Sair</button>
    `;
    document.getElementById("btn-logout")?.addEventListener("click", handleLogout);
    document.getElementById("btn-open-history")?.addEventListener("click", openHistoryModal);
  } else {
    container.innerHTML = `
      <button id="btn-open-auth" class="btn-auth">Entrar / Criar Conta</button>
    `;
    document.getElementById("btn-open-auth")?.addEventListener("click", () => openAuthModal("login"));
  }
}

function openAuthModal(mode = "login") {
  authMode = mode;
  const modal = document.getElementById("auth-modal");
  const tabLogin = document.getElementById("tab-login-btn");
  const tabRegister = document.getElementById("tab-register-btn");
  const submitBtn = document.getElementById("submit-auth-btn");
  const errorMsg = document.getElementById("auth-error-msg");
  const form = document.getElementById("auth-form");

  if (!modal) return;
  form?.reset();
  if (errorMsg) {
    errorMsg.textContent = "";
    errorMsg.classList.add("hidden");
  }

  if (mode === "login") {
    tabLogin?.classList.add("active");
    tabRegister?.classList.remove("active");
    if (submitBtn) submitBtn.textContent = "Entrar";
  } else {
    tabRegister?.classList.add("active");
    tabLogin?.classList.remove("active");
    if (submitBtn) submitBtn.textContent = "Criar Conta";
  }

  modal.classList.remove("hidden");
  document.getElementById("auth-email")?.focus();
}

function closeAuthModal() {
  document.getElementById("auth-modal")?.classList.add("hidden");
}

async function openHistoryModal() {
  const modal = document.getElementById("history-modal");
  const container = document.getElementById("history-list-container");
  if (!modal || !container) return;

  modal.classList.remove("hidden");
  container.innerHTML = '<div style="text-align:center; padding: 2rem; color: var(--text-muted);">Consultando banco de dados SQL...</div>';

  if (!authToken) {
    container.innerHTML = '<div class="empty-state">Faça login para visualizar o histórico de registros.</div>';
    return;
  }

  try {
    const res = await fetch("/api/routine/history", {
      headers: { "Authorization": `Bearer ${authToken}` }
    });
    const data = await res.json();
    const history = data.history || [];

    if (history.length === 0) {
      container.innerHTML = '<div class="empty-state">Nenhum registro anterior encontrado no banco de dados.</div>';
      return;
    }

    container.innerHTML = history.map(item => {
      const [y, m, d] = item.date.split("-");
      const dateFormatted = `${d}/${m}/${y}`;
      return `
        <div class="history-item-row">
          <div class="history-date-box">
            <span class="history-date-title">${dateFormatted}</span>
            <span class="history-updated-time">Atualizado: ${item.updatedAt}</span>
          </div>
          <div class="history-metrics">
            <span class="history-chip">${item.tasksCount} de 33 tarefas</span>
            <span class="history-chip chip-med">${item.medsCount} remédios</span>
            <span class="history-chip chip-water">${item.waterCount} copos</span>
          </div>
        </div>
      `;
    }).join("");
  } catch (err) {
    container.innerHTML = `<div class="empty-state">Erro ao conectar com o banco SQL: ${err.message}</div>`;
  }
}

function closeHistoryModal() {
  document.getElementById("history-modal")?.classList.add("hidden");
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("auth-email")?.value.trim() || "";
  const password = document.getElementById("auth-password")?.value || "";
  const errorMsg = document.getElementById("auth-error-msg");
  const submitBtn = document.getElementById("submit-auth-btn");

  if (errorMsg) {
    errorMsg.textContent = "";
    errorMsg.classList.add("hidden");
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Conectando ao SQL...";
  }

  const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Falha na requisição.");
    }

    authToken = data.token;
    currentUser = data.user.email;
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, authToken);
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, currentUser);

    closeAuthModal();
    updateUserUI();

    // Se tiver dados em andamento, salva no banco; senão puxa do banco
    if (completedTaskIds.size > 0 || waterGlassesCount > 0) {
      await syncToServer();
    } else {
      await syncFromServer();
    }

    renderWater();
    renderCurrentView();
    updateProgress();
  } catch (err) {
    if (errorMsg) {
      errorMsg.textContent = err.message;
      errorMsg.classList.remove("hidden");
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = authMode === "login" ? "Entrar" : "Criar Conta";
    }
  }
}

async function handleLogout() {
  if (authToken) {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Authorization": `Bearer ${authToken}` }
      });
    } catch {
      // ignora erro de rede no logout
    }
  }
  handleLogoutLocal();
}

function handleLogoutLocal() {
  authToken = null;
  currentUser = null;
  localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
  updateUserUI();
  loadLocalData();
  renderWater();
  renderCurrentView();
  updateProgress();
}

function setupEvents() {
  const tabButtons = document.querySelectorAll(".tab-item");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.getAttribute("data-tab");
      renderCurrentView();
    });
  });

  document.getElementById("hide-completed")?.addEventListener("change", e => {
    hideCompleted = e.target.checked;
    renderCurrentView();
  });

  document.getElementById("btn-quick-water")?.addEventListener("click", () => {
    if (waterGlassesCount < TOTAL_WATER_GOAL) {
      waterGlassesCount++;
      syncToServer();
      renderWater();
    }
  });

  document.getElementById("water-slots-container")?.addEventListener("click", e => {
    const btn = e.target.closest("[data-slot]");
    if (!btn) return;
    const slot = parseInt(btn.dataset.slot, 10);
    waterGlassesCount = slot === waterGlassesCount ? slot - 1 : slot;
    syncToServer();
    renderWater();
  });

  document.getElementById("routine-timeline")?.addEventListener("click", e => {
    const btn = e.target.closest("[data-task-id]");
    if (btn) toggleTask(btn.dataset.taskId);
  });

  document.getElementById("current-task-banner")?.addEventListener("click", e => {
    const btn = e.target.closest("[data-task-id]");
    if (btn) toggleTask(btn.dataset.taskId);
  });

  document.getElementById("remedios-list-container")?.addEventListener("click", e => {
    const btn = e.target.closest("[data-med-id]");
    if (btn) toggleMedication(btn.dataset.medId);
  });

  // Modal de Reset
  const resetModal = document.getElementById("reset-modal");
  document.getElementById("btn-reset-day")?.addEventListener("click", () => {
    resetModal?.classList.remove("hidden");
  });
  document.getElementById("cancel-reset-btn")?.addEventListener("click", () => {
    resetModal?.classList.add("hidden");
  });
  document.getElementById("confirm-reset-btn")?.addEventListener("click", () => {
    completedTaskIds.clear();
    completedMedIds.clear();
    waterGlassesCount = 0;
    syncToServer();
    renderWater();
    renderCurrentView();
    updateProgress();
    resetModal?.classList.add("hidden");
  });

  // Modal de Autenticação
  document.getElementById("tab-login-btn")?.addEventListener("click", () => openAuthModal("login"));
  document.getElementById("tab-register-btn")?.addEventListener("click", () => openAuthModal("register"));
  document.getElementById("cancel-auth-btn")?.addEventListener("click", closeAuthModal);
  document.getElementById("auth-form")?.addEventListener("submit", handleAuthSubmit);

  // Modal de Histórico
  document.getElementById("close-history-btn")?.addEventListener("click", closeHistoryModal);
}

document.addEventListener("DOMContentLoaded", async () => {
  setupEvents();
  updateUserUI();

  if (authToken) {
    await syncFromServer();
  } else {
    loadLocalData();
  }

  renderWater();
  renderCurrentView();
  updateProgress();
  setInterval(updateCurrentTaskBanner, 10000);
});
