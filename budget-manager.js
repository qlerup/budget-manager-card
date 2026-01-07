// Budget Manager Card – v1.0.0
// Gem som /config/www/budget-manager-card.js  og brug resource: /local/budget-manager-card.js?v=1.0.0

const CARD_VERSION = "1.0.0";

console.info(
  `%c BUDGET-MANAGER-CARD %c v${CARD_VERSION} `,
  "background:#4caf50;color:white;border-radius:4px 0 0 4px;padding:2px 6px;",
  "background:#e0e0e0;color:#111;border-radius:0 4px 4px 0;padding:2px 6px;"
);

const loadCard = async () => {
  let LitElement, html, css;
  try {
    ({ LitElement, html, css } = await import("lit"));
  } catch (e) {
    console.warn("budget-manager-card: import('lit') fejlede, prøver CDN fallback…", e);
    ({ LitElement, html, css } = await import("https://cdn.jsdelivr.net/npm/lit@2.8.0/+esm"));
  }

  // --- i18n (borrowed pattern from pin-lock-card) ---
  const I18N = {
    en: {
      'card.title': 'Budget',
      'participants.label': 'Participants (used for "Payer" and split when using "{all}")',
      'participants.hint': 'Note: "{all}" is always available and splits equally across all participants.',
      'participants.add_placeholder': 'Add name (e.g. Christian)',
      'form.name': 'Name',
      'form.amount': 'Amount',
      'form.frequency': 'Frequency',
      'form.payer': 'Payer',
      'form.add': 'Add',
      'form.update': 'Update',
      'form.cancel': 'Cancel',
      'dup.hint': 'There are {n} items with this name – "Add" creates another, but "Delete/Update by name" will affect all.',
      'table.name': 'Name',
      'table.monthly': 'Monthly',
      'table.frequency': 'Frequency',
      'table.payer': 'Payer',
      'actions.edit': 'Edit',
      'actions.delete': 'Delete',
      'confirm.delete_all': 'There are {n} items named "{name}". Delete ALL?',
      'confirm.delete_one': 'Delete "{name}"?',
      'freq.monthly': 'Monthly',
      'freq.quarterly': 'Quarterly',
      'freq.yearly': 'Yearly',
      'label.both': 'Both',
      'label.all': 'All',
      'total.label': 'Total',

      // Editor
      'editor.base': 'Basic',
      'editor.entity': 'Entity',
      'editor.currency': 'Currency (free text)',
      'editor.base_hint': 'Choose the sensor that exposes budget data and type the currency label to display on the card.'
    },
    da: {
      'card.title': 'Budget',
      'participants.label': 'Deltagere (bruges i "Betaler" og fordeling ved "{all}")',
      'participants.hint': 'Bemærk: "{all}" er altid en mulighed og fordeler ligeligt på alle deltagere.',
      'participants.add_placeholder': 'Tilføj navn (fx Christian)',
      'form.name': 'Navn',
      'form.amount': 'Beløb',
      'form.frequency': 'Frekvens',
      'form.payer': 'Betaler',
      'form.add': 'Tilføj',
      'form.update': 'Opdater',
      'form.cancel': 'Annuller',
      'dup.hint': 'Der findes {n} poster med dette navn – “Tilføj” laver en ekstra, men “Slet/Opdater via navn” rammer dem alle.',
      'table.name': 'Navn',
      'table.monthly': 'Månedlig',
      'table.frequency': 'Frekvens',
      'table.payer': 'Betaler',
      'actions.edit': 'Redigér',
      'actions.delete': 'Slet',
      'confirm.delete_all': 'Der findes {n} poster med navnet "{name}". Slette ALLE?',
      'confirm.delete_one': 'Slet "{name}"?',
      'freq.monthly': 'Månedlig',
      'freq.quarterly': 'Kvartalsvis',
      'freq.yearly': 'Årlig',
      'label.both': 'Begge',
      'label.all': 'Alle',
      'total.label': 'Samlet',

      'editor.base': 'Basis',
      'editor.entity': 'Entity',
      'editor.currency': 'Valuta (fri tekst)',
      'editor.base_hint': 'Vælg sensoren der udstiller budgetdata, og skriv den valuta-tekst der skal vises på kortet.'
    },
    sv: {
      'card.title': 'Budget',
      'participants.label': 'Deltagare (används i "Betalare" och fördelning med "{all}")',
      'participants.hint': 'Obs: "{all}" finns alltid och fördelar lika mellan alla deltagare.',
      'participants.add_placeholder': 'Lägg till namn (t.ex. Christian)',
      'form.name': 'Namn',
      'form.amount': 'Belopp',
      'form.frequency': 'Frekvens',
      'form.payer': 'Betalare',
      'form.add': 'Lägg till',
      'form.update': 'Uppdatera',
      'form.cancel': 'Avbryt',
      'dup.hint': 'Det finns {n} poster med detta namn – ”Lägg till” skapar en till, men ”Radera/Uppdatera via namn” påverkar alla.',
      'table.name': 'Namn',
      'table.monthly': 'Månatlig',
      'table.frequency': 'Frekvens',
      'table.payer': 'Betalare',
      'actions.edit': 'Redigera',
      'actions.delete': 'Radera',
      'confirm.delete_all': 'Det finns {n} poster med namnet "{name}". Radera ALLA?',
      'confirm.delete_one': 'Radera "{name}"?',
      'freq.monthly': 'Månatlig',
      'freq.quarterly': 'Kvartalsvis',
      'freq.yearly': 'Årlig',
      'label.both': 'Båda',
      'label.all': 'Alla',
      'total.label': 'Totalt',

      'editor.base': 'Grundläggande',
      'editor.entity': 'Entity',
      'editor.currency': 'Valuta (fri text)',
      'editor.base_hint': 'Välj sensorn som exponerar budgetdata och skriv valutatexten som ska visas på kortet.'
    },
    nb: {
      'card.title': 'Budsjett',
      'participants.label': 'Deltakere (brukes i "Betaler" og fordeling ved "{all}")',
      'participants.hint': 'Merk: "{all}" er alltid et valg og fordeler likt mellom alle deltakere.',
      'participants.add_placeholder': 'Legg til navn (f.eks. Christian)',
      'form.name': 'Navn',
      'form.amount': 'Beløp',
      'form.frequency': 'Frekvens',
      'form.payer': 'Betaler',
      'form.add': 'Legg til',
      'form.update': 'Oppdater',
      'form.cancel': 'Avbryt',
      'dup.hint': 'Det finnes {n} poster med dette navnet – «Legg til» lager en til, men «Slett/Oppdater via navn» påvirker alle.',
      'table.name': 'Navn',
      'table.monthly': 'Månedlig',
      'table.frequency': 'Frekvens',
      'table.payer': 'Betaler',
      'actions.edit': 'Rediger',
      'actions.delete': 'Slett',
      'confirm.delete_all': 'Det finnes {n} poster med navnet "{name}". Slett ALLE?',
      'confirm.delete_one': 'Slett "{name}"?',
      'freq.monthly': 'Månedlig',
      'freq.quarterly': 'Kvartalsvis',
      'freq.yearly': 'Årlig',
      'label.both': 'Begge',
      'label.all': 'Alle',
      'total.label': 'Totalt',

      'editor.base': 'Grunnleggende',
      'editor.entity': 'Entity',
      'editor.currency': 'Valuta (fri tekst)',
      'editor.base_hint': 'Velg sensoren som eksponerer budsjettdata, og skriv valutateksten som skal vises på kortet.'
    },
    de: {
      'card.title': 'Budget',
      'participants.label': 'Teilnehmer (für "Zahler" und Verteilung bei "{all}")',
      'participants.hint': 'Hinweis: "{all}" ist immer verfügbar und teilt gleichmäßig auf alle Teilnehmer.',
      'participants.add_placeholder': 'Name hinzufügen (z. B. Christian)',
      'form.name': 'Name',
      'form.amount': 'Betrag',
      'form.frequency': 'Frequenz',
      'form.payer': 'Zahler',
      'form.add': 'Hinzufügen',
      'form.update': 'Aktualisieren',
      'form.cancel': 'Abbrechen',
      'dup.hint': 'Es gibt {n} Einträge mit diesem Namen – „Hinzufügen“ erstellt einen weiteren, aber „Löschen/Aktualisieren nach Name“ betrifft alle.',
      'table.name': 'Name',
      'table.monthly': 'Monatlich',
      'table.frequency': 'Frequenz',
      'table.payer': 'Zahler',
      'actions.edit': 'Bearbeiten',
      'actions.delete': 'Löschen',
      'confirm.delete_all': 'Es gibt {n} Einträge mit dem Namen "{name}". ALLE löschen?',
      'confirm.delete_one': '"{name}" löschen?',
      'freq.monthly': 'Monatlich',
      'freq.quarterly': 'Vierteljährlich',
      'freq.yearly': 'Jährlich',
      'label.both': 'Beide',
      'label.all': 'Alle',
      'total.label': 'Gesamt',

      'editor.base': 'Basis',
      'editor.entity': 'Entity',
      'editor.currency': 'Währung (Freitext)',
      'editor.base_hint': 'Wählen Sie den Sensor und geben Sie den Währungstext ein, der auf der Karte angezeigt werden soll.'
    },
    es: {
      'card.title': 'Presupuesto',
      'participants.label': 'Participantes (usado en "Pagador" y reparto con "{all}")',
      'participants.hint': 'Nota: "{all}" siempre está disponible y reparte a partes iguales entre todos los participantes.',
      'participants.add_placeholder': 'Añadir nombre (p. ej., Christian)',
      'form.name': 'Nombre',
      'form.amount': 'Importe',
      'form.frequency': 'Frecuencia',
      'form.payer': 'Pagador',
      'form.add': 'Añadir',
      'form.update': 'Actualizar',
      'form.cancel': 'Cancelar',
      'dup.hint': 'Hay {n} elementos con este nombre: "Añadir" crea otro, pero "Eliminar/Actualizar por nombre" afecta a todos.',
      'table.name': 'Nombre',
      'table.monthly': 'Mensual',
      'table.frequency': 'Frecuencia',
      'table.payer': 'Pagador',
      'actions.edit': 'Editar',
      'actions.delete': 'Eliminar',
      'confirm.delete_all': 'Hay {n} elementos llamados "{name}". ¿Eliminar TODOS?',
      'confirm.delete_one': '¿Eliminar "{name}"?',
      'freq.monthly': 'Mensual',
      'freq.quarterly': 'Trimestral',
      'freq.yearly': 'Anual',
      'label.both': 'Ambos',
      'label.all': 'Todos',
      'total.label': 'Total',

      'editor.base': 'Básico',
      'editor.entity': 'Entidad',
      'editor.currency': 'Moneda (texto libre)',
      'editor.base_hint': 'Elige el sensor y escribe el texto de moneda que se mostrará en la tarjeta.'
    },
    fr: {
      'card.title': 'Budget',
      'participants.label': 'Participants (utilisé pour "Payeur" et la répartition avec "{all}")',
      'participants.hint': 'Remarque : "{all}" est toujours disponible et répartit équitablement entre tous les participants.',
      'participants.add_placeholder': 'Ajouter un nom (p. ex. Christian)',
      'form.name': 'Nom',
      'form.amount': 'Montant',
      'form.frequency': 'Fréquence',
      'form.payer': 'Payeur',
      'form.add': 'Ajouter',
      'form.update': 'Mettre à jour',
      'form.cancel': 'Annuler',
      'dup.hint': 'Il existe {n} éléments portant ce nom — « Ajouter » en crée un autre, mais « Supprimer/Mettre à jour par nom » les affectera tous.',
      'table.name': 'Nom',
      'table.monthly': 'Mensuel',
      'table.frequency': 'Fréquence',
      'table.payer': 'Payeur',
      'actions.edit': 'Modifier',
      'actions.delete': 'Supprimer',
      'confirm.delete_all': 'Il existe {n} éléments nommés "{name}". Supprimer TOUS ?',
      'confirm.delete_one': 'Supprimer « {name} » ?',
      'freq.monthly': 'Mensuel',
      'freq.quarterly': 'Trimestriel',
      'freq.yearly': 'Annuel',
      'label.both': 'Les deux',
      'label.all': 'Tous',
      'total.label': 'Total',

      'editor.base': 'Basique',
      'editor.entity': 'Entité',
      'editor.currency': 'Devise (texte libre)',
      'editor.base_hint': 'Choisissez le capteur qui expose les données de budget et saisissez l’étiquette de devise à afficher sur la carte.'
    },
    fi: {
      'card.title': 'Budjetti',
      'participants.label': 'Osallistujat (käytetään kentässä "Maksaja" ja jaossa, kun valitaan "{all}")',
      'participants.hint': 'Huom: "{all}" on aina käytettävissä ja jakaa tasan kaikille osallistujille.',
      'participants.add_placeholder': 'Lisää nimi (esim. Christian)',
      'form.name': 'Nimi',
      'form.amount': 'Summa',
      'form.frequency': 'Toistuvuus',
      'form.payer': 'Maksaja',
      'form.add': 'Lisää',
      'form.update': 'Päivitä',
      'form.cancel': 'Peruuta',
      'dup.hint': 'Tällä nimellä on {n} riviä — "Lisää" luo uuden, mutta "Poista/Päivitä nimen perusteella" vaikuttaa kaikkiin.',
      'table.name': 'Nimi',
      'table.monthly': 'Kuukausittain',
      'table.frequency': 'Toistuvuus',
      'table.payer': 'Maksaja',
      'actions.edit': 'Muokkaa',
      'actions.delete': 'Poista',
      'confirm.delete_all': 'Kohteita nimellä "{name}" on {n}. Poistetaanko KAIKKI?',
      'confirm.delete_one': 'Poistetaanko "{name}"?',
      'freq.monthly': 'Kuukausittain',
      'freq.quarterly': 'Neljännesvuosittain',
      'freq.yearly': 'Vuosittain',
      'label.both': 'Molemmat',
      'label.all': 'Kaikki',
      'total.label': 'Yhteensä',

      'editor.base': 'Perus',
      'editor.entity': 'Entiteetti',
      'editor.currency': 'Valuutta (vapaa teksti)',
      'editor.base_hint': 'Valitse sensori, joka tarjoaa budjettidatan, ja kirjoita valuuttateksti, joka näytetään kortissa.'
    },
  };

  function getLangFromHass(hass) {
    const raw = hass?.locale?.language || hass?.language || navigator.language || 'en';
    return String(raw).toLowerCase();
  }
  function localize(key, hass, vars) {
    const raw = getLangFromHass(hass);
    const alias = { no: 'nb' };
    const parts = raw.split('-');
    const candidates = [raw, parts[0], alias[raw], alias[parts[0]], 'en'].filter(Boolean);
    let s = I18N.en[key] || key;
    for (const c of candidates) {
      const dict = I18N[c];
      if (dict && dict[key]) { s = dict[key]; break; }
    }
    if (vars) {
      Object.entries(vars).forEach(([k,v]) => { s = s.replaceAll(`{${k}}`, String(v)); });
    }
    return s;
  }

  class BudgetManagerCard extends LitElement {
    static get properties() {
      return { hass: {}, config: {}, _form: {}, _editingOriginalName: {}, _personInput: {} };
    }

    static get styles() {
      return css`
        :host { display:block; width:100%; box-sizing:border-box; }
        ha-card { padding: 0; box-sizing: border-box; }
        .content { width:100%; box-sizing:border-box; padding:16px; }
        .header { display:flex; flex-direction:column; gap:10px; margin-bottom:12px; width:100%; }
        .title { font-size:18px; font-weight:600; }
        .totals-row { display:flex; align-items:flex-end; gap:16px; width:100%; }
        .people { display:flex; flex-wrap:wrap; gap:16px; }
        .spacer { flex:1; }
        .total-block { display:flex; flex-direction:column; line-height:1.2; }
        .total-label { opacity:.85; }
        .total-value { font-variant-numeric: tabular-nums; }

        .form { border:1px solid var(--divider-color); border-radius:12px; padding:12px; margin-bottom:12px; width:100%; box-sizing:border-box; background: var(--card-background-color); }
        .row { display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap:12px; }
        label { display:flex; flex-direction:column; font-size:12px; color: var(--secondary-text-color); gap:6px; }
        input, select { padding:8px; font-size:14px; border:1px solid var(--divider-color); border-radius:8px; background: var(--card-background-color); color: var(--primary-text-color); width:100%; box-sizing:border-box; }
        .actions { margin-top:10px; display:flex; gap:8px; }
        .btn { padding:8px 12px; border-radius:8px; border:1px solid var(--divider-color); background: var(--primary-color); color:#fff; cursor:pointer; }
        .btn.secondary { background: transparent; color: var(--primary-text-color); }

        .table-wrap { width:100%; box-sizing:border-box; overflow-x:auto; }
        table { width:100%; border-collapse:collapse; box-sizing:border-box; }
        thead th { text-align:left; font-weight:600; padding:8px; border-bottom:1px solid var(--divider-color); }
        tbody td { padding:8px; border-bottom:1px solid var(--divider-color); vertical-align:middle; }
        .num { text-align:right; white-space:nowrap; font-variant-numeric: tabular-nums; }
        .row-actions { white-space:nowrap; display:flex; gap:6px; justify-content:flex-end; }
        .iconbtn { padding:6px 10px; border-radius:8px; border:1px solid var(--divider-color); background: transparent; cursor:pointer; }
        .hint { font-size:12px; color: var(--secondary-text-color); margin-top:6px; }

        /* Participants editor */
        .participants { border:1px dashed var(--divider-color); border-radius:12px; padding:12px; margin-bottom:12px; }
        .chips { display:flex; flex-wrap:wrap; gap:8px; }
        .chip { display:flex; align-items:center; gap:6px; padding:4px 8px; border-radius:16px; background: var(--secondary-background-color); }
        .chip .x { border:none; background:transparent; cursor:pointer; font-size:14px; line-height:1; }
        .part-row { display:grid; grid-template-columns: 1fr auto; gap:8px; margin-top:8px; }

        @media (max-width: 900px) { .totals-row { flex-direction:column; align-items:flex-start; } }
        @media (max-width: 700px) { .row { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 420px) { .row { grid-template-columns: 1fr; } }
      `;
    }

    // Expose GUI editor for Lovelace
    static getConfigElement() {
      return document.createElement("budget-manager-card-editor");
    }

    static getStubConfig(_hass) {
      return { entity: "sensor.budget_overview", currency: "DKK" };
    }

    setConfig(config) {
      if (!config.entity) throw new Error("Angiv 'entity', fx sensor.budget_overview");
      this.config = { currency: "DKK", ...config };
      this._resetForm();
    }

    _resetForm() {
      this._form = { name: "", amount: "", frequency: "monthly", payer: "Begge" };
      this._editingOriginalName = "";
      this._personInput = "";
    }

    get _sensor() { return this.hass?.states?.[this.config.entity]; }
    _items() { return this._sensor?.attributes?.items || []; }
    _participants() {
      const s = this._sensor; const p = s?.attributes?.participants; if (Array.isArray(p) && p.length) return p; return ["Christian","Yasmin"]; }

    _t(key, vars) { return localize(key, this.hass, vars); }

    _freqLabel(v) {
      const m = String(v||"").toLowerCase();
      if (m === "monthly") return this._t('freq.monthly');
      if (m === "quarterly") return this._t('freq.quarterly');
      if (m === "yearly") return this._t('freq.yearly');
      return v;
    }

    _displayPayer(payer, participants) {
      const allLabel = participants.length > 2 ? this._t('label.all') : this._t('label.both');
      if (!payer) return allLabel;
      const pl = String(payer).toLowerCase();
      if (pl.startsWith("beg") || pl.startsWith("all")) return allLabel;
      return payer;
    }

    _transfersForItem(it, participants) {
      if (it.transfers) return it.transfers;
      const map = Object.fromEntries(participants.map(p => [p, 0]));
      if ("christian_transfer" in it || "yasmin_transfer" in it) {
        if (participants.some(p => p.toLowerCase()==="christian")) map[participants.find(p=>p.toLowerCase()==="christian")] = Number(it.christian_transfer||0);
        if (participants.some(p => p.toLowerCase()==="yasmin")) map[participants.find(p=>p.toLowerCase()==="yasmin")] = Number(it.yasmin_transfer||0);
        return map;
      }
      const m = Number(it.monthly)||0; const payer = String(it.payer||"");
      if (/^(begge|alle)/i.test(payer)) { const share = m/Math.max(1, participants.length); participants.forEach(p=>map[p]=share); return map; }
      const found = participants.find(p => p.toLowerCase() === payer.toLowerCase());
      if (found) { map[found] = m; return map; }
      const share = m/Math.max(1, participants.length); participants.forEach(p=>map[p]=share); return map;
    }

    _fmt(v) { const nf = new Intl.NumberFormat('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); const n = Number(v) || 0; return `${nf.format(n)} ${this.config.currency}`; }

    render() {
      const s = this._sensor;
      const items = this._items();
      const participants = this._participants();

      const totalsDict = Object.fromEntries(participants.map(p => [p, 0]));
      items.forEach(it => {
        const transfers = this._transfersForItem(it, participants);
        Object.entries(transfers).forEach(([p, v]) => { totalsDict[p] = (totalsDict[p] || 0) + (v || 0); });
      });
      const grand = (s && s.state != null && s.state !== "unknown")
        ? Number(s.state)
        : Object.values(totalsDict).reduce((a,b)=>a+Number(b||0),0);

      return html`
        <ha-card>
          <div class="content">
            <div class="header">
              <div class="title">${this._t('card.title')}</div>
              <div class="totals-row">
                <div class="people">
                  ${participants.map(p => html`
                    <div class="total-block">
                      <span class="total-label">${p}</span>
                      <span class="total-value">${this._fmt(totalsDict[p] || 0)}</span>
                    </div>
                  `)}
                </div>
                <div class="spacer"></div>
                <div class="total-block">
                  <span class="total-label">${this._t('total.label')}</span>
                  <span class="total-value">${this._fmt(grand)}</span>
                </div>
              </div>
            </div>

            ${this._renderParticipants(participants)}

            <div class="form">
              ${this._renderForm(items, participants)}
            </div>

            <div class="table-wrap">
              ${this._renderTable(items, participants)}
            </div>
          </div>
        </ha-card>
      `;
    }

    _renderParticipants(participants) {
      const allLabel = participants.length > 2 ? this._t('label.all') : this._t('label.both');
      return html`
        <div class="participants">
          <div class="label" style="margin-bottom:6px">${this._t('participants.label', { all: allLabel })}</div>
          <div class="chips">
            ${participants.map(p => html`
              <span class="chip">${p}
                <button class="x" title="${this._t('actions.delete')}" @click=${() => this._removeParticipant(p, participants)}>${participants.length>1?"×":""}</button>
              </span>
            `)}
          </div>
          <div class="part-row">
            <input type="text" placeholder="${this._t('participants.add_placeholder')}" .value=${this._personInput||""} @input=${e=>this._personInput=e.target.value} />
            <button class="btn" @click=${() => this._addParticipant(participants)}>${this._t('form.add')}</button>
          </div>
          <div class="hint">${this._t('participants.hint', { all: allLabel })}</div>
        </div>
      `;
    }

    async _addParticipant(participants) {
      const name = String(this._personInput||"").trim();
      if (!name) return;
      if (/^(begge|alle)$/i.test(name)) { alert(`${this._t('label.both')}/${this._t('label.all')} er reserveret.`); return; }
      const exists = participants.some(p => p.toLowerCase() === name.toLowerCase());
      if (exists) { this._personInput = ""; return; }
      const next = [...participants, name];
      await this.hass.callService("budget_manager", "set_participants", { names: next });
      this._personInput = "";
    }

    async _removeParticipant(name, participants) {
      if (participants.length <= 1) { alert("Mindst én deltager er påkrævet."); return; }
      const next = participants.filter(p => p.toLowerCase() !== String(name).toLowerCase());
      if (!next.length) { alert("Mindst én deltager er påkrævet."); return; }
      await this.hass.callService("budget_manager", "set_participants", { names: next });
    }

    _renderForm(items, participants) {
      const f = this._form;
      const editing = !!this._editingOriginalName;
      const dupCount = f.name ? items.filter(x => (x.name||"").trim().toLowerCase() === f.name.trim().toLowerCase()).length : 0;
      const allLabel = participants.length > 2 ? 'Alle' : 'Begge'; // value to send

      return html`
        <div class="row">
          <label>${this._t('form.name')}
            <input .value=${f.name} @input=${(e) => this._updateField("name", e.target.value)} placeholder="Fx Husleje" />
          </label>
          <label>${this._t('form.amount')}
            <input type="number" step="0.01" .value=${f.amount} @input=${(e) => this._updateField("amount", e.target.value)} placeholder="Fx 7500" />
          </label>
          <label>${this._t('form.frequency')}
            <select .value=${f.frequency} @change=${(e) => this._updateField("frequency", e.target.value)}>
              <option value="monthly">${this._t('freq.monthly')}</option>
              <option value="quarterly">${this._t('freq.quarterly')}</option>
              <option value="yearly">${this._t('freq.yearly')}</option>
            </select>
          </label>
          <label>${this._t('form.payer')}
            <select .value=${/^(begge|alle)$/i.test(f.payer||'') ? allLabel : f.payer} @change=${(e) => this._updateField("payer", e.target.value)}>
              <option value="${allLabel}">${participants.length > 2 ? this._t('label.all') : this._t('label.both')}</option>
              ${participants.map(p => html`<option value="${p}">${p}</option>`)}
            </select>
          </label>
        </div>
        ${dupCount > 1 && !editing ? html`<div class="hint">${this._t('dup.hint', { n: dupCount })}</div>` : ""}
        <div class="actions">
          <button class="btn" @click=${() => this._save(items)}>${editing ? this._t('form.update') : this._t('form.add')}</button>
          ${editing ? html`<button class="btn secondary" @click=${this._cancelEdit}>${this._t('form.cancel')}</button>` : ""}
        </div>
      `;
    }

    _renderTable(items, participants) {
      return html`
        <table>
          <thead>
            <tr>
              <th>${this._t('table.name')}</th>
              <th class="num">${this._t('table.monthly')}</th>
              <th>${this._t('table.frequency')}</th>
              <th>${this._t('table.payer')}</th>
              ${participants.map(p => html`<th class="num">${p}</th>`)}
              <th class="num"></th>
            </tr>
          </thead>
          <tbody>
            ${items.map((it) => {
              const tmap = this._transfersForItem(it, participants);
              return html`
              <tr>
                <td>${it.name}</td>
                <td class="num">${this._fmt(it.monthly)}</td>
                <td>${this._freqLabel(it.frequency)}</td>
                <td>${this._displayPayer(it.payer, participants)}</td>
                ${participants.map(p => html`<td class="num">${this._fmt(tmap[p]||0)}</td>`)}
                <td class="row-actions">
                  <button class="iconbtn" title="${this._t('actions.edit')}" @click=${() => this._edit(it)}>✎</button>
                  <button class="iconbtn" title="${this._t('actions.delete')}" @click=${() => this._delete(it, items)}>🗑</button>
                </td>
              </tr>`;
            })}
          </tbody>
        </table>
      `;
    }

    _updateField(k, v) { this._form = { ...this._form, [k]: v }; }
    _edit(it) { this._editingOriginalName = it.name; this._form = { name: it.name, amount: it.amount, frequency: it.frequency, payer: it.payer }; }
    _cancelEdit = () => this._resetForm();

    async _save(items) {
      const f = this._form;
      const data = {
        name: (this._editingOriginalName || f.name || "").trim(),
        ...(this._editingOriginalName ? { new_name: (f.name || "").trim() } : {}),
      };
      if (!data.name) { alert("Udfyld navn."); return; }
      if (f.amount !== "" && !isNaN(Number(f.amount))) data.amount = Number(f.amount);
      if (f.frequency) data.frequency = f.frequency;
      if (f.payer) data.payer = f.payer;

      if (this._editingOriginalName) {
        await this.hass.callService("budget_manager", "update_item_by_name", data);
      } else {
        if (data.amount === undefined) { alert("Udfyld beløb for at tilføje."); return; }
        await this.hass.callService("budget_manager", "add_item", {
          name: data.name,
          amount: data.amount,
          frequency: data.frequency || "monthly",
          payer: data.payer || "Begge",
        });
      }
      this._resetForm();
    }

    async _delete(it, items) {
      const dup = items.filter(x => (x.name||"").trim().toLowerCase() === (it.name||"").trim().toLowerCase()).length;
      if (dup > 1) {
        if (!confirm(this._t('confirm.delete_all', { n: dup, name: it.name }))) return;
      } else {
        if (!confirm(this._t('confirm.delete_one', { name: it.name }))) return;
      }
      await this.hass.callService("budget_manager", "remove_item_by_name", { name: it.name });
      if (this._editingOriginalName === it.name) this._resetForm();
    }

    getCardSize() { return 6; }
  }

  // Editor element for Lovelace visual editor (localized)
  class BudgetManagerCardEditor extends LitElement {
    static get properties() { return { hass: {}, _config: {} }; }

    static get styles() {
      return css`
        .editor { padding: 8px 0; font: inherit; color: inherit; }
        .row { display: grid; gap: 12px; margin: 8px 0; }
        .two { grid-template-columns: 1fr 1fr; }
        .label { font-size: 0.9em; color: var(--secondary-text-color); }
        input[type=text] {
          width: 100%; box-sizing: border-box; padding: 8px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.06);
          color: inherit;
        }
        h3 { margin: 16px 0 4px; font-weight: 600; }
        p.muted { opacity: 0.7; margin: 0 0 8px; }
      `;
    }

    _t(key, vars) { return localize(key, this.hass, vars); }

    setConfig(config) { this._config = { currency: "DKK", ...config }; }
    get value() { return this._config; }

    render() {
      if (!this._config) return html``;
      const c = this._config;
      return html`
        <div class="editor">
          <h3>${this._t('editor.base')}</h3>
          <p class="muted">${this._t('editor.base_hint')}</p>
          <div class="row two">
            <div>
              <div class="label">${this._t('editor.entity')}</div>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${c.entity || ""}
                @value-changed=${this._onEntityChanged}
                allow-custom-entity
                .includeDomains=${["sensor"]}
              ></ha-entity-picker>
            </div>
            <div>
              <div class="label">${this._t('editor.currency')}</div>
              <input type="text" .value=${c.currency ?? "DKK"} placeholder="DKK" @input=${this._onCurrencyChanged} />
            </div>
          </div>
        </div>
      `;
    }

    _onEntityChanged = (e) => {
      const val = e.detail?.value ?? e.target?.value ?? "";
      this._update({ entity: val });
    };

    _onCurrencyChanged = (e) => {
      this._update({ currency: (e.target.value || "").trim() });
    };

    _update(changes) {
      this._config = { ...this._config, ...changes };
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }));
    }
  }

  if (!customElements.get("budget-manager-card")) {
    customElements.define("budget-manager-card", BudgetManagerCard);
  }
  if (!customElements.get("budget-manager-card-editor")) {
    customElements.define("budget-manager-card-editor", BudgetManagerCardEditor);
  }
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "budget-manager-card",
    name: `Budget Manager Card v${CARD_VERSION}`,
    description: "Tilføj/Opdater/Slet via navn.",
    preview: true,
  });
};

loadCard();
