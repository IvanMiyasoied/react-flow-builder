import { createSlice } from '@reduxjs/toolkit'
import { Node, Edge, applyNodeChanges, applyEdgeChanges }  from '@xyflow/react'
import { style } from 'd3-selection';
import { v4 as uuidv4 } from 'uuid';

export interface TaskState {
  nodes:Node[];
  edges:Edge[];
  
}

const initialState: TaskState = {
    nodes:[{ id: '1', position: { x: 0, y: 0 }, data: { label: 'Твоя нова задача!' },type: 'taskNode', style: {width:'150px'} }],
    edges:[]
}

export const taskSlice = createSlice({
  name: 'task',
  initialState: localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') as string ): initialState,
  reducers: {
    setNode: (state) => {
        const lastNode = state.nodes[state.nodes.length-1] 
        state.nodes.push({ id:uuidv4(), position: { x: lastNode.position.x+200,y: lastNode.position.y }, data: { label: 'Твоя нова задача!' }, type: 'taskNode',style : {width:'150px'} })
    },
    onNodesChange: (state,action) => {
        state.nodes = applyNodeChanges(action.payload,state.nodes)
        localStorage.setItem('tasks',JSON.stringify(state))
    },
    onEdgesChange: (state,action) => {
        state.edges = applyEdgeChanges(action.payload,state.edges)
        localStorage.setItem('tasks',JSON.stringify(state))
    },
    setEdge: (state,action) => {
        state.edges = action.payload
    },
    updateNode: (state,action) => {
      const node =  state.nodes.find((task) => {
          return  task.id === action.payload.id
        })
        if (node) {
          node.data = {...node.data,...action.payload.data}
        }
    }
   
  },
})


export const {setNode,onNodesChange,onEdgesChange,setEdge,updateNode} = taskSlice.actions

export default taskSlice.reducer