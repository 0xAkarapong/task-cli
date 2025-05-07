switch (process.argv[2]) {
    case "add":
        const file = Bun.file("data.json");
        file.write(JSON.stringify({
            id: 1,
            description: process.argv[3],
            status: "todo",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }));
        break;
    case "update":
        break;
    case "mark-in-progress":
        break;
    case "mark-done":
        break;
    case "list":
        break;   
}
export {};