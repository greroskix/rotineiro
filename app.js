/**
 * Rotina Djanira - Sistema de Acompanhamento Diário
 * Lista oficial de medicamentos baseada no receituário manuscrito.
 */

// Mapeamento dos medicamentos oficiais
const MEDICAMENTOS_DATA = [
  {
    id: "med-01",
    momento: "Ao Acordar",
    periodo: "Manhã",
    horarioSugerido: "09:15",
    medicamentos: ["Synthroid (Levotiroxina)"],
    instrucao: "Tomar em jejum com água ao despertar."
  },
  {
    id: "med-02",
    momento: "Antes do Café",
    periodo: "Manhã",
    horarioSugerido: "09:30",
    medicamentos: ["Metformina"],
    instrucao: "Tomar minutos antes de iniciar o café da manhã."
  },
  {
    id: "med-03",
    momento: "Depois do Café",
    periodo: "Manhã",
    horarioSugerido: "10:00",
    medicamentos: ["Losartana", "Gliclazida", "Hidro (Hidroclorotiazida)", "Vitamina B"],
    instrucao: "Tomar logo após terminar o café da manhã com água."
  },
  {
    id: "med-04",
    momento: "Antes do Almoço",
    periodo: "Tarde",
    horarioSugerido: "12:15",
    medicamentos: ["Metformina"],
    instrucao: "Tomar antes de servir o almoço."
  },
  {
    id: "med-05",
    momento: "Após o Almoço",
    periodo: "Tarde",
    horarioSugerido: "12:45",
    medicamentos: ["AAS"],
    instrucao: "Tomar após a refeição do almoço."
  },
  {
    id: "med-06",
    momento: "Antes da Janta",
    periodo: "Noite",
    horarioSugerido: "18:55",
    medicamentos: ["Metformina"],
    instrucao: "Tomar minutos antes de iniciar a janta."
  },
  {
    id: "med-07",
    momento: "Depois da Janta",
    periodo: "Noite",
    horarioSugerido: "19:40",
    medicamentos: ["Losartana", "Gliclazida", "Sinvastatina", "Vitamina B"],
    instrucao: "Tomar logo após o término da janta com água."
  },
  {
    id: "med-08",
    momento: "Antes de Dormir",
    periodo: "Noite",
    horarioSugerido: "21:30",
    medicamentos: ["Donepezila"],
    instrucao: "Medicação para a memória/Alzheimer antes de ir para a cama."
  },
  {
    id: "med-09",
    momento: "Ao Deitar (Depois)",
    periodo: "Noite",
    horarioSugerido: "21:45",
    medicamentos: ["Nortriptilina"],
    instrucao: "Tomar no momento de deitar na cama para repouso."
  }
];

