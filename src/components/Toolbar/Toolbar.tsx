import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { FaRedoAlt, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteProjectThunk } from "../../redux/thunks/projectsThunks";
import Loading from "../Loading/Loading";

const StyledToolbar = styled.div`
  background-color: #0002;
  height: 41px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${(props) =>
    props.id
      ? `
  margin-left: -10px;
  margin-right: -10px;
  `
      : ""}
  a {
    color: inherit;
  }
  a:hover {
    opacity: 0.8;
  }
  svg {
    width: 20px;
    font-size: 20px;
    margin-left: 20px;
  }
  a:first-child svg {
    margin-left: 0;
  }
  .form-check {
    margin-left: 20px;
    label {
      font-size: 14px;
    }
  }
`;

interface ToolbarProps {
  id?: string;
  ids?: string[];
}

const Toolbar = ({ id, ids }: ToolbarProps): JSX.Element => {
  const [loadingPull, setLoadingPull] = useState(false);

  const [runInParallel, setRunInParallel] = useState(false);

  const dispatch = useDispatch();

  const dataPost = id
    ? {
        projectId: id,
      }
    : {
        projectIds: ids,
      };

  const onPull = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoadingPull(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}projects/pull${id ? "" : "/all"}`,
        { ...dataPost, parallel: runInParallel },
        {
          headers: {
            authorization: `Bearer ${process.env.REACT_APP_TEMP_JWT}`,
          },
        }
      );
    } catch (error: any) {
      console.log(error.message);
    }

    setLoadingPull(false);
  };

  const onDelete = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(deleteProjectThunk(id as string));
  };

  return (
    <StyledToolbar id={id}>
      {loadingPull ? (
        <Loading />
      ) : (
        <a href="pull" title="Pull" onClick={onPull}>
          <FaRedoAlt />
        </a>
      )}
      {id && (
        <a href="delete" title="Delete project" onClick={onDelete}>
          <FaTrash />
        </a>
      )}
      {!id && (
        <Form.Check
          type="switch"
          id="parallel"
          label="Paralelo"
          checked={runInParallel}
          onChange={() => setRunInParallel(!runInParallel)}
        />
      )}
    </StyledToolbar>
  );
};

export default Toolbar;
