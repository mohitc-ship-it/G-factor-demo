# Deployment Instructions

Your project has been successfully built and is ready for deployment! 🚀

The production build is located in the `dist` directory.

## Option 1: Deploy to Netlify (Recommended for ease)

1.  **Sign Up/Log In**: Go to [Netlify](https://www.netlify.com/) and log in.
2.  **Drag and Drop**:
    *   Go to the "Sites" tab.
    *   Drag the `dist` folder from your project directory (`frontend/dist`) and drop it into the "Want to deploy a new site without connecting to Git?" area.
3.  **Done!**: Your site will be live in seconds.

## Option 2: Deploy to Vercel

1.  **Install Vercel CLI** (if not installed):
    ```bash
    npm i -g vercel
    ```
2.  **Deploy**:
    Run the following command in your terminal:
    ```bash
    vercel
    ```
3.  **Follow Prompts**:
    *   Set up and deploy? [Y]
    *   Which scope? [Select your account]
    *   Link to existing project? [N]
    *   Project name? [frontend]
    *   Directory? [./] (default is fine)
    *   Want to modify settings? [N]
    
    Vercel will detect it's a Vite project and deploy it automatically.

## Option 3: GitHub Pages

1.  **Update `vite.config.ts`**:
    Add `base: '/<REPO_NAME>/'` to your config.
2.  **Push to GitHub**.
3.  **Configure Pages**: Go to Repo Settings -> Pages -> Source: GitHub Actions (or deploy from branch if you set up a workflow).

## Local Preview

You can preview the production build locally at any time by running:
```bash
npm run preview
```
