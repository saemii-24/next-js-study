export async function initMsw() {
  if (process.env.NEXT_RUNTIME == "nodejs") {
    const { server } = await import("./node");
    server.listen();
  }
}
