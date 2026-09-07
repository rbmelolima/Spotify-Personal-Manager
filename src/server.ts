import Fastify from 'fastify';
import type { AuthService } from './modules/auth/auth-service.js';

export async function startCallbackServer(port: number, auth: AuthService, expectedState: string): Promise<{ waitForCallback: Promise<void>; close: () => Promise<void> }> {
  const app = Fastify({ logger: false });
  let resolveCallback!: () => void; let rejectCallback!: (error: Error) => void;
  const waitForCallback = new Promise<void>((resolve, reject) => { resolveCallback = resolve; rejectCallback = reject; });
  app.get('/health', async () => ({ status: 'ok' }));
  app.get('/auth/spotify/callback', async (request, reply) => { const query = request.query as { code?: string; state?: string; error?: string }; if (query.error || !query.code || query.state !== expectedState) { rejectCallback(new Error(query.error ?? 'Callback OAuth inválido.')); return reply.code(400).type('text/html').send('<h1>Autenticação falhou. Volte ao terminal.</h1>'); } try { await auth.exchangeCode(query.code); resolveCallback(); return reply.type('text/html').send('<h1>Autenticação concluída. Você pode voltar ao terminal.</h1>'); } catch (error) { rejectCallback(error as Error); return reply.code(500).type('text/html').send('<h1>Não foi possível salvar o token.</h1>'); } });
  await app.listen({ port, host: '127.0.0.1' });
  return { waitForCallback, close: () => app.close() };
}
