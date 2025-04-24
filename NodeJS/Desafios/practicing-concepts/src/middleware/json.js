export async function json(req, res) {
  const buffer = [];
  for await (const chunk of req) {
    buffer.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffer).toString());
  } catch (error) {
    req.body = null;
  }

  res.setHeader('Content-Type', 'application/json');
}
