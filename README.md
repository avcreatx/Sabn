# JioSaavn API

![GitHub License](https://img.shields.io/github/license/sumitkolhe/jiosaavn-api)
![GitHub Release](https://img.shields.io/github/v/release/sumitkolhe/jiosaavn-api)

An Unofficial API for downloading high-quality songs, albums, playlists, and more from [JioSaavn](https://jiosaavn.com).

## 📚 Documentation

Check out the [API documentation](https://saavn.dev/docs) for detailed information on how to use the API.

## 📰 Changelog

For a detailed list of changes, see the [CHANGELOG](CHANGELOG.md).

## 🔌 Running Locally

1. Clone the repository:

   ```sh
   git clone https://github.com/sumitkolhe/jiosaavn-api
   cd jiosaavn-api
   ```

### Using Docker

```sh
docker-compose up --build
```

OR

### Manually

> [!NOTE]
> You need `Node.js(v20+)` and `pnpm`. Enable it with `corepack enable`.

2. Install the required dependencies:

   ```sh
   pnpm install
   ```

3. Launch the development server:

   ```sh
   pnpm dev
   ```

## ☁️ Deploying Your Own Instance

The API is a [Hono](https://hono.dev) app served by [Nitro](https://nitro.build), so the same codebase deploys anywhere via Nitro's presets — and the right preset is picked automatically from each platform's CI environment, so **`pnpm build` just works everywhere**.

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sumitkolhe/jiosaavn-api)

Import the repo — [`vercel.json`](vercel.json) pins the Nitro framework, so no build/output settings are needed.

### Cloudflare Workers

[![Deploy with Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/sumitkolhe/jiosaavn-api)

Connect the repo in **Workers Builds** and set the **Build command** to `pnpm build` (the deploy command stays the default `npx wrangler deploy`). To deploy from your machine instead, run `pnpm deploy`.

### Docker / Node (self-hosted)

```sh
docker-compose up --build
```

OR build and run directly (Node v20+):

```sh
pnpm build   # builds to .output/
pnpm start   # serves on http://localhost:3000 (override with PORT)
```

## 📜 License

This project is distributed under the [MIT License](https://opensource.org/licenses/MIT). For more information, see the [LICENSE](LICENSE) file included in this repository.
