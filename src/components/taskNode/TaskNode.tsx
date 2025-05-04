import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { updateNode } from "../../store/tasksSlice";
import { useDispatch } from "react-redux";

const TaskNode = ({ data, id }:{data:{label:string},id:string}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      {isEditMode ? (
        <div>
          <input
            type="text"
            value={data.label}
            onChange={(event) => {
              dispatch(updateNode({id,data:{label:event.target.value}}));
            }}
          />
          <button onClick={() => {
            setIsEditMode(false)
          }}>Save</button>
        </div>
      ) : (
        <label
          onClick={() => {
            setIsEditMode(true);
          }}
        >
          {data.label}
        </label>
      )}

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default TaskNode;