// Rotina geral das atividades do dia (integrada com os horários dos remédios)
const ROUTINE_DATA = [
  // ================= MANHÃ (09:00 - 12:20) =================
  {
    id: "task-01",
    period: "manha",
    periodLabel: "Manhã",
    time: "09:00",
    startMins: 9 * 60,
    endMins: 9 * 60 + 5,
    tags: [{ label: "Acordar", class: "acordar" }],
    title: "Horário de Acordar",
    desc: "Acordar com calma, iluminação suave e no tempo dela. Bom dia tranquilo.",
    tip: null,
    isWater: false
  },
  {
    id: "task-02",
    period: "manha",
    periodLabel: "Manhã",
    time: "09:00 / 09:15",
    startMins: 9 * 60,
    endMins: 9 * 60 + 15,
    tags: [{ label: "Arrumação", class: "arrumacao" }],
    title: "Despertar e Arrumação do Quarto",
    desc: "Trocar o pijama com tranquilidade, arrumar a cama, os bichinhos e o quarto no geral.",
    tip: null,
    isWater: false
  },
  {
    id: "task-03",
    period: "manha",
    periodLabel: "Manhã",
    time: "09:15 / 09:25",
    startMins: 9 * 60 + 15,
    endMins: 9 * 60 + 25,
    tags: [
      { label: "Remédios", class: "remedios" },
      { label: "Água", class: "agua" }
    ],
    title: "Remédios Ao Acordar: Synthroid (Levotiroxina) e Água",
    desc: "Ir ao banheiro, tomar Synthroid (Levotiroxina) em jejum e beber 1 copo de água (pelo menos 300ml).",
    tip: "A hidratação logo ao acordar evita quedas de pressão e traz bem-estar.",
    isWater: true,
    linkedMedId: "med-01"
  },
  {
    id: "task-04",
    period: "manha",
    periodLabel: "Manhã",
    time: "09:25 / 09:30",
    startMins: 9 * 60 + 25,
    endMins: 9 * 60 + 30,
    tags: [{ label: "Pandora", class: "pandora" }],
    title: "Incentivo para Cuidar da Pandora",
    desc: "Entregar o pote de ração e incentivar: 'Vai lá alimentar sua cachorra'.",
    tip: "Importante para o senso de propósito e afeto, nem que ela coloque apenas alguns grãos no pote.",
    isWater: false
  },
  {
    id: "task-04b",
    period: "manha",
    periodLabel: "Manhã",
    time: "09:30",
    startMins: 9 * 60 + 30,
    endMins: 9 * 60 + 35,
    tags: [{ label: "Remédios", class: "remedios" }],
    title: "Remédio Antes do Café: Metformina",
    desc: "Tomar a Metformina antes de iniciar o café da manhã.",
    tip: null,
    isWater: false,
    linkedMedId: "med-02"
  },
  {
    id: "task-05",
    period: "manha",
    periodLabel: "Manhã",
    time: "09:35 / 10:00",
    startMins: 9 * 60 + 35,
    endMins: 10 * 60,
    tags: [{ label: "Café", class: "cafe" }],
    title: "Café da Manhã Tranquilo",
    desc: "Tomar o café da manhã com serenidade em ambiente calmo.",
    tip: "Use pratos e xícaras de cores fortes que contrastem com a mesa (exemplo: prato vermelho em mesa branca) para facilitar o foco visual.",
    isWater: false
  },
  {
    id: "task-06",
    period: "manha",
    periodLabel: "Manhã",
    time: "10:00 / 10:05",
    startMins: 10 * 60,
    endMins: 10 * 60 + 5,
    tags: [{ label: "Remédios", class: "remedios" }],
    title: "Remédios Depois do Café: Losartana, Gliclazida, Hidro e Vitamina B",
    desc: "Tomar os medicamentos pós-café e ir ao banheiro.",
    tip: null,
    isWater: false,
    linkedMedId: "med-03"
  },
  {
    id: "task-07",
    period: "manha",
    periodLabel: "Manhã",
    time: "10:05 / 10:40",
    startMins: 10 * 60 + 5,
    endMins: 10 * 60 + 40,
    tags: [{ label: "Pandora", class: "pandora" }],
    title: "Enxugar Louça e 1ª Ida da Pandora na Garagem",
    desc: "Enxugar a louça do café com calma e levar a cachorrinha para a primeira volta na garagem.",
    tip: null,
    isWater: false
  },
  {
    id: "task-08",
    period: "manha",
    periodLabel: "Manhã",
    time: "10:40 / 11:10",
    startMins: 10 * 60 + 40,
    endMins: 11 * 60 + 10,
    tags: [{ label: "Atividade", class: "atividade" }],
    title: "Tarefa Manual: Dobrar Panos de Prato",
    desc: "Entregar cerca de 10 panos de prato para ela dobrar e separar por cores na mesa da cozinha.",
    tip: "Atividade manual leve para distração e concentração saudável.",
    isWater: false
  },
  {
    id: "task-09",
    period: "manha",
    periodLabel: "Manhã",
    time: "11:10 / 11:15",
    startMins: 11 * 60 + 10,
    endMins: 11 * 60 + 15,
    tags: [
      { label: "Café", class: "cafe" },
      { label: "Água", class: "agua" }
    ],
    title: "Café Preto e Copo de Água (300ml)",
    desc: "Oferecer um café preto e logo em seguida 300ml de água para hidratação.",
    tip: null,
    isWater: true
  },
  {
    id: "task-10",
    period: "manha",
    periodLabel: "Manhã",
    time: "11:15 / 11:40",
    startMins: 11 * 60 + 15,
    endMins: 11 * 60 + 40,
    tags: [
      { label: "Música", class: "musica" },
      { label: "Água", class: "agua" }
    ],
    title: "Momento da Música e Água (200ml)",
    desc: "Deixar ela escolher os discos livremente. Ao final de cada disco colocar outro e oferecer 200ml de água.",
    tip: null,
    isWater: true
  },
  {
    id: "task-11",
    period: "manha",
    periodLabel: "Manhã",
    time: "11:40 / 12:15",
    startMins: 11 * 60 + 40,
    endMins: 12 * 60 + 15,
    tags: [{ label: "Televisão", class: "televisao" }],
    title: "Televisão ou Distração até o Almoço",
    desc: "Assistir um pouco de TV ou deixar a TV de fundo enquanto ela mexe em brinquedos ou arruma pequenos objetos.",
    tip: null,
    isWater: false
  },

  // ================= TARDE (12:20 - 19:00) =================
  {
    id: "task-11b",
    period: "tarde",
    periodLabel: "Tarde",
    time: "12:15 / 12:20",
    startMins: 12 * 60 + 15,
    endMins: 12 * 60 + 20,
    tags: [{ label: "Remédios", class: "remedios" }],
    title: "Remédio Antes do Almoço: Metformina",
    desc: "Tomar a dose de Metformina antes de almoçar.",
    tip: null,
    isWater: false,
    linkedMedId: "med-04"
  },
  {
    id: "task-12",
    period: "tarde",
    periodLabel: "Tarde",
    time: "12:20 / 12:40",
    startMins: 12 * 60 + 20,
    endMins: 12 * 60 + 40,
    tags: [
      { label: "Almoço", class: "almoco" },
      { label: "Água", class: "agua" }
    ],
    title: "Almoço Tranquilo e Água (300ml)",
    desc: "Horário do almoço com ambiente quieto e suave, acompanhado de 300ml de água.",
    tip: "Continuar com pratos contrastantes. Dobrar o papel toalha em formato geométrico ajuda na atenção visual.",
    isWater: true
  },
  {
    id: "task-13",
    period: "tarde",
    periodLabel: "Tarde",
    time: "12:40 / 12:45",
    startMins: 12 * 60 + 40,
    endMins: 12 * 60 + 45,
    tags: [{ label: "Remédios", class: "remedios" }],
    title: "Remédio Após o Almoço: AAS",
    desc: "Tomar o AAS após o almoço e ir ao banheiro.",
    tip: null,
    isWater: false,
    linkedMedId: "med-05"
  },
  {
    id: "task-14",
    period: "tarde",
    periodLabel: "Tarde",
    time: "12:45 / 13:15",
    startMins: 12 * 60 + 45,
    endMins: 13 * 60 + 15,
    tags: [{ label: "Pandora", class: "pandora" }],
    title: "2ª Ida da Pandora na Garagem",
    desc: "Segunda descida com a Pandora.",
    tip: "Se notar que ela estiver cansada, pode deixar tirar um cochilo até 14:30 ou 15:00.",
    isWater: false
  },
  {
    id: "task-15",
    period: "tarde",
    periodLabel: "Tarde",
    time: "13:15 / 13:30",
    startMins: 13 * 60 + 15,
    endMins: 13 * 60 + 30,
    tags: [
      { label: "Lanche", class: "lanche" },
      { label: "Água", class: "agua" }
    ],
    title: "Lanche Rápido e Goles de Água",
    desc: "Fruta fresca com café do gosto dela e oferta de água (200ml a 300ml).",
    tip: null,
    isWater: true
  },
  {
    id: "task-16",
    period: "tarde",
    periodLabel: "Tarde",
    time: "13:30 / 13:50",
    startMins: 13 * 60 + 30,
    endMins: 13 * 60 + 50,
    tags: [{ label: "Pandora", class: "pandora" }],
    title: "3ª Ida da Pandora na Garagem",
    desc: "Terceira descida com a Pandora.",
    tip: null,
    isWater: false
  },
  {
    id: "task-17",
    period: "tarde",
    periodLabel: "Tarde",
    time: "13:50 / 14:20",
    startMins: 13 * 60 + 50,
    endMins: 14 * 60 + 20,
    tags: [{ label: "Atividade", class: "atividade" }],
    title: "Tarefa Manual: Enrolar Novelo de Lã",
    desc: "Atividade manual para estimulação leve. Pode ser enrolar novelos de lã ou outra atividade similar.",
    tip: null,
    isWater: false
  },
  {
    id: "task-18",
    period: "tarde",
    periodLabel: "Tarde",
    time: "14:20 / 14:40",
    startMins: 14 * 60 + 20,
    endMins: 14 * 60 + 40,
    tags: [{ label: "Pandora", class: "pandora" }],
    title: "4ª Ida da Pandora na Garagem",
    desc: "Quarta descida com a Pandora.",
    tip: null,
    isWater: false
  },
  {
    id: "task-19",
    period: "tarde",
    periodLabel: "Tarde",
    time: "14:40 / 15:00",
    startMins: 14 * 60 + 40,
    endMins: 15 * 60,
    tags: [
      { label: "Atividade", class: "atividade" },
      { label: "Água", class: "agua" }
    ],
    title: "Distração Manual e Água (300ml)",
    desc: "Caça-palavras bem simples, separar grãos ou espanar suavemente a casa, com mais 1 copo de água.",
    tip: "Caso ela tenha dormido mais cedo, esse costuma ser o horário em que já estará acordada.",
    isWater: true
  },
  {
    id: "task-20",
    period: "tarde",
    periodLabel: "Tarde",
    time: "15:00 / 15:20",
    startMins: 15 * 60,
    endMins: 15 * 60 + 20,
    tags: [{ label: "Pandora", class: "pandora" }],
    title: "5ª Ida da Pandora na Garagem",
    desc: "Penúltima descida com a cachorra.",
    tip: null,
    isWater: false
  },
  {
    id: "task-21",
    period: "tarde",
    periodLabel: "Tarde",
    time: "15:20 / 15:40",
    startMins: 15 * 60 + 20,
    endMins: 15 * 60 + 40,
    tags: [{ label: "Atividade", class: "atividade" }],
    title: "Rasgar Papéis, Plantas ou TV",
    desc: "Rasgar folhas de papel aleatórias em tiras, regar plantas ou assistir 20 minutos de televisão.",
    tip: null,
    isWater: false
  },
  {
    id: "task-22",
    period: "tarde",
    periodLabel: "Tarde",
    time: "15:40 / 16:10",
    startMins: 15 * 60 + 40,
    endMins: 16 * 60 + 10,
    tags: [{ label: "Pandora", class: "pandora" }],
    title: "6ª e Última Ida da Pandora",
    desc: "Última descida do dia com a Pandora na garagem.",
    tip: null,
    isWater: false
  },
  {
    id: "task-23",
    period: "tarde",
    periodLabel: "Tarde",
    time: "16:10 / 16:40",
    startMins: 16 * 60 + 10,
    endMins: 16 * 60 + 40,
    tags: [{ label: "Banho", class: "banho" }],
    title: "Horário do Banho",
    desc: "Banho no ritmo dela, sem pressa. Apenas entregar a toalha no final.",
    tip: "Atenção: Retire todas as outras toalhas do banheiro antes, deixando somente a toalha dela para não causar confusão.",
    isWater: false
  },
  {
    id: "task-24",
    period: "tarde",
    periodLabel: "Tarde",
    time: "16:40 / 18:55",
    startMins: 16 * 60 + 40,
    endMins: 18 * 60 + 55,
    tags: [
      { label: "Televisão", class: "televisao" },
      { label: "Água", class: "agua" }
    ],
    title: "Danone, Novelas e Copos de Água",
    desc: "Horário de novela com Danone. Durante esse período, oferecer copos de água de 200ml a 300ml de vez em quando.",
    tip: null,
    isWater: true
  },

  // ================= NOITE (19:00 - 22:00) =================
  {
    id: "task-24b",
    period: "noite",
    periodLabel: "Noite",
    time: "18:55 / 19:00",
    startMins: 18 * 60 + 55,
    endMins: 19 * 60,
    tags: [{ label: "Remédios", class: "remedios" }],
    title: "Remédio Antes da Janta: Metformina",
    desc: "Tomar a dose de Metformina antes de iniciar a janta.",
    tip: null,
    isWater: false,
    linkedMedId: "med-06"
  },
  {
    id: "task-25",
    period: "noite",
    periodLabel: "Noite",
    time: "19:00 / 19:40",
    startMins: 19 * 60,
    endMins: 19 * 60 + 40,
    tags: [{ label: "Jantar", class: "jantar" }],
    title: "Jantar e Diálogo Familiar",
    desc: "Horário da janta. Conversar sobre o dia dela com paciência e deixar ela enxugar a louça se tiver vontade.",
    tip: null,
    isWater: false
  },
  {
    id: "task-26",
    period: "noite",
    periodLabel: "Noite",
    time: "19:40 / 19:45",
    startMins: 19 * 60 + 40,
    endMins: 19 * 60 + 45,
    tags: [{ label: "Remédios", class: "remedios" }],
    title: "Remédios Depois da Janta: Losartana, Gliclazida, Sinvastatina e Vitamina B",
    desc: "Tomar as medicações pós-jantar e ir ao banheiro.",
    tip: null,
    isWater: false,
    linkedMedId: "med-07"
  },
  {
    id: "task-27",
    period: "noite",
    periodLabel: "Noite",
    time: "19:50 / 20:30",
    startMins: 19 * 60 + 50,
    endMins: 20 * 60 + 30,
    tags: [{ label: "Televisão", class: "televisao" }],
    title: "Televisão e Descanso",
    desc: "Descanso no sofá assistindo televisão com calma.",
    tip: null,
    isWater: false
  },
  {
    id: "task-28",
    period: "noite",
    periodLabel: "Noite",
    time: "20:30 / 21:30",
    startMins: 20 * 60 + 30,
    endMins: 21 * 60 + 30,
    tags: [{ label: "Televisão", class: "televisao" }],
    title: "Televisão até o Sono",
    desc: "Assistir TV até dar sono e preparar o ambiente para a noite.",
    tip: null,
    isWater: false
  },
  {
    id: "task-28b",
    period: "noite",
    periodLabel: "Noite",
    time: "21:30",
    startMins: 21 * 60 + 30,
    endMins: 21 * 60 + 45,
    tags: [{ label: "Remédios", class: "remedios" }],
    title: "Remédio Antes de Dormir: Donepezila",
    desc: "Tomar Donepezila antes de deitar na cama.",
    tip: "Medicação fundamental para o cuidado do Alzheimer e memória.",
    isWater: false,
    linkedMedId: "med-08"
  },
  {
    id: "task-29",
    period: "noite",
    periodLabel: "Noite",
    time: "21:45 / 22:00",
    startMins: 21 * 60 + 45,
    endMins: 22 * 60,
    tags: [
      { label: "Remédios", class: "remedios" },
      { label: "Dormir", class: "dormir" }
    ],
    title: "Ao Deitar (Depois): Nortriptilina e Dormir",
    desc: "Tomar Nortriptilina no momento de deitar na cama. Quarto calmo, escuro e confortável para repouso.",
    tip: null,
    isWater: false,
    linkedMedId: "med-09"
  }
];

