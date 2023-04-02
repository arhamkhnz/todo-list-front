import ApiService from "./apiService";

const TodoService = {

  async listTodo(status) {
    return ApiService.get(`todo/list/${status}`);
  }

}

export default TodoService;

