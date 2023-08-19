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
        default:
        return state;
    }

    };