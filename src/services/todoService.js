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
  }

}

export default TodoService;

