import axios from "axios";

// Define the structure of Task and TaskExecution based on your Java models
export interface TaskExecution {
  startTime?: string; // Using string as dates come as ISO strings from JSON
  endTime?: string;
  output?: string;
}

export interface Task {
  id: string; // Assuming ID is always present when fetching
  name: string;
  owner: string;
  command: string;
  taskExecutions: TaskExecution[];
}

// Define the structure for creating/updating a Task (ID might be optional on creation)
export interface TaskInput {
  id?: string;
  name: string;
  owner: string;
  command: string;
}

// Configure the base URL for your backend API
const apiClient = axios.create({
  baseURL: "http://localhost:30001", // CHANGE TO http://localhost:8080 if using Task 1 backend
  headers: {
    "Content-Type": "application/json",
  },
});

// --- API Functions ---

// GET /tasks - Fetch all tasks
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await apiClient.get<Task[]>("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw error to be handled by the component
  }
};

// GET /tasks/{id} - Fetch a single task by ID
export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    throw error;
  }
};

// GET /tasks/search?name=... - Search tasks by name
export const searchTasksByName = async (name: string): Promise<Task[]> => {
  try {
    // Use params for query parameters
    const response = await apiClient.get<Task[]>("/tasks/search", {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching tasks by name "${name}":`, error);
    // Handle 404 specifically - return empty array if not found
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return []; // Return empty array if backend returns 404
    }
    throw error;
  }
};

// PUT /tasks - Create or update a task
export const createOrUpdateTask = async (
  taskData: TaskInput
): Promise<Task> => {
  try {
    // If taskData has an ID, it's an update, otherwise creation (though backend handles both with PUT)
    const response = await apiClient.put<Task>("/tasks", taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating/updating task:", error);
    throw error;
  }
};

// DELETE /tasks/{id} - Delete a task by ID
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/tasks/${id}`);
    // No content returned on success (204)
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};

// PUT /tasks/{id}/execute - Execute a task
export const executeTask = async (id: string): Promise<Task> => {
  try {
    const response = await apiClient.put<Task>(`/tasks/${id}/execute`);
    return response.data; // Returns the updated task with execution details
  } catch (error) {
    console.error(`Error executing task ${id}:`, error);
    throw error;
  }
};
