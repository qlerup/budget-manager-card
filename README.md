# 💸 Budget Manager Card – README 📊✨

<img width="2293" height="563" alt="image" src="https://github.com/user-attachments/assets/76395379-04f6-499a-8215-4c1a8f5f43b3" />


> The card expects a **sensor** (e.g. `sensor.budget_overview`) that exposes budget data via attributes, and a service domain `budget_manager` for adding/updating/removing items and participants. 🔌🧠

---

## ✅ What can the card do? 🎯

- Shows a **budget overview** with totals per participant + a grand total 💰👥
- Lets you **add** an expense/income item (name, amount, frequency, payer) ➕🧾
- Lets you **edit** an existing item (via “Edit”) ✏️🔁
- Lets you **delete** items (via “Delete”) 🗑️⚠️
- Includes a **participants editor** (chips) so you can add/remove participants directly on the card 👤➕👤➖
- Supports splitting via “Both/All” (depending on participant count) 🤝🌍
- Automatically displays calculated **per-participant transfers** in the table 📈🧮
- Multi-language (i18n): `da`, `en`, `sv`, `nb`, `de`, `es`, `fr`, `fi` 🌐🗣️
- Includes a **Lovelace GUI editor** (visual editor) for `entity` and `currency` 🧩🛠️

---

## 📦 Installation 🧰

1. Save the card as:
   - `/config/www/budget-manager-card.js` 📁

2. Add it as a Lovelace resource:
   - URL: `/local/budget-manager-card.js?v=1.0.0` 🔗
   - Type: `module` 📦

3. Reload Lovelace / refresh your browser 🔄🖥️

---

## 🧩 Lovelace configuration (YAML) 📝

Minimum:

```yaml
type: custom:budget-manager-card
entity: sensor.budget_overview
currency: DKK
```

- `entity` ✅ (required)
  - The sensor that contains the budget data.
- `currency` 🏷️ (optional)
  - Free text shown after numbers (e.g. `DKK`, `kr`, `€`).

---

## 🧠 Expected sensor data format 📡

The card reads:

- Sensor `state`:
  - Used as the **grand total** when it is known (not `unknown`). 🧮
  - If `state` is `unknown`, the card calculates the total from the per-participant transfers. 🧠➕

- `attributes.items` (array):
  - A list of items shown in the table. 📋

- `attributes.participants` (array):
  - A list of participants used for totals and splitting. 👥

> If `participants` is missing, the card falls back to `['Christian','Yasmin']`. 🧯🙂

### 🧾 Item fields (typical)
An item is expected to contain some of the following:

- `name` (string) 🏷️
- `amount` (number) 💵 (used for add/update)
- `monthly` (number) 📆 (used for display and splitting)
- `frequency` (string): `monthly` / `quarterly` / `yearly` 🔁
- `payer` (string): participant name or “Both/All” 🤝

### 🔄 Per-participant transfers
The card can determine per-participant columns in 3 ways:

1) If the item has `transfers` (object) ✅🧾

```yaml
transfers:
  Christian: 100.0
  Yasmin: 50.0
```

2) Legacy fields: `christian_transfer` and/or `yasmin_transfer` 🧓⚙️

3) If no transfers exist:
- If `payer` is “Both/All” → split `monthly` equally across participants 🤝➗
- If `payer` matches a participant → assign the full `monthly` to that participant 👤➡️💰
- Otherwise → fallback: equal split 🤷➗

---

## 🧑‍🤝‍🧑 Participants 👥✨

At the top of the card you can:

- See participants as chips 🧩
- Remove a participant with “×” (at least 1 participant must always remain) ❌👤
- Add a participant via the input + “Add” ➕⌨️

### ⚠️ Reserved names
You cannot add participants named:
- `Begge`
- `Alle`

(They are treated as “split across all”). 🚫🤝

---

## 🧾 Add an item ➕

Fill in:
- **Name** (e.g. “Rent”) 🏠
- **Amount** (number) 💵
- **Frequency** (Monthly/Quarterly/Yearly) 📆
- **Payer** (Both/All or a specific participant) 🤝👤

Press **Add** ✅

> Tip: If you try to add without an amount, you’ll get an alert. ⚠️

---

## ✏️ Edit an item 🔁

- Press **✎** on a row in the table
- The form is populated
- Press **Update** ✅
- Or press **Cancel** 🛑

> Updates use the `budget_manager.update_item_by_name` service. 🔧

---

## 🗑️ Delete an item ⚠️

- Press **🗑** on a row
- If multiple items share the same name, the card asks whether you want to delete **ALL** of them 🔥🗑️
- Otherwise it asks to delete just that one 🗑️

> Deletion uses `budget_manager.remove_item_by_name` (delete by name). 🧨

---

## 🧩 Lovelace GUI editor 🛠️🧩

The card includes a built-in editor where you can:

- Pick `entity` via the entity picker 🎛️
- Enter `currency` as free text 🏷️

---

## 🌍 Language (i18n) 🗣️

The card attempts to choose a language based on Home Assistant locale/language and falls back to English. 🌐✅

Supported languages:
- 🇩🇰 Danish (`da`)
- 🇬🇧 English (`en`)
- 🇸🇪 Swedish (`sv`)
- 🇳🇴 Norwegian Bokmål (`nb`)
- 🇩🇪 German (`de`)
- 🇪🇸 Spanish (`es`)
- 🇫🇷 French (`fr`)
- 🇫🇮 Finnish (`fi`)

---

## 🧪 Quick troubleshooting 🔍🧯

- Ensure the resource is loaded as `module` ✅📦
- Check the browser console for: `BUDGET-MANAGER-CARD v1.0.0` 🖥️🧾
- Verify the sensor exists: `entity: sensor.budget_overview` 📡
- Verify the sensor has `attributes.items` and (ideally) `attributes.participants` 🧠
- If buttons don’t work: confirm your integration exposes services under `budget_manager.*` 🔧⚙️

---

## 📌 Example: minimal card in a dashboard 🏠📊

```yaml
type: custom:budget-manager-card
entity: sensor.budget_overview
currency: "kr"
```

---

## 🧾 Version notes 🏷️

- `1.0.0` 🎉
  - First release with participants, add/update/delete, table and GUI editor.
