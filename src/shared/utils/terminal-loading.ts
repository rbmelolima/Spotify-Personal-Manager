const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export async function withLoading<T>(message: string, operation: () => Promise<T>): Promise<T> {
  if (!process.stdout.isTTY) return operation();

  let frame = 0;
  const render = () => process.stdout.write(`\r${frames[frame++ % frames.length]} ${message}`);
  render();
  const timer = setInterval(render, 80);

  try {
    return await operation();
  } finally {
    clearInterval(timer);
    process.stdout.write('\r\x1b[2K');
  }
}
