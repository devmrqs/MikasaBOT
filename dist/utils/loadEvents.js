import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export async function loadEvents(client) {
    const eventsPath = path.join(__dirname, "..", "events");
    const eventFiles = readdirSync(eventsPath).filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
        const filePath = pathToFileURL(path.join(eventsPath, file)).href;
        const { default: event } = (await import(filePath));
        if (event.once) {
            client.once(event.name, event.execute);
        }
        else {
            client.on(event.name, event.execute);
        }
        console.log(`[events] carregado: ${event.name}`);
    }
}
//# sourceMappingURL=loadEvents.js.map