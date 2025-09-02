import React from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { GridItem, Heading } from '@chakra-ui/react'
import TaskCard from './TaskCard'
import { Task } from './AddTask'

interface TaskListColumnProps {
    tasks: Task[]
    title: string
    handleStop: (e: DraggableEvent, data: DraggableData, task: Task) => void
    handleDrag: (e: DraggableEvent, data: DraggableData) => void
    handleStart: () => void
}

const TaskListColumn: React.FC<TaskListColumnProps> = ({
    tasks,
    title,
    handleDrag,
    handleStart,
    handleStop,
}) => {
    return (
        <GridItem>
            <Heading
                as="h1"
                textAlign="center"
                fontSize="4xl"
                fontWeight="bold"
            >
                {title}
            </Heading>
            {tasks.map((todo) => (
                <Draggable
                    handle=".handle"
                    key={todo.id}
                    axis="both"
                    position={{ x: 0, y: 0 }}
                    scale={1}
                    onStart={() => handleStart()}
                    onDrag={(e, data) => handleDrag(e, data)}
                    onStop={(e, data) => handleStop(e, data, todo)}
                >
                    <div className="handle" style={{ cursor: 'move' }}>
                        <TaskCard {...todo} />
                    </div>
                </Draggable>
            ))}
        </GridItem>
    )
}

export default TaskListColumn
