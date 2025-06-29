
# 🩺 Vocare WebApp – Fullstack Challenge

A full-stack calendar-based appointment management system built as a prototype for the **Vocare Fullstack Developer Challenge**.  
This solution allows healthcare staff to view, create, edit, and filter appointments across **monthly**, **weekly**, and **list** views.

## 🌐 Live Preview

🔗 [Deployed on Vercel](https://vocare-webapp-qq3m.vercel.app/)  


## 🧱 Tech Stack

- **Next.js** (App Router)
- **TypeScript** (Fully typed)
- **TailwindCSS**
- **shadcn/ui** (UI components like buttons, cards, modal)
- **Supabase** (Database and API)


## ✅ Features Implemented

- ✅ **Monthly Calendar View**
- ✅ **Weekly Calendar View (6:00–22:00)**
- ✅ **Appointment List View**
- ✅ **Create / Edit / Delete appointments**
- ✅ **Supabase integration** for all CRUD operations
- ✅ **Filtering appointments** by category, patient, and date range
- ✅ **Responsive design** for mobile, tablet, and desktop


## 🔧 Features In Progress / Planned

- 🔄 **Hover Cards** using `shadcn/ui` to preview appointment info
- 🧩 **Modal validation** for creating/editing appointments
- 🔁 **Week and month navigation** (prev/next buttons)
- 📡 **Real-time Supabase sync** via `supabase.channel()`
- 🧪 **Unit testing** with Vitest or Jest


## 🗃 Supabase Integration

This app connects to Supabase for:

- 📥 Fetching appointments from `appointments` table
- ➕ Creating new appointments via form/modal
- 🗑️ Deleting appointments via `deleteAppointment.ts`
- 🎯 Filtering by category or patient
- 🔐 Using `lib/supabaseClient.ts` for client setup

💡 The schema matches the official challenge schema and is respected throughout.


## 📁 Folder Structure

```
src/
├── app/                   # Next.js layout & entry page
├── modules/
│   ├── calendar/          # Weekly and monthly views
│   └── appointment/       # Appointment logic and components
├── shared/
│   ├── lib/               # Supabase & utility functions
│   ├── types/             # Fully defined TypeScript interfaces
│   └── ui/                # Shared UI components
```


## 🚀 Getting Started

### 1. Clone this repo

```bash
git clone https://github.com/rafeyshah/vocare-webapp.git
cd vocare-webapp
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Supabase (Optional)

> By default, it uses the shared Supabase DB.  
> For custom setup, edit `lib/supabaseClient.ts`.

```ts
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

### 4. Run the app locally

```bash
npm run dev
```


## 📝 TypeScript Notes

- Project now uses `strict` types (no `any` or `unknown`)
- All appointments are typed with:
  ```ts
  Appointment {
    id: string;
    title: string;
    start: string;
    end: string;
    ...
  }
  ```
- Found in `shared/types/appointment.ts`, `patient.ts`, and `category.ts`


## 🤝 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)
- [TailwindCSS](https://tailwindcss.com/)
- Vocare Fullstack Challenge Team


## 📬 Contact

Developed by **Rafey Shah**  
📧 [dev.abdulrafey@gmail.com](mailto:rafeyshah@gmail.com)  
🌐 [github.com/rafeyshah](https://github.com/rafeyshah)
