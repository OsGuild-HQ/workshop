import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    {
      name: 'configure-server',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/api/register')) {
            const filePath = path.resolve(__dirname, 'data/Registration.json');
            
            const getRegistrations = () => {
              let currentList = [];
              if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf-8');
                currentList = JSON.parse(content || '[]');
              }
              return currentList;
            };

            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const newReg = JSON.parse(body);
                  const currentList = getRegistrations();
                  
                  const exists = currentList.some((r: any) => r.id === newReg.id);
                  if (!exists) {
                    currentList.push(newReg);
                    const dir = path.dirname(filePath);
                    if (!fs.existsSync(dir)) {
                      fs.mkdirSync(dir, { recursive: true });
                    }
                    fs.writeFileSync(filePath, JSON.stringify(currentList, null, 2), 'utf-8');
                  }
                  
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, message: 'Registration saved successfully!' }));
                } catch (error) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: false, error: (error as Error).message }));
                }
              });
            } else if (req.method === 'GET') {
              try {
                const urlObj = new URL(req.url, 'http://localhost');
                const id = urlObj.searchParams.get('id');

                if (!id) {
                  res.writeHead(403, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Access Denied: Full registration list is protected.' }));
                  return;
                }

                const currentList = getRegistrations();
                const ticket = currentList.find((item: any) => item.id === id);

                if (!ticket) {
                  res.writeHead(404, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Ticket not found' }));
                  return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
                res.end(JSON.stringify(ticket));
              } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: (error as Error).message }));
              }
            }
          } else {
            next();
          }
        });
      }
    }
  ],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
