export interface User {
    name: string;
    username: string;
    password: undefined;
    _id: string;
    profilePicture: string;
    workplaces: Array<any>;
    invitations: Array<{workplaceId: string, name: string}>;
  }

export interface Task {
    _id: any;
    task: string;
    priority: string; 
    createdBy : string;
}

export interface Leaf {
    _id: string| any;
    leafName: string;
    tasks: Array<Task>;
}

export interface Branch {
    _id: string;
    branchName: string;
    leafs: Array<Leaf>;
}

export interface Workplace {
    _id: string;
    name: string;
    description: string;
    branches: Array<Branch>;
    members: Array<{name: string; _id:string, username: string}>;
    owner: string;
}