// Chaves de armazenamento persistente
const STORAGE_KEYS = {
  COMPLETED: "rotineiro_completed_tasks_v3",
  COMPLETED_MEDS: "rotineiro_completed_meds_v3",
  WATER: "rotineiro_water_count_v3"
};

// Estado da Aplicação
let currentTab = "todas"; // "todas" | "manha" | "tarde" | "noite" | "remedios"
let hideCompleted = false;
let completedTaskIds = new Set();
let completedMedIds = new Set();
let waterGlassesCount = 0;
const TOTAL_WATER_GOAL = 6;

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEvents();
  renderWater();
  renderCurrentView();
  updateProgress();
  startClock();
});

/**
 * Carrega dados salvos
 */
function loadData() {
  try {
    const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED);
    if (savedCompleted) {
      const parsed = JSON.parse(savedCompleted);
      if (Array.isArray(parsed)) completedTaskIds = new Set(parsed);
    }

    const savedMeds = localStorage.getItem(STORAGE_KEYS.COMPLETED_MEDS);
    if (savedMeds) {
      const parsedMeds = JSON.parse(savedMeds);
      if (Array.isArray(parsedMeds)) completedMedIds = new Set(parsedMeds);
    }

    const savedWater = localStorage.getItem(STORAGE_KEYS.WATER);
    if (savedWater !== null) {
      const parsed = parseInt(savedWater, 10) || 0;
      waterGlassesCount = Math.min(Math.max(0, parsed), TOTAL_WATER_GOAL);
    }
  } catch (e) {
    console.error("Erro ao carregar dados locais:", e);
  }
}

