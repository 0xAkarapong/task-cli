const filePath = "data.json";

interface Task {
    id: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    createdAt: string;
    updatedAt: string;
};

let tasks: Task[] = [];

switch (process.argv[2]) {
    case "add":
        try {
            const raw = await Bun.file(filePath).text();
            tasks = JSON.parse(raw);
        } catch {
            tasks = [];
        }
        
        if (process.argv.length < 4) {
            console.error("Please provide a task description");
            process.exit(1);
        }
        let nextId = 1;
        if (tasks.length > 0) {
            const maxId = Math.max(...tasks.map(task => parseInt(task.id, 10)).filter(id => !isNaN(id)));
            nextId = isFinite(maxId) ? maxId + 1 : 1;
        }

        const newTask:Task ={
            id: nextId.toString(),
            description: process.argv[3],
            status: "todo",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        await Bun.write(filePath, JSON.stringify(tasks, null, 2));
        break;

    case "update":
        const id = process.argv[3]
        const description = process.argv[4];
        try {
            const raw = await Bun.file(filePath).text();
            tasks = JSON.parse(raw);
        } catch {
            tasks = [];
        }
        if (process.argv.length < 5) {
            console.error("Please provide a task ID and description");
            process.exit(1);
        }
        
        const taskIndex = tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
            console.error("Task not found");
            process.exit(1);
        }
        tasks[taskIndex].description = description;
        tasks[taskIndex].updatedAt = new Date().toISOString();
        await Bun.write(filePath, JSON.stringify(tasks, null, 2));
        break;
    case "mark-in-progress":
        break;

    case "mark-done":
        break;

    case "list":
        break;
}
export {};