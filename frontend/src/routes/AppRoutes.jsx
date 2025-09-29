// frontend/src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoListPage from '../pages/TodoListPage';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<TodoListPage />} />
      </Routes>
  );
};

export default AppRoutes;