/**
 * Salva dados imediatamente
 */
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify([...completedTaskIds]));
    localStorage.setItem(STORAGE_KEYS.COMPLETED_MEDS, JSON.stringify([...completedMedIds]));
    localStorage.setItem(STORAGE_KEYS.WATER, Math.min(waterGlassesCount, TOTAL_WATER_GOAL).toString());
  } catch (e) {
    console.error("Erro ao salvar dados locais:", e);
  }
}

/**
 * Configuração de listeners
 */
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

  const hideCheckbox = document.getElementById("hide-completed");
  if (hideCheckbox) {
    hideCheckbox.addEventListener("change", (e) => {
      hideCompleted = e.target.checked;
      renderCurrentView();
    });
  }

  const btnQuickWater = document.getElementById("btn-quick-water");
  if (btnQuickWater) {
    btnQuickWater.addEventListener("click", () => {
      if (waterGlassesCount < TOTAL_WATER_GOAL) {
        waterGlassesCount++;
        saveData();
        renderWater();
      }
    });
  }

  const btnReset = document.getElementById("btn-reset-day");
  const modal = document.getElementById("reset-modal");
  const btnCancelReset = document.getElementById("cancel-reset-btn");
  const btnConfirmReset = document.getElementById("confirm-reset-btn");

  if (btnReset && modal) {
    btnReset.addEventListener("click", () => {
      modal.style.display = "flex";
    });
    btnCancelReset.addEventListener("click", () => {
      modal.style.display = "none";
    });
    btnConfirmReset.addEventListener("click", () => {
      completedTaskIds.clear();
      completedMedIds.clear();
      waterGlassesCount = 0;
      saveData();
      renderWater();
      renderCurrentView();
      updateProgress();
      modal.style.display = "none";
    });
  }
}

