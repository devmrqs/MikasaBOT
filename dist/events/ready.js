const event = {
    name: "clientReady",
    once: true,
    execute(client) {
        console.log(`[bot] logado como ${client.user.tag}`);
    },
};
export default event;
//# sourceMappingURL=ready.js.map