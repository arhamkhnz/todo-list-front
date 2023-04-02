import ApiService from "./apiService";

const TodoService = {

  async listTodo(status) {
    return ApiService.get(`todo/list/${status}`);
  },

  async addTodo(data) {
    return ApiService.post(`todo/add`, data);
  },

  async deleteTodo(id) {
    return ApiService.post(`todo/delete/${id}`);
  },

  async getTodoDetail(id) {
    return ApiService.get(`todo/id/${id}`);
  },

  async updateTodo(data) {
    return ApiService.post(`todo/update`, data);
  },

}

export default TodoService;