/**
 * Renderiza slots de hidratação
 */
function renderWater() {
  const container = document.getElementById("water-slots-container");
  const label = document.getElementById("water-count");
  if (!container || !label) return;

  waterGlassesCount = Math.min(Math.max(0, waterGlassesCount), TOTAL_WATER_GOAL);

  container.innerHTML = "";
  label.textContent = `${waterGlassesCount} de ${TOTAL_WATER_GOAL} copos`;

  for (let i = 1; i <= TOTAL_WATER_GOAL; i++) {
    const btn = document.createElement("button");
    btn.className = `water-slot-btn ${i <= waterGlassesCount ? "active" : ""}`;
    btn.textContent = `${i}`;
    btn.title = `Copo ${i} (300ml)`;
    btn.addEventListener("click", () => {
      waterGlassesCount = i === waterGlassesCount ? i - 1 : i;
      saveData();
      renderWater();
    });
    container.appendChild(btn);
  }

  const quickBtn = document.getElementById("btn-quick-water");
  if (quickBtn) {
    if (waterGlassesCount >= TOTAL_WATER_GOAL) {
      quickBtn.disabled = true;
      quickBtn.style.opacity = "0.4";
      quickBtn.style.cursor = "not-allowed";
      quickBtn.textContent = "Meta atingida";
    } else {
      quickBtn.disabled = false;
      quickBtn.style.opacity = "1";
      quickBtn.style.cursor = "pointer";
      quickBtn.textContent = "+ 1 Copo (300ml)";
    }
  }
}

