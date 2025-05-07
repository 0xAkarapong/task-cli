switch (process.argv[2]) {
    case "add":
        const filePath = "data.json";
        let tasks: any[] = [];
        try {
            const raw = await Bun.file(filePath).text();
            tasks = JSON.parse(raw);
        } catch {
            tasks = [];
        }
        const newTask ={
            id: Math.random().toString(36).slice(2, 9),
            description: process.argv[3],
            status: "todo",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        tasks.push(newTask);
        await Bun.write(filePath, JSON.stringify(tasks, null, 2));
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