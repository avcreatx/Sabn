import { Hono } from 'hono'
import type { Child, FC } from 'hono/jsx'

export const Home = new Hono()

const styles = `
  * { box-sizing: border-box; margin: 0; font-family: 'Inter', sans-serif; }
  :root { color-scheme: dark; }
  body {
    min-height: 100vh;
    display: flex; flex-direction: column;
    background: #000; color: #e5e5e5;
  }
  main {
    position: relative; width: 100%; max-width: 1024px; margin: auto;
    display: flex; flex-direction: column; gap: 2rem;
    overflow: hidden; padding: 2.5rem 1rem;
  }

  .header { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1rem; }
  .logo { width: 2rem; height: 2rem; flex-shrink: 0; }
  .title {
    min-width: 0; font-size: 1.5rem; font-weight: 700; line-height: 1.1;
    background: linear-gradient(to right, #ff7d78, #9333ea);
    background-clip: text; -webkit-background-clip: text; color: transparent;
  }
  .title .unofficial { margin-left: 0.75rem; font-size: 0.875rem; font-weight: 400; color: #6b7280; text-transform: uppercase; -webkit-text-fill-color: #6b7280; }

  .badge-border {
    display: none; padding: 4px; border-radius: 0.25rem;
    background: linear-gradient(to right, #ef4444, #a855f7, #3b82f6);
    background-size: 400% 400%; animation: borderAnimation 3s linear infinite;
  }
  .badge-border span { display: block; border-radius: 0.25rem; padding: 0.125rem 0.375rem; font-size: 0.75rem; letter-spacing: 0.05em; text-transform: uppercase; color: #fff; }

  .grid { position: relative; display: grid; grid-template-columns: 1fr; gap: 0.5rem; }

  .card { display: block; border-radius: 0.5rem; padding: 1rem; text-decoration: none; transition: background 0.1s; }
  .card:hover { background: rgba(255, 255, 255, 0.05); }
  .card-body { display: flex; flex-direction: column; }
  .badge { align-self: flex-start; border-radius: 0.25rem; padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.025em; text-transform: uppercase; color: var(--tone); background: color-mix(in srgb, var(--tone) 15%, transparent); }
  .card-title { margin-top: 0.5rem; font-size: 1.25rem; font-weight: 700; color: #e5e5e5; }
  .card-desc { margin-top: 0.5rem; color: #737373; }
  .card-desc a { color: var(--tone); }
  .card-desc a:hover { text-decoration: underline; }

  .meteor {
    position: absolute; top: 0; width: 1px; height: 1px;
    transform: rotate(215deg); border-radius: 9999px;
    background: #64748b; box-shadow: 0 0 0 1px #ffffff10;
    animation: meteorAnimation 5s linear infinite;
  }
  .meteor::before {
    content: ''; position: absolute; top: 50%; transform: translateY(-50%);
    width: 50px; height: 1px; background: linear-gradient(90deg, #64748b, transparent);
  }

  @keyframes borderAnimation { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @keyframes meteorAnimation { 0% { transform: rotate(215deg) translateX(0); opacity: 1; } 70% { opacity: 1; } 100% { transform: rotate(215deg) translateX(-500px); opacity: 0; } }

  @media (min-width: 640px) {
    .logo { width: 3rem; height: 3rem; }
    .title { font-size: 2.25rem; }
    .title .unofficial { display: none; }
    .badge-border { display: block; }
    .card { padding: 2rem; }
    .card-title { font-size: 1.5rem; }
  }
  @media (min-width: 1280px) { .grid { grid-template-columns: 1fr 1fr; } }
`

