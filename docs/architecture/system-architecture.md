# System Architecture

This document provides a comprehensive overview of the D-VOID Portfolio system architecture.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        MobileBrowser[Mobile Browser]
    end

    subgraph "Next.js Application"
        AppRouter[App Router]

        subgraph "Pages"
            Home[Home Page]
            About[About Page]
            Projects[Projects Page]
            CaseStudies[Case Studies]
            Contact[Contact Page]
            Uses[Uses Page]
        end

        subgraph "Components"
            Hero[Reality Compiler Hero]
            Navigation[Navigation]
            Footer[Footer]
            PinnedSections[Pinned Sections]
            UI[UI Components]
        end

        subgraph "Content System"
            MDXLoader[MDX Loader]
            ContentFiles[MDX Files]
        end
    end

    subgraph "Static Assets"
        Public[Public Directory]
        Fonts[Geist Fonts]
        Images[Images/3D Models]
    end

    subgraph "External Services"
        Vercel[Vercel Edge Network]
    end

    Browser --> AppRouter
    MobileBrowser --> AppRouter

    AppRouter --> Home
    AppRouter --> About
    AppRouter --> Projects
    AppRouter --> CaseStudies
    AppRouter --> Contact
    AppRouter --> Uses

    Home --> Hero
    Home --> PinnedSections

    AppRouter --> Navigation
    AppRouter --> Footer
    AppRouter --> UI

    CaseStudies --> MDXLoader
    MDXLoader --> ContentFiles

    AppRouter --> Public
    Public --> Fonts
    Public --> Images

    AppRouter --> Vercel
```

## Component Architecture

```mermaid
graph LR
    subgraph "Layout Components"
        RootLayout[Root Layout]
        SmoothScroll[Smooth Scroll Provider]
        Nav[Navigation]
        FooterComp[Footer]
    end

    subgraph "Hero System"
        HeroMain[Reality Compiler Hero]
        HeroClient[Client Wrapper]
        HeroScene[3D Scene]
        HeroFallback[Static Fallback]
        HeroLoader[Correlation Loader]
    end

    subgraph "Section Components"
        PinnedSection[Pinned Section]
        SWMSOverview[SWMS Overview]
        EcoOpsOverview[EcoOps Overview]
    end

    subgraph "UI Library"
        Button[Button]
        Card[Card]
        Badge[Badge]
        Input[Input]
        Select[Select]
        Dropdown[Dropdown Menu]
    end

    RootLayout --> SmoothScroll
    SmoothScroll --> Nav
    SmoothScroll --> FooterComp

    HeroMain --> HeroClient
    HeroClient --> HeroScene
    HeroClient --> HeroFallback
    HeroClient --> HeroLoader

    PinnedSection --> SWMSOverview
    PinnedSection --> EcoOpsOverview
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant NextJS as Next.js Server
    participant MDX as MDX Content
    participant R3F as React Three Fiber

    User->>Browser: Navigate to page
    Browser->>NextJS: Request page

    alt Home Page
        NextJS->>NextJS: Load Hero (dynamic import, SSR disabled)
        NextJS-->>Browser: Hero with CorrelationLoader then DottedGridDemo
    else Case Study Page
        NextJS->>MDX: Fetch MDX content
        MDX-->>NextJS: Parsed content + frontmatter
        NextJS-->>Browser: Rendered page
    else Contact Page
        NextJS-->>Browser: Contact page (email links only)
    end

    Browser-->>User: Display page
```

## MDX Content Pipeline

```mermaid
flowchart LR
    subgraph "Content Source"
        MDXFile[MDX File]
        Frontmatter[Frontmatter]
        Content[Markdown Content]
    end

    subgraph "Processing"
        GrayMatter[gray-matter]
        ReadingTime[reading-time]
        MDXCompiler[MDX Compiler]
    end

    subgraph "Output"
        Meta[Metadata Object]
        ReactComp[React Component]
    end

    MDXFile --> GrayMatter
    GrayMatter --> Frontmatter
    GrayMatter --> Content

    Frontmatter --> Meta
    Content --> ReadingTime
    Content --> MDXCompiler
    ReadingTime --> Meta
    MDXCompiler --> ReactComp
```

## 3D Hero System Architecture

```mermaid
flowchart TB
    subgraph "Entry Point"
        HeroPage[Hero Component]
    end

    subgraph "Client Detection"
        ClientWrapper[Client Wrapper]
        CheckDevice{Device Check}
        IsMobile[Mobile/Touch]
        IsDesktop[Desktop]
        ReducedMotion[Reduced Motion]
    end

    subgraph "Rendering"
        DottedGrid[DottedGridDemo - Three.js + SVG Grid]
        StaticCSS[Static CSS Fallback]
    end

    subgraph "Loading States"
        SuspenseBoundary[Suspense Boundary]
        LoaderAnimation[Correlation Loader]
    end

    HeroPage --> ClientWrapper
    ClientWrapper --> CheckDevice

    CheckDevice -->|Mobile| IsMobile
    CheckDevice -->|Desktop| IsDesktop
    CheckDevice -->|prefers-reduced-motion| ReducedMotion

    IsMobile --> StaticCSS
    ReducedMotion --> StaticCSS
    IsDesktop --> SuspenseBoundary

    SuspenseBoundary --> LoaderAnimation
    SuspenseBoundary --> DottedGrid
