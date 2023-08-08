import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

class Task {
    id: number;
    title: string;
    done: boolean;
    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
        this.done = false;
    }
}
class TaskList {
    tasks: Task[];
    constructor() {
        this.tasks = [];
    }
    addTask(task: Task) {
        this.tasks.push(task);
    }
}


app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}
);
