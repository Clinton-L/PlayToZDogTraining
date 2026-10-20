# PlayToZ Dog Training

## Visual theme

The site theme is visually matched to the client flyer: deep navy typography and actions, a pale blue-white canvas, and warm orange accents. The flyer is a flattened PDF, so the palette and type choices are close visual matches rather than extracted brand specifications.

Typography is loaded from [Google Fonts](https://fonts.google.com/): Nunito Sans for the rounded body and bold headings, with Caveat for small handwritten accents.

### Color guide

| CSS token | Hex | Use |
| --- | --- | --- |
| `--navy` | `#111A33` | Wordmark, headings, and primary actions |
| `--navy-hover` | `#091329` | Dark hover state |
| `--orange` | `#D18450` | Flyer-inspired fills and decorative details |
| `--orange-ink` | `#934B24` | Readable orange text accents |
| `--pale-blue` | `#E3F0FA` | Soft supporting surfaces |
| `--ink` | `#111A33` | Main text |
| `--muted` | `#42516A` | Supporting text and secondary labels |
| `--paper` | `#F5F9FD` | Page background |
| `--line` | `#D8E3ED` | Rules, borders, and dividers |
| `--white` | `#FFFFFF` | Text and controls on dark surfaces |

Background, font, and image variables are grouped alongside these colors in `src/App.css`. Orange text uses the darker `--orange-ink` token for contrast; the brighter `--orange` is reserved mainly for filled accents. The header uses a translucent page background.

### External assets

- Fonts: Nunito Sans and Caveat are requested from Google Fonts in `src/App.css`.
- Home photo: [Unsplash image](https://images.unsplash.com/photo-1552053831-71594a27632d), used in the landing-page hero.
- About photo: [Unsplash image](https://images.unsplash.com/photo-1601758228041-f3b2795255f1), used in the About page.

The photos are loaded from Unsplash at runtime. The flyer’s logo is embedded in the PDF rather than available as a standalone asset, so the site currently uses a text wordmark styled to match its heavy uppercase look. Replace it with the supplied vector or transparent logo file when available. The Contact page uses the phone, email, and Instagram details shown in the flyer; replace the externally hosted imagery with approved brand assets before launch if required.
