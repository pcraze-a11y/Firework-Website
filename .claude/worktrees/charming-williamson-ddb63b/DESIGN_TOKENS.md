# Design Tokens — Derived from treecard.org

## Visual Mood
Dark-teal/forest-green brand on white. Organic, nature-forward aesthetic with warm cream accents.
Clean and modern, generous padding, rounded but not pill-shaped buttons.

## Typography
- **Primary font**: Gilroy (custom web font — must self-host or find a licensed alternative)
- **Fallback**: Poppins (Google Fonts: weights 300, 400, 500, 600, 700), then `sans-serif`
- **Body size**: 20px
- **H1 size**: 55px / line-height 58.3px (≈ 1.06)
- **H1 weight**: 600
- **Body weight**: 400

> Implementation note: We use **Plus Jakarta Sans** (free, similar letterform to Gilroy) via Google Fonts.

## Color Palette (CSS custom properties → Tailwind config)

| Token | Hex | Usage |
|---|---|---|
| `--text` | `#143437` | Body text |
| `--heading` | `#1f4564` | Heading text (on light bg) |
| `--sea-green` | `#039149` | Primary action / success |
| `--lime-green` | `#5bcd63` | Hover / secondary highlight |
| `--lime-green-2` | `#3bb673` | Button hover state |
| `--medium-sea-green` | `#69bc69` | Subtle green accent |
| `--light-green` | `#8ed66e` | Lightest green accent |
| `--dark-slate-grey` | `#135658` | Nav, hero bg, dark panels |
| `--dark-slate-grey-2` | `#105157` | Slightly darker panel bg |
| `--old-lace` | `#fff4df` | Warm cream bg (hero text, sections) |
| `--mint-cream` | `#e6f4ed` | Very light green tint (section bg) |
| `--white-smoke` | `#f3f6f7` | Off-white card bg |
| `--cadet-blue` | `#49a3b3` | Tertiary accent / links |
| `--light-sea-green` | `#469d8a` | Mid-teal accent |
| `--dark-salmon` | `#ff9a83` | Warm coral accent |
| `--seashell` | `#fff1ee` | Lightest warm bg |
| `--silver` | `#c9c9c9` | Borders, dividers |
| `--indian-red` | `#b44b5d` | Error / destructive |
| `--white` | `#ffffff` | |
| `--black` | `#000000` | |

## Button Styles

### Primary Button ("Get started")
- Background: `#ffffff`
- Color: `#0c5153` (dark teal)
- Border-radius: `6px`
- Padding: `14px 37px`
- Font-weight: 600
- No border

### Secondary / Ghost Button ("Take action")
- Background: transparent
- Color: `#ffffff`
- Border-radius: `6px`
- Padding: `10px 8px`
- Font-weight: 500

### For this project — primary CTA on dark bg (adapted):
- Background: `#fff4df` (old-lace/cream)
- Color: `#105157` (dark-slate-grey-2)
- Border-radius: `6px`
- Padding: `14px 37px`
- Font-weight: 600

### Spot — Available:
- Background: `#e6f4ed` (mint-cream)
- Border: `2px solid #039149`

### Spot — Reserved:
- Background: `#c9c9c9` (silver)
- Border: `2px solid #969696`

### Spot — Selected (in-progress):
- Background: `#fff4df` (old-lace)
- Border: `2px solid #ff9a83` (dark-salmon)

## Spacing Scale
Use Tailwind defaults; primary section padding: `py-16 md:py-24`.

## Border Radius
- Buttons / inputs: `6px` (Tailwind: `rounded`)
- Cards / panels: `12px` (Tailwind: `rounded-xl`)
- Map spots: `4px` (Tailwind: `rounded`)

## Shadows
- Card: `0 4px 24px rgba(20,52,55,0.10)`
- Modal: `0 8px 48px rgba(20,52,55,0.18)`

## Tailwind Config Keys
```js
colors: {
  brand: {
    text: '#143437',
    heading: '#1f4564',
    'sea-green': '#039149',
    'lime-green': '#5bcd63',
    'lime-green-2': '#3bb673',
    'medium-green': '#69bc69',
    'dark-teal': '#135658',
    'darker-teal': '#105157',
    cream: '#fff4df',
    mint: '#e6f4ed',
    smoke: '#f3f6f7',
    cadet: '#49a3b3',
    salmon: '#ff9a83',
    seashell: '#fff1ee',
    silver: '#c9c9c9',
    error: '#b44b5d',
  }
}
fontFamily: { sans: ['Plus Jakarta Sans', 'Poppins', 'sans-serif'] }
borderRadius: { DEFAULT: '6px', card: '12px', spot: '4px' }
boxShadow: { card: '0 4px 24px rgba(20,52,55,0.10)', modal: '0 8px 48px rgba(20,52,55,0.18)' }
```