```

## State Management

```mermaid
stateDiagram-v2
    [*] --> PageLoad
    PageLoad --> DetectingDevice
    DetectingDevice --> Desktop: No touch
    DetectingDevice --> Mobile: Touch detected
    DetectingDevice --> ReducedMotion: prefers-reduced-motion

    Desktop --> Loading3D
    Loading3D --> SceneReady: Assets loaded
    Loading3D --> Error3D: Load failed
    Error3D --> StaticFallback

    Mobile --> StaticFallback
    ReducedMotion --> StaticFallback

    SceneReady --> Interacting
    Interacting --> SceneReady

    StaticFallback --> [*]
    SceneReady --> [*]
```

## File System Structure

```mermaid
graph TB
    subgraph "Project Root"
        Root[dvoid/]
    end

    subgraph "Application"
        AppDir[app/]
        RoutesDir["(routes)/"]
        LayoutFile[layout.tsx]
        HomePage[page.tsx]
        GlobalCSS[globals.css]
        Sitemap[sitemap.ts]
    end

    subgraph "Components"
        CompDir[components/]
        HeroDir[hero/]
        LayoutDir[layout/]
        SectionsDir[sections/]
        UIDir[ui/]
        EcoOpsDir[ecoops/]
        DemoDir[demo/]
    end

    subgraph "Content"
        ContentDir[content/]
        CaseStudiesDir[case-studies/]
    end

    subgraph "Libraries"
        LibDir[lib/]
        MDXIndex[mdx/index.ts]
        Utils[utils.ts]
    end

    subgraph "Documentation"
        DocsDir[docs/]
        PlanningDir[.planning/]
    end

    subgraph "Config"
        PackageJSON[package.json]
        NextConfig[next.config.ts]
        TSConfig[tsconfig.json]
        BiomeJSON[biome.json]
    end

    Root --> AppDir
    Root --> CompDir
    Root --> ContentDir
    Root --> LibDir
    Root --> DocsDir
    Root --> PlanningDir

    AppDir --> RoutesDir
    AppDir --> LayoutFile
    AppDir --> HomePage
    AppDir --> GlobalCSS
    AppDir --> Sitemap

    RoutesDir --> AboutPage[about/]
    RoutesDir --> CaseStudiesPage[case-studies/]
    RoutesDir --> ContactPage[contact/]
    RoutesDir --> ProjectsPage[projects/]
    RoutesDir --> UsesPage[uses/]

    CompDir --> HeroDir
    CompDir --> LayoutDir
    CompDir --> SectionsDir
    CompDir --> UIDir
    CompDir --> EcoOpsDir
    CompDir --> DemoDir

    ContentDir --> CaseStudiesDir

    LibDir --> MDXIndex
    LibDir --> Utils

    Root --> PackageJSON
    Root --> NextConfig
    Root --> TSConfig
    Root --> BiomeJSON
```

## Security Architecture

```mermaid
flowchart TB
    subgraph "Request Flow"
        Request[Incoming Request]
        Proxy[Proxy Middleware]
        CSP[Content Security Policy]
        Headers[Security Headers]
        Response[Response]
    end

    subgraph "CSP Directives"
        DefaultSrc["default-src 'self'"]
        ScriptSrc["script-src 'self' 'unsafe-inline'"]
        StyleSrc["style-src 'self' 'unsafe-inline'"]
        ImgSrc["img-src 'self' data: blob:"]
        FontSrc["font-src 'self'"]
        ConnectSrc["connect-src 'self' https:"]
        FrameAncestors["frame-ancestors 'none'"]
    end

    subgraph "Security Headers"
        HSTS[Strict-Transport-Security]
        XFrame[X-Frame-Options]
        XContentType[X-Content-Type-Options]
        XSSProtection["X-XSS-Protection: 0"]
        ReferrerPolicy[Referrer-Policy]
    end

    Request --> Proxy
    Proxy --> CSP
    CSP --> Headers
    Headers --> Response

    CSP --> DefaultSrc
    CSP --> ScriptSrc
    CSP --> StyleSrc
    CSP --> ImgSrc
    CSP --> FontSrc
    CSP --> ConnectSrc
    CSP --> FrameAncestors

    Headers --> HSTS
    Headers --> XFrame
    Headers --> XContentType
    Headers --> XSSProtection
    Headers --> ReferrerPolicy
```

## Performance Optimization Strategy

```mermaid
flowchart LR
    subgraph "Code Splitting"
        DynamicImports[Dynamic Imports]
        LazyLoading[Lazy Loading]
        Suspense[Suspense Boundaries]
    end

    subgraph "Asset Optimization"
        ImageOpt[Next.js Image]
        FontOpt[Font Optimization]
        TreeShaking[Tree Shaking]
    end

    subgraph "Caching"
        StaticGen[Static Generation]
        EdgeCache[Edge Caching]
        BrowserCache[Browser Cache]
    end

    DynamicImports --> LazyLoading
    LazyLoading --> Suspense

    ImageOpt --> StaticGen
    FontOpt --> StaticGen
    TreeShaking --> StaticGen

    StaticGen --> EdgeCache
    EdgeCache --> BrowserCache
```

## Build Pipeline

```mermaid
flowchart LR
    subgraph "Development"
        DevCmd[bun dev]
        Turbopack[Turbopack]
        HotReload[Hot Reload]
    end

    subgraph "Build"
        BuildCmd[bun run build]
        TypeCheck[TypeScript Check]
        Lint[Biome Lint]
        Compile[Next.js Build]
    end

    subgraph "Output"
        Static[Static Files]
        Server[Server Components]
        Edge[Edge Functions]
    end

    DevCmd --> Turbopack
    Turbopack --> HotReload

    BuildCmd --> TypeCheck
    TypeCheck --> Lint
    Lint --> Compile

    Compile --> Static
    Compile --> Server
    Compile --> Edge
```
