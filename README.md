# Task-management-FE

🚀 Task Management Frontend
A clean and responsive React + Vite + Typescript frontend for the Task Management application.

📂 Project Structure
```bash
task-management-FE/
├── public/                 # Static assets and index.html
│   ├── favicon.ico         # Favicon
│
├── src/                    # Source files
│   ├── assets/             # Images, icons, fonts
│   ├── components/         # Reusable React components
│   │   └── ui/
│   │       └── button.tsx
│   │       └── card.tsx
│   │       └── chart.tsx
│   │       └── dropdown-menu.tsx
│   │       └── input.tsx
│   │       └── toast.tsx
│   │   └── Navbar.tsx
│   │   └── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   │   └── Sidebar.tsx
│   │   └── TaskList.tsx
│   │   └── TaskForm.tsx
│   │   └── TaskFilter.tsx
│   │   └── TaskStats.tsx
│   ├── contexts/           # Context
│   │   ├── ThemeContext.tsx
│   ├── pages/              # Page-level components (Home, Tasks, etc.)
│   │   ├── Dashboard.tsx
│   │   ├── Loin.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   └── Tasks.tsx
│   ├── routes/             # React Router definitions
│   │   └── index.tsx
│   ├── services/           # API clients and wrappers
│   │   └── api.ts
│   ├── hooks/              # Custom React hooks
│   │   └── useFilterdTasks.tsx
│   │   └── useTaskStatistics.tsx
│   ├── context/            # Context providers
│   │   └── ThemeContext.tsx
│   ├── store/              # Redux store
│   │   └── slices
│   ├── lib/                # Utility functions and types
│   └── main.tsx            # Vite entry point
│   └── App.tsx             # Route entry point
│   └── index.css           # Vite entry point
├── index.html              # Project Entery Point
├── .env.example            # Environment variable example
├── tailwind.config.ts      # Tailwind CSS config
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
├── package.json
└── README.md               # Project documentation

# Clone the repository
    git clone https://github.com/<your-username>/task-management-FE.git
    cd task-management-FE
# Install dependencies
    npm install
# Environment Variables
    cp .env.example .env
# Run the development server
    npm run dev
    The app will open at http://localhost:5173.
```
# 🎨 Screenshots

# Register Screen:-
![image](https://github.com/user-attachments/assets/ba2a295a-9231-43ea-89ec-4c7fcdd350a3)

# Login Screen:-
![image](https://github.com/user-attachments/assets/e5f65e5f-1377-4168-8d4a-3319b76d8678)

# Dashboard Screen:-
![image](https://github.com/user-attachments/assets/f608cb13-5c92-443e-bbba-874946a510b4)

# Dashboard Screen:-
![image](https://github.com/user-attachments/assets/ff226b16-0a78-43ba-bde5-7fa5753995c0)

# Dark Theme Screen:-
![image](https://github.com/user-attachments/assets/87def890-7a6e-4328-8a0f-9ba496488fd0)

# Task-list Screen:-
![image](https://github.com/user-attachments/assets/95f17b29-180f-485e-90a6-9487e2653ce3)

# Task-list With Filter Screen:-
![image](https://github.com/user-attachments/assets/1cdf4f41-d364-4ef6-bbf6-986b088b1668)

# Create Task Screen:-
![image](https://github.com/user-attachments/assets/c700d579-a405-43b2-98e4-baba6ec426ec)
