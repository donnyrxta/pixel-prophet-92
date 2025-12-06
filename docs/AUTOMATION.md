# Portfolio Automation System

## Overview
This project uses a custom automation script (`scripts/sync-portfolio.mjs`) to simplify the management of portfolio case studies. Instead of manually writing JSON/TypeScript code for every new project, you can simply manage the file system, and the script does the rest.

## Directory Structure
The system relies on a specific folder structure in `public/images/portfolio/`:

```text
public/images/portfolio/
├── branding/       # Images for Branding projects
├── printing/       # Images for Printing projects
├── signage/        # Images for Signage projects
└── digital/        # Images for Digital Marketing projects
```

## The "Drop & Sync" Workflow

### 1. Adding a New Project
To add a new project to your portfolio:
1.  **Name your image file** clearly. The filename will be used as the project title.
    *   `corporate-gazebo.jpg` -> Title: **"Corporate Gazebo"**
    *   `school-diaries-2025.jpg` -> Title: **"School Diaries 2025"**
2.  **Move the image** into the appropriate category folder (e.g., `public/images/portfolio/printing/`).

### 2. Update the Website
Open your terminal and run:

```bash
npm run sync-portfolio
```

### 3. What the Script Does
Values are auto-generated as follows:
*   **ID**: Auto-incremented based on the highest existing ID.
*   **Title**: Generated from the filename.
*   **Category**: Determined by the parent folder name.
*   **Image Path**: The relative path to your new file.
*   **Descriptions**: A default placeholder description is added.

### 4. Customizing Details
After running the script, open `src/data/portfolio.ts`. You will see your new entries appended to the list. You can now edit the `client`, `description`, and `results` fields to match the specific project details.

```typescript
// Example of an auto-generated entry you might edit:
{
    id: 15,
    title: "School Diaries 2025",
    client: "Valued Client",             // <--- Edit this
    category: "Printing",
    image: "/images/portfolio/printing/school-diaries-2025.jpg",
    description: "High-quality School Diaries 2025 project...", // <--- Edit this
    results: [ ... ]
}
```

## Troubleshooting
*   **Duplicate Images**: The script checks if an image path already exists in `portfolio.ts`. It will NOT add duplicates.
*   **Supported Formats**: `.jpg`, `.jpeg`, `.png`, `.webp`.

## Verification & Testing
To safely test that the automation is working without affecting your live data:

1.  **Create a Dummy Image**:
    Create a temporary file `public/images/portfolio/printing/test-image.jpg`.
2.  **Run the Script**:
    ```bash
    npm run sync-portfolio
    ```
3.  **Verify**:
    Open `src/data/portfolio.ts` and scroll to the bottom. You should see a new entry with the title "Test Image".
4.  **Cleanup**:
    *   Delete the `test-image.jpg` file.
    *   Delete the new entry from `src/data/portfolio.ts`.
