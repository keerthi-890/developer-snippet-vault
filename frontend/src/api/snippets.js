import api from "./axios.js";

// search and language are optional; when provided, they're sent as query params
// e.g. GET /api/snippets?search=array&language=JavaScript
export const getSnippets = (search = "", language = "") =>
  api
    .get("/snippets", { params: { search, language } })
    .then((res) => res.data);

export const getSnippetById = (id) =>
  api.get(`/snippets/${id}`).then((res) => res.data);

export const createSnippet = (snippetData) =>
  api.post("/snippets", snippetData).then((res) => res.data);

export const updateSnippet = (id, snippetData) =>
  api.put(`/snippets/${id}`, snippetData).then((res) => res.data);

export const deleteSnippet = (id) =>
  api.delete(`/snippets/${id}`).then((res) => res.data);

export const getDashboardStats = () =>
  api.get("/snippets/stats/dashboard").then((res) => res.data);
