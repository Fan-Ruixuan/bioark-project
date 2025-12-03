# Genetic Innovation - Product Management Portal

##  Live Demo
**Experience the fully functional portal here:**
**[👉 Click to Open Live Deployment](https://your-vercel-link.vercel.app)** 
*(请在部署后替换此链接)*

**Key Feature to Test Immediately:**
1. **User Mode**: 
    Browse products as a normal visitor.
2. **Admin Mode**: 
    Click the **"Switch to Admin"** button on the top-right. Instantly, toggle switches appear on product and service cards, allowing you to control their visibility on the homepage and in specific sections in real-time.

## Project Overview
    This project is a complete rebuild and enhancement of the product showcase homepage for **Genetic Innovation** (branded as *"Innovative seed on board"*). Developed as a technical assessment within a tight timeline, it successfully evolved from a static layout into a fully **dynamic, self-manageable product portal**.

    The core achievement is the implementation of a **dual-mode "User/Admin" interface**, transforming a simple display page into a lightweight Content Management System (CMS). This allows non-technical administrators to control the website's content directly from the frontend, perfectly aligning with real-world business needs.

## All Requirements Met & Exceeded

| Requirement | Implementation & Highlights |
| **1. Optimized Featured Products Display** |
Implemented an **interactive carousel with thumbnail navigation** instead of a basic grid. It features smooth transitions, integrated admin controls, and solves the browsing efficiency issue for large product catalogs. |
| **2. Scalable Display for Numerous Products** | 
The carousel intelligently **only displays products flagged for the homepage** by the admin. This serverless filtering mechanism ensures the interface remains clean regardless of total product count. |
| **3. Dedicated Gene Editing Products Section** | 
Each product can be individually toggled to appear in the **"Precision Editing Tools"** section, demonstrating precise categorical control. |
| **4. Manageable Services Section** | 
Service visibility on the homepage is fully controllable via toggle switches, applying the same consistent management logic as products. |
| **5. Grayed-out Reagents Section** | 
A dedicated **"Reagents & Chemicals"** area is displayed in a disabled, grayed-out state as specified, with a clear "Coming Soon" indicator. |

## Tech Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Persistence**: Browser LocalStorage
- **Deployment**: Vercel

## Architecture Overview
This project employs a **client-side state-driven, dual-mode architecture** to fulfill the requirement for a dynamic, self-manageable portal. The design revolves around two core concepts:

1.  **Centralized State Management**: All product and service visibility states are managed at the application's root (`app/page.tsx`) using React hooks. This single source of truth is synchronized with the browser's `localStorage` for persistence and is propagated down to all UI components (like the `ProductCarousel` or grid cards).
2.  **Presentation-Abstraction Layer**: The UI cleanly separates the **Presentation Layer** (dumb, reusable components like `ProductCard`) from the **Abstraction Layer** (smart, stateful page logic). This allows the admin control logic to be seamlessly injected into different views (carousel vs. grid) without duplicating code.

This architecture ensures that the "User" and "Admin" modes are merely two different presentations of the same underlying state, making the system both powerful and maintainable.

## Deep Dive: Critical Challenges & Solutions
This project's value lies not just in the final UI, but in navigating and solving complex frontend architectural challenges.

## Challenge 1: State Management & Data Persistence Conflict

*   **The Problem**: The most intricate issue was **state "flash and reset."** After configuring products in Admin Mode, the changes would vanish on page refresh, or the UI would flicker. The browser's `localStorage` was saving data, but the application's initialization logic was flawed.
*   **Root Cause & Investigation**: Through strategic `console.log` debugging and analyzing the component lifecycle, I identified a **race condition**. The component was initializing with hardcoded data, then immediately overwritten by `useEffect` loading `localStorage`, which sometimes contained stale or incomplete data.
*   **The Solution**: I refactored the state initialization to have a **single source of truth**. The `useEffect` hook was made responsible for all initial data loading, first checking for saved admin preferences, and only falling back to default data if none existed. This created a predictable and stable data flow.

## Challenge 2: Ensuring Third-Party Resource Reliability

*   **The Problem**: Product images from Unsplash would randomly fail to load (404 errors), creating a broken user experience. Initially, it appeared to be a code error.
*   **Root Cause & Investigation**: Using the browser's **Developer Tools Network Tab**, I confirmed the 404 status codes for specific image URLs. The issue was not our code, but unstable external links—a common yet critical pitfall for live demos.
*   **The Solution**: I replaced all critical image URLs with a curated set of **verified, stable links** from the same CDN. For a production system, the correct solution would be to host images directly or use a dedicated, reliable asset management service.

## Challenge 3: Balancing Admin Power with User Experience

*   **The Problem**: The requirement asked for a "show/hide" control, but a simple toggle that makes products disappear could confuse admins ("Where did my product go?").
*   **The Solution**: I designed the system with **clear visual feedback**:
    1.  A prominent **"Reset Display"** button in Admin Mode to instantly recover all products.
    2.  Logical filtering: Hidden products are not deleted; they simply don't appear in the main "Featured" carousel but remain in their respective category lists for re-activation.
    3.  This approach mirrors professional CMS UX, empowering admins without fear of making irreversible mistakes.

## Challenge 4: UI Fidelity & Interaction Design

*   **The Problem**: The original website used a sleek, arrow-based product carousel. A simple grid, while functional, would not meet the interaction standard.
*   **The Solution**: I built a custom `ProductCarousel` component from scratch. It includes:
    *   Previous/Next buttons with hover effects.
    *   A dynamic thumbnail strip for direct navigation.
    *   Smooth CSS transitions for sliding.
    *   **Most importantly, the admin toggle switches were embedded directly into the carousel view**, maintaining full functionality regardless of the UI presentation. This shows that user experience and admin functionality are not mutually exclusive.



## Getting Started Locally
1.  **Clone and Install**
    ```bash
    git clone https://github.com/your-username/bioark-project.git
    cd bioark-project
    npm install
    ```
2.  **Run the Development Server**
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

bioark-project/
├── app/ # Next.js 14 App Router (核心应用层)
│ ├── page.tsx # 主页面，包含所有状态管理、双模式逻辑与布局
│ ├── layout.tsx # 根布局组件
│ └── globals.css # 全局样式与 Tailwind 指令
├── components/ # 可复用 UI 组件层
│ └── ProductCarousel.tsx # 核心交互组件：轮播器（集成缩略图、管理开关）
├── lib/ # 核心业务逻辑与数据层
| ├── types.ts # 统一的 TypeScript 类型定义 (Product, Service 接口)
│ └── data.ts # TypeScript 类型定义与产品/服务的初始数据模型
├── public/ # 静态资源目录
│ └── ... # 图片等资源文件
├── next.config.ts # Next.js 配置文件
└── package.json # 项目依赖与脚本