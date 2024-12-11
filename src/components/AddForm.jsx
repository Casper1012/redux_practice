import React from "react"
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { addTask, deleteTasks } from "../redux/todo/action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import edit_svg from "./svg/edit.svg";
import del_svg from "./svg/del.svg";

const TodoItem = styled.div`
    margin-top :3vh;
    width : 50vw;
    text-align:center

    li {
        // list-style: none;
        border:1px solid red;
    }

  button {
    border: none;
    background: none;
    margin-left:5px;

    img {
       // border:1px solid red;
    }
  }
`;

const AddForm = ({todos}) => {
    const [task, setTask] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {data} = await axios.post("http://localhost:4000/tasks", {
            title: task,
        });
        dispatch(addTask(data));
    };

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:4000/tasks/${id}`);
        dispatch(deleteTasks(id));
    };

    return (
        <Container>
            <label>Add a task</label>
            <form onSubmit={handleSubmit}>
                <input
                    name="task"
                    placeholder="Add a task"
                    type="task"
                    value={task}
                    onChange={handleChange}
                />
                <button>Add task</button>
            </form>

            {todos.map(({ id, title }) => (
                <TodoItem>
                    <li key={id}>
                        {title}
                        <Link to={`/update/${id}`}>
                            {" "}
                            <img src={edit_svg} alt="edit" width={20} height={20} />
                        </Link>
                        <button onClick={() => handleDelete(id)}>
                            <img src={del_svg} width={20} height={20} alt="delete" />
                        </button>
                    </li>
                </TodoItem>
            ))}
        </Container>
    );
};

export default AddForm;