import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {getAllDeport} from '../../../../store/departmentSlice';
import Loader from '../../../Present/Loader';

const EmployeeList = () => {
  const {departmentId} = useParams();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.depAll);
  const loading = useSelector((state) => state.department.loading);

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
      {employees.map((employee) => (
        <div key={employee.id}>
          <h3>{employee.name}</h3>
          <p>{employee.position}</p>
        </div>
      ))}
    </>
  );
};

export default EmployeeList;
