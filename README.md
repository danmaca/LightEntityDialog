### Light Entity Dialog (Home Assistant custom card)

**Light Entity Dialog** je custom Lovelace karta/dialog pro entitu `light` v Home Assistantu. Uprostřed zobrazuje slider jasu, vlevo slider teploty bílé a vpravo výběr barvy.

Karta je navržena tak, aby se používala především jako popup (např. s pomocí integrace `browser_mod`), ale můžete ji použít i jako běžnou Lovelace kartu.

### Instalace

1. Nainstalujte závislosti a buildněte balíček:

```bash
cd LightEntityDialog
npm install
npm run build
```

2. Zkopírujte výstupní soubor do adresáře `www` vašeho Home Assistantu (pokud ještě nemáte, vytvořte):

- zdroj: `dist/light-entity-dialog.js`
- cíl: `/config/www/light-entity-dialog.js`

3. Přidejte resource do Lovelace (Nastavení → Panely → Zdroje):

```yaml
url: /local/light-entity-dialog.js
type: module
```

### Použití jako karta

Kartu můžete vložit do dashboardu přímo:

```yaml
type: custom:light-entity-dialog
entity: light.obyvak_strop
show_color_temp: true
show_color: true
brightness_label: Jas
color_temp_label: Teplota
color_label: Barva
```

### Použití jako popup (browser_mod)

Příklad, jak otevřít dialog při kliku na jinou kartu:

```yaml
type: button
entity: light.obyvak_strop
name: Obývák
tap_action:
  action: fire-dom-event
  browser_mod:
    command: popup
    title: Obývák
    content:
      type: custom:light-entity-dialog
      entity: light.obyvak_strop
      show_color_temp: true
      show_color: true
```

### Omezení a poznámky

- Karta očekává entitu typu `light`.
- Slider teploty se zobrazí pouze, pokud světlo podporuje `color_temp`.
- Výběr barvy se zobrazí pouze, pokud světlo podporuje nějaký z barevných režimů (`hs`, `rgb`, `rgbw`, `rgbww`, `xy`, nebo atribut `rgb_color`/`hs_color`).

