# Task Management App Documentation

Note that this documentation is AI generated and may not be accurate.

[link to backend](https://github.com/ahsan-rigu/taskleafs-backend)

## Overview

This Task Management App is designed to help users organize and manage their tasks efficiently. The app follows a hierarchical structure to categorize and prioritize tasks, making it easier to track progress and collaborate with team members.

## Hierarchical Structure

The app's hierarchy is organized as follows:

1. **Workplaces**: The top-level entity representing an organization or a major division within an organization. Each workplace can contain multiple projects.
2. **Projects**: A project is a collection of related tasks and boards within a workplace. Projects help in organizing tasks related to a specific goal or initiative.
3. **Boards**: Boards are used to group tasks within a project. They can represent different stages of a project, such as "To Do", "In Progress", and "Done".
4. **Tasks**: The smallest unit in the hierarchy, tasks represent individual work items that need to be completed. Tasks can be assigned to team members, given due dates, and tracked for progress.

## Features

- **Workplace Management**: Create and manage multiple workplaces to represent different organizations or divisions.
- **Project Management**: Organize tasks into projects within each workplace.
- **Board Management**: Use boards to categorize tasks within a project, allowing for better visualization of task progress.
- **Task Management**: Create, assign, and track tasks. Set due dates, priorities, and statuses to ensure tasks are completed on time.
- **Real-time Collaboration**: Using Socket.IO, multiple users can work together on projects within the same workplace, enabling real-time updates and collaboration.

## Usage

1. **Creating a Workplace**: Start by creating a workplace to represent your organization.
2. **Adding Projects**: Within a workplace, create projects to organize related tasks.
3. **Setting Up Boards**: For each project, set up boards to categorize tasks by their status or other criteria.
4. **Managing Tasks**: Add tasks to the appropriate boards, assign them to team members, and track their progress.

## Directory Structure

- **/src**: Contains the source code for the application.
  - **/components**: Reusable UI components.
  - **/pages**: Page components representing different views.
  - **/services**: Services for API calls and business logic.
  - **/sockets**: Socket.IO configuration and event handling.
- **/public**: Static assets and public files.
- **/styles**: Global styles and theming.
- **/utils**: Utility functions and helpers.

## Running the Project

To run the project in different environments, follow these steps:

### Development

To start the project in development mode, use the following command:

```bash
npm start
```

This will start a development server with hot-reloading enabled, allowing you to see changes in real-time as you edit the code.

### Production

To build and run the project in production mode, use the following commands:

1. Build the project:

```bash
npm run build
```

This will create an optimized production build of the application.

2. Start the production server:

```bash
npm start
```

This will start the server using the production build.

Make sure to review the `package.json` file for any additional scripts or configurations that may be specific to this project.
