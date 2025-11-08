# Web Applications Collection

This repository contains a collection of web-based applications for various utilities.

## Applications

### 1. Prayer Times (Namaz Vakti)
- **Namaz.html** - Turkish version (NAMAZ VAKTİ)
- **Namaz_az.html** - Azerbaijani version (NAMAZ VAXTI)

Interactive prayer time applications that display Islamic prayer times based on location. Features include:
- Real-time prayer schedule
- Current and upcoming prayer highlighting
- Responsive design for mobile and desktop
- Dark theme optimized for readability

### 2. Currency Exchange Rates
- **currency.html** - Live currency exchange rates (Valyuta Kursları)

Displays current exchange rates from the Central Bank of Azerbaijan (CBAR). Features:
- Daily updated currency data
- Multiple currency support
- Clean, modern interface
- Light/Dark theme toggle

### 3. Islamic Calligraphy
- **logo.html** - Glowing Basmalah display

Displays the Islamic Basmalah (بسم الله الرحمن الرحيم) with elegant glowing effects.

## Data Files

### Currency Data (XML)
The repository includes XML files with currency exchange rate data:
- `YYYY-MM-DD.xml` - Daily currency rates from CBAR

These files are automatically updated via GitHub Actions workflow that:
- Runs daily at 06:00 UTC
- Fetches the latest 3 days of currency data
- Removes older data files automatically

## Technical Details

### Currency Data Management
- **Workflow**: `.github/workflows/fetch-currencies.yml`
- **Script**: `.github/scripts/manage-currencies.php`
- **Data Source**: https://cbar.az/currencies/

The automated workflow ensures currency data stays current without manual intervention.

## Usage

All HTML files are standalone and can be opened directly in a web browser or hosted on any web server. No build process or dependencies are required.

## File Handling
- **download.php** - Utility script for file downloads

## Languages
This repository contains applications in multiple languages:
- Turkish (tr)
- Azerbaijani (az)
- German (de)

## Repository Note

⚠️ **Note**: The repository name "TabellenkalkulationWebView" (Spreadsheet WebView) is historical and does not accurately reflect the current content. The repository now contains prayer times, currency rates, and Islamic calligraphy applications rather than spreadsheet functionality.
