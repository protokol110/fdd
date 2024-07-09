import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {getAllDeport} from '../../../../store/departmentSlice';
import Loader from '../../../Present/Loader';
import TokenService from "../../../../services/token.service";

const EmployeeList = () => {
  const {departmentId} = useParams();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.depAll);
  const loading = useSelector((state) => state.department.loading);
  const navigate = useNavigate();
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  useEffect(() => {
    dispatch(getAllDeport());
  }, [dispatch]);

  if (loading) {
    return <Loader/>;
  }

  const employees = departments.find(dept => dept.id === parseInt(departmentId))?.users || [];

  return (
    <>
      <h2>Список сотрудников</h2>
      {visibleAdmin || visibleEditor ?
        <div className="mb-3">
          <Button variant="success" onClick={() => navigate(`/employee/${departmentId}/add`)}>Добавление
            пользователя</Button>
          <Button variant="secondary" className="m-1" onClick={() => navigate(`/departments/${departmentId}/edit`)}>Редактирование
            департамента</Button>
        </div> : null}
      <Button variant="success" className="mb-3" onClick={() => navigate('/contacts')}>Назад</Button>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Имя</th>
          <th>Телефон</th>
          <th>Описание</th>
          <th>Должность</th>
          {visibleAdmin || visibleEditor ? <th>Действия</th> : null}
        </tr>
        </thead>
        <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.phone}</td>
            <td>{employee.description}</td>
            <td>{employee.position}</td>
            {visibleAdmin || visibleEditor ?
              <td>
                <Button variant="success" onClick={() => navigate(`/employee/${departmentId}/${employee.id}/edit`)}>Редактировать</Button>
              </td>
              : null}
          </tr>
        ))}
        </tbody>
      </Table>
    </>
  );
};

export default EmployeeList;
