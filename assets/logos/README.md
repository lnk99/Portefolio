# 📁 assets/logos — Company & School Logos

Place your logo image files in this folder. The portfolio will automatically display them.

## Required files

| File name               | Used for                          | Section(s)               |
|-------------------------|-----------------------------------|--------------------------|
| `valeo.png`             | Valeo                             | Experience + Projects    |
| `ge-healthcare.png`     | GE Healthcare                     | Experience + Projects    |
| `jtekt.png`             | JTEKT Torsen                      | Experience + Projects    |
| `robocath.png`          | ROBOCATH                          | Projects                 |
| `uwf.png`               | University of West Florida        | Projects + Education     |
| `polytech-angers.png`   | Polytech Angers                   | Education                |
| `iut-dschang.png`       | IUT Dschang (optional)            | Education                |

## Where to download the logos

- **Valeo** → https://www.valeo.com (press kit / media section)
- **GE Healthcare** → https://www.gehealthcare.com (newsroom)
- **JTEKT** → https://www.jtekt.com (press room)
- **ROBOCATH** → https://www.robocath.com
- **University of West Florida** → https://uwf.edu (brand resources)
- **Polytech Angers** → https://www.polytech-angers.fr

## Tips

- Use `.png` files with a **transparent background** for best results.
- Recommended size: **200–400px wide**, any height (they are scaled automatically).
- If a logo file is missing, the `alt` text will be shown instead — the page will still work fine.

## Logo sizes in the portfolio

| Section    | Displayed size         | CSS class        |
|------------|------------------------|------------------|
| Experience | 30px tall, max 120px wide | `.company-logo` — white/inverted on dark background |
| Projects   | 16px tall, max 60px wide  | `.proj-logo` — colored on light, inverted on hover  |
| Education  | 28px tall, max 110px wide | `.edu-logo` — full color on cream background        |

To adjust sizes or styling, edit the **COMPANY LOGOS** section in `css/styles.css`.
