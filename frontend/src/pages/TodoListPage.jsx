import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import TodoItem from '../components/TodoItem';
import { getTodos, createTodo, updateTodoStatus, deleteTodo } from '../services/api'

const TodoListPage = () => {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await getTodos();
            setTodos(response.data);
        } catch (error) {
            console.error('Terjadi error saat fetching todo!', error);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        try {
            const response = await createTodo(newTask);
            setTodos([...todos, response.data]);
            setNewTask('');
            handleCloseModal();
        } catch (error) {
            console.error('Gagal menambahkan task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Gagal menghapus task:', error);
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'on progress' ? 'complete' : 'on progress';
        try {
            await updateTodoStatus(id, newStatus);
            setTodos(todos.map(todo => 
                todo.id === id ? { ...todo, status: newStatus } : todo
            ));
        } catch (error) {
            console.error('Gagal update status:', error);
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <Card.Header as="h1" className="text-center">To-Do List</Card.Header>
                        <Card.Body>
                            <Button variant="primary" onClick={handleShowModal} className="mb-4">
                                Add Task
                            </Button>
                            <ul className="list-group">
                                {todos.map(todo => (
                                    <TodoItem 
                                        key={todo.id}
                                        todo={todo}
                                        onUpdateStatus={handleUpdateStatus}
                                        onDelete={handleDeleteTask}
                                    />
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddTask}>
                        <Form.Group>
                            <Form.Label>Task</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Tambahkan tugas baru" 
                                value={newTask} 
                                onChange={(e) => setNewTask(e.target.value)} 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Save Task
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default TodoListPage;