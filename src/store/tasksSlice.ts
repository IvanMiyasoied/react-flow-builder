import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Node, Edge, applyNodeChanges, applyEdgeChanges }  from '@xyflow/react'
import { v4 as uuidv4 } from 'uuid';

export interface TaskState {
  nodes:Node[];
  edges:Edge[];
  
}

const initialState: TaskState = {
    nodes:[{ id: '1', position: { x: 0, y: 0 }, data: { label: 'Зробити ревью' },type: 'taskNode' }],
    edges:[]
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setNode: (state) => {
        state.nodes.push({ id:uuidv4(), position: { x: 0, y: 200 }, data: { label: 'Gadf' }, type: 'taskNode' })
    },
    onNodesChange: (state,action) => {
        state.nodes = applyNodeChanges(action.payload,state.nodes)
    },
    onEdgesChange: (state,action) => {
        state.edges = applyEdgeChanges(action.payload,state.edges)
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