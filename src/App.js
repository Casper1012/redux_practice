import React, { useEffect } from 'react';
import './App.css';

// sth new is being tested here
import AddForm from "./components/AddForm";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import UpdateForm from "./components/UpdateForm";
import { fetchTasks } from "./redux/todo/action";

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  
  useEffect(() => {
    async function fetchData() {

      const { data } = await axios.get("http://localhost:4000/tasks");

      dispatch(fetchTasks(data));
    }
    fetchData();
  }, []);

  return (

      <BrowserRouter>
        <Container>
          <Switch>
            <Route exact path="/">
                <AddForm todos={todos}/>
            </Route>
            <Route  path="/update/:id">
                <UpdateForm />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
  );
};

const Container = styled.div``;

export default App;