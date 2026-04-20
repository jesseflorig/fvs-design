import { createStorybookMcpHandler } from '@storybook/mcp';
import { createServer } from 'node:http';

const SB_URL = process.env.STORYBOOK_URL ?? 'http://localhost:6006';
const PORT = Number(process.env.MCP_PORT ?? 6007);

const handler = await createStorybookMcpHandler({
  manifestProvider: async (_req, path) => {
    const url = new URL(path.replace(/^\.\//, '/'), SB_URL).toString();
    const res = await fetch(url);
    if (!res.ok) throw new Error(`manifest ${url}: ${res.status}`);
    return res.text();
  },
});

const server = createServer(async (req, res) => {
  if (!req.url?.startsWith('/mcp')) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const chunks = [];
  for await (const c of req) chunks.push(c);

  const headers = {};
  for (let i = 0; i < req.rawHeaders.length; i += 2) {
    headers[req.rawHeaders[i].toLowerCase()] = req.rawHeaders[i + 1];
  }

  const request = new Request(`http://localhost:${PORT}${req.url}`, {
    method: req.method,
    headers,
    ...(chunks.length ? { body: Buffer.concat(chunks), duplex: 'half' } : {}),
  });

  const response = await handler(request);

  const outHeaders = {};
  response.headers.forEach((v, k) => { outHeaders[k] = v; });
  res.writeHead(response.status, outHeaders);

  if (response.body) {
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
});

server.listen(PORT, () => {
  process.stderr.write(`Storybook MCP: http://localhost:${PORT}/mcp  →  ${SB_URL}\n`);
});