/**
 * Controla exibição da aba atual
 */
function renderCurrentView() {
  const routineView = document.getElementById("view-routine");
  const remediosView = document.getElementById("view-remedios");

  if (currentTab === "remedios") {
    if (routineView) routineView.style.display = "none";
    if (remediosView) remediosView.style.display = "block";
    renderRemediosView();
  } else {
    if (remediosView) remediosView.style.display = "none";
    if (routineView) routineView.style.display = "block";
    renderRoutineTimeline();
  }
}

/**
 * Renderiza timeline da rotina
 */
function renderRoutineTimeline() {
  const container = document.getElementById("routine-timeline");
  if (!container) return;

  const periods = [
    { id: "manha", title: "Manhã", range: "09:00 às 12:20" },
    { id: "tarde", title: "Tarde", range: "12:20 às 19:00" },
    { id: "noite", title: "Noite", range: "19:00 às 22:00" }
  ];

  const nowMins = getNowMinutes();
  let html = "";

  periods.forEach(p => {
    if (currentTab !== "todas" && currentTab !== p.id) return;

    let tasks = ROUTINE_DATA.filter(t => t.period === p.id);
    if (hideCompleted) {
      tasks = tasks.filter(t => !completedTaskIds.has(t.id));
    }

    if (tasks.length === 0) return;

    html += `
      <section class="period-block">
        <div class="period-title-bar">
          <h2 class="period-title-text">${p.title}</h2>
          <span class="period-interval">${p.range}</span>
        </div>
        <div class="routine-cards-list">
    `;

    tasks.forEach(task => {
      const isDone = completedTaskIds.has(task.id);
      const isCurrent = (!isDone && nowMins >= task.startMins && nowMins < task.endMins);

      html += `
        <article class="task-row-card ${isDone ? 'is-done' : ''} ${isCurrent ? 'is-active-now' : ''}" id="card-${task.id}">
          <button class="custom-check-btn" onclick="toggleTask('${task.id}')" aria-label="Concluir tarefa">
            ✓
          </button>
          <div class="card-content">
            <div class="card-top-row">
              <span class="badge-time">${task.time}</span>
              ${(task.tags || []).map(t => `<span class="badge-tag ${t.class}">${t.label}</span>`).join("")}
              ${isCurrent ? '<span class="badge-tag" style="background:#2563eb; color:#fff;">Em andamento</span>' : ''}
            </div>
            <h3 class="card-title">${task.title}</h3>
            <p class="card-description">${task.desc}</p>
            ${task.tip ? `
              <div class="card-tip-box">
                <strong>Observação:</strong> ${task.tip}
              </div>
            ` : ''}
          </div>
        </article>
      `;
    });

    html += `
        </div>
      </section>
    `;
  });

  if (!html.trim()) {
    html = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md);">
        Nenhuma atividade pendente encontrada neste filtro.
      </div>
    `;
  }

  container.innerHTML = html;
}

/**
 * Renderiza a aba oficial de Remédios com a lista exata do papel manuscrito
 */
function renderRemediosView() {
  const container = document.getElementById("remedios-list-container");
  if (!container) return;

  let html = "";
  MEDICAMENTOS_DATA.forEach(med => {
    const isDone = completedMedIds.has(med.id);

    // Lista cada comprimido com badge estilizado
    const pillsHtml = med.medicamentos.map(pillName => `
      <span class="remedio-pill-tag">${pillName}</span>
    `).join("");

    html += `
      <div class="remedio-item-card ${isDone ? 'is-done' : ''}" id="med-card-${med.id}">
        <div class="remedio-info">
          <div class="remedio-momento-headline">
            <h3 class="remedio-momento-title">${med.momento.toUpperCase()}</h3>
            <span class="remedio-periodo-tag">${med.periodo}</span>
          </div>
          <div class="remedio-pills-wrap">
            ${pillsHtml}
          </div>
          <p class="remedio-desc">${med.instrucao}</p>
        </div>
        <button class="remedio-status-pill ${isDone ? 'done' : 'pending'}" onclick="toggleMedication('${med.id}')">
          ${isDone ? '✓ Tomado' : 'Marcar como Tomado'}
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Alterna status de um medicamento e sincroniza com a rotina geral
 */
window.toggleMedication = function (medId) {
  const wasDone = completedMedIds.has(medId);
  if (wasDone) {
    completedMedIds.delete(medId);
  } else {
    completedMedIds.add(medId);
  }

  // Sincroniza com a tarefa correspondente da rotina geral
  const linkedTask = ROUTINE_DATA.find(t => t.linkedMedId === medId);
  if (linkedTask) {
    if (wasDone) {
      completedTaskIds.delete(linkedTask.id);
    } else {
      completedTaskIds.add(linkedTask.id);
      if (linkedTask.isWater && waterGlassesCount < TOTAL_WATER_GOAL) {
        waterGlassesCount++;
        renderWater();
      }
    }
  }

  saveData();
  renderCurrentView();
  updateProgress();
};

/**
 * Alterna tarefa da rotina geral e sincroniza com remédios se houver vínculo
 */
window.toggleTask = function (taskId) {
  const task = ROUTINE_DATA.find(t => t.id === taskId);
  const wasDone = completedTaskIds.has(taskId);

  if (wasDone) {
    completedTaskIds.delete(taskId);
    if (task && task.linkedMedId) {
      completedMedIds.delete(task.linkedMedId);
    }
  } else {
    completedTaskIds.add(taskId);
    if (task && task.linkedMedId) {
      completedMedIds.add(task.linkedMedId);
    }
    if (task && task.isWater && waterGlassesCount < TOTAL_WATER_GOAL) {
      waterGlassesCount++;
      renderWater();
    }
  }

  saveData();
  renderCurrentView();
  updateProgress();
};

/**
 * Atualiza o progresso geral
 */
function updateProgress() {
  const total = ROUTINE_DATA.length;
  const completed = completedTaskIds.size;
  const pct = Math.round((completed / total) * 100);

  const fill = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");

  if (fill) fill.style.width = `${pct}%`;
  if (text) text.textContent = `${completed} de ${total} tarefas (${pct}%)`;
}

/**
 * Minutos atuais desde meia-noite
 */
function getNowMinutes() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

/**
 * Relógio ao vivo e destaque da atividade
 */
function startClock() {
  function tick() {
    const now = new Date();
    const banner = document.getElementById("current-task-banner");
    const content = document.getElementById("current-task-content");
    if (!banner || !content) return;

    const nowMins = now.getHours() * 60 + now.getMinutes();

    let active = ROUTINE_DATA.find(t => !completedTaskIds.has(t.id) && nowMins >= t.startMins && nowMins < t.endMins);
    if (!active) {
      active = ROUTINE_DATA.find(t => !completedTaskIds.has(t.id) && t.startMins > nowMins);
    }

    if (active && currentTab !== "remedios") {
      banner.style.display = "block";
      content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="font-size: 0.8rem; font-weight: 600; color: #93c5fd;">${active.time} &bull; ${active.periodLabel}</span>
            <h3 style="font-size: 1.15rem; font-weight: 600; color: #ffffff; margin: 0.2rem 0;">${active.title}</h3>
            <p style="font-size: 0.88rem; color: #cbd5e1;">${active.desc}</p>
          </div>
          <button class="btn-outline" onclick="toggleTask('${active.id}')" style="border-color: #3b82f6; color: #93c5fd;">
            ✓ Concluir
          </button>
        </div>
      `;
    } else {
      banner.style.display = "none";
    }
  }

  tick();
  setInterval(tick, 10000);
}
