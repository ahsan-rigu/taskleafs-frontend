import axios from "axios";

const token = localStorage.getItem("token");

export const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_DATA":
        return action.payload;
        case "ADD_WORKPLACE":
        return {
            ...state,
            workplaces: [...state.workplaces, action.payload],
        };
        case "MOVE_LEAF": {
            const { workplaceid,  branch} = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceid) {
                    const newBranches = workplace.branches.map((b: any) => {
                        if (b._id === branch._id) {
                            return branch;
                        }
                        return b;
                    });
                    return { ...workplace, branches: newBranches };      
                }
                return workplace;
            }
            );
            return { ...state, workplaces: newWorkplaces };
        }
        case "MOVE_TASK":{ 
            const { workplaceid, branch } = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceid) {
                    const newBranches = workplace.branches.map((b: any) => {
                        if (b._id === branch._id) {
                            return branch;
                        }
                        return b;
                    });
                    return { ...workplace, branches: newBranches };
                }
                return workplace;
            }
            );
            return { ...state, workplaces: newWorkplaces };
        }
        

        default:
        return state;


    }

    };