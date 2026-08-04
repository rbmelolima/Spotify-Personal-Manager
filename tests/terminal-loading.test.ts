import { describe, expect, it } from 'vitest';
import { withLoading } from '../src/shared/utils/terminal-loading.js';

describe('withLoading', () => {
  it('returns the result of the asynchronous operation', async () => {
    await expect(withLoading('Carregando...', async () => 'concluído')).resolves.toBe('concluído');
  });

  it('preserves operation errors', async () => {
    await expect(withLoading('Carregando...', async () => { throw new Error('falhou'); })).rejects.toThrow('falhou');
  });
});
