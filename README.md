# Genetic Innovation - Product Management Portal / 产品管理门户

## Project Overview / 项目概述
    This project is a complete rebuild and enhancement of the product showcase homepage for Genetic Innovation (branded as "Innovative seed on board"). 
    
    Developed as a technical assessment within a tight timeline, it successfully evolved from a static layout into a fully dynamic, self-manageable product portal.

    The core achievement is the implementation of a dual-mode "User/Admin" interface, transforming a simple display page into a lightweight Content Management System (CMS).
    
    This allows non-technical administrators to control the website's content directly from the frontend, perfectly aligning with real-world business needs.

## Getting Started Locally / 本地运行
1.  **Clone and Install / 克隆并安装**
    ```bash
    git clone https://github.com/Fan-Ruixuan/bioark-project.git
    cd bioark-project
    npm install
    ```
2.  **Run the Development Server / 启动开发服务器**
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

**Key Feature to Test Immediately / 核心功能体验:**
1. **User Mode / 用户模式**: 
    - Browse products as a normal visitor.
2. **Admin Mode / 管理员模式**: 
    - Click the **"Switch to Admin"** button on the top-right. 
    - toggle switches appear on product and service cards.
    - control visibility in real-time.

## Requirements & Optimization / 需求 & 优化

- **1. Optimized Featured Products Display** 
Implemented an **interactive carousel with thumbnail navigation** instead of a basic grid. It features smooth transitions, integrated admin controls, and solves the browsing efficiency issue for large product catalogs. |
- **2. Scalable Display for Numerous Products** 
The carousel intelligently **only displays products flagged for the homepage** by the admin. This serverless filtering mechanism ensures the interface remains clean regardless of total product count. |
- **3. Dedicated Gene Editing Products Section**  
Each product can be individually toggled to appear in the **"Precision Editing Tools"** section, demonstrating precise categorical control. 
- **4. Manageable Services Section**  
Service visibility on the homepage is fully controllable via toggle switches, applying the same consistent management logic as products. 
- **5. Grayed-out Reagents Section**  
A dedicated **"Reagents & Chemicals"** area is displayed in a disabled, grayed-out state as specified, with a clear "Coming Soon" indicator. 

##  Live Demo / 在线演示
**Experience the fully functional portal here:**
**[👉 Click to Open Live Deployment](https://bioark-project.vercel.app)** 

> **访问说明**
> 本项目已通过 Vercel 平台自动部署。由跨地域网络延迟，从中国内地网络直接访问生成的预览网址，可能会产生连接超时的情况。

**可通过以下方法顺利查看项目：**

1.  **Local Development / 本地运行** 
    - 按照上方的 [Getting Started Locally](#-getting-started-locally) 步骤，在本地开发环境中正常启动项目。

2.  **Feature Demo Video / 观看功能演示视频**
    - 通过网盘分享的文件：网页优化演示.mp4
    - **链接: https://pan.baidu.com/s/13EghgZBDfW2odJftVerLhA?pwd=5idp 提取码: 5idp（无需提取码直接进入即可）**

   *麻烦您啦~建议通过本地运行或观看视频了解项目*



## Tech Stack / 技术栈
- **Framework**: Next.js 14  + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Persistence**: Browser LocalStorage
- **Deployment**: Vercel

## Architecture / 架构设计
 **client-side state-driven, dual-mode architecture** 

1.  **Centralized state management at root level (app/page.tsx)**
2.  **Synchronized with localStorage for persistence**
3.  **Clean separation** : Presentation Layer (dumb components) vs Abstraction Layer (smart page logic)
4.  **User/Admin modes as two presentations of the same underlying state**

This architecture ensures the system is both powerful and maintainable, with admin functionality seamlessly integrated into different view modes

## Technical Challenges & Solutions / 问题与解决方案
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

##  Quick Validation / 快速验证

- Test data is pre-configured in [`/lib/data.ts`](./lib/data.ts) ：
- 测试数据已在 /lib/data.ts 中预设：

### Products / 产品数据

- **Visible on homepage (should appear):**
    - `"CRISPR-Cas9 Kit"` (显示)
- **Hidden Products (should be hidden):** 
    - `"Gene Sequencing Kit"` (隐藏)
- **`showOnHomepageReagent: false`** 所有产品的此字段均已预设为 `false`，为未来“Reagent”栏目预留。

### Services / 服务数据
在同一个文件中，服务数据也遵循同样的规则：
- **`showOnHomepage: true`** 的服务会出现在首页 **“Services”** 区域。
    - `"Polymerase Enzyme"` (显示)
- **`showOnHomepage: false`** 的服务不会在首页显示。
    - `"RNA Extraction Kit"` (隐藏)

### To verify / 验证方法
1.  Run the project locally（ [Getting Started Locally](#-getting-started-locally)）。
2.  Refresh homepage and check Featured Products & Services sections
3.  Match with the list above



## 📁 Project Structure / 项目结构

**bioark-project/**
- **`app/`** – Next.js应用核心（页面与路由）
  - `page.tsx` – **首页 - 实现动态筛选的关键文件**
  - `layout.tsx`
  - `globals.css`
- **`components/`** – 可复用UI组件
  - `ProductCarousel.tsx` – 产品轮播组件
- **`lib/`** – **【核心修改】业务逻辑与数据层**
  - `types.ts` – **类型定义 - 扩展了Product/Service接口**
  - `data.ts` – **模拟数据 - 设置了首页显示开关**
- **`public/`** – 静态资源（图片、字体等）
- `next.config.ts` – Next.js配置文件
- `package.json` – 项目依赖与脚本
- `README.md` – 本文档