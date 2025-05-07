import { ReactFlow,Background, BackgroundVariant, MarkerType, addEdge, Connection } from '@xyflow/react';
import "./App.css"  
import '@xyflow/react/dist/style.css';
import TaskNode from './components/taskNode/TaskNode';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { onEdgesChange, onNodesChange, setNode, setEdge } from './store/tasksSlice';
 

 
export default function App() {
  
  const nodes = useSelector((state: RootState) => state.task.nodes)
  const edges= useSelector((state: RootState) => state.task.edges)
  const dispatch = useDispatch()

 
  const onConnect = (params:Connection) => dispatch(setEdge(addEdge(params, edges))) 
    
 

  return (
    <div className='container'>
      <button type='button' onClick={() => {
        dispatch(setNode())
      }}>Add task</button>
      <ReactFlow
        nodes={nodes}
        nodeTypes={{taskNode:TaskNode}}
        edges={edges}
        onNodesChange={(changes) => {
          dispatch(onNodesChange(changes))
        }}
        onEdgesChange={(changes) => {
          dispatch(onEdgesChange(changes))
        }}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{
          style: { stroke: "#000", strokeWidth: 1 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#000",
          },
        }}
      ><Background
      variant={BackgroundVariant.Dots}
      bgColor="#f0f6ff"
      color="#b3d4ff"
      gap={12}
      size={1}
    />
      </ ReactFlow>
    </div>
  );
}
