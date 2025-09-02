import React, { useEffect, useState } from 'react'
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react'
import { DraggableData, DraggableEvent } from 'react-draggable'
import AddTask, { Task } from './AddTask'
import TaskListColumn from './TaskListColumn'

interface TaskListProps {
    todos: Task[]
}

const TaskList: React.FC<TaskListProps> = ({ todos }) => {
    function filterTasks(tasks: Task[], status: string): Task[] {
        return tasks.filter((todo) => todo.status === status)
    }

    const [tasks, setTasks] = useState(todos)
    const [todoList, setTodoList] = useState(filterTasks(tasks, 'To Do'))
    const [inProgressList, setInProgressList] = useState(
        filterTasks(tasks, 'In Progress')
    )
    const [doneList, setDoneList] = useState(filterTasks(tasks, 'Done'))
    const [isStarted, setIsStarted] = useState(false)

    const addTask = (newTask: Task) => {
        setTasks([...tasks, newTask])
    }

    const handleDrag = (e: DraggableEvent, data: Object) => {
        console.log('Event: ', e)
        console.log('Data: ', data)
    }

    const handleStart = () => {
        setIsStarted(true)
    }

    const updateTask = (task: Task, updatedStatus: string) => {
        const updatedTask = { ...task, status: updatedStatus };
        const updatedTasks = tasks.map(t =>
            t.id === task.id ? updatedTask : t
        );
        setTasks(updatedTasks);
        return updatedTask;
    }

    const moveTaskInColumn = (task: Task, newPositionIndex: number, columnStatus: string) => {
        let columnList: Task[] = [];
        if (columnStatus === 'To Do') {
            columnList = [...todoList];
        } else if (columnStatus === 'In Progress') {
            columnList = [...inProgressList];
        } else if (columnStatus === 'Done') {
            columnList = [...doneList];
        }

        const currentIndex = columnList.findIndex(t => t.id === task.id);
        if (currentIndex === -1) return;

        const [movedTask] = columnList.splice(currentIndex, 1);
        columnList.splice(newPositionIndex, 0, movedTask);

        if (columnStatus === 'To Do') {
            setTodoList(columnList);
        } else if (columnStatus === 'In Progress') {
            setInProgressList(columnList);
        } else if (columnStatus === 'Done') {
            setDoneList(columnList);
        }
    }

    const handleStop = (e: DraggableEvent, data: DraggableData, task: Task) => {
        const status = task.status
        const x = data.x
        const y = data.y
        const screenWidth = window.innerWidth
        const xRate = x / screenWidth

        if (Math.abs(x) < 50) {
            let currentList: Task[];
            if (status === 'To Do') {
                currentList = todoList;
            } else if (status === 'In Progress') {
                currentList = inProgressList;
            } else if (status === 'Done') {
                currentList = doneList;
            } else {
                setIsStarted(false);
                return;
            }

            const currentIndex = currentList.findIndex(t => t.id === task.id);
            if (currentIndex === -1) {
                setIsStarted(false);
                return;
            }

            const cardHeight = 150;
            const positionChange = Math.round(y / cardHeight);
            let newPositionIndex = currentIndex + positionChange;
            newPositionIndex = Math.max(0, Math.min(newPositionIndex, currentList.length - 1));

            if (newPositionIndex !== currentIndex) {
                moveTaskInColumn(task, newPositionIndex, status);
            }

            setIsStarted(false);
            return;
        }

        if (xRate < 0.1 && xRate > -0.1) {
            setIsStarted(false)
            return
        }

        if (status === 'To Do') {
            if (xRate >= 0.5) {
                setTodoList(todoList.filter((todo) => todo.id !== task.id))
                const updatedTask = updateTask(task, 'Done')
                setDoneList([updatedTask, ...doneList])
            } else {
                const updatedTask = updateTask(task, 'In Progress')
                setTodoList(todoList.filter((todo) => todo.id !== task.id))
                setInProgressList([updatedTask, ...inProgressList])
            }
        } else if (status === 'In Progress') {
            if (x > 0) {
                setInProgressList(
                    inProgressList.filter((todo) => todo.id !== task.id)
                )
                const updatedTask = updateTask(task, 'Done')
                setDoneList([updatedTask, ...doneList])
            } else {
                const updatedTask = updateTask(task, 'To Do')
                setInProgressList(
                    inProgressList.filter((todo) => todo.id !== task.id)
                )
                setTodoList([updatedTask, ...todoList])
            }
        } else if (status === 'Done') {
            if (xRate <= -0.4) {
                const updatedTask = updateTask(task, 'To Do')
                setDoneList(doneList.filter((todo) => todo.id !== task.id))
                setTodoList([updatedTask, ...todoList])
            } else {
                const updatedTask = updateTask(task, 'In Progress')
                setDoneList(doneList.filter((todo) => todo.id !== task.id))
                setInProgressList([updatedTask, ...inProgressList])
            }
        }

        setIsStarted(false)
    }

    useEffect(() => {
        setTasks(tasks)
        setTodoList(filterTasks(tasks, 'To Do'))
        setInProgressList(filterTasks(tasks, 'In Progress'))
        setDoneList(filterTasks(tasks, 'Done'))
    }, [tasks])

    const borderStyle = {
        borderLeft: '2px dashed blue',
        borderRight: '2px dashed blue',
    }

    return (
        <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={6}
            mx={{ base: '10px', md: '50px' }}
        >
            <GridItem sx={isStarted ? borderStyle : {}}>
                <TaskListColumn
                    tasks={todoList}
                    title="To Do"
                    handleDrag={handleDrag}
                    handleStart={handleStart}
                    handleStop={handleStop}
                />
                <AddTask todos={tasks} setTodos={addTask} />
            </GridItem>
            <GridItem sx={isStarted ? borderStyle : {}}>
                <TaskListColumn
                    tasks={inProgressList}
                    title="In Progress"
                    handleDrag={handleDrag}
                    handleStart={handleStart}
                    handleStop={handleStop}
                />
            </GridItem>
            <GridItem sx={isStarted ? borderStyle : {}}>
                <TaskListColumn
                    tasks={doneList}
                    title="Done"
                    handleDrag={handleDrag}
                    handleStart={handleStart}
                    handleStop={handleStop}
                />
            </GridItem>
        </Grid>
    )
}

export default TaskList
