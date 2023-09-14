
export const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_DATA":
        return action.payload;

        case "ADD_WORKPLACE":
        return {
            ...state,
            workplaces: [...state.workplaces, action.payload],
        };

        case "JOIN_WORKPLACE":
        return {
            ...state,
            workplaces: [...state.workplaces, action.payload],
            invitations: state.invitations.filter((invitation: any) => invitation.workplaceId !== action.payload._id),
        };

        case "DELETE_INVITATION":
        return {
            ...state,
            invitations: state.invitations.filter((invitation: any) => invitation.workplaceId !== action.payload),
        };
        case "ADD_MEMBER": {   
            const { workplaceId, member } = action.payload;
            alert(workplaceId)
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    return { ...workplace, members: [...workplace.members, member] };
                }
                return workplace;
            });
            return { ...state, workplaces: newWorkplaces };
        }

        case "LEAVE_WORKPLACE": {
            const { workplaceId } = action.payload;
            const newWorkplaces = state.workplaces.filter((workplace: any) => workplace._id !== workplaceId);
            return { ...state, workplaces: newWorkplaces };
        }
        case "EDIT_WORKPLACE": {
            const { workplaceId, name, description } = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    return { ...workplace, name, description };
                }
                return workplace;
            });
            return { ...state, workplaces: newWorkplaces };
        }

        case "DELETE_WORKPLACE": {
            const { workplaceId } = action.payload;
            const newWorkplaces = state.workplaces.filter((workplace: any) => workplace._id !== workplaceId);
            return { ...state, workplaces: newWorkplaces };
        }

        case "INVITE":{
            const { workplaceId, name } = action.payload;
            return { ...state, invitations: [...state.invitations , { workplaceId, name }] };
        }

        case "ADD_BRANCH": {
            const { workplaceId, branch } = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    return { ...workplace, branches: [...workplace.branches, branch] };
                }
                return workplace;
            });
            return { ...state, workplaces: newWorkplaces };
        }

        case "UPDATE_BRANCH_NAME": {
            const { workplaceId, branchName, branchId } = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    const newBranches = workplace.branches.map((branch: any) => {
                        if (branch._id === branchId) {
                            return { ...branch, branchName: branchName };
                        }
                        return branch;
                    });
                    return { ...workplace, branches: newBranches };
                }
                return workplace;
            }
            );
            return { ...state, workplaces: newWorkplaces };
        }
        case "DELETE_BRANCH": {
            const { workplaceId, branchId } = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    const newBranches = workplace.branches.filter((branch: any) => branch._id !== branchId);
                    return { ...workplace, branches: newBranches };
                }
                return workplace;
            }
            );
            return { ...state, workplaces: newWorkplaces };
        }

        case "ADD_LEAF": {
            const { workplaceId, branchId, leaf } = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    const newBranches = workplace.branches.map((branch: any) => {
                        if (branch._id === branchId) {
                            return { ...branch, leafs: [...branch.leafs, leaf] };
                        }
                        return branch;
                    });
                    return { ...workplace, branches: newBranches };
                }
                return workplace;   
            }
            );
            return { ...state, workplaces: newWorkplaces };
        }
        

        case "EDIT_LEAF_NAME": {
            const { workplaceId, branchId, leafId, leafName } = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    const newBranches = workplace.branches.map((branch: any) => {
                        if (branch._id === branchId) {
                            const newLeafs = branch.leafs.map((leaf: any) => {
                                if (leaf._id === leafId) {
                                    return { ...leaf, leafName };
                                }
                                return leaf;
                            });
                            return { ...branch, leafs: newLeafs };
                        }
                        return branch;
                    });
                    return { ...workplace, branches: newBranches };
                }
                return workplace;
            }
            );
            return { ...state, workplaces: newWorkplaces };
        }
        case "DELETE_LEAF": {
            const { workplaceId, branchId, leafId } = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    const newBranches = workplace.branches.map((branch: any) => {
                        if (branch._id === branchId) {
                            const newleafs = branch.leafs.filter((leaf: any) => leaf._id !== leafId);
                            return { ...branch, leafs: newleafs };
                        }
                        return branch;
                    });
                    return { ...workplace, branches: newBranches };
                }
                return workplace;
            }
            );
            return { ...state, workplaces: newWorkplaces };
        }

        case "EDIT_TASK_PRIORITY" : {
            const { workplaceId, branchId, leafId, taskId, priority } = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    const newBranches = workplace.branches.map((branch: any) => {
                        if (branch._id === branchId) {
                            const newLeafs = branch.leafs.map((leaf: any) => {
                                if (leaf._id === leafId) {
                                    const newTasks = leaf.tasks.map((task: any) => {
                                        if (task._id === taskId) {
                                            return { ...task, priority };
                                        }
                                        return task;
                                    });
                                    return { ...leaf, tasks: newTasks };
                                }
                                return leaf;
                            });
                            return { ...branch, leafs: newLeafs };
                        }
                        return branch;
                    });
                    return { ...workplace, branches: newBranches };
                }
                return workplace;
            }
            );
            return { ...state, workplaces: newWorkplaces };
        }
        case "ADD_TASK": {
            const { workplaceId, branchId, leafId, task } = action.payload;
            task.createdBy = state.name;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    const newBranches = workplace.branches.map((branch: any) => {
                        if (branch._id === branchId) {
                            const newLeafs = branch.leafs.map((leaf: any) => {
                                if (leaf._id === leafId) {
                                    return { ...leaf, tasks: [...leaf.tasks, task] };
                                }
                                return leaf;
                            });
                            return { ...branch, leafs: newLeafs };
                        }
                        return branch;
                    });
                    return { ...workplace, branches: newBranches };
                }
                return workplace;
            }
            );
            return { ...state, workplaces: newWorkplaces };
        }

        case "MOVE_TASK": {
            const {
                startLeafId,
                finishLeafId,
                source,
                destination,
                branchId,
                workplaceId,
              } = action.payload;
              let task: any;
                const newWorkplaces = state.workplaces.map((workplace: any) => {
                    if (workplace._id === workplaceId) {
                        const newBranches = workplace.branches.map((branch: any) => {
                            if (branch._id === branchId) {
                                branch.leafs.map((leaf: any) => {
                                    if (leaf._id === startLeafId) {
                                     task = leaf.tasks.splice(source, 1);
                                    }
                                    return leaf;
                                });
                                branch.leafs.map((leaf: any) => {
                                        if(leaf._id === finishLeafId){
                                            leaf.tasks.splice(destination, 0, task[0]);
                                        }
                                        return leaf;
                                });
                                
                                return branch;
                            }
                            return branch;
                        });
                        return { ...workplace, branches: newBranches };
                    }
                    return workplace;
                }
                );
                return { ...state, workplaces: newWorkplaces };
        }
                                        

        case "DELETE_TASK": {
            const { workplaceId, branchId, leafId, taskId } = action.payload;
            const newWorkplaces = state.workplaces.map((workplace: any) => {
                if (workplace._id === workplaceId) {
                    const newBranches = workplace.branches.map((branch: any) => {
                        if (branch._id === branchId) {
                            const newLeafs = branch.leafs.map((leaf: any) => {
                                if (leaf._id === leafId) {
                                    const newTasks = leaf.tasks.filter((task: any) => task._id !== taskId);
                                    return { ...leaf, tasks: newTasks };
                                }
                                return leaf;
                            });
                            return { ...branch, leafs: newLeafs };
                        }
                        return branch;
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