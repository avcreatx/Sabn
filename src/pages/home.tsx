import { Hono } from 'hono'

export const Home = new Hono()

export const Meteors = ({ number }: { number: number }) => {
  return (
    <>
      {Array.from({ length: number || 20 }, (_, idx) => (
        <span
          key={idx}
          class="meteor animate-[meteorAnimation_3s_linear_infinite] absolute h-1 w-1 rounded-[9999px] shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            top: 0,
            left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
            animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`
          }}
        />
      ))}
    </>
  )
}

// Floating Music Instruments Component
export const FloatingMusicBackground = () => {
  const instruments = [
    { icon: '🎵', size: 'text-4xl', delay: '0s', duration: '12s', top: '15%', left: '10%' },
    { icon: '🎸', size: 'text-5xl', delay: '2s', duration: '15s', top: '45%', left: '85%' },
    { icon: '🎧', size: 'text-4xl', delay: '4s', duration: '18s', top: '75%', left: '20%' },
    { icon: '🎶', size: 'text-3xl', delay: '1s', duration: '14s', top: '25%', left: '75%' },
    { icon: '🎤', size: 'text-5xl', delay: '5s', duration: '16s', top: '65%', left: '80%' },
    { icon: '🎹', size: 'text-4xl', delay: '3s', duration: '20s', top: '80%', left: '60%' },
  ]

  return (
    <div class="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 min-h-screen">
      {instruments.map((inst, idx) => (
        <div
          key={idx}
          class={`${inst.size} absolute opacity-15 blur-[1px] animate-[floatAnimation_linear_infinite]`}
          style={{
            top: inst.top,
            left: inst.left,
            animationDelay: inst.delay,
            animationDuration: inst.duration,
          }}
        >
          {inst.icon}
        </div>
      ))}
    </div>
  )
}

Home.get('/', (c) => {
  const title = 'JioSaavn API'
  const description =
    'JioSaavn API is an unofficial wrapper written in TypeScript for jiosaavn.com providing programmatic access to a vast library of songs, albums, artists, playlists, and more.'

  return c.html(
    <html>
      <head>
        <title>JioSaavn API</title>
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Orbitron:wght@700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            * { font-family: 'Inter', sans-serif; } 
            .stylish-blink { font-family: 'Orbitron', sans-serif; }
            @keyframes borderAnimation {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes meteorAnimation {
              0% { transform: rotate(215deg) translateX(0); opacity: 1; }
              70% { opacity: 1; }
              100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
            }
            @keyframes textBlink {
              0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(168,85,247,0.6), 0 0 20px rgba(168,85,247,0.4); }
              50% { opacity: 0.4; text-shadow: 0 0 2px rgba(168,85,247,0.1); }
            }
            @keyframes floatAnimation {
              0% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-25px) rotate(10deg); }
              100% { transform: translateY(0px) rotate(0deg); }
            }
            .meteor::before {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 50px;
              height: 1px;
              background: linear-gradient(90deg, #64748b, transparent);
            }
            .animate-meteor-effect {
              animation-name: meteorAnimation;
            }`
          }}
        />
      </head>
      <body class="bg-black mx-auto md:min-h-screen max-w-screen-lg flex flex-col relative overflow-x-hidden">
        {/* Floating Background Effects */}
        <FloatingMusicBackground />
        
        <main class="mx-auto my-auto flex flex-col space-y-8 px-4 pb-8 md:py-10 relative overflow-y-hidden overflow-x-hidden z-10 w-full">
          <Meteors number={15} />

          <div class="flex flex-row items-center space-x-4 ml-6">
            <svg class="sm:h-12 sm:w-12 h-8 w-8 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
            <p class="text-2xl md:text-4xl text-transparent font-bold leading-none bg-clip-text bg-gradient-to-r from-[#ff7d78] to-purple-600">
              JioSaavn API
              <span class="uppercase text-sm ml-3 text-gray-500 font-normal sm:hidden">Unofficial</span>
            </p>
            <p class="hidden sm:block animate-[borderAnimation_3s_linear_infinite] rounded bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
              <span class="block rounded px-1.5 py-0.5 text-xs text-white uppercase tracking-wider">Unofficial</span>
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2 sm:gap-0 relative grid-flow-row">
            <a
              target="_blank"
              class="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4"
              href="/docs"
            >
              <div class="flex flex-col">
                <span class="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-red-500 text-red-500">
                  Get Started
                </span>
                <span class="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">Explore the Docs</span>
                <div class="text-neutral-500 mt-2">
                  Check out the documentation to learn how to use the JioSaavn API.
                </div>
              </div>
            </a>

            <a
              target="_blank"
              class="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4"
              href="https://github.com/sumitkolhe/jiosaavn-api"
            >
              <div class="flex flex-col">
                <span class="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-green-500 text-green-500">
                  Open Source
                </span>
                <span class="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">Open Source</span>
                <div class="text-neutral-500 mt-2">Saavn API is open-source. Check out the source code on github.</div>
              </div>
            </a>

            <a
              target="_blank"
              class="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4"
              href="https://github.com/sumitkolhe/jiosaavn-api/issues"
            >
              <div class="flex flex-col">
                <span class="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-violet-500 text-violet-500">
                  Contribute
                </span>
                <span class="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">Get Involved</span>
                <div class="text-neutral-500 mt-2">
                  Encounter a bug or have a feature suggestion? Report it on GitHub or contribute by submitting a pull
                  request.
                </div>
              </div>
            </a>

            <div class="p-4 sm:p-8 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-4">
              <div class="flex flex-col">
                <span class="text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-blue-500 text-blue-500">
                  Developer
                </span>
                <span class="text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2">
                  <span class="stylish-blink text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-[textBlink_2s_linear_infinite]">Mirrykal</span> & Sumit Kolhe
                </span>
                <div class="text-neutral-500 mt-3 flex flex-col space-y-2">
                  {/* YouTube Button */}
                  <a
                    href="https://youtube.com/@mirrykal"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center space-x-2 bg-red-600/10 border border-red-600/30 hover:bg-red-600/20 text-red-400 px-3 py-1.5 rounded-md duration-150 max-w-fit"
                  >
                    <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span class="text-sm font-semibold">@mirrykal</span>
                  </a>

                  {/* Facebook Button */}
                  <a
                    href="https://fb.me/arun.x76"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center space-x-2 bg-blue-600/10 border border-blue-600/30 hover:bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded-md duration-150 max-w-fit"
                  >
                    <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span class="text-sm font-semibold">Arun Kumar</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
})