const Meteors: FC<{ count: number }> = ({ count }) => (
  <>
    {Array.from({ length: count }, (_, idx) => (
      <span
        key={idx}
        class="meteor"
        style={{
          left: `${Math.floor(Math.random() * 800 - 400)}px`,
          animationDelay: `${(Math.random() * 0.6 + 0.2).toFixed(2)}s`,
          animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`
        }}
      />
    ))}
  </>
)

const TONES = { red: '#ef4444', green: '#22c55e', violet: '#8b5cf6', blue: '#3b82f6' } as const

const Card: FC<{
  badge: string
  tone: keyof typeof TONES
  title: string
  href?: string
  external?: boolean
  children?: Child
}> = ({ badge, tone, title, href, external, children }) => {
  const body = (
    <div class="card-body">
      <span class="badge" style={`--tone: ${TONES[tone]}`}>
        {badge}
      </span>
      <span class="card-title">{title}</span>
      <div class="card-desc">{children}</div>
    </div>
  )

  if (!href) return <div class="card">{body}</div>

  return (
    <a
      class="card"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {body}
    </a>
  )
}

const title = 'JioSaavn API'
const description =
  'JioSaavn API is an unofficial wrapper written in TypeScript for jiosaavn.com providing programmatic access to a vast library of songs, albums, artists, playlists, and more.'

// The page is static, so render it once at module load and serve the cached string on every request.
const page = `<!DOCTYPE html>${(
  <html lang="en">
    <head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charset="utf-8" />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://saavn.dev/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://saavn.dev/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/sumitkolhe/jiosaavn-api/main/assets/preview.jpg"
      />
      <meta
        property="twitter:image"
        content="https://raw.githubusercontent.com/sumitkolhe/jiosaavn-api/main/assets/preview.jpg"
      />
      <link
        rel="icon"
        type="image/x-icon"
        href="https://raw.githubusercontent.com/sumitkolhe/jiosaavn-api/main/assets/favicon.ico"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </head>
    <body>
      <main>
        <Meteors count={15} />

        <header class="header">
          <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#ff7d78"
              d="M3.172 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.172 8.535C4.343 22 6.229 22 10 22h3.376A4.25 4.25 0 0 1 17 16.007V12.25a2.25 2.25 0 0 1 4.5 0a.75.75 0 0 0 .5.707V12c0-4.714 0-7.071-1.172-8.536C19.657 2 17.771 2 14 2h-4C6.229 2 4.343 2 3.172 3.464"
              opacity=".5"
            />
            <path
              fill="#ff7d78"
              fill-rule="evenodd"
              d="M8.25 12a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m11-.5a.75.75 0 0 1 .75.75a2.25 2.25 0 0 0 2.25 2.25a.75.75 0 0 1 0 1.5a3.734 3.734 0 0 1-2.25-.75v5a2.75 2.75 0 1 1-1.5-2.45v-5.55a.75.75 0 0 1 .75-.75m-.75 8.75a1.25 1.25 0 1 0-2.5 0a1.25 1.25 0 0 0 2.5 0"
              clip-rule="evenodd"
            />
          </svg>
          <p class="title">
            JioSaavn API<span class="unofficial">Unofficial</span>
          </p>
          <p class="badge-border">
            <span>Unofficial</span>
          </p>
        </header>

        <div class="grid">
          <Card badge="Get Started" tone="red" title="Explore the Docs" href="/docs">
            Check out the documentation to learn how to use the JioSaavn API.
          </Card>

          <Card
            badge="Open Source"
            tone="green"
            title="Open Source"
            href="https://github.com/sumitkolhe/jiosaavn-api"
            external
          >
            Saavn API is open-source. Check out the source code on github.
          </Card>

          <Card
            badge="Contribute"
            tone="violet"
            title="Get Involved"
            href="https://github.com/sumitkolhe/jiosaavn-api/issues"
            external
          >
            Encounter a bug or have a feature suggestion? Report it on GitHub or contribute by submitting a pull
            request.
          </Card>

          <Card badge="Contact" tone="blue" title="Sumit Kolhe">
            Have a question or need help? Reach out on{' '}
            <a style="--tone: #6366f1" href="https://github.com/sumitkolhe" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            ,{' '}
            <a
              style="--tone: #0ea5e9"
              href="https://twitter.com/thesumitkolhe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            , or{' '}
            <a style="--tone: #ec4899" href="https://t.me/sumitkolhe" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
            .
          </Card>
        </div>
      </main>
    </body>
  </html>
).toString()}`

Home.get('/', (c) => {
  c.header('Cache-Control', 'public, max-age=3600')

  return c.html(page)
})
