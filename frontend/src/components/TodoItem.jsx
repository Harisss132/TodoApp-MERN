import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTrash, FaCheck, FaSpinner } from 'react-icons/fa';

const TodoItem = ({ todo, onUpdateStatus, onDelete }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span style={{ textDecoration: todo.status === 'complete' ? 'line-through' : 'none' }}>
                {todo.task}
            </span>
            <div>
                {todo.status === 'complete' ? (
                    <FaCheck className="text-success me-2" />
                ) : (
                    <FaSpinner className="text-warning me-2" />
                )}
                <Button 
                    variant={todo.status === 'on progress' ? 'warning' : 'success'} 
                    size="sm" 
                    onClick={() => onUpdateStatus(todo.id, todo.status)}
                    className="me-2"
                >
                    {todo.status === 'on progress' ? 'On Progress' : 'Complete'}
                </Button>
                <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => onDelete(todo.id)}
                >
                    <FaTrash />
                </Button>
            </div>
        </li>
    );
};

export default TodoItem;